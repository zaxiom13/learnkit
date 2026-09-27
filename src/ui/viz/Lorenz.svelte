<script lang="ts">
  import Range from "./Range.svelte";
  import { loop } from "../../lib/viz";
  // Two Lorenz trajectories starting 1e-6 apart.
  let eps = $state(6);
  let a = $state([1, 1, 1]), b = $state([1 + 1e-6, 1, 1]);
  let ta = $state<[number, number][]>([]), tb = $state<[number, number][]>([]);
  let time = $state(0);
  const f = ([x, y, z]: number[]) => [10 * (y - x), x * (28 - z) - y, x * y - (8 / 3) * z];
  const rk = (s: number[], h: number) => { const k1 = f(s), k2 = f(s.map((v, i) => v + (h / 2) * k1[i])), k3 = f(s.map((v, i) => v + (h / 2) * k2[i])), k4 = f(s.map((v, i) => v + h * k3[i])); return s.map((v, i) => v + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])); };
  function step() { for (let k = 0; k < 4; k++) { a = rk(a, 0.005); b = rk(b, 0.005); time += 0.005; } ta = [...ta.slice(-700), [a[0], a[2]]]; tb = [...tb.slice(-700), [b[0], b[2]]]; }
  function restart() { a = [1, 1, 1]; b = [1 + 10 ** -eps, 1, 1]; ta = []; tb = []; time = 0; }
  const P = (p: [number, number]) => `${320 + p[0] * 9},${215 - p[1] * 4.2}`;
  const dist = $derived(Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]));
</script>

<svg viewBox="0 0 640 225" use:loop={step}>
  <polyline points={ta.map(P).join(" ")} fill="none" stroke="var(--accent)" stroke-width="1.3" opacity="0.8" />
  <polyline points={tb.map(P).join(" ")} fill="none" stroke="var(--coral)" stroke-width="1.3" opacity="0.8" />
  {#if ta.length}<circle cx={P(ta[ta.length - 1]).split(",")[0]} cy={P(ta[ta.length - 1]).split(",")[1]} r="5" fill="var(--accent)" />{/if}
  {#if tb.length}<circle cx={P(tb[tb.length - 1]).split(",")[0]} cy={P(tb[tb.length - 1]).split(",")[1]} r="5" fill="var(--coral)" />{/if}
</svg>
<div class="row"><span class="stat">t = {time.toFixed(1)}</span><span class="stat" style="color:{dist > 1 ? 'var(--bad)' : 'var(--good)'}">separation {dist.toExponential(1)}</span><button class="btn sm" onclick={restart}>restart</button></div>
<div class="ctl"><Range label="initial gap 10^−" min={1} max={12} bind:value={eps} /></div>
<p class="faint small">Two runs of the same deterministic equations, starting a millionth apart. They track each other, then suddenly diverge completely, yet both stay on the same butterfly-shaped attractor. A smaller initial gap only buys you a little more time, because errors grow exponentially.</p>
