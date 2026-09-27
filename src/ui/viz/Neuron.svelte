<script lang="ts">
  import Range from "./Range.svelte";
  import { loop } from "../../lib/viz";
  // Leaky integrate-and-fire neuron.
  let I = $state(1.3), noise = $state(0.3);
  let V = -70, trace = $state<number[]>([]), spikes = $state(0), t = 0;
  function step(dt: number) {
    for (let k = 0; k < 4; k++) {
      const h = dt * 25;
      V += h * (-(V + 70) + I * 16 + noise * 10 * (Math.random() - 0.5) * 2) / 10;
      if (V >= -54) { trace = [...trace, 30].slice(-320); V = -75; spikes++; continue; }
      trace = [...trace, V].slice(-320);
    }
    t += dt;
  }
  const rate = $derived(t > 0 ? spikes / t : 0);
</script>

<svg viewBox="0 0 640 170" use:loop={step}>
  <line x1="0" x2="640" y1={140 - (-54 + 80) * 1.2} y2={140 - (-54 + 80) * 1.2} stroke="var(--coral)" stroke-dasharray="4 4" /><text x="636" y={134 - (-54 + 80) * 1.2} text-anchor="end" font-size="10" fill="var(--coral)" style="fill:var(--coral)">threshold −54 mV</text>
  <polyline points={trace.map((v, i) => `${i * 2},${140 - (v + 80) * 1.2}`).join(" ")} fill="none" stroke="var(--accent)" stroke-width="2" />
  <text x="4" y="164" font-size="10" opacity="0.6">membrane voltage over time</text>
</svg>
<div class="row"><span class="stat">≈{rate.toFixed(1)} spikes / s (sim time)</span><button class="btn sm" onclick={() => { spikes = 0; t = 0; }}>reset count</button></div>
<div class="ctl"><Range label="input current" min={0} max={3} step={0.05} bind:value={I} fmt={(v) => v.toFixed(2)} /><Range label="noise" min={0} max={2} step={0.05} bind:value={noise} fmt={(v) => v.toFixed(2)} /></div>
<p class="faint small">The membrane charges up and leaks away. Cross the threshold and it fires an all-or-nothing spike, then resets. Below a certain current it never fires. Above it, stronger input means faster firing: information is coded in the rate and timing of spikes.</p>
