<script lang="ts">
  import Range from "./Range.svelte";
  import { rng, gauss } from "../../lib/viz";
  // Free particle from A to B. Each path contributes a phase e^{iS/ħ}; near-classical paths add up, the rest cancel.
  let hbar = $state(1.5);
  const P = 60, K = 24;
  const paths = (() => {
    const r = rng(5);
    const out: number[][] = [];
    for (let p = 0; p < P; p++) {
      const amp = (p / P) * 1.4;
      const ys = Array.from({ length: K + 1 }, (_, k) => (k === 0 || k === K ? 0 : 0));
      for (let m = 1; m <= 3; m++) { const c = gauss(r) * amp / m; for (let k = 0; k <= K; k++) ys[k] += c * Math.sin((m * Math.PI * k) / K); }
      out.push(ys);
    }
    return out;
  })();
  const action = (ys: number[]) => { let s = 0; for (let k = 0; k < K; k++) s += ((ys[k + 1] - ys[k]) * K) ** 2 / K; return s / 2; };
  const S = paths.map(action);
  const phases = $derived(S.map((s) => s / hbar));
  const sum = $derived(phases.reduce((a, ph) => [a[0] + Math.cos(ph), a[1] + Math.sin(ph)], [0, 0]));
  const hue = (ph: number) => ((ph % (2 * Math.PI)) / (2 * Math.PI)) * 360;
  const X = (k: number) => 30 + (k / K) * 340, Y = (y: number) => 110 - y * 55;
  // running phasor chain
  const chain = $derived.by(() => { const pts: [number, number][] = [[0, 0]]; let x = 0, y = 0; phases.forEach((ph) => { x += Math.cos(ph); y += Math.sin(ph); pts.push([x, y]); }); return pts; });
  const sc = $derived(Math.min(4, 90 / Math.max(10, ...chain.map(([x, y]) => Math.hypot(x, y)))));
</script>

<svg viewBox="0 0 640 220">
  {#each paths as ys, p (p)}
    <path d={ys.map((y, k) => (k ? "L" : "M") + X(k) + " " + Y(y)).join("")} fill="none" stroke="hsl({hue(phases[p])} 75% 55%)" stroke-width={p < 4 ? 2.5 : 1} opacity={p < 4 ? 1 : 0.45} />
  {/each}
  <circle cx={X(0)} cy={Y(0)} r="6" fill="var(--text)" /><text x={X(0)} y={Y(0) + 22} text-anchor="middle" font-size="12">A</text>
  <circle cx={X(K)} cy={Y(0)} r="6" fill="var(--text)" /><text x={X(K)} y={Y(0) + 22} text-anchor="middle" font-size="12">B</text>
  <text x="200" y="212" text-anchor="middle" font-size="11" opacity="0.7">paths coloured by phase S/ħ</text>
  <g transform="translate(510 110)">
    <circle r="95" fill="var(--surface-2)" />
    <path d={chain.map(([x, y], i) => (i ? "L" : "M") + (x * sc).toFixed(1) + " " + (-y * sc).toFixed(1)).join("")} fill="none" stroke="var(--accent)" stroke-width="1.6" />
    <line x1="0" y1="0" x2={sum[0] * sc} y2={-sum[1] * sc} stroke="var(--coral)" stroke-width="3" />
    <text y="112" text-anchor="middle" font-size="11" opacity="0.7">adding the arrows e^(iS/ħ)</text>
  </g>
</svg>
<div class="ctl"><Range label="ħ (bigger = more quantum)" min={0.02} max={4} step={0.02} bind:value={hbar} fmt={(v) => v.toFixed(2)} /></div>
<p class="faint small">Straight-ish paths (near the classical one, where δS = 0) have nearly the same colour and their arrows line up. Wild paths spin through every colour and their arrows curl up and cancel. Shrink ħ: only the classical path survives.</p>
