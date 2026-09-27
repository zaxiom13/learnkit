<script lang="ts">
  let mem = $state<number[]>([]);
  let levels = $state<number[][]>([[], [], []]);
  let writes = $state(0), compactions = $state(0);
  function put() {
    writes++;
    mem = [...mem, Math.floor(Math.random() * 99)].sort((a, b) => a - b);
    if (mem.length >= 4) { levels[0] = [...levels[0], ...mem]; mem = []; }
    for (let i = 0; i < levels.length - 1; i++) {
      if (levels[i].length >= 4 * 4 ** i * 2) { levels[i + 1] = [...levels[i + 1], ...levels[i]].sort((a, b) => a - b); levels[i] = []; compactions++; }
    }
  }
  function burst() { for (let i = 0; i < 8; i++) put(); }
</script>

<div class="lsm">
  <div class="lv mem"><span class="tag">memtable (RAM, sorted)</span>{#each mem as k, i (i)}<span class="k new">{k}</span>{/each}</div>
  {#each levels as l, i (i)}
    <div class="lv"><span class="tag">L{i} on disk (sorted files)</span>{#each l as k, j (j)}<span class="k" style="animation-delay:{j * 8}ms">{k}</span>{/each}</div>
  {/each}
</div>
<div class="row">
  <button class="btn sm" onclick={put}>write a key</button>
  <button class="btn sm primary" onclick={burst}>write 8</button>
  <span class="stat">writes {writes}</span><span class="stat">compactions {compactions}</span>
</div>
<p class="faint small">Writes go to RAM; when the memtable fills, it's flushed as one sequential sorted file. Background compaction merges levels. Every disk write is sequential, which is why LSM trees eat write-heavy loads.</p>

<style>
  .lsm {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .lv {
    display: flex;
    flex-wrap: wrap;
    gap: 3px;
    align-items: center;
    padding: 8px;
    border-radius: 10px;
    background: var(--surface-2);
    min-height: 40px;
  }
  .mem {
    background: color-mix(in srgb, var(--warn) 15%, var(--surface));
  }
  .tag {
    font-size: 11px;
    color: var(--text-3);
    width: 100%;
  }
  .k {
    font-family: var(--font-code);
    font-size: 11px;
    padding: 2px 5px;
    border-radius: 5px;
    background: var(--accent);
    color: #fff;
    animation: in 300ms var(--ease-spring) both;
  }
  .k.new {
    background: var(--warn);
  }
  @keyframes in {
    from {
      transform: scale(0.3);
      opacity: 0;
    }
  }
</style>
