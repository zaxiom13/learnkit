<script lang="ts">
  let hue = $state(20);
  let scheme = $state<"complementary" | "triadic" | "analogous" | "split">("complementary");
  const offs = $derived({ complementary: [0, 180], triadic: [0, 120, 240], analogous: [-30, 0, 30], split: [0, 150, 210] }[scheme]);
  const at = (h: number, r: number) => [160 + Math.cos(((h - 90) * Math.PI) / 180) * r, 120 + Math.sin(((h - 90) * Math.PI) / 180) * r];
  function drag(e: PointerEvent) { if (e.buttons !== 1 && e.type !== "pointerdown") return; const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect(); const x = ((e.clientX - r.left) / r.width) * 640 - 160, y = ((e.clientY - r.top) / r.height) * 240 - 120; hue = Math.round((Math.atan2(y, x) * 180) / Math.PI + 90 + 360) % 360; }
</script>

<svg viewBox="0 0 640 240" onpointerdown={drag} onpointermove={drag} role="img" style="touch-action:none;cursor:grab">
  {#each Array(36) as _, i (i)}
    {@const [x1, y1] = at(i * 10 - 5, 100)}{@const [x2, y2] = at(i * 10 + 5, 100)}{@const [x3, y3] = at(i * 10 + 5, 60)}{@const [x4, y4] = at(i * 10 - 5, 60)}
    <path d="M{x1} {y1} A100 100 0 0 1 {x2} {y2} L{x3} {y3} A60 60 0 0 0 {x4} {y4}Z" fill="hsl({i * 10} 80% 55%)" />
  {/each}
  {#each offs as o, i (i)}
    {@const [x, y] = at(hue + o, 80)}
    <line x1="160" y1="120" x2={x} y2={y} stroke="var(--text)" stroke-width="1.5" opacity="0.5" />
    <circle cx={x} cy={y} r="11" fill="hsl({hue + o} 80% 55%)" stroke="#fff" stroke-width="3" />
  {/each}
  <g transform="translate(320 30)">
    {#each offs as o, i (i)}<rect x={i * 100} y="0" width="95" height="120" rx="10" fill="hsl({hue + o} 75% 55%)" /><text x={i * 100 + 47} y="140" text-anchor="middle" font-size="11" font-family="var(--font-code)">hsl({((hue + o + 360) % 360)}°)</text>{/each}
    <rect x="0" y="160" width="290" height="40" rx="8" fill="hsl({hue + offs[1]} 75% 55%)" /><circle cx="145" cy="180" r="14" fill="hsl({hue} 75% 55%)" />
  </g>
</svg>
<div class="row">{#each ["complementary", "triadic", "analogous", "split"] as s (s)}<button class="btn sm" class:primary={scheme === s} onclick={() => (scheme = s as typeof scheme)}>{s}</button>{/each}</div>
<p class="faint small">Drag around the wheel. Complementary colours (opposites) vibrate against each other. Van Gogh's orange-against-blue skies and Monet's shadows are built on this. Analogous schemes feel calm.</p>
