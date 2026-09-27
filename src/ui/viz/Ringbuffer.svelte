<script lang="ts">
  import Range from "./Range.svelte";
  import { loop } from "../../lib/viz";
  const N = 16;
  let slots = $state<(number | null)[]>(new Array(N).fill(null));
  let head = $state(0), tail = $state(0), seq = 0;
  let prod = $state(6), cons = $state(5);
  let pa = 0, ca = 0;
  let dropped = $state(0);
  function step(dt: number) {
    pa += dt * prod; ca += dt * cons;
    while (pa >= 1) { pa--; if (head - tail < N) { slots[head % N] = ++seq; head++; } else dropped++; }
    while (ca >= 1) { ca--; if (tail < head) { slots[tail % N] = null; tail++; } }
  }
  const pt = (i: number, r: number) => { const a = (i / N) * Math.PI * 2 - Math.PI / 2; return [220 + Math.cos(a) * r, 130 + Math.sin(a) * r]; };
</script>

<svg viewBox="0 0 640 260" use:loop={step}>
  {#each slots as s, i (i)}
    {@const [x, y] = pt(i + 0.5, 90)}
    <path d="M{pt(i, 60)[0]} {pt(i, 60)[1]} L{pt(i, 110)[0]} {pt(i, 110)[1]} A110 110 0 0 1 {pt(i + 1, 110)[0]} {pt(i + 1, 110)[1]} L{pt(i + 1, 60)[0]} {pt(i + 1, 60)[1]} A60 60 0 0 0 {pt(i, 60)[0]} {pt(i, 60)[1]}Z" fill={s ? "var(--accent)" : "var(--surface-2)"} stroke="var(--surface)" stroke-width="2" style="transition: fill 200ms" />
    {#if s}<text {x} y={y + 4} font-size="10" text-anchor="middle" fill="#fff" style="fill:#fff">{s % 100}</text>{/if}
  {/each}
  {#each [[head, "head (producer)", "var(--coral)", 128], [tail, "tail (consumer)", "var(--good)", 128]] as [idx, l, c, r] (l)}
    {@const [x, y] = pt((idx as number) % N + 0.5, r as number)}
    <circle cx={x} cy={y} r="7" fill={c as string} style="transition: all 150ms" />
  {/each}
  <text x="220" y="126" text-anchor="middle" font-size="22" font-weight="700">{head - tail}/{N}</text>
  <text x="220" y="146" text-anchor="middle" font-size="11" opacity="0.6">filled</text>
  <g font-size="12.5">
    <circle cx="400" cy="70" r="6" fill="var(--coral)" /><text x="412" y="74">head: only the producer writes it</text>
    <circle cx="400" cy="98" r="6" fill="var(--good)" /><text x="412" y="102">tail: only the consumer writes it</text>
    <text x="400" y="140" opacity="0.8">One writer per index,</text>
    <text x="400" y="158" opacity="0.8">so no locks are needed.</text>
    <text x="400" y="196" fill="var(--bad)" style="fill:var(--bad)">full → dropped/backpressure: {dropped}</text>
  </g>
</svg>
<div class="ctl">
  <Range label="producer msgs/s" min={0} max={20} bind:value={prod} />
  <Range label="consumer msgs/s" min={0} max={20} bind:value={cons} />
</div>
