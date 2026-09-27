<script lang="ts">
  import type { Block } from "../lib/parse";
  import { progress } from "../lib/progress.svelte";
  import Feedback from "./Feedback.svelte";

  let { b }: { b: Extract<Block, { kind: "choice" }> } = $props();
  let picked = $state<Set<number>>(new Set());
  let result = $state<null | { ok: boolean; earned: number }>(null);

  function toggle(i: number) {
    if (result?.ok) return;
    const next = new Set(b.multi ? picked : []);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    picked = next;
    result = null;
  }

  function check() {
    const ok = b.options.every((o, i) => o.correct === picked.has(i));
    result = { ok, earned: progress.attempt(b.id, ok) };
  }
</script>

<section class="card">
  <div class="prompt">{@html b.prompt}</div>
  {#if b.multi}<p class="note">Choose all that apply.</p>{/if}
  <div class="options" role={b.multi ? "group" : "radiogroup"}>
    {#each b.options as o, i (i)}
      {@const shown = result && (picked.has(i) || (result.ok && o.correct))}
      <button
        class="opt"
        class:picked={picked.has(i)}
        class:good={shown && o.correct}
        class:bad={shown && !o.correct && picked.has(i)}
        role={b.multi ? "checkbox" : "radio"}
        aria-checked={picked.has(i)}
        onclick={() => toggle(i)}
      >
        <span class="mark">{b.multi ? (picked.has(i) ? "✓" : "") : picked.has(i) ? "●" : ""}</span>
        <span class="txt">{@html o.text}
          {#if shown && o.why}<small>{@html o.why}</small>{/if}
        </span>
      </button>
    {/each}
  </div>
  <div class="bar">
    <button class="btn primary" disabled={!picked.size || result?.ok} onclick={check}>Check</button>
    {#if result && !result.ok}<button class="btn ghost" onclick={() => { picked = new Set(); result = null; }}>Try again</button>{/if}
  </div>
  {#if result}<Feedback ok={result.ok} earned={result.earned} explain={b.explain} />{/if}
</section>

<style>
  .options {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 12px 0;
  }
  .opt {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    text-align: left;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1.5px solid var(--line);
    background: var(--surface);
    cursor: pointer;
    font-size: 15.5px;
    line-height: 1.45;
    transition: border-color 150ms, background 150ms;
  }
  .opt:hover {
    border-color: var(--line-strong);
  }
  .opt.picked {
    border-color: var(--accent);
    background: var(--accent-soft);
  }
  .opt.good {
    border-color: var(--good);
    background: var(--good-soft);
  }
  .opt.bad {
    border-color: var(--bad);
    background: var(--bad-soft);
  }
  .mark {
    flex: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1.5px solid var(--line-strong);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    color: var(--accent);
    margin-top: 1px;
  }
  .txt {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .txt small {
    color: var(--text-2);
    font-size: 13.5px;
  }
  .note {
    color: var(--text-3);
    font-size: 13px;
    margin: 4px 0 0;
  }
</style>
