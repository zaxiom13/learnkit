<script lang="ts">
  import Range from "./Range.svelte";
  import { rng, gauss } from "../../lib/viz";
  // Try K random (zero-edge) strategies; pick the best in-sample; watch it out of sample.
  let K = $state(50), seed = $state(1);
  const N = 250, M = 250;
  const strats = $derived.by(() => { const r = rng(seed); return Array.from({ length: K }, () => { const ys = [0]; for (let t = 0; t < N + M; t++) ys.push(ys[t] + gauss(r)); return ys; }); });
  const best = $derived.by(() => { let bi = 0; strats.forEach((s, i) => { if (s[N] > strats[bi][N]) bi = i; }); return bi; });
  const sharpe = (ys: number[], a: number, b: number) => { const d = ys.slice(a + 1, b + 1).map((v, i) => v - ys[a + i]); const m = d.reduce((x, y) => x + y, 0) / d.length; const sd = Math.sqrt(d.reduce((x, y) => x + (y - m) ** 2, 0) / d.length); return (m / sd) * Math.sqrt(252); };
  const Y = (v: number) => 110 - v * 1.6;
</script>

<svg viewBox="0 0 640 220">
  <rect x={20 + N * 1.2} y="0" width={M * 1.2} height="220" fill="var(--surface-2)" />
  <text x="24" y="14" font-size="11">in-sample (you picked the best)</text><text x={24 + N * 1.2} y="14" font-size="11">out-of-sample (the future)</text>
  {#each strats as s, i (i)}{#if i !== best}<polyline points={s.filter((_, t) => t % 3 === 0).map((y, t) => `${20 + t * 3.6},${Y(y)}`).join(" ")} fill="none" stroke="var(--text-3)" stroke-width="0.8" opacity="0.35" />{/if}{/each}
  <polyline points={strats[best].slice(0, N + 1).map((y, t) => `${20 + t * 1.2},${Y(y)}`).join(" ")} fill="none" stroke="var(--good)" stroke-width="2.5" />
  <polyline points={strats[best].slice(N).map((y, t) => `${20 + (N + t) * 1.2},${Y(y)}`).join(" ")} fill="none" stroke="var(--coral)" stroke-width="2.5" />
</svg>
<div class="row"><span class="stat" style="color:var(--good)">in-sample Sharpe {sharpe(strats[best], 0, N).toFixed(2)}</span><span class="stat" style="color:var(--coral)">out-of-sample Sharpe {sharpe(strats[best], N, N + M).toFixed(2)}</span><button class="btn sm" onclick={() => seed++}>new universe</button></div>
<div class="ctl"><Range label="strategies tried" min={1} max={400} bind:value={K} /></div>
<p class="faint small">Every strategy here is a pure coin flip with zero edge. Try enough of them and the best one looks brilliant in-sample, then reverts to nothing. The more you try, the better the fake winner looks. That's why quants deflate Sharpe ratios by the number of trials.</p>
