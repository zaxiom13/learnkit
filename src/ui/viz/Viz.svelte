<script lang="ts">
  import type { Component } from "svelte";
  import type { Block } from "../../lib/parse";
  import { progress } from "../../lib/progress.svelte";

  let { b }: { b: Extract<Block, { kind: "viz" }> } = $props();

  const mods = import.meta.glob("./*.svelte", { eager: true, import: "default" }) as Record<string, Component<{ opts: Record<string, string>; lines: string[] }>>;
  const byName: Record<string, Component<{ opts: Record<string, string>; lines: string[] }>> = {};
  for (const [p, c] of Object.entries(mods)) byName[p.slice(2, -7).toLowerCase()] = c;
  const C = $derived(byName[b.name]);

  const TITLES: Record<string, string> = {
    timeline: "Timeline", bars: "Compare", stack: "The layers", syscall: "Crossing into the kernel", cgroup: "cgroup playground",
    jitter: "Latency lab", ringbuffer: "Lock-free ring buffer", latency: "Latency, felt", bigo: "Growth rates", softmax: "Temperature",
    attention: "Self-attention", pathintegral: "Sum over paths", bell: "Bell test", ising: "Ising model", lorenz: "Butterfly effect",
    brownian: "Random walks", bayes: "Bayes, in people", orderbook: "Live order book", option: "Option pricer", kelly: "Bet sizing",
    matrix: "A matrix is a map", harmonics: "Harmonics", colorwheel: "Colour wheel", perspective: "Perspective", evolution: "Evolution in action",
    neuron: "A spiking neuron", codon: "DNA → protein", quorum: "Majority quorum", avalanche: "Avalanche effect", condorcet: "Voting paradox",
    diagonal: "Cantor's diagonal", montecarlo: "Monte Carlo π", gradient: "Gradient descent", pipes: "A pipeline", pagecache: "Where writes go",
    numa: "NUMA", falsesharing: "False sharing", spacetime: "Time dilation", orbit: "Orbits", bands: "Bands and gaps", logistic: "Route to chaos",
    tree: "Family tree", lightcone: "Light cones", waves: "Interference", boids: "Emergence", sort: "Sorting", hashring: "Sharding",
    lsm: "LSM tree", backtest: "Overfitting", compound: "Compounding", population: "Population", gametheory: "Game theory",
    fourier: "Fourier", tiling: "Pattern", spectrum: "Spectrum",
  };

  let seen = false;
  function touched() {
    if (!seen) { seen = true; progress.attempt(b.id, true); }
  }
</script>

<figure class="card viz" onpointerdown={touched}>
  <div class="label"><span class="dot"></span>Explore · {b.opts.title ?? TITLES[b.name] ?? b.name}</div>
  {#if C}<C opts={b.opts} lines={b.lines} />{/if}
  {#if b.caption.trim()}<figcaption class="prose">{@html b.caption}</figcaption>{/if}
</figure>

<style>
  .viz {
    margin: 0;
    overflow: hidden;
  }
  .label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--accent);
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    50% {
      opacity: 0.3;
      transform: scale(0.7);
    }
  }
  figcaption {
    margin-top: 10px;
    font-size: 14px;
    color: var(--text-2);
  }
  .viz :global(svg) {
    width: 100%;
    height: auto;
    display: block;
    overflow: visible;
  }
  .viz :global(svg text) {
    fill: var(--text);
    font-family: var(--font-ui);
  }
  .viz :global(.ctl) {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }
  .viz :global(.row) {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin-top: 10px;
  }
  .viz :global(.stat) {
    font-family: var(--font-code);
    font-size: 12.5px;
    padding: 4px 9px;
    border-radius: 8px;
    background: var(--surface-2);
  }
  .viz :global(.readout) {
    padding: 10px 12px;
    border-radius: var(--r-md);
    background: var(--surface-2);
    font-size: 14px;
    margin-top: 10px;
    min-height: 1.5em;
  }
</style>
