<script lang="ts">
  import Range from "./Range.svelte";
  import { loop, gauss, rng } from "../../lib/viz";
  // A 2-D loss landscape with two minima; drop a ball and descend with SGD.
  let lr = $state(0.06);
  let noise = $state(0.3);
  let ball = $state<[number, number]>([-1.6, 1.4]);
  let trail = $state<[number, number][]>([]);
  let running = $state(false);
  const r = rng(3);
  const f = (x: number, y: number) => 0.3 * (x * x - 1) ** 2 * 1.5 + 0.8 * y * y + 0.25 * x;
  const g = (x: number, y: number): [number, number] => [0.3 * 1.5 * 4 * x * (x * x - 1) + 0.25, 1.6 * y];
  function step() {
    if (!running) return;
    const [dx, dy] = g(...ball);
    ball = [ball[0] - lr * dx + noise * 0.05 * gauss(r), ball[1] - lr * dy + noise * 0.05 * gauss(r)];
    trail = [...trail.slice(-150), ball];
  }
  const sx = (x: number) => 320 + x * 130, sy = (y: number) => 110 + y * 60;
  const cells: { x: number; y: number; v: number }[] = [];
  for (let i = 0; i < 64; i++) for (let j = 0; j < 22; j++) { const x = -2.4 + i * 0.075, y = -1.8 + j * 0.17; cells.push({ x, y, v: f(x, y) }); }
  function drop(e: MouseEvent) {
    const s = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
    const px = ((e.clientX - s.left) / s.width) * 640, py = ((e.clientY - s.top) / s.height) * 230;
    ball = [(px - 320) / 130, (py - 110) / 60]; trail = []; running = true;
  }
</script>

<svg viewBox="0 0 640 230" use:loop={step} onclick={drop} role="img" style="cursor:crosshair">
  {#each cells as c, i (i)}<rect x={sx(c.x)} y={sy(c.y)} width="10" height="10.5" fill="var(--accent)" opacity={Math.max(0.03, 0.9 - Math.min(1, c.v / 3))} />{/each}
  <path d={trail.map((p, i) => (i ? "L" : "M") + sx(p[0]) + " " + sy(p[1])).join("")} fill="none" stroke="var(--coral)" stroke-width="2" />
  <circle cx={sx(ball[0])} cy={sy(ball[1])} r="7" fill="var(--coral)" stroke="#fff" stroke-width="2" />
  <text x="10" y="222" font-size="10" opacity="0.7">darker = lower loss · click anywhere to drop the ball</text>
</svg>
<div class="row"><span class="stat">loss {f(...ball).toFixed(3)}</span><button class="btn sm" onclick={() => (running = !running)}>{running ? "pause" : "▶ descend"}</button></div>
<div class="ctl">
  <Range label="learning rate" min={0.005} max={0.6} step={0.005} bind:value={lr} fmt={(v) => v.toFixed(3)} />
  <Range label="SGD noise" min={0} max={3} step={0.1} bind:value={noise} fmt={(v) => v.toFixed(1)} />
</div>
<p class="faint small">A learning rate that's too high makes it explode or oscillate. Too low and it crawls. Noise can kick it out of the shallow left basin into the deeper right one.</p>
