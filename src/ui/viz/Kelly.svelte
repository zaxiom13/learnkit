<script lang="ts">
  import Range from "./Range.svelte";
  import { rng, path } from "../../lib/viz";
  // Even-money bets won with probability p. Growth rate g(f) = p ln(1+f) + q ln(1−f); simulate wealth paths.
  let p = $state(60), f = $state(20), seed = $state(1);
  const q = $derived(1 - p / 100);
  const g = (x: number) => (p / 100) * Math.log(1 + x) + q * Math.log(1 - x);
  const fk = $derived(Math.max(0, 2 * (p / 100) - 1));
  const gc = $derived(path(Array.from({ length: 99 }, (_, i) => { const x = i / 100; return [20 + x * 300, 110 - Math.max(-0.1, g(x)) * 900] as [number, number]; })));
  const paths = $derived.by(() => { const r = rng(seed); return Array.from({ length: 12 }, () => { let w = 0; const ys = [0]; for (let t = 0; t < 200; t++) { w += r() < p / 100 ? Math.log(1 + f / 100) : Math.log(1 - f / 100); ys.push(w); } return ys; }); });
</script>

<svg viewBox="0 0 640 220">
  <text x="20" y="14" font-size="11">growth rate per bet vs fraction bet</text>
  <line x1="20" x2="320" y1="110" y2="110" stroke="var(--line-strong)" />
  <path d={gc} fill="none" stroke="var(--accent)" stroke-width="3" />
  <line x1={20 + fk * 300} x2={20 + fk * 300} y1="20" y2="200" stroke="var(--good)" stroke-dasharray="4 4" /><text x={24 + fk * 300} y="34" font-size="10" fill="var(--good)" style="fill:var(--good)">Kelly {Math.round(fk * 100)}%</text>
  <circle cx={20 + (f / 100) * 300} cy={110 - Math.max(-0.1, g(f / 100)) * 900} r="6" fill="var(--coral)" />
  <text x="350" y="14" font-size="11">12 gamblers, 200 bets each (log wealth)</text>
  <line x1="350" x2="630" y1="110" y2="110" stroke="var(--line-strong)" />
  {#each paths as ys, i (i)}<polyline points={ys.map((y, t) => `${350 + t * 1.4},${110 - Math.max(-9, Math.min(9, y)) * 10}`).join(" ")} fill="none" stroke={ys[200] > 0 ? "var(--good)" : "var(--bad)"} stroke-width="1" opacity="0.6" />{/each}
</svg>
<div class="row"><span class="stat">g = {g(f / 100).toFixed(4)} per bet</span><span class="stat">{g(f / 100) < 0 ? "💀 long-run ruin despite an edge" : "long-run growth"}</span><button class="btn sm" onclick={() => seed++}>re-run</button></div>
<div class="ctl">
  <Range label="win probability %" min={50} max={80} bind:value={p} />
  <Range label="fraction bet %" min={1} max={95} bind:value={f} />
</div>
<p class="faint small">Growth peaks at the Kelly fraction and falls off either side. Bet about twice Kelly and growth hits zero, even though every bet is in your favour. The average gambler gets rich while the typical one goes broke: that's non-ergodicity.</p>
