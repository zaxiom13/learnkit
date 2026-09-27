<script lang="ts">
  import Range from "./Range.svelte";
  import { loop } from "../../lib/viz";
  // 2-D Ising model with Metropolis updates on a canvas. Tc ≈ 2.269 J/k.
  const N = 80;
  let T = $state(2.27);
  let h = $state(0);
  let canvas: HTMLCanvasElement;
  const s = new Int8Array(N * N).map(() => (Math.random() < 0.5 ? 1 : -1));
  let M = $state(0);
  function step() {
    if (!canvas) return;
    for (let k = 0; k < N * N; k++) {
      const i = (Math.random() * N) | 0, j = (Math.random() * N) | 0;
      const nb = s[((i + 1) % N) * N + j] + s[((i - 1 + N) % N) * N + j] + s[i * N + ((j + 1) % N)] + s[i * N + ((j - 1 + N) % N)];
      const dE = 2 * s[i * N + j] * (nb + h);
      if (dE <= 0 || Math.random() < Math.exp(-dE / T)) s[i * N + j] *= -1;
    }
    const ctx = canvas.getContext("2d")!;
    const img = ctx.createImageData(N, N);
    let m = 0;
    for (let k = 0; k < N * N; k++) { m += s[k]; const up = s[k] > 0; img.data[k * 4] = up ? 63 : 242; img.data[k * 4 + 1] = up ? 76 : 89; img.data[k * 4 + 2] = up ? 245 : 75; img.data[k * 4 + 3] = 255; }
    ctx.putImageData(img, 0, 0);
    M = m / (N * N);
  }
  const phase = $derived(T < 2.1 ? "ordered — big magnetised domains" : T < 2.45 ? "critical — domains of every size (scale invariance)" : "disordered — random, no net magnetism");
</script>

<canvas bind:this={canvas} width={N} height={N} use:loop={step}></canvas>
<div class="row"><span class="stat">T = {T.toFixed(2)} (T꜀ ≈ 2.27)</span><span class="stat">magnetisation {M.toFixed(2)}</span></div>
<div class="readout">{phase}</div>
<div class="ctl">
  <Range label="temperature" min={0.5} max={5} step={0.01} bind:value={T} fmt={(v) => v.toFixed(2)} />
  <Range label="external field h" min={-1} max={1} step={0.05} bind:value={h} fmt={(v) => v.toFixed(2)} />
</div>
<p class="faint small">Each pixel is a spin that wants to agree with its neighbours; temperature jiggles them (Metropolis: accept with probability e^(−ΔE/T)). The same maths gives Hopfield networks, Boltzmann machines and simulated annealing.</p>

<style>
  canvas {
    width: 100%;
    max-width: 360px;
    aspect-ratio: 1;
    image-rendering: pixelated;
    border-radius: 12px;
    display: block;
    margin: 0 auto;
  }
</style>
