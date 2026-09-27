<script lang="ts">
  import type { Block } from "../lib/parse";
  import { progress } from "../lib/progress.svelte";

  let { b }: { b: Extract<Block, { kind: "steps" }> } = $props();
  let shown = $state(1);
  function more() {
    shown++;
    if (shown >= b.steps.length) progress.attempt(b.id, true);
  }
</script>

<section class="card worked">
  <div class="label">Worked example{b.title ? ` · ${b.title}` : ""}</div>
  <ol>
    {#each b.steps.slice(0, shown) as s, i (i)}
      <li class="step"><span class="n">{i + 1}</span><div>{@html s}</div></li>
    {/each}
  </ol>
  {#if shown < b.steps.length}
    <button class="btn" onclick={more}>Next step <span class="faint">({shown}/{b.steps.length})</span></button>
  {:else}
    <p class="faint small">That's the whole solution. Could you do it without looking?</p>
  {/if}
</section>

<style>
  .label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--coral);
  }
  ol {
    list-style: none;
    padding: 0;
    margin: 12px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .step {
    display: flex;
    gap: 12px;
    animation: in 320ms var(--ease);
  }
  .step > div :global(p) {
    margin: 0 0 6px;
  }
  .n {
    flex: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--coral);
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
  }
  .small {
    font-size: 13.5px;
  }
  @keyframes in {
    from { opacity: 0; transform: translateY(-4px); }
  }
</style>
