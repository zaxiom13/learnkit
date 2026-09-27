<script lang="ts">
  // write() lands in RAM (page cache); fsync pushes to disk; a crash loses anything not yet durable.
  type Blk = { id: number; where: "app" | "cache" | "disk" };
  let blocks = $state<Blk[]>([]);
  let n = 0;
  let crashed = $state(false);
  let lost = $state(0);
  const write = () => { crashed = false; blocks.push({ id: ++n, where: "cache" }); };
  const fsync = () => { for (const b of blocks) if (b.where === "cache") b.where = "disk"; };
  const crash = () => { lost = blocks.filter((b) => b.where === "cache").length; blocks = blocks.filter((b) => b.where === "disk"); crashed = true; };
  const cols = { cache: 250, disk: 470 } as const;
</script>

<svg viewBox="0 0 640 200">
  <g font-size="12">
    <rect x="20" y="30" width="150" height="150" rx="12" fill="var(--surface-2)" /><text x="95" y="22" text-anchor="middle">your program</text>
    <text x="95" y="110" text-anchor="middle" font-size="26">🧑‍💻</text>
    <rect x="215" y="30" width="170" height="150" rx="12" fill="color-mix(in srgb, var(--warn) 14%, transparent)" stroke="var(--warn)" stroke-dasharray="5 4" /><text x="300" y="22" text-anchor="middle">page cache (RAM, volatile)</text>
    <rect x="435" y="30" width="170" height="150" rx="12" fill="color-mix(in srgb, var(--good) 14%, transparent)" stroke="var(--good)" /><text x="520" y="22" text-anchor="middle">disk (durable)</text>
  </g>
  {#each blocks as b, i (b.id)}
    {@const k = blocks.filter((x, j) => x.where === b.where && j < i).length}
    <g style="transform: translate({cols[b.where as "cache" | "disk"] + (k % 5) * 26}px, {50 + Math.floor(k / 5) * 26}px); transition: transform 600ms var(--ease-spring)">
      <rect width="22" height="22" rx="5" fill={b.where === "disk" ? "var(--good)" : "var(--warn)"} />
      <text x="11" y="15" font-size="10" text-anchor="middle" style="fill:#fff">{b.id}</text>
    </g>
  {/each}
  {#if crashed}<text x="300" y="120" text-anchor="middle" font-size="16" fill="var(--bad)" style="fill:var(--bad)">⚡ power cut: {lost} block{lost === 1 ? "" : "s"} lost</text>{/if}
</svg>
<div class="row">
  <button class="btn sm" onclick={write}>write()</button>
  <button class="btn sm primary" onclick={fsync}>fsync()</button>
  <button class="btn sm" onclick={crash}>⚡ Pull the plug</button>
  <button class="btn sm ghost" onclick={() => { blocks = []; crashed = false; }}>reset</button>
</div>
<p class="faint small">write() returns as soon as data is in RAM. Only fsync() promises it survives a crash, and that promise is what makes databases slow and safe.</p>
