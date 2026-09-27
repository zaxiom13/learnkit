<script lang="ts">
  import Toggle from "./Toggle.svelte";
  import { gauss, rng } from "../../lib/viz";
  // Simulated latency distribution; each tuning removes a source of jitter.
  let pin = $state(false), isol = $state(false), nohz = $state(false), irq = $state(false), spin = $state(false), cstate = $state(false), bypass = $state(false);
  const samples = $derived.by(() => {
    const r = rng(7);
    const base = bypass ? 1.2 : spin ? 4 : 9;
    const out: number[] = [];
    for (let i = 0; i < 4000; i++) {
      let v = base + Math.abs(gauss(r)) * (bypass ? 0.3 : 1.2);
      if (!spin && r() < 0.25) v += cstate ? 2 : 12 + r() * 20; // wake-up from sleep/C-state
      if (!pin && r() < 0.05) v += 15 + r() * 40; // migration, cold cache
      if (!isol && r() < 0.03) v += 30 + r() * 120; // another task scheduled on our core
      if (!nohz && r() < 0.02) v += 5 + r() * 15; // timer tick
      if (!irq && r() < 0.015) v += 10 + r() * 60; // interrupt landed on our core
      out.push(v);
    }
    return out.sort((a, b) => a - b);
  });
  const q = (p: number) => samples[Math.floor(p * (samples.length - 1))];
  const bins = $derived.by(() => {
    const B = 60, max = 200;
    const h = new Array(B).fill(0);
    for (const v of samples) h[Math.min(B - 1, Math.floor((Math.log10(v) / Math.log10(max)) * B))]++;
    return h.map((c) => Math.log10(1 + c));
  });
  const hmax = $derived(Math.max(...bins));
  const xOf = (v: number) => 20 + (Math.log10(v) / Math.log10(200)) * 600;
</script>

<svg viewBox="0 0 640 170">
  {#each bins as b, i (i)}
    <rect x={20 + i * 10} y={140 - (b / hmax) * 120} width="8.5" height={(b / hmax) * 120} rx="2" fill="var(--accent)" opacity="0.8" style="transition: all 400ms var(--ease)" />
  {/each}
  {#each [[0.5, "p50", "var(--good)"], [0.99, "p99", "var(--warn)"], [0.999, "p99.9", "var(--bad)"]] as [p, l, c] (l)}
    <line x1={xOf(q(p as number))} x2={xOf(q(p as number))} y1="14" y2="140" stroke={c as string} stroke-width="2" stroke-dasharray="4 3" style="transition: all 400ms var(--ease)" />
    <text x={xOf(q(p as number)) + 4} y={p === 0.5 ? 24 : p === 0.99 ? 38 : 52} font-size="11" fill={c as string} style="transition: all 400ms var(--ease)">{l}</text>
  {/each}
  {#each [1, 10, 100] as t (t)}<text x={xOf(t)} y="158" font-size="10" text-anchor="middle" opacity="0.6">{t} µs</text>{/each}
</svg>
<div class="row">
  <span class="stat" style="color:var(--good)">p50 {q(0.5).toFixed(1)} µs</span>
  <span class="stat" style="color:var(--warn)">p99 {q(0.99).toFixed(1)} µs</span>
  <span class="stat" style="color:var(--bad)">p99.9 {q(0.999).toFixed(1)} µs</span>
</div>
<div class="row">
  <Toggle label="pin thread" bind:checked={pin} />
  <Toggle label="isolcpus" bind:checked={isol} />
  <Toggle label="nohz_full" bind:checked={nohz} />
  <Toggle label="IRQ affinity" bind:checked={irq} />
  <Toggle label="no deep C-states" bind:checked={cstate} />
  <Toggle label="busy-poll" bind:checked={spin} />
  <Toggle label="kernel bypass" bind:checked={bypass} />
</div>
<p class="faint small">Simulated data. Each toggle removes one source of stalls. Notice the average barely moves while the tail collapses.</p>
