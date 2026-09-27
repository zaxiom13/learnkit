<script lang="ts">
  import Range from "./Range.svelte";
  // Islamic-style star pattern generated from a rotational rule.
  let n = $state(8), k = $state(3), inner = $state(0.45);
  const star = (cx: number, cy: number, R: number) => { const pts: string[] = []; for (let i = 0; i < n * 2; i++) { const r = i % 2 ? R * inner : R; const a = (i * Math.PI) / n - Math.PI / 2; pts.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`); } return pts.join(" "); };
  const poly = (cx: number, cy: number, R: number) => { const pts: string[] = []; for (let i = 0; i < n; i++) { const a = ((i * k) % n) * ((2 * Math.PI) / n) - Math.PI / 2; pts.push(`${cx + Math.cos(a) * R},${cy + Math.sin(a) * R}`); } return pts.join(" "); };
</script>

<svg viewBox="0 0 640 240">
  {#each Array(6) as _, i (i)}{#each Array(3) as __, j (j)}
    {@const cx = 60 + i * 104 + (j % 2) * 52}{@const cy = 40 + j * 80}
    <polygon points={star(cx, cy, 50)} fill="color-mix(in srgb, var(--accent) 18%, transparent)" stroke="var(--accent)" stroke-width="1.5" />
    <polygon points={poly(cx, cy, 36)} fill="none" stroke="var(--coral)" stroke-width="1.5" />
    <circle {cx} {cy} r="6" fill="var(--warn)" />
  {/each}{/each}
</svg>
<div class="ctl">
  <Range label="points" min={5} max={16} bind:value={n} />
  <Range label="star step" min={1} max={7} bind:value={k} />
  <Range label="inner radius" min={0.2} max={0.9} step={0.01} bind:value={inner} fmt={(v) => v.toFixed(2)} />
</div>
<p class="faint small">Islamic geometric art builds infinite patterns from a compass, a straightedge and symmetry rules. Only 3-, 4- and 6-fold symmetry can tile the plane periodically. Five- and ten-fold patterns (as in girih) need quasi-periodic order, the maths of Penrose tilings and quasicrystals (Nobel Chemistry 2011).</p>
