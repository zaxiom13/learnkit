<script lang="ts">
  import Range from "./Range.svelte";
  import { loop } from "../../lib/viz";
  // Lotka–Volterra predator–prey cycles.
  let a = $state(1.1), b = $state(0.4), c = $state(0.4), d = $state(0.1);
  let x = 10, y = 5, hist = $state<[number, number][]>([]);
  function step(dt: number) {
    for (let k = 0; k < 10; k++) { const h = dt * 0.4; const dx = a * x - b * x * y, dy = d * x * y - c * y; x = Math.max(0.01, x + dx * h); y = Math.max(0.01, y + dy * h); }
    hist = [...hist.slice(-300), [x, y]];
  }
</script>

<svg viewBox="0 0 640 190" use:loop={step}>
  <polyline points={hist.map(([p], i) => `${i * 1.4},${170 - Math.min(160, p * 4)}`).join(" ")} fill="none" stroke="var(--good)" stroke-width="2.5" />
  <polyline points={hist.map(([, q], i) => `${i * 1.4},${170 - Math.min(160, q * 4)}`).join(" ")} fill="none" stroke="var(--bad)" stroke-width="2.5" />
  <text x="10" y="16" font-size="12" fill="var(--good)" style="fill:var(--good)">🐇 prey</text><text x="80" y="16" font-size="12" fill="var(--bad)" style="fill:var(--bad)">🦊 predators</text>
  <g transform="translate(470 10)">
    <rect width="160" height="160" rx="10" fill="var(--surface-2)" />
    <polyline points={hist.map(([p, q]) => `${Math.min(155, p * 4)},${160 - Math.min(155, q * 6)}`).join(" ")} fill="none" stroke="var(--accent)" stroke-width="1.5" />
    <text x="80" y="176" text-anchor="middle" font-size="10" opacity="0.7">phase space: a closed loop</text>
  </g>
</svg>
<div class="ctl">
  <Range label="prey birth" min={0.2} max={2} step={0.05} bind:value={a} fmt={(v) => v.toFixed(2)} />
  <Range label="predation" min={0.1} max={1} step={0.05} bind:value={b} fmt={(v) => v.toFixed(2)} />
  <Range label="predator death" min={0.1} max={1} step={0.05} bind:value={c} fmt={(v) => v.toFixed(2)} />
</div>
<div class="row"><button class="btn sm" onclick={() => { x = 10; y = 5; hist = []; }}>reset</button></div>
<p class="faint small">Prey boom → predators feast and boom → prey crash → predators starve → repeat. The predator peak lags the prey peak. Similar feedback loops show up in markets, epidemics and ecosystems.</p>
