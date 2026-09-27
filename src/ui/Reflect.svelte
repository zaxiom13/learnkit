<script lang="ts">
  import type { Block } from "../lib/parse";
  import { progress } from "../lib/progress.svelte";

  let { b }: { b: Extract<Block, { kind: "reflect" }> } = $props();
  const KEY = `learnkit:reflect:${b.id}`;
  let text = $state((() => { try { return localStorage.getItem(KEY) ?? ""; } catch { return ""; } })());
  let revealed = $state(false);
  let ticks = $state<boolean[]>(b.rubric.map(() => false));

  function save() {
    try { localStorage.setItem(KEY, text); } catch { /* ignore */ }
  }
  function reveal() {
    revealed = true;
  }
  function tick(i: number) {
    ticks[i] = !ticks[i];
    if (ticks.every(Boolean)) progress.attempt(b.id, true);
  }
</script>

<section class="card">
  <div class="label">Explain it back</div>
  <div class="prompt">{@html b.prompt}</div>
  <textarea bind:value={text} oninput={save} rows="5" placeholder="Write it in your own words — out loud counts too."></textarea>
  {#if !revealed}
    <button class="btn primary" disabled={text.trim().length < 20} onclick={reveal}>Compare with a model answer</button>
  {:else}
    {#if b.model.trim()}<div class="model"><div class="label2">A strong answer</div>{@html b.model}</div>{/if}
    {#if b.rubric.length}
      <div class="label2">Did yours…</div>
      <ul class="rubric">
        {#each b.rubric as r, i (i)}
          <li><label><input type="checkbox" checked={ticks[i]} onchange={() => tick(i)} /> <span>{@html r}</span></label></li>
        {/each}
      </ul>
    {/if}
  {/if}
</section>

<style>
  .label,
  .label2 {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--accent);
  }
  .label2 {
    color: var(--text-3);
    margin: 14px 0 6px;
  }
  textarea {
    width: 100%;
    border-radius: 12px;
    border: 1.5px solid var(--line);
    background: var(--surface);
    padding: 12px 14px;
    font: inherit;
    font-size: 15.5px;
    color: var(--text);
    resize: vertical;
    margin: 10px 0;
  }
  textarea:focus {
    outline: none;
    border-color: var(--accent);
  }
  .model {
    padding: 12px 14px;
    border-radius: 12px;
    background: var(--surface-2);
  }
  .model :global(p) {
    margin: 6px 0;
  }
  .rubric {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .rubric label {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    cursor: pointer;
  }
  .rubric input {
    margin-top: 4px;
    accent-color: var(--good);
  }
</style>
