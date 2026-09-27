<script lang="ts">
  import Range from "./Range.svelte";
  // 1000 people as dots. Base rate, sensitivity, specificity → who tests positive, and how many are really sick.
  let base = $state(1), sens = $state(99), spec = $state(99);
  const N = 1000;
  const sick = $derived(Math.round((N * base) / 100));
  const tp = $derived(Math.round((sick * sens) / 100));
  const fp = $derived(Math.round(((N - sick) * (100 - spec)) / 100));
  const ppv = $derived(tp / Math.max(1, tp + fp));
  const kind = (i: number) => (i < tp ? "tp" : i < sick ? "fn" : i < sick + fp ? "fp" : "tn");
</script>

<div class="grid">
  {#each Array(N) as _, i (i)}<span class="p {kind(i)}"></span>{/each}
</div>
<div class="legend">
  <span><i class="p tp"></i>sick, test + ({tp})</span><span><i class="p fn"></i>sick, missed ({sick - tp})</span><span><i class="p fp"></i>healthy, false alarm ({fp})</span><span><i class="p tn"></i>healthy, test − ({N - sick - fp})</span>
</div>
<div class="readout">You tested positive. Of the <b>{tp + fp}</b> people who test positive, <b>{tp}</b> are sick → P(sick | +) = <b style="color:var(--coral)">{(ppv * 100).toFixed(1)}%</b></div>
<div class="ctl">
  <Range label="base rate %" min={0.1} max={30} step={0.1} bind:value={base} fmt={(v) => v.toFixed(1) + "%"} />
  <Range label="sensitivity %" min={50} max={100} bind:value={sens} fmt={(v) => v + "%"} />
  <Range label="specificity %" min={50} max={100} step={0.1} bind:value={spec} fmt={(v) => v.toFixed(1) + "%"} />
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(50, 1fr);
    gap: 1.5px;
  }
  .p {
    aspect-ratio: 1;
    border-radius: 50%;
    display: inline-block;
    transition: background 300ms;
  }
  .tp {
    background: var(--coral);
  }
  .fn {
    background: #7b43c9;
  }
  .fp {
    background: var(--warn);
  }
  .tn {
    background: var(--surface-3);
  }
  .legend {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 12px;
    margin-top: 8px;
  }
  .legend i {
    width: 10px;
    height: 10px;
    margin-right: 5px;
    vertical-align: -1px;
  }
</style>
