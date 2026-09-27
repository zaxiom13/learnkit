<script lang="ts">
  // Drag the vanishing point; a room and floor tiles re-project.
  let vp = $state<[number, number]>([320, 100]);
  let drag = false;
  function move(e: PointerEvent) { if (!drag) return; const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect(); vp = [((e.clientX - r.left) / r.width) * 640, ((e.clientY - r.top) / r.height) * 240]; }
  const corners: [number, number][] = [[0, 0], [640, 0], [640, 240], [0, 240]];
  const toward = (p: [number, number], k: number): [number, number] => [p[0] + (vp[0] - p[0]) * k, p[1] + (vp[1] - p[1]) * k];
  const back = $derived(corners.map((c) => toward(c, 0.62)));
  const floorLines = $derived(Array.from({ length: 9 }, (_, i) => { const x = (i / 8) * 640; return [[x, 240], toward([x, 240], 0.62)]; }));
  const rows = $derived([0.15, 0.3, 0.42, 0.52].map((k) => [toward([0, 240], k), toward([640, 240], k)]));
</script>

<svg viewBox="0 0 640 240" onpointerdown={(e) => { drag = true; move(e); }} onpointermove={move} onpointerup={() => (drag = false)} onpointerleave={() => (drag = false)} role="img" style="touch-action:none;cursor:move">
  <polygon points={back.map((p) => p.join(",")).join(" ")} fill="var(--surface-2)" stroke="var(--line-strong)" />
  {#each corners as c, i (i)}<line x1={c[0]} y1={c[1]} x2={vp[0]} y2={vp[1]} stroke="var(--coral)" stroke-width="1" stroke-dasharray="4 4" opacity="0.6" /><line x1={c[0]} y1={c[1]} x2={back[i][0]} y2={back[i][1]} stroke="var(--text-2)" stroke-width="2" />{/each}
  {#each floorLines as [a, b], i (i)}<line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="var(--accent)" opacity="0.6" />{/each}
  {#each rows as [a, b], i (i)}<line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="var(--accent)" opacity="0.6" />{/each}
  <circle cx={vp[0]} cy={vp[1]} r="8" fill="var(--coral)" /><text x={vp[0] + 12} y={vp[1] - 8} font-size="11">vanishing point (drag me)</text>
  <line x1="0" x2="640" y1={vp[1]} y2={vp[1]} stroke="var(--warn)" stroke-dasharray="2 6" /><text x="6" y={vp[1] - 4} font-size="10" fill="var(--warn)" style="fill:var(--warn)">horizon = your eye level</text>
</svg>
<p class="faint small">One-point perspective (Brunelleschi, about 1415): every line running away from you meets at one point on the horizon, and floor tiles shrink toward it. Leonardo's Last Supper puts the vanishing point right on Christ's head.</p>
