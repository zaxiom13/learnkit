<script lang="ts">
  import Range from "./Range.svelte";
  import { loop } from "../../lib/viz";
  // Three local rules → a flock. Emergence.
  let sep = $state(1.5), ali = $state(1), coh = $state(1);
  const N = 70, W = 640, H = 220;
  let B = $state(Array.from({ length: N }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: Math.random() * 2 - 1, vy: Math.random() * 2 - 1 })));
  function step(dt: number) {
    const s = dt * 60;
    for (const b of B) {
      let ax = 0, ay = 0, cx = 0, cy = 0, vx = 0, vy = 0, n = 0;
      for (const o of B) {
        if (o === b) continue;
        const dx = o.x - b.x, dy = o.y - b.y, d = Math.hypot(dx, dy);
        if (d < 45) { n++; cx += o.x; cy += o.y; vx += o.vx; vy += o.vy; if (d < 14) { ax -= (dx / d) * sep * 0.3; ay -= (dy / d) * sep * 0.3; } }
      }
      if (n) { ax += ((cx / n - b.x) * 0.002 * coh) + ((vx / n - b.vx) * 0.05 * ali); ay += ((cy / n - b.y) * 0.002 * coh) + ((vy / n - b.vy) * 0.05 * ali); }
      b.vx += ax * s; b.vy += ay * s;
      const sp = Math.hypot(b.vx, b.vy) || 1, lim = 2.2;
      b.vx = (b.vx / sp) * Math.min(lim, Math.max(1, sp)); b.vy = (b.vy / sp) * Math.min(lim, Math.max(1, sp));
      b.x = (b.x + b.vx * s + W) % W; b.y = (b.y + b.vy * s + H) % H;
    }
    B = B;
  }
</script>

<svg viewBox="0 0 640 220" use:loop={step}>
  {#each B as b, i (i)}
    <path d="M6 0 L-4 3.5 L-2 0 L-4 -3.5Z" transform="translate({b.x} {b.y}) rotate({(Math.atan2(b.vy, b.vx) * 180) / Math.PI})" fill={i % 7 ? "var(--accent)" : "var(--coral)"} />
  {/each}
</svg>
<div class="ctl">
  <Range label="separation" min={0} max={4} step={0.1} bind:value={sep} fmt={(v) => v.toFixed(1)} />
  <Range label="alignment" min={0} max={4} step={0.1} bind:value={ali} fmt={(v) => v.toFixed(1)} />
  <Range label="cohesion" min={0} max={4} step={0.1} bind:value={coh} fmt={(v) => v.toFixed(1)} />
</div>
<p class="faint small">No bird knows about the flock. Each follows three local rules: don't crowd, match your neighbours' heading, drift toward their centre. The flock emerges (Reynolds, 1986). Set alignment to 0 and the order dissolves: "more is different".</p>
