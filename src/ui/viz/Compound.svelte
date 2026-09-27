<script lang="ts">
  import Range from "./Range.svelte";
  import { path } from "../../lib/viz";
  let rate = $state(7), years = $state(40), vol = $state(15);
  const lin = $derived(path(Array.from({ length: years + 1 }, (_, t) => [20 + (t / years) * 600, 200 - (1 + (rate / 100) * t) * 180 / (1 + rate / 100) ** years] as [number, number])));
  const exp = $derived(path(Array.from({ length: years + 1 }, (_, t) => [20 + (t / years) * 600, 200 - (1 + rate / 100) ** t * 180 / (1 + rate / 100) ** years] as [number, number])));
  const med = $derived(Math.exp((Math.log(1 + rate / 100) - (vol / 100) ** 2 / 2) * years));
</script>

<svg viewBox="0 0 640 210">
  <path d={lin} fill="none" stroke="var(--text-3)" stroke-width="2" stroke-dasharray="5 4" />
  <path d={exp} fill="none" stroke="var(--accent)" stroke-width="3" />
  <text x="600" y="30" text-anchor="end" font-size="12" fill="var(--accent)" style="fill:var(--accent)">compound ×{((1 + rate / 100) ** years).toFixed(1)}</text>
  <text x="600" y="200 " text-anchor="end" font-size="12" opacity="0.7">simple ×{(1 + (rate / 100) * years).toFixed(1)}</text>
</svg>
<div class="row"><span class="stat">rule of 72: doubles every ≈{(72 / rate).toFixed(1)} years</span><span class="stat">with {vol}% volatility, median outcome ×{med.toFixed(1)}</span></div>
<div class="ctl">
  <Range label="return %/yr" min={1} max={15} step={0.5} bind:value={rate} />
  <Range label="years" min={5} max={60} bind:value={years} />
  <Range label="volatility %" min={0} max={40} bind:value={vol} />
</div>
<p class="faint small">Volatility drag: with random returns the typical (median) investor earns about r − σ²/2, not r. That's Itô's correction showing up in your super fund.</p>
