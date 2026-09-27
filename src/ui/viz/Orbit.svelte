<script lang="ts">
  import Range from "./Range.svelte";
  import { loop } from "../../lib/viz";
  // Velocity-Verlet (symplectic) vs explicit Euler for a Kepler orbit.
  let dtS = $state(0.02);
  let A = $state({ x: 1, y: 0, vx: 0, vy: 1.1 }), B = $state({ x: 1, y: 0, vx: 0, vy: 1.1 });
  let ta = $state<[number, number][]>([]), tb = $state<[number, number][]>([]);
  const acc = (x: number, y: number) => { const r3 = Math.hypot(x, y) ** 3; return [-x / r3, -y / r3]; };
  const E = (s: { x: number; y: number; vx: number; vy: number }) => 0.5 * (s.vx ** 2 + s.vy ** 2) - 1 / Math.hypot(s.x, s.y);
  const E0 = E(A);
  function step() {
    for (let k = 0; k < 3; k++) {
      const h = dtS;
      let [ax, ay] = acc(A.x, A.y);
      const x = A.x + A.vx * h + 0.5 * ax * h * h, y = A.y + A.vy * h + 0.5 * ay * h * h;
      const [bx, by] = acc(x, y);
      A = { x, y, vx: A.vx + 0.5 * (ax + bx) * h, vy: A.vy + 0.5 * (ay + by) * h };
      [ax, ay] = acc(B.x, B.y);
      B = { x: B.x + B.vx * h, y: B.y + B.vy * h, vx: B.vx + ax * h, vy: B.vy + ay * h };
    }
    ta = [...ta.slice(-400), [A.x, A.y]]; tb = [...tb.slice(-400), [B.x, B.y]];
  }
  const P = (p: [number, number], cx: number) => `${cx + p[0] * 60},${110 - p[1] * 60}`;
  function reset() { A = { x: 1, y: 0, vx: 0, vy: 1.1 }; B = { ...A }; ta = []; tb = []; }
</script>

<svg viewBox="0 0 640 230" use:loop={step}>
  {#each [[ta, 170, "Verlet (symplectic)", A, "var(--good)"], [tb, 470, "Euler", B, "var(--bad)"]] as [tr, cx, l, s, c] (l)}
    <circle cx={cx as number} cy="110" r="8" fill="var(--warn)" />
    <polyline points={(tr as [number, number][]).map((p) => P(p, cx as number)).join(" ")} fill="none" stroke={c as string} stroke-width="1.5" opacity="0.8" />
    <text x={cx as number} y="222" text-anchor="middle" font-size="12">{l} · energy drift {(((E(s as typeof A) - E0) / Math.abs(E0)) * 100).toFixed(1)}%</text>
  {/each}
</svg>
<div class="ctl"><Range label="time step" min={0.005} max={0.08} step={0.005} bind:value={dtS} fmt={(v) => v.toFixed(3)} /></div>
<div class="row"><button class="btn sm" onclick={reset}>reset</button></div>
<p class="faint small">Same physics, same step size. Euler steadily pumps in energy and the planet spirals out. Verlet respects the Hamiltonian structure, so its energy error stays bounded forever.</p>
