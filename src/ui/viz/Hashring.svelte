<script lang="ts">
  import { rng } from "../../lib/viz";
  let nodes = $state(4);
  let consistent = $state(true);
  const keys = Array.from({ length: 60 }, (_, i) => rng(i + 11)());
  const nodePos = (k: number) => Array.from({ length: k }, (_, i) => rng(1000 + i)());
  function owner(key: number, k: number, cons: boolean) {
    if (!cons) return Math.floor(key * 1e6) % k;
    const ps = nodePos(k);
    let best = -1, bd = 2;
    ps.forEach((p, i) => { const d = (p - key + 1) % 1; if (d < bd) { bd = d; best = i; } });
    return best;
  }
  let prev = $state<number[]>([]);
  const cur = $derived(keys.map((k) => owner(k, nodes, consistent)));
  let moved = $state(0);
  function set(k: number) { prev = keys.map((x) => owner(x, nodes, consistent)); nodes = k; moved = keys.filter((x, i) => owner(x, k, consistent) !== prev[i]).length; }
  const C = ["var(--accent)", "var(--coral)", "var(--good)", "var(--warn)", "#7b43c9", "#1c8f7a", "#b1308a", "#2f7fd1"];
  const at = (p: number, r: number) => [320 + Math.cos(p * 2 * Math.PI - Math.PI / 2) * r, 115 + Math.sin(p * 2 * Math.PI - Math.PI / 2) * r];
</script>

<svg viewBox="0 0 640 230">
  <circle cx="320" cy="115" r="90" fill="none" stroke="var(--line-strong)" stroke-width="2" />
  {#each keys as k, i (i)}
    <circle cx={at(k, 90)[0]} cy={at(k, 90)[1]} r="4.5" fill={C[cur[i] % 8]} style="transition: fill 400ms" />
  {/each}
  {#if consistent}
    {#each nodePos(nodes) as p, i (i)}
      <rect x={at(p, 112)[0] - 10} y={at(p, 112)[1] - 10} width="20" height="20" rx="5" fill={C[i % 8]} />
    {/each}
  {/if}
</svg>
<div class="row">
  <button class="btn sm" onclick={() => nodes > 2 && set(nodes - 1)}>− server</button>
  <button class="btn sm" onclick={() => nodes < 8 && set(nodes + 1)}>+ server</button>
  <button class="btn sm" class:primary={consistent} onclick={() => { consistent = !consistent; moved = 0; }}>{consistent ? "consistent hashing" : "hash mod N"}</button>
  <span class="stat">{nodes} servers</span>
  <span class="stat" style="color:var(--coral)">keys moved last change: {moved}/60</span>
</div>
<p class="faint small">With "hash mod N", adding one server reshuffles nearly every key. With consistent hashing (servers placed on a ring; each key goes clockwise to the next server), only about 1/N of them move.</p>
