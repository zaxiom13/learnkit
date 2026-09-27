<script lang="ts">
  import Range from "./Range.svelte";
  let n = $state(5);
  let down = $state<boolean[]>([false, false, false, false, false, false, false, false, false]);
  const alive = $derived(down.slice(0, n).filter((d) => !d).length);
  const need = $derived(Math.floor(n / 2) + 1);
  const ok = $derived(alive >= need);
  const pos = (i: number) => { const a = (i / n) * Math.PI * 2 - Math.PI / 2; return [320 + Math.cos(a) * 90, 110 + Math.sin(a) * 80]; };
</script>

<svg viewBox="0 0 640 220">
  {#each Array(n) as _, i (i)}
    {#each Array(n) as __, j (j)}
      {#if j > i && !down[i] && !down[j]}<line x1={pos(i)[0]} y1={pos(i)[1]} x2={pos(j)[0]} y2={pos(j)[1]} stroke={ok ? "var(--good)" : "var(--line-strong)"} opacity="0.35" />{/if}
    {/each}
  {/each}
  {#each Array(n) as _, i (i)}
    <g onclick={() => (down[i] = !down[i])} style="cursor:pointer" role="button" tabindex="0" onkeydown={() => (down[i] = !down[i])}>
      <circle cx={pos(i)[0]} cy={pos(i)[1]} r="22" fill={down[i] ? "var(--surface-3)" : i === down.findIndex((d, k) => !d && k < n) && ok ? "var(--accent)" : "var(--good)"} stroke="var(--surface)" stroke-width="3" style="transition: fill 250ms" />
      <text x={pos(i)[0]} y={pos(i)[1] + 5} text-anchor="middle" font-size="14" style="fill:#fff">{down[i] ? "✕" : i === down.findIndex((d, k) => !d && k < n) && ok ? "L" : i + 1}</text>
    </g>
  {/each}
  <text x="320" y="116" text-anchor="middle" font-size="15" font-weight="700" fill={ok ? "var(--good)" : "var(--bad)"} style="fill:{ok ? 'var(--good)' : 'var(--bad)'}">{ok ? "commits ✓" : "stalled ✕"}</text>
</svg>
<div class="readout">{alive} of {n} alive; a majority needs <b>{need}</b>. It can survive <b>{n - need}</b> failure{n - need === 1 ? "" : "s"}. {ok ? "A leader (L) can be elected and writes commit." : "No majority, so it refuses writes rather than risk two diverging histories (it chooses C over A)."}</div>
<div class="ctl"><Range label="cluster size" min={3} max={9} bind:value={n} /></div>
<p class="faint small">Tap nodes to crash or revive them. Try 4 nodes vs 5: an even count buys no extra fault tolerance.</p>
