<script lang="ts">
  import Range from "./Range.svelte";
  import { path } from "../../lib/viz";
  // Correlation E(θ) for a singlet: −cos θ (quantum) vs the best local hidden-variable "sawtooth".
  let a = $state(0), a2 = $state(90), b = $state(45), b2 = $state(135);
  const Eq = (d: number) => -Math.cos((d * Math.PI) / 180);
  const Ec = (d: number) => { const x = ((Math.abs(d) % 360) + 360) % 360; const y = x > 180 ? 360 - x : x; return -1 + (2 * y) / 180; };
  const S = $derived(Math.abs(Eq(a - b) - Eq(a - b2) + Eq(a2 - b) + Eq(a2 - b2)));
  const Sc = $derived(Math.abs(Ec(a - b) - Ec(a - b2) + Ec(a2 - b) + Ec(a2 - b2)));
  const X = (d: number) => 30 + (d / 180) * 360, Y = (e: number) => 90 - e * 70;
  const qc = path(Array.from({ length: 91 }, (_, i) => [X(i * 2), Y(Eq(i * 2))] as [number, number]));
  const cc = path(Array.from({ length: 91 }, (_, i) => [X(i * 2), Y(Ec(i * 2))] as [number, number]));
</script>

<svg viewBox="0 0 640 185">
  <line x1="30" x2="390" y1="90" y2="90" stroke="var(--line-strong)" />
  <path d={cc} fill="none" stroke="var(--warn)" stroke-width="2.5" stroke-dasharray="6 4" />
  <path d={qc} fill="none" stroke="var(--accent)" stroke-width="3" />
  <text x="30" y="178" font-size="10" opacity="0.7">0°</text><text x="390" y="178" font-size="10" text-anchor="end" opacity="0.7">180° (angle between detectors)</text>
  <text x="40" y="14" font-size="11" fill="var(--accent)" style="fill:var(--accent)">quantum: −cos θ</text>
  <text x="170" y="14" font-size="11" fill="var(--warn)" style="fill:var(--warn)">local hidden variables (best case)</text>
  <g transform="translate(520 95)">
    <rect x="-100" y="-80" width="200" height="160" rx="14" fill="var(--surface-2)" />
    <text y="-52" text-anchor="middle" font-size="12">CHSH value S</text>
    <text y="-10" text-anchor="middle" font-size="30" font-weight="700" fill={S > 2 ? "var(--coral)" : "var(--text)"} style="fill:{S > 2 ? 'var(--coral)' : 'var(--text)'}">{S.toFixed(3)}</text>
    <text y="16" text-anchor="middle" font-size="11">classical model: {Sc.toFixed(3)}</text>
    <text y="40" text-anchor="middle" font-size="11" opacity="0.8">local realism requires S ≤ 2</text>
    <text y="60" text-anchor="middle" font-size="11" opacity="0.8">quantum max 2√2 ≈ 2.828</text>
  </g>
</svg>
<div class="ctl">
  <Range label="Alice a" min={0} max={180} bind:value={a} fmt={(v) => v + "°"} />
  <Range label="Alice a′" min={0} max={180} bind:value={a2} fmt={(v) => v + "°"} />
  <Range label="Bob b" min={0} max={180} bind:value={b} fmt={(v) => v + "°"} />
  <Range label="Bob b′" min={0} max={180} bind:value={b2} fmt={(v) => v + "°"} />
</div>
<p class="faint small">Try a=0°, a′=90°, b=45°, b′=135°: quantum mechanics gives S = 2√2, beyond anything a local hidden-variable theory can reach. Experiments agree with quantum mechanics.</p>
