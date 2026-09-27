<script lang="ts">
  // Click an event: see which events it can influence (future cone) and which can influence it (past cone).
  let ev = $state<[number, number]>([320, 110]);
  const pts: [number, number, string][] = [[180, 40, "A"], [470, 50, "B"], [300, 190, "C"], [560, 170, "D"], [120, 150, "E"], [390, 90, "F"]];
  const rel = (p: [number, number]) => { const dt = ev[1] - p[1], dx = Math.abs(p[0] - ev[0]); if (dx < Math.abs(dt)) return dt > 0 ? "future" : "past"; return "elsewhere"; };
  function click(e: MouseEvent) { const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect(); ev = [((e.clientX - r.left) / r.width) * 640, ((e.clientY - r.top) / r.height) * 220]; }
  const col = { future: "var(--good)", past: "var(--accent)", elsewhere: "var(--text-3)" } as const;
</script>

<svg viewBox="0 0 640 220" onclick={click} role="img" style="cursor:crosshair">
  <polygon points="{ev[0]},{ev[1]} {ev[0] - 300},{ev[1] - 300} {ev[0] + 300},{ev[1] - 300}" fill="var(--good)" opacity="0.14" />
  <polygon points="{ev[0]},{ev[1]} {ev[0] - 300},{ev[1] + 300} {ev[0] + 300},{ev[1] + 300}" fill="var(--accent)" opacity="0.14" />
  <line x1={ev[0] - 300} y1={ev[1] - 300} x2={ev[0] + 300} y2={ev[1] + 300} stroke="var(--warn)" stroke-dasharray="4 4" />
  <line x1={ev[0] + 300} y1={ev[1] - 300} x2={ev[0] - 300} y2={ev[1] + 300} stroke="var(--warn)" stroke-dasharray="4 4" />
  {#each pts as p (p[2])}
    {@const r = rel([p[0], p[1]])}
    <circle cx={p[0]} cy={p[1]} r="7" fill={col[r]} /><text x={p[0] + 10} y={p[1] + 4} font-size="11">{p[2]}: {r}</text>
  {/each}
  <circle cx={ev[0]} cy={ev[1]} r="8" fill="var(--coral)" /><text x={ev[0] + 10} y={ev[1] - 8} font-size="12" font-weight="700">you (here, now)</text>
  <text x="8" y="16" font-size="10" opacity="0.6">↑ time</text><text x="600" y="214" font-size="10" opacity="0.6">space →</text>
</svg>
<p class="faint small">Click to move the event. Dashed lines are light rays at 45°. Events in the green cone can be affected by you, and events in the blue cone could have affected you. "Elsewhere" events are causally disconnected, and observers disagree about their time order. That's the relativity of simultaneity.</p>
