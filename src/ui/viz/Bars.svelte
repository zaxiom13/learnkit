<script lang="ts">
  import { cells, PALETTE, type VizProps } from "../../lib/viz";
  let { opts, lines }: VizProps = $props();
  // data: "label | value | note"; opts: log=1, unit=, sort=1
  const log = $derived(opts.log === "1");
  const unit = $derived(opts.unit ?? "");
  const rows = $derived.by(() => {
    const r = lines.map((l) => { const [label, v, note] = cells(l); return { label, v: Number(v), note: note ?? "" }; });
    return opts.sort === "1" ? r.sort((a, b) => b.v - a.v) : r;
  });
  const scale = $derived.by(() => {
    const vs = rows.map((r) => r.v).filter((v) => v > 0);
    if (log) {
      const lo = Math.floor(Math.log10(Math.min(...vs))), hi = Math.ceil(Math.log10(Math.max(...vs)));
      return (v: number) => (Math.log10(Math.max(v, 10 ** lo)) - lo + 0.15) / (hi - lo + 0.15);
    }
    const hi = Math.max(...rows.map((r) => Math.abs(r.v)));
    return (v: number) => Math.abs(v) / hi;
  });
  let sel = $state(-1);
  let shown = $state(false);
  $effect(() => { const t = setTimeout(() => (shown = true), 50); return () => clearTimeout(t); });
  const fmt = (v: number) => (Math.abs(v) >= 1e4 || (Math.abs(v) < 1e-2 && v !== 0) ? v.toExponential(1) : String(+v.toFixed(3)));
</script>

<div class="bars">
  {#each rows as r, i (i)}
    <button class="brow" class:sel={sel === i} onclick={() => (sel = sel === i ? -1 : i)}>
      <span class="lab">{@html r.label}</span>
      <span class="track"><span class="fill" style="width:{shown ? Math.max(1.5, scale(r.v) * 100) : 0}%; background:{r.v < 0 ? 'var(--bad)' : PALETTE[i % PALETTE.length]}; transition-delay:{i * 70}ms"></span></span>
      <span class="val">{fmt(r.v)}{unit}</span>
    </button>
  {/each}
</div>
{#if sel >= 0 && rows[sel].note}<div class="readout">{@html rows[sel].note}</div>{:else if rows.some((r) => r.note)}<div class="faint small" style="margin-top:8px">Tap a bar for more.</div>{/if}
{#if log}<div class="faint small">Log scale — each gridline step is ×10.</div>{/if}

<style>
  .bars {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .brow {
    display: grid;
    grid-template-columns: minmax(110px, 34%) 1fr 76px;
    gap: 10px;
    align-items: center;
    background: none;
    border: none;
    padding: 3px 4px;
    border-radius: 8px;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }
  .brow:hover,
  .brow.sel {
    background: var(--surface-2);
  }
  .lab {
    font-size: 13px;
  }
  .track {
    height: 14px;
    border-radius: 7px;
    background: var(--surface-3);
    overflow: hidden;
  }
  .fill {
    display: block;
    height: 100%;
    border-radius: 7px;
    transition: width 900ms var(--ease);
  }
  .val {
    font-family: var(--font-code);
    font-size: 12px;
    text-align: right;
  }
</style>
