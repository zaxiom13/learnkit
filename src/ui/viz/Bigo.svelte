<script lang="ts">
  import Range from "./Range.svelte";
  import { path } from "../../lib/viz";
  let n = $state(30);
  const fns: [string, (x: number) => number, string][] = [
    ["1", () => 1, "var(--good)"], ["log n", (x) => Math.log2(x), "#1c8f7a"], ["n", (x) => x, "var(--accent)"],
    ["n log n", (x) => x * Math.log2(x), "#7b43c9"], ["n²", (x) => x * x, "var(--warn)"], ["2ⁿ", (x) => 2 ** x, "var(--bad)"],
  ];
  const Y = 600;
  const curve = (f: (x: number) => number) => { const pts: [number, number][] = []; for (let x = 1; x <= n; x += n / 120) pts.push([30 + ((x - 1) / (n - 1)) * 590, 200 - Math.min(1, f(x) / Y) * 185]); return path(pts); };
  const fmt = (v: number) => v > 1e12 ? v.toExponential(1) : Math.round(v).toLocaleString();
</script>

<svg viewBox="0 0 640 215">
  <line x1="30" x2="620" y1="200" y2="200" stroke="var(--line-strong)" /><line x1="30" x2="30" y1="10" y2="200" stroke="var(--line-strong)" />
  {#each fns as [l, f, c] (l)}
    <path d={curve(f)} fill="none" stroke={c} stroke-width="3" stroke-linecap="round" />
  {/each}
  <text x="620" y="212" text-anchor="end" font-size="10" opacity="0.6">n = {n}</text>
</svg>
<div class="grid">
  {#each fns as [l, f, c] (l)}<span class="stat" style="color:{c}">{l} → {fmt(f(n))} steps</span>{/each}
</div>
<div class="ctl"><Range label="input size n" min={2} max={60} bind:value={n} /></div>
<p class="faint small">The y-axis is capped at {Y} steps. Slide n up and watch n² and 2ⁿ leave the chart while log n barely moves.</p>

<style>
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }
</style>
