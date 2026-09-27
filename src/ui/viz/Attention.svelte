<script lang="ts">
  // Hand-set toy attention: hover a word to see which words it attends to.
  const words = ["The", "animal", "didn't", "cross", "the", "street", "because", "it", "was", "too", "tired"];
  const W: Record<number, Record<number, number>> = {
    7: { 1: 5, 5: 1.6, 10: 2, 0: 0.5 }, 10: { 1: 3, 7: 3, 8: 1.5 }, 3: { 1: 2.5, 5: 3, 2: 1.5 }, 5: { 3: 2.5, 4: 2 }, 1: { 0: 2, 3: 1.5 }, 2: { 3: 3, 1: 1.5 },
  };
  let q = $state(7);
  const attn = $derived.by(() => { const s = words.map((_, j) => (j <= q ? (W[q]?.[j] ?? 0) + (j === q ? 1 : 0) : -Infinity)); const e = s.map((v) => Math.exp(v)); const z = e.reduce((a, b) => a + b, 0); return e.map((v) => v / z); });
</script>

<div class="sent">
  {#each words as w, j (j)}
    <button class="w" class:q={j === q} style="--a:{j === q ? 0 : attn[j]}" onmouseenter={() => (q = j)} onclick={() => (q = j)}>
      {w}
      {#if j < q || j === q}<span class="pct">{j === q ? "query" : (attn[j] * 100).toFixed(0) + "%"}</span>{/if}
    </button>
  {/each}
</div>
<p class="faint small">Tap or hover a word. A causal (GPT-style) model attends only to earlier words. "it" puts most of its weight on "animal", which is how it resolves the pronoun. The weights are a softmax over query·key scores. (Toy, hand-set weights for illustration.)</p>

<style>
  .sent {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .w {
    position: relative;
    font: inherit;
    font-size: 15px;
    padding: 6px 9px 16px;
    border-radius: 8px;
    border: 1px solid var(--line);
    color: inherit;
    cursor: pointer;
    background: color-mix(in srgb, var(--coral) calc(var(--a) * 100%), var(--surface));
    transition: background 250ms;
  }
  .w.q {
    outline: 2px solid var(--accent);
  }
  .pct {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 1px;
    font-size: 9.5px;
    font-family: var(--font-code);
    color: var(--text-2);
  }
</style>
