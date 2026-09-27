<script lang="ts">
  import Range from "./Range.svelte";
  import { gauss, rng } from "../../lib/viz";
  // Many random walks, with the ±√t envelope. opts: geometric=1 for stock-price style paths.
  import type { VizProps } from "../../lib/viz";
  let { opts }: VizProps = $props();
  let n = $state(40), sigma = $state(1), drift = $state(0), seed = $state(1);
  const geo = $derived(opts.geometric === "1");
  const T = 200;
  const walks = $derived.by(() => { const r = rng(seed); return Array.from({ length: n }, () => { let x = 0; const ys = [0]; for (let t = 1; t <= T; t++) { x += drift * 0.02 + sigma * 0.1 * gauss(r); ys.push(x); } return ys; }); });
  const Y = (v: number) => geo ? 200 - Math.exp(v * 0.35) * 70 : 110 - v * 18;
</script>

<svg viewBox="0 0 640 220">
  {#each walks as w, i (i)}<polyline points={w.map((y, t) => `${20 + t * 2.6},${Y(y)}`).join(" ")} fill="none" stroke="var(--accent)" stroke-width="1" opacity="0.35" />{/each}
  {#if !geo}
    <path d={Array.from({ length: T + 1 }, (_, t) => (t ? "L" : "M") + (20 + t * 2.6) + " " + Y(drift * 0.02 * t + sigma * 0.1 * Math.sqrt(t) * 2)).join("")} fill="none" stroke="var(--coral)" stroke-width="2.5" />
    <path d={Array.from({ length: T + 1 }, (_, t) => (t ? "L" : "M") + (20 + t * 2.6) + " " + Y(drift * 0.02 * t - sigma * 0.1 * Math.sqrt(t) * 2)).join("")} fill="none" stroke="var(--coral)" stroke-width="2.5" />
    <text x="545" y={Y(sigma * 0.1 * Math.sqrt(T) * 2) - 6} font-size="11" fill="var(--coral)" style="fill:var(--coral)">±2σ√t</text>
  {/if}
</svg>
<div class="ctl">
  <Range label="volatility σ" min={0.2} max={3} step={0.1} bind:value={sigma} fmt={(v) => v.toFixed(1)} />
  <Range label="drift μ" min={-2} max={2} step={0.1} bind:value={drift} fmt={(v) => v.toFixed(1)} />
  <Range label="paths" min={1} max={120} bind:value={n} />
  <div class="row" style="margin:0"><button class="btn sm" onclick={() => seed++}>new randomness</button></div>
</div>
<p class="faint small">{geo ? "Geometric Brownian motion: log-price does a random walk. Prices can't go negative, the spread fans out, and a few paths run away (skew)." : "The spread grows like √t, not t: diffusion. Double the time and the typical distance grows only 1.41×. That's why annual vol ≈ daily vol × √252."}</p>
