<script lang="ts">
  import Range from "./Range.svelte";
  import { loop } from "../../lib/viz";
  // A live limit order book: quotes refresh; send market orders and watch them walk the book.
  type L = { p: number; q: number };
  let mid = $state(100);
  let bids = $state<L[]>([]), asks = $state<L[]>([]);
  let size = $state(300);
  let fills = $state<{ side: string; avg: number; slip: number } | null>(null);
  let trades = $state<{ p: number; side: number; id: number }[]>([]);
  let tid = 0;
  function rebuild() {
    bids = Array.from({ length: 8 }, (_, i) => ({ p: +(mid - 0.01 * (i + 1)).toFixed(2), q: Math.round(80 + Math.random() * 220 + i * 30) }));
    asks = Array.from({ length: 8 }, (_, i) => ({ p: +(mid + 0.01 * (i + 1)).toFixed(2), q: Math.round(80 + Math.random() * 220 + i * 30) }));
  }
  rebuild();
  let acc = 0;
  function step(dt: number) {
    acc += dt;
    if (acc > 0.35) {
      acc = 0;
      const lvl = Math.floor(Math.random() * 8);
      if (!bids[lvl] || !asks[lvl]) return;
      if (Math.random() < 0.5) bids[lvl].q = Math.max(20, bids[lvl].q + Math.round((Math.random() - 0.5) * 80));
      else asks[lvl].q = Math.max(20, asks[lvl].q + Math.round((Math.random() - 0.5) * 80));
      if (Math.random() < 0.25) { const side = Math.random() < 0.5 ? 1 : -1; if (asks[0] && bids[0]) trades = [{ p: side > 0 ? asks[0].p : bids[0].p, side, id: ++tid }, ...trades.slice(0, 7)]; }
    }
  }
  function market(side: 1 | -1) {
    const book = side > 0 ? asks : bids;
    let left = size, cost = 0;
    for (const l of book) { const take = Math.min(left, l.q); cost += take * l.p; l.q -= take; left -= take; if (!left) break; }
    const filled = size - left, avg = cost / Math.max(1, filled);
    if (!filled) return;
    fills = { side: side > 0 ? "bought" : "sold", avg, slip: Math.abs(avg - book[0].p) };
    trades = [{ p: +avg.toFixed(3), side, id: ++tid }, ...trades.slice(0, 7)];
    setTimeout(() => { mid = +(mid + side * 0.01 * Math.ceil(filled / 400)).toFixed(2); rebuild(); }, 900);
    if (side > 0) asks = asks.filter((l) => l.q > 0); else bids = bids.filter((l) => l.q > 0);
  }
  const maxQ = $derived(Math.max(...bids.map((b) => b.q), ...asks.map((a) => a.q)));
</script>

<div class="ob" use:loop={step}>
  <div class="side">
    <div class="h">bids (buyers)</div>
    {#each bids as b (b.p)}<div class="lvl bid"><span class="bar" style="width:{(b.q / maxQ) * 100}%"></span><span>{b.q}</span><b>{b.p.toFixed(2)}</b></div>{/each}
  </div>
  <div class="side">
    <div class="h">asks (sellers)</div>
    {#each asks as a (a.p)}<div class="lvl ask"><span class="bar" style="width:{(a.q / maxQ) * 100}%"></span><b>{a.p.toFixed(2)}</b><span>{a.q}</span></div>{/each}
  </div>
  <div class="tape">
    <div class="h">trades</div>
    {#each trades as t (t.id)}<div class="tr" style="color:{t.side > 0 ? 'var(--good)' : 'var(--bad)'}">{t.side > 0 ? "▲" : "▼"} {t.p}</div>{/each}
  </div>
</div>
<div class="row"><span class="stat">spread {asks[0] && bids[0] ? (asks[0].p - bids[0].p).toFixed(2) : "—"}</span><span class="stat">mid {mid.toFixed(2)}</span></div>
<div class="ctl"><Range label="order size" min={50} max={1500} step={50} bind:value={size} /></div>
<div class="row"><button class="btn sm" style="background:var(--good);color:#fff" onclick={() => market(1)}>Market BUY {size}</button><button class="btn sm" style="background:var(--bad);color:#fff" onclick={() => market(-1)}>Market SELL {size}</button></div>
{#if fills}<div class="readout">You {fills.side} at an average of <b>{fills.avg.toFixed(4)}</b>, <b style="color:var(--coral)">{fills.slip.toFixed(4)}</b> worse than the best price (slippage). Bigger orders walk deeper into the book, and the price then moves.</div>{/if}

<style>
  .ob {
    display: grid;
    grid-template-columns: 1fr 1fr 78px;
    gap: 8px;
    font-family: var(--font-code);
    font-size: 12px;
  }
  .h {
    font-family: var(--font-ui);
    font-size: 11px;
    color: var(--text-3);
    margin-bottom: 4px;
  }
  .lvl {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 2px 6px;
    margin-bottom: 2px;
    border-radius: 4px;
    overflow: hidden;
  }
  .lvl > * {
    position: relative;
  }
  .bar {
    position: absolute !important;
    top: 0;
    bottom: 0;
    transition: width 300ms var(--ease);
    opacity: 0.22;
  }
  .bid .bar {
    right: 0;
    background: var(--good);
  }
  .ask .bar {
    left: 0;
    background: var(--bad);
  }
  .tr {
    animation: in 300ms;
  }
  @keyframes in {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
  }
</style>
