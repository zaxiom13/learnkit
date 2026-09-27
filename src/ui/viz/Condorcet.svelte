<script lang="ts">
  // Three voter blocs with rankings; show pairwise majorities, including cycles.
  const C = ["A", "B", "C"];
  let blocs = $state([{ n: 35, r: ["A", "B", "C"] }, { n: 33, r: ["B", "C", "A"] }, { n: 32, r: ["C", "A", "B"] }]);
  const beats = (x: string, y: string) => blocs.reduce((s, b) => s + (b.r.indexOf(x) < b.r.indexOf(y) ? b.n : 0), 0);
  const pairs = $derived([["A", "B"], ["B", "C"], ["C", "A"]].map(([x, y]) => { const v = beats(x, y), tot = blocs.reduce((s, b) => s + b.n, 0); return { w: v > tot / 2 ? x : y, l: v > tot / 2 ? y : x, v: Math.max(v, tot - v) }; }));
  const plurality = $derived(C.map((c) => [c, blocs.filter((b) => b.r[0] === c).reduce((s, b) => s + b.n, 0)] as [string, number]).sort((a, b) => b[1] - a[1]));
  const cycle = $derived(new Set(pairs.map((p) => p.w)).size === 3);
  const pos: Record<string, [number, number]> = { A: [470, 40], B: [580, 190], C: [360, 190] };
  function rot(i: number) { const r = blocs[i].r; blocs[i].r = [r[1], r[2], r[0]]; }
  function swap(i: number) { const r = blocs[i].r; blocs[i].r = [r[1], r[0], r[2]]; }
</script>

<div class="wrap">
  <div class="blocs">
    {#each blocs as b, i (i)}
      <div class="bloc"><input type="number" min="1" max="99" bind:value={b.n} /> voters: <b>{b.r.join(" > ")}</b> <button class="btn sm ghost" onclick={() => rot(i)}>↻</button><button class="btn sm ghost" onclick={() => swap(i)}>⇄</button></div>
    {/each}
    <div class="faint small">Plurality winner: {plurality[0][0]} ({plurality[0][1]} first-choice votes)</div>
  </div>
  <svg viewBox="330 10 290 210">
    <defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--coral)" /></marker></defs>
    {#each pairs as p (p.w + p.l)}
      {@const a = pos[p.w]}{@const b = pos[p.l]}
      <line x1={a[0] + (b[0] - a[0]) * 0.18} y1={a[1] + (b[1] - a[1]) * 0.18} x2={a[0] + (b[0] - a[0]) * 0.8} y2={a[1] + (b[1] - a[1]) * 0.8} stroke="var(--coral)" stroke-width="3" marker-end="url(#ah)" />
      <text x={(a[0] + b[0]) / 2} y={(a[1] + b[1]) / 2 - 6} font-size="11" text-anchor="middle">{p.v}</text>
    {/each}
    {#each C as c (c)}<circle cx={pos[c][0]} cy={pos[c][1]} r="20" fill="var(--accent)" /><text x={pos[c][0]} y={pos[c][1] + 5} text-anchor="middle" font-size="15" style="fill:#fff">{c}</text>{/each}
  </svg>
</div>
<div class="readout">{cycle ? "🔄 A cycle: each candidate loses to another by majority. \"The will of the majority\" is ill-defined here (Condorcet's paradox, 1785)." : `Condorcet winner: ${pairs.find((p) => pairs.filter((q) => q.w === p.w).length === 2)?.w ?? "—"}, who beats every rival head-to-head.`}</div>
<p class="faint small">Arrows point from the winner to the loser of each head-to-head vote. Rotate the rankings to break or make the cycle. Arrow's theorem generalises this: no ranked voting rule is fair in every way at once.</p>

<style>
  .wrap {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 10px;
    align-items: center;
  }
  @media (max-width: 560px) {
    .wrap {
      grid-template-columns: 1fr;
    }
  }
  .bloc {
    font-size: 13.5px;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    margin-bottom: 6px;
  }
  input {
    width: 54px;
    font: inherit;
    padding: 3px 6px;
    border-radius: 6px;
    border: 1px solid var(--line-strong);
    background: var(--surface-2);
    color: var(--text);
  }
</style>
