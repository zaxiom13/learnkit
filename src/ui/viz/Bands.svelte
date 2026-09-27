<script lang="ts">
  import Range from "./Range.svelte";
  import { loop, rng } from "../../lib/viz";
  // Electrons (dots) fill bands up to the Fermi level; temperature kicks some across the gap.
  let gap = $state(1.1);
  let T = $state(300);
  let kind = $state<"metal" | "semiconductor" | "insulator">("semiconductor");
  const g = $derived(kind === "metal" ? 0 : kind === "insulator" ? 5 : gap);
  const kT = $derived(8.617e-5 * T);
  const excited = $derived(g === 0 ? 1 : Math.exp(-g / (2 * kT)));
  let jiggle = $state(0);
  function step(dt: number) { jiggle += dt; }
  const r = rng(9);
  const dots = Array.from({ length: 80 }, () => [r(), r()]);
  const nUp = $derived(g === 0 ? 20 : Math.min(20, Math.round(excited * 4e9)));
</script>

<svg viewBox="0 0 640 220" use:loop={step}>
  <rect x="120" y="20" width="400" height="60" rx="8" fill="color-mix(in srgb, var(--accent) 12%, transparent)" stroke="var(--accent)" />
  <text x="530" y="55" font-size="12">conduction band</text>
  <rect x="120" y={g === 0 ? 70 : 140} width="400" height="60" rx="8" fill="color-mix(in srgb, var(--good) 14%, transparent)" stroke="var(--good)" />
  <text x="530" y={g === 0 ? 105 : 175} font-size="12">valence band</text>
  {#if g > 0}<text x="320" y="116" text-anchor="middle" font-size="13" fill="var(--warn)" style="fill:var(--warn)">gap = {g.toFixed(2)} eV</text>{/if}
  {#each dots.slice(0, 60) as [a, b], i (i)}
    {@const up = i < nUp}
    <circle cx={130 + a * 380 + Math.sin(jiggle * 3 + i) * (up ? 5 : 1.5)} cy={up ? 30 + b * 40 : (g === 0 ? 80 : 150) + b * 40} r="4" fill={up ? "var(--coral)" : "var(--text-2)"} style="transition: cy 500ms" />
  {/each}
</svg>
<div class="row">
  {#each ["metal", "semiconductor", "insulator"] as k (k)}<button class="btn sm" class:primary={kind === k} onclick={() => (kind = k as typeof kind)}>{k}</button>{/each}
  <span class="stat">carriers ∝ e^(−Eg/2kT) = {g === 0 ? "lots" : excited.toExponential(1)}</span>
</div>
<div class="ctl">
  <Range label="temperature (K)" min={10} max={1200} step={10} bind:value={T} />
  {#if kind === "semiconductor"}<Range label="band gap (eV)" min={0.2} max={2} step={0.05} bind:value={gap} fmt={(v) => v.toFixed(2)} />{/if}
</div>
<p class="faint small">Red dots are electrons free to carry current. Heat a semiconductor and more of them jump the gap, so it conducts better. Silicon's gap is about 1.1 eV. Doping adds carriers deliberately, and that's how transistors are made.</p>
