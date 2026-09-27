<script lang="ts">
  // Latency numbers, and the same numbers stretched so 1 ns = 1 second.
  const rows: [string, number][] = [
    ["L1 cache hit", 1], ["Branch mispredict", 5], ["L3 cache hit", 15], ["DRAM access", 100], ["Syscall round trip", 300],
    ["Context switch", 3000], ["NVMe SSD read", 50000], ["Same-datacentre round trip", 300000], ["HDD seek", 5e6], ["Sydney → US West round trip", 1.5e8],
  ];
  let human = $state(false);
  const fmtNs = (ns: number) => ns < 1e3 ? `${ns} ns` : ns < 1e6 ? `${+(ns / 1e3).toFixed(1)} µs` : ns < 1e9 ? `${+(ns / 1e6).toFixed(1)} ms` : `${+(ns / 1e9).toFixed(1)} s`;
  const fmtHuman = (s: number) => s < 60 ? `${s} s` : s < 3600 ? `${+(s / 60).toFixed(1)} min` : s < 86400 ? `${+(s / 3600).toFixed(1)} hours` : s < 86400 * 365 ? `${+(s / 86400).toFixed(1)} days` : `${+(s / 86400 / 365).toFixed(1)} years`;
  let shown = $state(false);
  $effect(() => { const t = setTimeout(() => (shown = true), 60); return () => clearTimeout(t); });
</script>

<div class="lat">
  {#each rows as [l, ns], i (l)}
    <div class="r">
      <span class="l">{l}</span>
      <span class="track"><span class="f" style="width:{shown ? 3 + (Math.log10(ns) / Math.log10(1.5e8)) * 97 : 0}%; transition-delay:{i * 60}ms; background:hsl({220 - i * 22} 70% 55%)"></span></span>
      <span class="v">{human ? fmtHuman(ns) : fmtNs(ns)}</span>
    </div>
  {/each}
</div>
<div class="row"><button class="btn sm" class:primary={human} onclick={() => (human = !human)}>{human ? "Showing: 1 ns stretched to 1 second" : "Stretch time: 1 ns → 1 second"}</button></div>
{#if human}<p class="faint small">At that scale an L1 hit is a heartbeat, a DRAM read is a coffee order, and a trans-Pacific round trip takes about 4¾ years.</p>{/if}

<style>
  .lat {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .r {
    display: grid;
    grid-template-columns: minmax(120px, 38%) 1fr 92px;
    gap: 10px;
    align-items: center;
    font-size: 13px;
  }
  .track {
    height: 12px;
    background: var(--surface-3);
    border-radius: 6px;
    overflow: hidden;
  }
  .f {
    display: block;
    height: 100%;
    border-radius: 6px;
    transition: width 900ms var(--ease);
  }
  .v {
    font-family: var(--font-code);
    font-size: 12px;
    text-align: right;
  }
</style>
