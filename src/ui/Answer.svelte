<script lang="ts">
  import { checkAnswer, type Block } from "../lib/parse";
  import { progress } from "../lib/progress.svelte";
  import Feedback from "./Feedback.svelte";

  let { b }: { b: Extract<Block, { kind: "answer" }> } = $props();
  let given = $state("");
  let result = $state<null | { ok: boolean; earned: number }>(null);
  let tries = $state(0);
  let showAnswer = $state(false);

  function check(e?: Event) {
    e?.preventDefault();
    if (!given.trim()) return;
    tries++;
    const ok = checkAnswer(b, given);
    result = { ok, earned: progress.attempt(b.id, ok) };
  }
  const first = $derived(String(b.accept[0]).replace(/^\/|\/[a-z]*$/g, ""));
</script>

<section class="card">
  <div class="prompt">{@html b.prompt}</div>
  <form onsubmit={check}>
    <input bind:value={given} placeholder={b.placeholder} aria-label="Your answer" disabled={result?.ok} oninput={() => result && !result.ok && (result = null)} />
    <button class="btn primary" type="submit" disabled={!given.trim() || result?.ok}>Check</button>
  </form>
  {#if result && !result.ok && b.hint}<p class="hint">💡 {b.hint}</p>{/if}
  {#if result}<Feedback ok={result.ok} earned={result.earned} explain={b.explain} />{/if}
  {#if !result?.ok && tries >= 2}
    <button class="btn ghost sm" onclick={() => (showAnswer = !showAnswer)}>{showAnswer ? "Hide" : "Show"} the answer</button>
    {#if showAnswer}<div class="reveal"><strong>{first}</strong>{#if b.explain.trim()}<div>{@html b.explain}</div>{/if}</div>{/if}
  {/if}
</section>

<style>
  form {
    display: flex;
    gap: 8px;
    margin: 12px 0 0;
  }
  input {
    flex: 1;
    min-width: 0;
    height: 44px;
    padding: 0 14px;
    border-radius: 12px;
    border: 1.5px solid var(--line);
    background: var(--surface);
    font: inherit;
    font-size: 16px;
    color: var(--text);
  }
  input:focus {
    outline: none;
    border-color: var(--accent);
  }
  form .btn {
    height: 44px;
  }
  .hint {
    color: var(--text-2);
    margin: 10px 0 0;
  }
  .reveal {
    margin-top: 8px;
    padding: 10px 12px;
    border-radius: 10px;
    background: var(--surface-2);
  }
  .card > .btn {
    margin-top: 10px;
  }
</style>
