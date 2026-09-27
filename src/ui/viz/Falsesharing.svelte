<script lang="ts">
  import { loop } from "../../lib/viz";
  let padded = $state(false);
  let owner = $state(0);
  let ops = $state([0, 0]);
  let pings = $state(0);
  let acc = 0;
  function step(dt: number) {
    acc += dt;
    const rate = padded ? 0.02 : 0.25;
    while (acc > rate) {
      acc -= rate;
      const c = Math.random() < 0.5 ? 0 : 1;
      if (!padded && owner !== c) { owner = c; pings++; }
      ops[c] += padded ? 12 : 1;
    }
  }
</script>

<svg viewBox="0 0 640 170" use:loop={step}>
  {#each [0, 1] as c (c)}
    <rect x={c ? 440 : 40} y="20" width="160" height="60" rx="12" fill="var(--surface-2)" stroke={!padded && owner === c ? "var(--coral)" : "var(--line-strong)"} stroke-width="2" />
    <text x={c ? 520 : 120} y="46" text-anchor="middle" font-size="13">core {c}</text>
    <text x={c ? 520 : 120} y="66" text-anchor="middle" font-size="11" opacity="0.7">counter_{c === 0 ? "a" : "b"}++ : {ops[c]}</text>
  {/each}
  {#if padded}
    <rect x="120" y="110" width="190" height="34" rx="6" fill="var(--accent)" /><text x="215" y="132" text-anchor="middle" font-size="11" style="fill:#fff">line 1: a + 56 bytes padding</text>
    <rect x="330" y="110" width="190" height="34" rx="6" fill="var(--good)" /><text x="425" y="132" text-anchor="middle" font-size="11" style="fill:#fff">line 2: b + padding</text>
  {:else}
    <rect x="220" y="110" width="200" height="34" rx="6" fill="var(--coral)" style="transform-origin: 320px 127px; transform: translateX({owner ? 60 : -60}px); transition: transform 120ms" />
    <text x="320" y="132" text-anchor="middle" font-size="11" style="fill:#fff; transform: translateX({owner ? 60 : -60}px); transition: transform 120ms">one 64 B cache line: [a][b]</text>
  {/if}
</svg>
<div class="row">
  <button class="btn sm" class:primary={padded} onclick={() => { padded = !padded; ops = [0, 0]; pings = 0; }}>{padded ? "Padded to separate lines ✓" : "Pad counters apart"}</button>
  <span class="stat">line transfers: {pings}</span>
  <span class="stat">total increments: {ops[0] + ops[1]}</span>
</div>
