<script lang="ts">
  import { cells, type VizProps } from "../../lib/viz";
  let { opts, lines }: VizProps = $props();
  // data: "value | label | shown date (optional) | detail (optional)"; opts: log=1 means values are "years ago"
  const log = $derived(opts.log === "1");
  const items = $derived(
    lines.map((l) => {
      const [v, label, when, detail] = cells(l);
      return { v: Number(v), label, when: when || v, detail: detail ?? "" };
    }),
  );
  const pos = $derived.by(() => {
    const xs = items.map((it) => (log ? -Math.log10(Math.max(it.v, 1)) : it.v));
    const lo = Math.min(...xs), hi = Math.max(...xs);
    return xs.map((x) => 30 + ((x - lo) / (hi - lo || 1)) * 580);
  });
  let sel = $state(0);
  let quiz = $state(false);
  let revealed = $state<Record<number, boolean>>({});
  let playing = $state(false);
  let timer: ReturnType<typeof setInterval> | undefined;
  function play() {
    playing = !playing;
    clearInterval(timer);
    if (playing) {
      sel = 0;
      timer = setInterval(() => {
        if (sel >= items.length - 1) { playing = false; clearInterval(timer); } else sel++;
      }, 1400);
    }
  }
  $effect(() => () => clearInterval(timer));
  const it = $derived(items[sel]);
</script>

<svg viewBox="0 0 640 110" role="img" aria-label="timeline">
  <line x1="20" x2="620" y1="60" y2="60" stroke="var(--line-strong)" stroke-width="3" stroke-linecap="round" />
  <line x1="20" x2={pos[sel]} y1="60" y2="60" stroke="var(--accent)" stroke-width="3" stroke-linecap="round" style="transition: all 500ms var(--ease)" />
  {#each items as item, i (i)}
    <g class="pt" style="animation-delay:{i * 60}ms" onclick={() => { sel = i; if (quiz) revealed[i] = true; }} role="button" tabindex="0" onkeydown={(e) => e.key === "Enter" && (sel = i)}>
      <circle cx={pos[i]} cy="60" r={i === sel ? 10 : 6.5} fill={i === sel ? "var(--accent)" : i < sel ? "var(--accent)" : "var(--surface)"} stroke="var(--accent)" stroke-width="2.5" style="transition: all 300ms var(--ease-spring)" />
      <text x={pos[i]} y={i % 2 ? 94 : 34} text-anchor="middle" font-size="11" opacity={i === sel ? 1 : 0.55}>{i + 1}</text>
    </g>
  {/each}
  {#if log}<text x="20" y="108" font-size="10" opacity="0.6">← longer ago (log scale)</text><text x="620" y="108" font-size="10" opacity="0.6" text-anchor="end">now →</text>{/if}
</svg>
{#if it}
  {#key sel}
    <div class="readout pop">
      <div class="when">{it.when}</div>
      {#if quiz && !revealed[sel]}
        <button class="btn sm" onclick={() => (revealed[sel] = true)}>What happened? (tap to reveal)</button>
      {:else}
        <div class="what">{@html it.label}</div>
        {#if it.detail}<div class="det">{@html it.detail}</div>{/if}
      {/if}
    </div>
  {/key}
{/if}
<div class="row">
  <button class="btn sm" onclick={() => (sel = Math.max(0, sel - 1))} disabled={sel === 0}>←</button>
  <button class="btn sm" onclick={() => (sel = Math.min(items.length - 1, sel + 1))} disabled={sel === items.length - 1}>→</button>
  <button class="btn sm" onclick={play}>{playing ? "■ Stop" : "▶ Play"}</button>
  <button class="btn sm" class:primary={quiz} onclick={() => { quiz = !quiz; revealed = {}; }}>{quiz ? "Quiz mode on" : "Quiz me"}</button>
  <span class="faint small">{sel + 1} / {items.length}</span>
</div>

<style>
  .pt {
    cursor: pointer;
    animation: rise 500ms var(--ease-spring) both;
  }
  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
  }
  .when {
    font-family: var(--font-code);
    font-size: 12px;
    color: var(--accent);
    font-weight: 600;
  }
  .what {
    font-weight: 650;
    font-size: 16px;
    margin-top: 2px;
  }
  .det {
    color: var(--text-2);
    font-size: 13.5px;
    margin-top: 4px;
  }
  .pop {
    animation: pop 350ms var(--ease-spring);
  }
  @keyframes pop {
    from {
      opacity: 0;
      transform: scale(0.97);
    }
  }
</style>
