<script lang="ts">
  import type { Block } from "../lib/parse";
  import { progress } from "../lib/progress.svelte";
  import Feedback from "./Feedback.svelte";

  let { b }: { b: Extract<Block, { kind: "order" }> } = $props();
  // deterministic shuffle that's never already in order
  const shuffled = (() => {
    const idx = b.items.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = (i * 7 + 3) % (i + 1);
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    if (idx.every((v, i) => v === i)) idx.reverse();
    return idx;
  })();
  let order = $state(shuffled);
  let result = $state<null | { ok: boolean; earned: number }>(null);

  function move(i: number, d: -1 | 1) {
    const j = i + d;
    if (j < 0 || j >= order.length || result?.ok) return;
    const next = [...order];
    [next[i], next[j]] = [next[j], next[i]];
    order = next;
    result = null;
  }
  function check() {
    const ok = order.every((v, i) => v === i);
    result = { ok, earned: progress.attempt(b.id, ok) };
  }
</script>

<section class="card">
  <div class="prompt">{@html b.prompt}</div>
  <ol class="list">
    {#each order as item, i (item)}
      <li class:good={result?.ok}>
        <span class="n">{i + 1}</span>
        <span class="t">{@html b.items[item]}</span>
        <span class="mv">
          <button class="btn sm icon ghost" aria-label="Move up" disabled={i === 0} onclick={() => move(i, -1)}>↑</button>
          <button class="btn sm icon ghost" aria-label="Move down" disabled={i === order.length - 1} onclick={() => move(i, 1)}>↓</button>
        </span>
      </li>
    {/each}
  </ol>
  <button class="btn primary" onclick={check} disabled={result?.ok}>Check order</button>
  {#if result}<Feedback ok={result.ok} earned={result.earned} explain={b.explain} missText="Some are out of place — keep shuffling." />{/if}
</section>

<style>
  .list {
    list-style: none;
    padding: 0;
    margin: 12px 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 8px 8px 12px;
    border-radius: 12px;
    border: 1.5px solid var(--line);
    background: var(--surface);
    transition: border-color 150ms;
  }
  li.good {
    border-color: var(--good);
  }
  .n {
    font-weight: 700;
    color: var(--text-3);
    width: 18px;
  }
  .t {
    flex: 1;
  }
  .mv {
    display: flex;
    gap: 2px;
  }
</style>
