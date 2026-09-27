<script lang="ts">
  import Range from "./Range.svelte";
  import { loop } from "../../lib/viz";
  // Epicycles: a square/saw wave built from rotating circles.
  let terms = $state(5);
  let shape = $state<"square" | "saw">("square");
  let t = 0;
  let wave = $state<number[]>([]);
  let tip = $state<[number, number][]>([]);
  function step(dt: number) {
    t += dt * 1.2;
    let x = 130, y = 110;
    const circles: [number, number][] = [[x, y]];
    for (let k = 1; k <= terms; k++) {
      const n = shape === "square" ? 2 * k - 1 : k;
      const r = shape === "square" ? (4 / (n * Math.PI)) * 55 : (2 / (n * Math.PI)) * 55 * (k % 2 ? 1 : -1);
      x += r * Math.cos(n * t); y += r * Math.sin(n * t);
      circles.push([x, y]);
    }
    tip = circles;
    wave = [y, ...wave.slice(0, 300)];
  }
</script>

<svg viewBox="0 0 640 220" use:loop={step}>
  {#each tip.slice(0, -1) as [cx, cy], i (i)}
    {@const [nx, ny] = tip[i + 1]}
    <circle {cx} {cy} r={Math.hypot(nx - cx, ny - cy)} fill="none" stroke="var(--line-strong)" />
    <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="var(--accent)" stroke-width="2" />
  {/each}
  {#if tip.length}
    <line x1={tip[tip.length - 1][0]} y1={tip[tip.length - 1][1]} x2="280" y2={wave[0]} stroke="var(--coral)" stroke-dasharray="3 3" />
  {/if}
  <polyline points={wave.map((y, i) => `${280 + i * 1.2},${y}`).join(" ")} fill="none" stroke="var(--coral)" stroke-width="2.5" />
</svg>
<div class="ctl"><Range label="harmonics" min={1} max={40} bind:value={terms} /></div>
<div class="row"><button class="btn sm" class:primary={shape === "square"} onclick={() => (shape = "square")}>square wave</button><button class="btn sm" class:primary={shape === "saw"} onclick={() => (shape = "saw")}>sawtooth</button></div>
<p class="faint small">Any periodic signal is a sum of sines: circles spinning at 1×, 3×, 5×… Add harmonics and the corner sharpens, but the overshoot never goes away (the Gibbs phenomenon). The same maths gives timbre in music, JPEG/MP3 compression, and momentum space in quantum mechanics.</p>
