<script lang="ts">
  import { loop } from "../../lib/viz";
  let canvas: HTMLCanvasElement;
  let n = $state(0), inside = $state(0), running = $state(true);
  let hist = $state<[number, number][]>([]);
  function step() {
    if (!canvas || !running || n > 200000) return;
    const ctx = canvas.getContext("2d")!;
    const batch = Math.max(5, Math.floor(n / 40));
    for (let i = 0; i < batch; i++) {
      const x = Math.random(), y = Math.random();
      const hit = x * x + y * y <= 1;
      if (hit) inside++;
      n++;
      ctx.fillStyle = hit ? "#3f4cf5" : "#f2594b";
      ctx.fillRect(x * 240, 240 - y * 240, 1.4, 1.4);
    }
    hist = [...hist, [Math.log10(n), Math.abs((4 * inside) / n - Math.PI)]];
  }
  function reset() { n = 0; inside = 0; hist = []; canvas.getContext("2d")!.clearRect(0, 0, 240, 240); running = true; }
  const est = $derived(n ? (4 * inside) / n : 0);
</script>

<div class="wrap" use:loop={step}>
  <canvas bind:this={canvas} width="240" height="240"></canvas>
  <svg viewBox="0 0 300 240">
    <text x="0" y="14" font-size="12">error |π̂ − π| vs samples (log–log)</text>
    <line x1="30" y1="220" x2="300" y2="220" stroke="var(--line-strong)" /><line x1="30" y1="20" x2="30" y2="220" stroke="var(--line-strong)" />
    <polyline points={hist.filter((_, i) => i % 2 === 0).map(([lx, e]) => `${30 + lx * 50},${220 - Math.max(0, (Math.log10(Math.max(e, 1e-5)) + 5)) * 45}`).join(" ")} fill="none" stroke="var(--accent)" stroke-width="1.2" />
    <line x1="30" y1={220 - 5 * 45 + 0 * 22.5} x2="300" y2={220 - 5 * 45 + 5.4 * 22.5} stroke="var(--coral)" stroke-dasharray="4 4" />
    <text x="200" y="120" font-size="11" fill="var(--coral)" style="fill:var(--coral)">slope −½ : 1/√N</text>
  </svg>
</div>
<div class="row"><span class="stat">N = {n.toLocaleString()}</span><span class="stat">π ≈ {est.toFixed(5)}</span><span class="stat">error {Math.abs(est - Math.PI).toExponential(1)}</span><button class="btn sm" onclick={() => (running = !running)}>{running ? "pause" : "resume"}</button><button class="btn sm" onclick={reset}>restart</button></div>
<p class="faint small">Throw random darts at a square. The fraction landing inside the quarter-circle → π/4. The error shrinks like 1/√N in any number of dimensions, which is why Monte Carlo prices exotic options and integrates path integrals.</p>

<style>
  .wrap {
    display: grid;
    grid-template-columns: minmax(0, 240px) 1fr;
    gap: 12px;
    align-items: center;
  }
  canvas {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 8px;
    background: var(--surface-2);
  }
</style>
