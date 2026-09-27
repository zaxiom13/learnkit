<script lang="ts">
  import Range from "./Range.svelte";
  import { loop } from "../../lib/viz";
  // cpu.max = "quota period" (µs) and memory.max; watch throttling and OOM.
  let quota = $state(50);
  let period = $state(100);
  let demand = $state(80);
  let memMax = $state(512);
  let memUse = $state(200);
  let leak = $state(false);
  let killed = $state(false);
  let cpuHist = $state<number[]>([]);
  let t = 0;
  function step(dt: number) {
    t += dt * 1000 * 0.4; // slowed-down ms
    const inPeriod = t % period;
    // throttled jobs burn their whole quota at the start of each period, then wait for the next one
    const running = !killed && (demand / 100 > quota / period ? inPeriod < quota : t % 10 < demand / 10);
    cpuHist = [...cpuHist.slice(-159), running ? 1 : killed ? -1 : 0];
    if (leak && !killed) memUse += dt * 60;
    if (memUse > memMax) killed = true;
  }
  const share = $derived(Math.min(1, quota / period));
  const throttled = $derived(demand / 100 > share);
  function restart() { killed = false; memUse = 200; leak = false; }
</script>

<div class="files">
  <code>/sys/fs/cgroup/job/cpu.max</code> <b>"{quota * 1000} {period * 1000}"</b>
  <code>memory.max</code> <b>{memMax}M</b>
  <code>memory.current</code> <b style:color={memUse > memMax * 0.8 ? "var(--bad)" : ""}>{Math.round(memUse)}M</b>
</div>
<svg viewBox="0 0 640 90" use:loop={step}>
  <text x="0" y="12" font-size="11" opacity="0.7">CPU: running (blue) vs throttled (grey) — each column is a slice of time</text>
  {#each cpuHist as c, i (i)}
    <rect x={i * 4} y={c === 1 ? 22 : 50} width="3.2" height={c === 1 ? 36 : 8} rx="1" fill={c === 1 ? "var(--accent)" : c === -1 ? "var(--bad)" : "var(--line-strong)"} />
  {/each}
  <rect x="0" y="72" width="640" height="10" rx="5" fill="var(--surface-3)" />
  <rect x="0" y="72" width={Math.min(640, (memUse / memMax) * 640)} height="10" rx="5" fill={memUse > memMax * 0.8 ? "var(--bad)" : "var(--good)"} />
</svg>
{#if killed}
  <div class="readout oom">💥 <b>OOM-killed.</b> memory.current crossed memory.max, so the kernel killed the process. CPU limits only slow you down; memory limits kill. <button class="btn sm" onclick={restart}>Restart</button></div>
{:else}
  <div class="readout">Allowed: <b>{(share).toFixed(2)} CPU</b>. The job wants <b>{(demand / 100).toFixed(2)} CPU</b>. {#if throttled}<span style="color:var(--warn)">⚠ Throttled: it runs in bursts, then sits idle until the next period, so latency spikes.</span>{:else}<span style="color:var(--good)">✓ Within quota, so no throttling.</span>{/if}</div>
{/if}
<div class="ctl">
  <Range label="quota (ms)" min={5} max={100} bind:value={quota} />
  <Range label="period (ms)" min={20} max={200} bind:value={period} />
  <Range label="job wants (% CPU)" min={5} max={100} bind:value={demand} />
  <Range label="memory.max (MB)" min={256} max={2048} step={64} bind:value={memMax} />
  <div class="row" style="margin:0"><button class="btn sm" class:primary={leak} onclick={() => (leak = !leak)}>{leak ? "Leaking memory…" : "Start a memory leak"}</button></div>
</div>

<style>
  .files {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2px 12px;
    font-size: 12.5px;
    margin-bottom: 10px;
    font-family: var(--font-code);
  }
  .oom {
    background: var(--bad-soft);
    animation: shake 400ms;
  }
  @keyframes shake {
    25% {
      transform: translateX(-4px);
    }
    75% {
      transform: translateX(4px);
    }
  }
</style>
