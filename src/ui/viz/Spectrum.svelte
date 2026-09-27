<script lang="ts">
  import Range from "./Range.svelte";
  import { path } from "../../lib/viz";
  // Blackbody (Planck) spectrum, with the visible band marked.
  let T = $state(5800);
  const planck = (lam: number, T: number) => { const h = 6.626e-34, c = 3e8, k = 1.381e-23; const l = lam * 1e-9; return (2 * h * c * c) / l ** 5 / (Math.exp((h * c) / (l * k * T)) - 1); };
  const peak = $derived(2.898e6 / T);
  const curve = $derived.by(() => { const pts: [number, number][] = []; const mx = planck(Math.min(3000, Math.max(100, peak)), T); for (let l = 100; l <= 3000; l += 15) pts.push([20 + ((l - 100) / 2900) * 600, 180 - (planck(l, T) / mx) * 160]); return path(pts); });
  const X = (l: number) => 20 + ((l - 100) / 2900) * 600;
  const colour = $derived(T < 2000 ? "#ff3b00" : T < 3500 ? "#ff8a3d" : T < 5000 ? "#ffd29a" : T < 7000 ? "#fff6e8" : "#bcd4ff");
</script>

<svg viewBox="0 0 640 210">
  <defs><linearGradient id="vis"><stop offset="0" stop-color="#7a00ff" /><stop offset="0.2" stop-color="#0040ff" /><stop offset="0.4" stop-color="#00c060" /><stop offset="0.6" stop-color="#ffe000" /><stop offset="0.8" stop-color="#ff7a00" /><stop offset="1" stop-color="#ff0000" /></linearGradient></defs>
  <rect x={X(380)} y="10" width={X(750) - X(380)} height="170" fill="url(#vis)" opacity="0.25" />
  <path d={curve} fill="none" stroke="var(--coral)" stroke-width="3" />
  <line x1={X(peak)} x2={X(peak)} y1="10" y2="180" stroke="var(--text-3)" stroke-dasharray="4 4" />
  <text x={Math.min(560, X(peak) + 6)} y="24" font-size="11">peak {Math.round(peak)} nm</text>
  <circle cx="590" cy="60" r="26" fill={colour} stroke="var(--line-strong)" />
  {#each [500, 1000, 2000, 3000] as l (l)}<text x={X(l)} y="198" font-size="10" text-anchor="middle" opacity="0.6">{l} nm</text>{/each}
</svg>
<div class="ctl"><Range label="temperature (K)" min={1000} max={12000} step={100} bind:value={T} /></div>
<p class="faint small">Wien's law: λ_peak = 2.898 mm·K / T. The Sun (about 5800 K) peaks in the visible, a toaster glows red, hot stars look blue. The failure of classical physics to explain this curve (the "ultraviolet catastrophe") is what started quantum mechanics in 1900.</p>
