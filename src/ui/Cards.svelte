<script lang="ts">
  import type { Block } from "../lib/parse";
  import { progress } from "../lib/progress.svelte";

  let { b }: { b: Extract<Block, { kind: "cards" }> } = $props();
  // simple Leitner-style loop: cards you miss come back until you know them all
  let queue = $state(b.cards.map((_, i) => i));
  let flipped = $state(false);
  let known = $state(0);
  const total = b.cards.length;
  const current = $derived(queue[0]);

  function grade(knew: boolean) {
    const [c, ...rest] = queue;
    queue = knew ? rest : [...rest.slice(0, 2), c, ...rest.slice(2)];
    if (knew) known++;
    flipped = false;
    if (!queue.length) progress.attempt(b.id, true);
  }
  function restart() {
    queue = b.cards.map((_, i) => i);
    known = 0;
    flipped = false;
  }
</script>

<section class="card">
  <div class="top"><span>Flashcards</span><span>{known} / {total} known</span></div>
  <div class="meter"><span style:width="{(100 * known) / total}%"></span></div>
  {#if current !== undefined}
    <button class="flash" class:flipped onclick={() => (flipped = !flipped)} aria-label="Flip card">
      <div class="face front">{@html b.cards[current].front}<small>tap to flip</small></div>
      <div class="face back">{@html b.cards[current].back}</div>
    </button>
    {#if flipped}
      <div class="grades">
        <button class="btn" onclick={() => grade(false)}>Not yet</button>
        <button class="btn primary" onclick={() => grade(true)}>I knew it</button>
      </div>
    {/if}
  {:else}
    <div class="done">🎉 All {total} cards known. <button class="btn ghost sm" onclick={restart}>Go again</button></div>
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
  .meter {
    height: 4px;
    background: var(--surface-3);
    border-radius: 4px;
    margin: 8px 0 14px;
    overflow: hidden;
  }
  .meter span {
    display: block;
    height: 100%;
    background: var(--good);
    transition: width 300ms var(--ease);
  }
  .flash {
    width: 100%;
    min-height: 150px;
    border: none;
    background: none;
    padding: 0;
    perspective: 900px;
    position: relative;
    cursor: pointer;
    display: grid;
  }
  .face {
    grid-area: 1 / 1;
    border-radius: 16px;
    border: 1.5px solid var(--line);
    background: var(--surface);
    padding: 22px;
    font-size: 19px;
    line-height: 1.45;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-align: center;
    backface-visibility: hidden;
    transition: transform 420ms var(--ease);
  }
  .face small {
    font-size: 12px;
    color: var(--text-3);
  }
  .back {
    transform: rotateY(180deg);
    background: var(--accent-soft);
    border-color: var(--accent);
  }
  .flipped .front {
    transform: rotateY(180deg);
  }
  .flipped .back {
    transform: rotateY(360deg);
  }
  .grades {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 12px;
  }
  .done {
    text-align: center;
    padding: 20px;
    font-size: 16px;
  }
</style>
