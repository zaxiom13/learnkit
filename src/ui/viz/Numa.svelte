<script lang="ts">
  import { loop } from "../../lib/viz";
  // Two sockets; drag the thread/memory onto nodes and watch access latency.
  let cpu = $state(0), mem = $state(0), nic = $state(0);
  const local = $derived(cpu === mem);
  const lat = $derived((local ? 80 : 135) + (cpu === nic ? 0 : 60));
  let phase = $state(0);
  function step(dt: number) { phase = (phase + dt * (200 / lat)) % 1; }
  const X = [170, 470];
  const along = (a: number, b: number, p: number) => a + (b - a) * p;
  const cx = $derived(X[cpu] - 60), mx = $derived(X[mem] + 60);
</script>

<svg viewBox="0 0 640 210" use:loop={step}>
  {#each [0, 1] as s (s)}
    <rect x={X[s] - 130} y="20" width="260" height="170" rx="16" fill="var(--surface-2)" stroke="var(--line-strong)" />
    <text x={X[s]} y="40" text-anchor="middle" font-size="12" opacity="0.7">NUMA node {s}</text>
    <rect x={X[s] - 110} y="55" width="100" height="60" rx="10" fill={cpu === s ? "var(--accent)" : "var(--surface-3)"} style="transition: fill 300ms" />
    <text x={X[s] - 60} y="90" text-anchor="middle" font-size="12" style="fill:{cpu === s ? '#fff' : 'var(--text)'}">CPU {s}{cpu === s ? " 🧵" : ""}</text>
    <rect x={X[s] + 10} y="55" width="100" height="60" rx="10" fill={mem === s ? "var(--good)" : "var(--surface-3)"} style="transition: fill 300ms" />
    <text x={X[s] + 60} y="90" text-anchor="middle" font-size="12" style="fill:{mem === s ? '#fff' : 'var(--text)'}">RAM{mem === s ? " 📦" : ""}</text>
    <rect x={X[s] - 50} y="135" width="100" height="36" rx="8" fill={nic === s ? "var(--coral)" : "var(--surface-3)"} style="transition: fill 300ms" />
    <text x={X[s]} y="158" text-anchor="middle" font-size="12" style="fill:{nic === s ? '#fff' : 'var(--text)'}">NIC{nic === s ? " 📡" : ""}</text>
  {/each}
  <line x1="300" x2="340" y1="85" y2="85" stroke="var(--warn)" stroke-width="6" />
  <text x="320" y="75" text-anchor="middle" font-size="9" opacity="0.7">interconnect</text>
  <circle cx={along(cx, mx, phase)} cy={85 + Math.sin(phase * Math.PI) * -25} r="6" fill="var(--warn)" />
</svg>
<div class="row">
  <button class="btn sm" onclick={() => (cpu = 1 - cpu)}>move thread</button>
  <button class="btn sm" onclick={() => (mem = 1 - mem)}>move memory</button>
  <button class="btn sm" onclick={() => (nic = 1 - nic)}>move NIC</button>
  <span class="stat" style="color:{lat < 100 ? 'var(--good)' : 'var(--bad)'}">≈{lat} ns per miss{lat < 100 ? " ✓ all local" : ""}</span>
</div>
