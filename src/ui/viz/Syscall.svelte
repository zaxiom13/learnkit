<script lang="ts">
  import { loop } from "../../lib/viz";
  // A CPU timeline: user-mode work, then kernel crossings. Toggle bypass to see the crossings vanish.
  let bypass = $state(false);
  let rate = $state(4);
  type Seg = { x: number; w: number; k: boolean };
  let segs = $state<Seg[]>([]);
  let crossings = $state(0);
  let x = 0, acc = 0;
  function step(dt: number) {
    const speed = 120;
    x += speed * dt;
    acc += dt * rate;
    const k = !bypass && acc >= 1;
    if (acc >= 1) acc = 0;
    const last = segs[segs.length - 1];
    if (k) { segs.push({ x, w: 26, k: true }); crossings++; x += 26; }
    else if (last && !last.k) last.w += speed * dt;
    else segs.push({ x, w: speed * dt, k: false });
    const off = Math.max(0, x - 600);
    if (off > 0) { for (const s of segs) s.x -= off; x -= off; }
    segs = segs.filter((s) => s.x + s.w > 0);
  }
  const kernelShare = $derived(bypass ? 0 : Math.min(95, Math.round(rate * 26 / (120 + rate * 26) * 100)));
</script>

<svg viewBox="0 0 640 150" use:loop={step}>
  <text x="10" y="30" font-size="12" opacity="0.7">user space</text>
  <text x="10" y="118" font-size="12" opacity="0.7">kernel</text>
  <line x1="0" x2="640" y1="75" y2="75" stroke="var(--line-strong)" stroke-dasharray="4 5" />
  <text x="630" y="70" font-size="10" text-anchor="end" opacity="0.6">privilege boundary</text>
  {#each segs as s, i (i)}
    {#if s.k}
      <path d="M{s.x + 20} 50 L{s.x + 26} 100 L{s.x + 40} 100 L{s.x + 46} 50" fill="none" stroke="var(--coral)" stroke-width="3" />
      <rect x={s.x + 26} y="92" width="14" height="16" rx="3" fill="var(--coral)" />
    {:else}
      <rect x={s.x + 20} y="40" width={s.w} height="20" rx="4" fill="var(--accent)" opacity="0.85" />
    {/if}
  {/each}
</svg>
<div class="row">
  <span class="stat">syscalls: {crossings}</span>
  <span class="stat" style="color:var(--coral)">≈{kernelShare}% of time crossing/in kernel</span>
</div>
<div class="ctl">
  <label style="display:flex;gap:8px;align-items:center;font-size:13px"><span style="color:var(--text-2);min-width:90px">I/O calls/sec</span><input type="range" min="1" max="12" bind:value={rate} style="flex:1;accent-color:var(--accent)" disabled={bypass} /></label>
  <div class="row" style="margin:0">
    <button class="btn sm" class:primary={bypass} onclick={() => (bypass = !bypass)}>{bypass ? "Kernel bypass ON — NIC mapped into user space" : "Turn on kernel bypass"}</button>
  </div>
</div>
