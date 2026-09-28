<script lang="ts">
  import { tick } from "svelte";
  import type { Block } from "../lib/parse";
  import { progress } from "../lib/progress.svelte";
  import { applyHint, compareInput, countWords, isWhitespace, isWordChar, reconcile, wordInitials } from "../lib/recall";
  import Feedback from "./Feedback.svelte";

  // Completion-based recall: type a passage from memory. Correct letters lock in,
  // a wrong letter shows in red until deleted. Scaffolding fades from "Read"
  // (type over the full text) to "First letters" to "From memory".

  let { b }: { b: Extract<Block, { kind: "recall" }> } = $props();

  type Level = "full" | "initials" | "none";
  const LEVELS: { v: Level; label: string }[] = [
    { v: "full", label: "Read" },
    { v: "initials", label: "First letters" },
    { v: "none", label: "From memory" },
  ];

  // Safari-only attribute that Svelte's element types don't know about.
  const SAFARI_NO_AUTOCORRECT = { autocorrect: "off" } as Record<string, string>;

  const target = $derived(b.text);
  const initials = $derived(wordInitials(target));
  const words = $derived(countWords(target));

  // Already mastered? Start straight from memory; otherwise with first letters.
  const startLevel = (): Level => (progress.done(b.id) ? "none" : "initials");
  let level = $state<Level>(startLevel());
  let lenient = $state(true);
  let input = $state("");
  let focused = $state(false);
  let hints = $state(0);
  let result = $state<null | { level: Level; ms: number; accuracy: number; hints: number; earned: number }>(null);

  let ta: HTMLTextAreaElement;
  let caret: HTMLSpanElement;
  let surface: HTMLDivElement;
  let composing = false;
  let mistakes = 0;
  let startedAt: number | null = null;

  const opts = $derived({ autocorrect: lenient });
  const correctUntil = $derived(compareInput(target, input, opts).correctUntil);
  const wrong = $derived(input.slice(correctUntil));
  const pct = $derived(Math.round((100 * correctUntil) / target.length));

  type Seg = { cls: "ws" | "hint" | "blank"; text: string };
  const rest = $derived.by(() => {
    const segs: Seg[] = [];
    if (level === "none") return segs;
    for (let k = correctUntil; k < target.length; k++) {
      const ch = target[k];
      const cls: Seg["cls"] = isWhitespace(ch) ? "ws" : level === "full" || !isWordChar(ch) || initials[k] ? "hint" : "blank";
      const last = segs[segs.length - 1];
      if (last && last.cls === cls) last.text += ch;
      else segs.push({ cls, text: ch });
    }
    return segs;
  });

  function syncField(value: string) {
    if (!ta || composing) return;
    if (ta.value !== value) ta.value = value;
    if (document.activeElement === ta) ta.setSelectionRange(value.length, value.length);
  }

  function shake() {
    surface.classList.remove("shake");
    void surface.offsetWidth;
    surface.classList.add("shake");
  }

  function commit(next: string, countMistake = true) {
    syncField(next);
    if (next === input) return;
    startedAt ??= performance.now();
    const prevWrong = input.length - compareInput(target, input, opts).correctUntil;
    const nextCorrect = compareInput(target, next, opts).correctUntil;
    if (countMistake && prevWrong === 0 && next.length - nextCorrect > 0) {
      mistakes++;
      shake();
      try { navigator.vibrate?.(12); } catch { /* unsupported */ }
    }
    input = next;
    tick().then(() => caret?.scrollIntoView({ block: "nearest" }));
    if (nextCorrect >= target.length) finish();
  }

  function onInput() {
    if (result) {
      if (!composing) ta.value = input;
      return;
    }
    commit(reconcile(target, input, ta.value, opts));
  }

  function hint() {
    if (result) return;
    const next = applyHint(target, input, opts);
    if (next === input) return;
    hints++;
    composing = false;
    commit(next, false);
    ta.focus({ preventScroll: true });
  }

  function finish() {
    const ms = startedAt == null ? 0 : performance.now() - startedAt;
    const accuracy = Math.round((1000 * target.length) / (target.length + mistakes)) / 10;
    // Reading along is practice; points come from recalling with less help.
    const earned = level === "full" ? 0 : progress.attempt(b.id, true);
    result = { level, ms, accuracy, hints, earned };
    ta.blur();
  }

  function restart(next: Level = level) {
    level = next;
    input = "";
    hints = 0;
    mistakes = 0;
    startedAt = null;
    result = null;
    if (ta) ta.value = "";
    tick().then(() => ta?.focus({ preventScroll: true }));
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      hint();
    } else if (e.key === "Escape") {
      ta.blur();
    } else if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"].includes(e.key)) {
      e.preventDefault(); // the caret always stays at the end
    } else if ((e.metaKey || e.ctrlKey) && ["a", "z", "y"].includes(e.key)) {
      e.preventDefault();
    }
  }

  function keepCaretAtEnd() {
    if (!ta || composing) return;
    const n = ta.value.length;
    if (ta.selectionStart !== n || ta.selectionEnd !== n) ta.setSelectionRange(n, n);
  }

  const fmt = (ms: number) => {
    const s = Math.round(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };
  const nextLevel = $derived(result?.level === "full" ? "initials" : result?.level === "initials" ? "none" : null);
  const stars = $derived(!result || result.level === "full" ? 0 : result.level === "initials" ? 1 : result.hints === 0 && result.accuracy >= 95 ? 3 : 2);
</script>

<section class="card recall">
  <div class="top">
    <span>✍️ Recall{b.title ? ` · ${b.title}` : ""}</span>
    <span>{words} words</span>
  </div>
  {#if b.prompt.trim()}<div class="prompt">{@html b.prompt}</div>{/if}

  <div class="controls">
    <div class="seg" role="radiogroup" aria-label="How much help">
      {#each LEVELS as l (l.v)}
        <button role="radio" aria-checked={level === l.v} class:on={level === l.v} onmousedown={(e) => e.preventDefault()} onclick={() => restart(l.v)}>{l.label}</button>
      {/each}
    </div>
    <label class="lenient" title="Ignore capitals and accents; punctuation fills itself in">
      <input type="checkbox" bind:checked={lenient} onchange={() => restart()} /> Ignore case &amp; punctuation
    </label>
  </div>

  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="surface" class:focused class:done={!!result} bind:this={surface} onanimationend={() => surface.classList.remove("shake")}>
    <div class="display" aria-hidden="true">
      <span class="ok">{input.slice(0, correctUntil)}</span>{#if wrong}<span class="bad">{wrong}</span>{/if}<span class="caret" class:hidden={!focused || !!result} bind:this={caret}></span>{#each rest as s, i (i)}{#if s.cls === "ws"}{s.text}{:else}<span class={s.cls}>{s.text}</span>{/if}{/each}
    </div>
    <textarea
      bind:this={ta}
      class="field"
      aria-label={`Type from memory${b.title ? `: ${b.title}` : ""}`}
      autocomplete="off"
      {...SAFARI_NO_AUTOCORRECT}
      autocapitalize="off"
      spellcheck="false"
      enterkeyhint="enter"
      data-gramm="false"
      rows="1"
      oninput={onInput}
      oncompositionstart={() => (composing = true)}
      oncompositionend={() => {
        composing = false;
        onInput();
        syncField(input);
      }}
      onkeydown={onKeydown}
      onselect={keepCaretAtEnd}
      onfocus={() => {
        focused = true;
        keepCaretAtEnd();
      }}
      onblur={() => (focused = false)}
      onpaste={(e) => e.preventDefault()}
      ondrop={(e) => e.preventDefault()}
    ></textarea>
    {#if !focused && !result && input.length === 0}
      <div class="tap">Tap here and type it from memory</div>
    {/if}
  </div>

  {#if !result}
    <div class="bar">
      <div class="meter"><span style:width="{pct}%"></span></div>
      <button class="btn sm ghost" onmousedown={(e) => e.preventDefault()} onclick={hint} title="Fill in the next word (Tab)">💡 Hint{hints ? ` · ${hints}` : ""}</button>
      <button class="btn sm ghost" onmousedown={(e) => e.preventDefault()} onclick={() => restart()} disabled={!input}>Restart</button>
    </div>
  {:else}
    {#if result.level === "full"}
      <div class="practice" role="status"><strong>Nice read-through.</strong> Now try it with just the first letters.</div>
    {:else}
      <Feedback ok={true} earned={result.earned} explain={b.explain} />
    {/if}
    <div class="stats">
      {#if stars}<span class="stars" aria-label="{stars} of 3 stars">{"★".repeat(stars)}<span class="dim">{"★".repeat(3 - stars)}</span></span>{/if}
      <span>{result.accuracy}% accuracy</span>
      <span>{result.hints} hint{result.hints === 1 ? "" : "s"}</span>
      <span>{fmt(result.ms)}</span>
    </div>
    <div class="again">
      {#if nextLevel}
        <button class="btn primary" onclick={() => restart(nextLevel)}>Next: {LEVELS.find((l) => l.v === nextLevel)?.label}</button>
      {/if}
      <button class="btn" class:primary={!nextLevel} onclick={() => restart()}>Go again</button>
    </div>
  {/if}
</section>

<style>
  .top {
    display: flex;
    justify-content: space-between;
    font-size: 12.5px;
    font-weight: 650;
    color: var(--text-3);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .prompt {
    margin-top: 6px;
  }
  .controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 14px;
    margin: 12px 0;
  }
  .seg {
    display: inline-flex;
    padding: 3px;
    gap: 2px;
    border-radius: 12px;
    background: var(--surface-2);
    border: 1px solid var(--line);
  }
  .seg button {
    border: 0;
    background: none;
    font: inherit;
    font-size: 13.5px;
    font-weight: 600;
    color: var(--text-2);
    padding: 7px 11px;
    min-height: 36px;
    border-radius: 9px;
    cursor: pointer;
  }
  .seg button.on {
    background: var(--surface);
    color: var(--text);
    box-shadow: var(--shadow);
  }
  .lenient {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13.5px;
    color: var(--text-2);
    cursor: pointer;
  }
  .lenient input {
    width: 17px;
    height: 17px;
    accent-color: var(--accent);
  }

  .surface {
    position: relative;
    padding: 14px 16px;
    border-radius: 14px;
    border: 1.5px solid var(--line);
    background: var(--surface);
    cursor: text;
    transition: border-color var(--dur) var(--ease);
  }
  .surface.focused {
    border-color: var(--accent);
  }
  .surface.done {
    border-color: var(--good);
    background: var(--good-soft);
  }
  /* Display and field share identical metrics so the native caret lines up with ours. */
  .display,
  .field {
    font: inherit;
    font-size: max(16px, 1.08rem);
    line-height: 1.7;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    letter-spacing: 0;
  }
  .display {
    min-height: 3.4em;
    color: var(--text);
  }
  .field {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    padding: 14px 16px;
    margin: 0;
    border: 0;
    outline: none;
    resize: none;
    overflow: hidden;
    background: transparent;
    color: transparent;
    -webkit-text-fill-color: transparent;
    caret-color: transparent;
  }
  .field::selection {
    background: transparent;
  }
  .bad {
    color: var(--bad);
    background: var(--bad-soft);
    border-radius: 3px;
    text-decoration: underline wavy color-mix(in srgb, var(--bad) 55%, transparent);
    text-underline-offset: 4px;
  }
  .hint {
    color: var(--text-3);
    opacity: 0.75;
  }
  .blank {
    color: transparent;
    text-decoration: underline;
    text-decoration-color: color-mix(in srgb, var(--text) 25%, transparent);
    text-decoration-thickness: 2px;
    text-underline-offset: 5px;
    text-decoration-skip-ink: none;
  }
  .caret {
    position: relative;
  }
  .caret::before {
    content: "\200B";
  }
  .caret::after {
    content: "";
    position: absolute;
    left: -1px;
    top: 0.1em;
    bottom: 0.1em;
    width: 2px;
    border-radius: 2px;
    background: var(--accent);
    animation: blink 1.05s steps(1) infinite;
  }
  .caret.hidden::after {
    display: none;
  }
  @keyframes blink {
    56%,
    100% {
      opacity: 0;
    }
  }
  .tap {
    position: absolute;
    right: 10px;
    bottom: 8px;
    font-size: 12.5px;
    color: var(--text-3);
    pointer-events: none;
  }
  .surface:global(.shake) {
    animation: shake 240ms ease-in-out;
  }
  @keyframes shake {
    20%,
    80% {
      transform: translateX(2px);
    }
    30%,
    50%,
    70% {
      transform: translateX(-4px);
    }
    40%,
    60% {
      transform: translateX(4px);
    }
  }

  .bar {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 10px;
  }
  .meter {
    flex: 1;
    height: 4px;
    background: var(--surface-3);
    border-radius: 4px;
    overflow: hidden;
  }
  .meter span {
    display: block;
    height: 100%;
    background: var(--good);
    transition: width 200ms var(--ease);
  }
  .practice {
    margin-top: 12px;
    padding: 12px 14px;
    border-radius: 12px;
    background: var(--accent-soft);
  }
  .stats {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 14px;
    margin-top: 10px;
    font-size: 13.5px;
    color: var(--text-2);
  }
  .stars {
    color: var(--warn);
    letter-spacing: 2px;
    font-size: 16px;
  }
  .stars .dim {
    color: var(--surface-3);
  }
  .again {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }
  @media (prefers-reduced-motion: reduce) {
    .caret::after {
      animation: none;
    }
    .surface:global(.shake) {
      animation: none;
    }
  }
</style>
