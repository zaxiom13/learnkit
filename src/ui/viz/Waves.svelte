<script lang="ts">
  import Range from "./Range.svelte";
  import { loop } from "../../lib/viz";
  // Double-slit: two point sources interfere. Toggle "which-path detector" to kill the pattern.
  let d = $state(40), lambda = $state(16), detect = $state(false);
  let canvas: HTMLCanvasElement;
  let t = 0;
  const W = 160, H = 100;
  function step(dt: number) {
    if (!canvas) return;
    t += dt * 3;
    const ctx = canvas.getContext("2d")!;
    const img = ctx.createImageData(W, H);
    const k = (2 * Math.PI) / (lambda / 2);
    const s1 = [10, H / 2 - d / 4], s2 = [10, H / 2 + d / 4];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const r1 = Math.hypot(x - s1[0], y - s1[1]), r2 = Math.hypot(x - s2[0], y - s2[1]);
      let v: number;
      if (detect) v = (Math.cos(k * r1 - t) ** 2 + Math.cos(k * r2 - t) ** 2) / 2;
      else v = ((Math.cos(k * r1 - t) + Math.cos(k * r2 - t)) / 2) ** 2;
      const i = (y * W + x) * 4;
      img.data[i] = 63 + v * 150; img.data[i + 1] = 76 + v * 120; img.data[i + 2] = 245; img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }
  const screen = $derived.by(() => { const k = (2 * Math.PI) / (lambda / 2); const pts: string[] = []; for (let y = 0; y < H; y++) { const r1 = Math.hypot(150 - 10, y - (H / 2 - d / 4)), r2 = Math.hypot(150 - 10, y - (H / 2 + d / 4)); const I = detect ? 0.5 : Math.cos((k * (r1 - r2)) / 2) ** 2; pts.push(`${(y / H) * 100}% ${I}`); } return pts; });
</script>

<div class="wrap">
  <canvas bind:this={canvas} width={W} height={H} use:loop={step}></canvas>
  <div class="scr">{#each screen as p, i (i)}<span style="opacity:{p.split(' ')[1]}"></span>{/each}</div>
</div>
<div class="ctl">
  <Range label="slit separation" min={10} max={80} bind:value={d} />
  <Range label="wavelength" min={6} max={40} bind:value={lambda} />
  <div class="row" style="margin:0"><button class="btn sm" class:primary={detect} onclick={() => (detect = !detect)}>{detect ? "👁 which-path detector ON: fringes gone" : "Add a which-path detector"}</button></div>
</div>
<p class="faint small">Amplitudes add, then you square: bright where the waves agree, dark where they cancel. Learning which slit it went through destroys the interference (decoherence), and the screen just shows the sum of two blobs.</p>

<style>
  .wrap {
    display: flex;
    gap: 6px;
  }
  canvas {
    flex: 1;
    width: 100%;
    aspect-ratio: 1.6;
    border-radius: 10px;
    image-rendering: auto;
  }
  .scr {
    width: 22px;
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    overflow: hidden;
    background: #111;
  }
  .scr span {
    flex: 1;
    background: #ffd76a;
  }
</style>
