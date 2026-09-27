<script lang="ts">
  import Range from "./Range.svelte";
  import { loop } from "../../lib/viz";
  // Weasel-style evolution: random mutation + selection vs pure chance.
  const TARGET = "METHINKS IT IS LIKE A WEASEL";
  const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
  const rand = () => A[Math.floor(Math.random() * A.length)];
  let mut = $state(4), pop = $state(100);
  let best = $state(Array.from(TARGET, rand).join(""));
  let gen = $state(0), running = $state(false);
  let history = $state<number[]>([]);
  const fit = (s: string) => [...s].filter((c, i) => c === TARGET[i]).length;
  function step() {
    if (!running || best === TARGET) return;
    let top = best, tf = fit(best);
    for (let k = 0; k < pop; k++) { const kid = [...best].map((c) => (Math.random() < mut / 100 ? rand() : c)).join(""); const f = fit(kid); if (f > tf) { tf = f; top = kid; } }
    best = top; gen++; history = [...history, tf];
    if (best === TARGET) running = false;
  }
  function reset() { best = Array.from(TARGET, rand).join(""); gen = 0; history = []; running = true; }
</script>

<div class="str" use:loop={step}>{#each [...best] as c, i (i)}<span class:ok={c === TARGET[i]}>{c === " " ? "·" : c}</span>{/each}</div>
<svg viewBox="0 0 640 70">
  <polyline points={history.map((f, i) => `${(i / Math.max(60, history.length)) * 640},${66 - (f / TARGET.length) * 62}`).join(" ")} fill="none" stroke="var(--good)" stroke-width="2.5" />
</svg>
<div class="row"><span class="stat">generation {gen}</span><span class="stat">fitness {fit(best)}/{TARGET.length}</span><button class="btn sm primary" onclick={() => (gen ? (running = !running) : reset())}>{running ? "pause" : gen ? "resume" : "▶ evolve"}</button><button class="btn sm" onclick={reset}>restart</button></div>
<div class="ctl"><Range label="mutation rate %" min={0.5} max={30} step={0.5} bind:value={mut} /><Range label="offspring / gen" min={2} max={400} bind:value={pop} /></div>
<p class="faint small">Pure chance would need about 27²⁸ ≈ 10⁴⁰ tries. Cumulative selection (keep the best, mutate, repeat) gets there in dozens of generations. Dawkins' toy isn't how real evolution works (there's no target), but it shows why selection plus variation is so powerful.</p>

<style>
  .str {
    font-family: var(--font-code);
    font-size: 17px;
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
  }
  .str span {
    width: 1.1em;
    text-align: center;
    border-radius: 3px;
    background: var(--surface-2);
    transition: all 200ms;
  }
  .str span.ok {
    background: var(--good);
    color: #fff;
  }
</style>
