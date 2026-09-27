<script lang="ts">
  import Range from "./Range.svelte";
  import { loop } from "../../lib/viz";
  // Twin clocks: one at rest, one moving at v. Proper time runs slower by 1/γ.
  let v = $state(0.8);
  const gamma = $derived(1 / Math.sqrt(1 - v * v));
  let t0 = $state(0), t1 = $state(0), x = $state(0);
  function step(dt: number) { t0 += dt; t1 += dt / gamma; x = (x + dt * v * 120) % 440; }
  const hand = (t: number, r: number) => [Math.sin(t * 1.2) * r, -Math.cos(t * 1.2) * r];
</script>

<svg viewBox="0 0 640 170" use:loop={step}>
  <g transform="translate(90 85)">
    <circle r="50" fill="var(--surface-2)" stroke="var(--line-strong)" stroke-width="2" />
    <line x2={hand(t0, 42)[0]} y2={hand(t0, 42)[1]} stroke="var(--text)" stroke-width="3" stroke-linecap="round" />
    <text y="72" text-anchor="middle" font-size="12">at rest · {t0.toFixed(1)} s</text>
  </g>
  <g transform="translate({180 + x} 85)">
    <circle r="50" fill="color-mix(in srgb, var(--accent) 15%, var(--surface))" stroke="var(--accent)" stroke-width="2" />
    <line x2={hand(t1, 42)[0]} y2={hand(t1, 42)[1]} stroke="var(--accent)" stroke-width="3" stroke-linecap="round" />
    <text y="72" text-anchor="middle" font-size="12" fill="var(--accent)" style="fill:var(--accent)">moving · {t1.toFixed(1)} s →</text>
  </g>
</svg>
<div class="row"><span class="stat">γ = {gamma.toFixed(3)}</span><span class="stat">moving clock ticks at {(100 / gamma).toFixed(1)}% speed</span><button class="btn sm" onclick={() => { t0 = 0; t1 = 0; }}>reset clocks</button></div>
<div class="ctl"><Range label="speed v/c" min={0} max={0.995} step={0.005} bind:value={v} fmt={(x) => x.toFixed(3)} /></div>
<p class="faint small">GPS satellites move at about v/c ≈ 0.000013. That's tiny, but at nanosecond precision it's about −7 µs/day from speed and +45 µs/day from weaker gravity.</p>
