<script lang="ts">
  import Range from "./Range.svelte";
  // A 2×2 matrix acting on the unit circle and a grid; eigenvectors drawn when real.
  let a = $state(1.5), b = $state(0.5), c = $state(0.5), d = $state(1);
  const tr = $derived(a + d), det = $derived(a * d - b * c);
  const disc = $derived(tr * tr - 4 * det);
  const eig = $derived.by(() => {
    if (disc < 0) return [];
    const l1 = (tr + Math.sqrt(disc)) / 2, l2 = (tr - Math.sqrt(disc)) / 2;
    const vec = (l: number): [number, number] => { const v: [number, number] = Math.abs(b) > 1e-9 ? [b, l - a] : Math.abs(c) > 1e-9 ? [l - d, c] : l === a ? [1, 0] : [0, 1]; const n = Math.hypot(...v); return [v[0] / n, v[1] / n]; };
    return [[l1, ...vec(l1)], [l2, ...vec(l2)]] as [number, number, number][];
  });
  const S = 45, O = [320, 115];
  const M = (x: number, y: number) => [O[0] + (a * x + b * y) * S, O[1] - (c * x + d * y) * S];
  const circle = $derived(Array.from({ length: 73 }, (_, i) => { const t = (i / 72) * 2 * Math.PI; return M(Math.cos(t), Math.sin(t)).join(","); }).join(" "));
  const grid = $derived([-2, -1, 0, 1, 2].flatMap((k) => [[M(k, -2), M(k, 2)], [M(-2, k), M(2, k)]]));
  function preset(p: number[]) { [a, b, c, d] = p; }
</script>

<svg viewBox="0 0 640 230">
  {#each grid as [p, q], i (i)}<line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke="var(--line-strong)" stroke-width="1" style="transition: all 300ms" />{/each}
  <circle cx={O[0]} cy={O[1]} r={S} fill="none" stroke="var(--text-3)" stroke-dasharray="3 4" />
  <polygon points={circle} fill="color-mix(in srgb, var(--accent) 15%, transparent)" stroke="var(--accent)" stroke-width="2.5" />
  {#each eig as [l, x, y], i (i)}
    <line x1={O[0] - x * S * 2.4} y1={O[1] + y * S * 2.4} x2={O[0] + x * S * 2.4} y2={O[1] - y * S * 2.4} stroke="var(--coral)" stroke-width="1.5" stroke-dasharray="5 4" />
    <line x1={O[0]} y1={O[1]} x2={O[0] + x * l * S} y2={O[1] - y * l * S} stroke="var(--coral)" stroke-width="4" stroke-linecap="round" />
    <text x={O[0] + x * S * 2.5} y={O[1] - y * S * 2.5} font-size="11" fill="var(--coral)" style="fill:var(--coral)">λ{i + 1} = {l.toFixed(2)}</text>
  {/each}
  <text x="10" y="20" font-size="13" font-family="var(--font-code)">[[{a.toFixed(1)}, {b.toFixed(1)}], [{c.toFixed(1)}, {d.toFixed(1)}]]</text>
  <text x="10" y="40" font-size="11" opacity="0.7">det = {det.toFixed(2)} (area scale){det < 0 ? " · flips orientation" : ""}</text>
  {#if !eig.length}<text x="10" y="58" font-size="11" fill="var(--warn)" style="fill:var(--warn)">complex eigenvalues → a rotation, no real eigen-directions</text>{/if}
</svg>
<div class="ctl">
  <Range label="a" min={-2} max={2} step={0.1} bind:value={a} fmt={(v) => v.toFixed(1)} />
  <Range label="b" min={-2} max={2} step={0.1} bind:value={b} fmt={(v) => v.toFixed(1)} />
  <Range label="c" min={-2} max={2} step={0.1} bind:value={c} fmt={(v) => v.toFixed(1)} />
  <Range label="d" min={-2} max={2} step={0.1} bind:value={d} fmt={(v) => v.toFixed(1)} />
</div>
<div class="row">
  <button class="btn sm" onclick={() => preset([1.5, 0.5, 0.5, 1])}>symmetric</button>
  <button class="btn sm" onclick={() => preset([0, -1, 1, 0])}>rotation</button>
  <button class="btn sm" onclick={() => preset([1, 1, 0, 1])}>shear</button>
  <button class="btn sm" onclick={() => preset([1, 0, 0, -1])}>reflection</button>
  <button class="btn sm" onclick={() => preset([1, 2, 0.5, 1])}>rank-1</button>
</div>
<p class="faint small">The circle becomes an ellipse. Its axes are the singular vectors (SVD). The red lines are eigen-directions, which the map only stretches. Symmetric matrices have perpendicular eigenvectors (the spectral theorem).</p>
