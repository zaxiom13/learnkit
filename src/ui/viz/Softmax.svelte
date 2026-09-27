<script lang="ts">
  import Range from "./Range.svelte";
  import { cells, type VizProps } from "../../lib/viz";
  let { opts, lines }: VizProps = $props();
  // data: "label | score" (logit or −energy). Temperature reshapes the Boltzmann/softmax distribution.
  const items = $derived(lines.length ? lines.map((l) => { const [a, b] = cells(l); return [a, Number(b)] as [string, number]; }) : ([["the", 3.2], ["a", 2.6], ["my", 1.9], ["quantum", 1.1], ["purple", 0.3], ["banana", -0.5]] as [string, number][]));
  let T = $state(Number(opts.t ?? 1));
  const probs = $derived.by(() => { const e = items.map(([, s]) => Math.exp(s / Math.max(T, 0.02))); const z = e.reduce((a, b) => a + b, 0); return e.map((v) => v / z); });
  const H = $derived(-probs.reduce((a, p) => a + (p > 0 ? p * Math.log2(p) : 0), 0));
  let sampled = $state(-1);
  function sample() { let u = Math.random(); for (let i = 0; i < probs.length; i++) { u -= probs[i]; if (u <= 0) { sampled = i; return; } } sampled = probs.length - 1; }
</script>

<div class="sm">
  {#each items as [l], i (l)}
    <div class="r" class:pick={sampled === i}>
      <span class="l">{l}</span>
      <span class="track"><span class="f" style="width:{probs[i] * 100}%"></span></span>
      <span class="v">{(probs[i] * 100).toFixed(1)}%</span>
    </div>
  {/each}
</div>
<div class="row"><span class="stat">entropy {H.toFixed(2)} bits</span><button class="btn sm primary" onclick={sample}>🎲 sample</button>{#if sampled >= 0}<span class="stat">→ “{items[sampled][0]}”</span>{/if}</div>
<div class="ctl"><Range label="temperature T" min={0.05} max={5} step={0.05} bind:value={T} fmt={(v) => v.toFixed(2)} /></div>
<p class="faint small">p ∝ e^(score/T): the Boltzmann distribution. As T → 0 it collapses onto the top choice (the ground state). As T → ∞ it goes uniform (maximum entropy).</p>

<style>
  .sm {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .r {
    display: grid;
    grid-template-columns: 90px 1fr 60px;
    gap: 10px;
    align-items: center;
    font-size: 13px;
    padding: 2px 4px;
    border-radius: 6px;
  }
  .r.pick {
    background: var(--accent-soft);
  }
  .l {
    font-family: var(--font-code);
  }
  .track {
    height: 14px;
    background: var(--surface-3);
    border-radius: 7px;
    overflow: hidden;
  }
  .f {
    display: block;
    height: 100%;
    background: var(--accent);
    border-radius: 7px;
    transition: width 200ms var(--ease);
  }
  .v {
    font-family: var(--font-code);
    font-size: 12px;
    text-align: right;
  }
</style>
