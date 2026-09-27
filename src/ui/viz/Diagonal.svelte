<script lang="ts">
  import { rng } from "../../lib/viz";
  // Cantor's diagonal: build a number that differs from row n in digit n.
  const N = 8;
  let seed = $state(3);
  const rows = $derived.by(() => { const r = rng(seed); return Array.from({ length: N }, () => Array.from({ length: N }, () => Math.floor(r() * 10))); });
  let k = $state(0);
  const flip = (d: number) => (d === 5 ? 4 : 5);
</script>

<div class="tab">
  {#each rows as row, i (i)}
    <div class="r"><span class="n">r{i + 1} = 0.</span>{#each row as d, j (j)}<span class="d" class:diag={i === j && j < k} class:cur={i === j && j === k}>{d}</span>{/each}<span class="faint">…</span></div>
  {/each}
  <div class="r new"><span class="n">new = 0.</span>{#each rows as row, j (j)}<span class="d" class:show={j < k}>{j < k ? flip(row[j]) : "?"}</span>{/each}<span class="faint">…</span></div>
</div>
<div class="readout">{k < N ? `Digit ${k + 1}: take row ${k + 1}'s ${k + 1}th digit (${rows[k][k]}) and change it (to ${flip(rows[k][k])}).` : "The new number differs from every row in at least one place, so it's not in the list. No list of reals can be complete: ℝ is uncountable."}</div>
<div class="row"><button class="btn sm primary" onclick={() => (k = Math.min(N, k + 1))}>next digit</button><button class="btn sm" onclick={() => { k = 0; seed++; }}>new list</button></div>

<style>
  .tab {
    font-family: var(--font-code);
    font-size: 15px;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .r {
    display: flex;
    gap: 3px;
    align-items: center;
  }
  .n {
    width: 80px;
    color: var(--text-3);
    font-size: 12px;
  }
  .d {
    width: 22px;
    text-align: center;
    border-radius: 4px;
    transition: all 250ms;
  }
  .d.diag {
    background: var(--accent-soft);
    color: var(--accent);
    font-weight: 700;
  }
  .d.cur {
    background: var(--accent);
    color: #fff;
  }
  .new {
    margin-top: 6px;
    padding-top: 6px;
    border-top: 2px solid var(--line-strong);
  }
  .new .d.show {
    background: var(--coral);
    color: #fff;
    animation: pop 300ms var(--ease-spring);
  }
  @keyframes pop {
    from {
      transform: scale(0.4);
    }
  }
</style>
