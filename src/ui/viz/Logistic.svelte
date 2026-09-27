<script lang="ts">
  import Range from "./Range.svelte";
  // Bifurcation diagram of x → r x (1 − x), with a cobweb for the chosen r.
  let r = $state(3.2);
  let canvas: HTMLCanvasElement;
  $effect(() => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, 600, 260);
    ctx.fillStyle = getComputedStyle(canvas).color;
    for (let px = 0; px < 600; px++) {
      const rr = 2.5 + (px / 600) * 1.5;
      let x = 0.5;
      for (let i = 0; i < 300; i++) x = rr * x * (1 - x);
      for (let i = 0; i < 120; i++) { x = rr * x * (1 - x); ctx.fillRect(px, 250 - x * 240, 1, 1); }
    }
  });
  const orbit = $derived.by(() => { let x = 0.5; for (let i = 0; i < 400; i++) x = r * x * (1 - x); const s = new Set<string>(); for (let i = 0; i < 64; i++) { x = r * x * (1 - x); s.add(x.toFixed(3)); } return s.size; });
</script>

<div class="wrap">
  <canvas bind:this={canvas} width="600" height="260"></canvas>
  <div class="marker" style="left:{((r - 2.5) / 1.5) * 100}%"></div>
</div>
<div class="row"><span class="stat">r = {r.toFixed(3)}</span><span class="stat">{orbit >= 60 ? "chaos" : `period ${orbit}`}</span></div>
<div class="ctl"><Range label="growth rate r" min={2.5} max={4} step={0.001} bind:value={r} fmt={(v) => v.toFixed(3)} /></div>
<p class="faint small">One line of arithmetic, x → r·x·(1−x). As r grows the long-run behaviour splits 1 → 2 → 4 → 8… ever faster (ratio → Feigenbaum's δ ≈ 4.669), then goes chaotic, with windows of order (try r ≈ 3.83: period 3).</p>

<style>
  .wrap {
    position: relative;
  }
  canvas {
    width: 100%;
    display: block;
    color: var(--accent);
  }
  .marker {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--coral);
  }
</style>
