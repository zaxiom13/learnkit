<script lang="ts">
  import { cells, PALETTE, type VizProps } from "../../lib/viz";
  let { opts, lines }: VizProps = $props();
  // data: "layer | what it does" from top to bottom; opts: packet="label" animates a request down and back up
  const layers = $derived(lines.map((l) => { const [name, what] = cells(l); return { name, what: what ?? "" }; }));
  let sel = $state(-1);
  let at = $state(-1);
  let dir = $state(1);
  let timer: ReturnType<typeof setInterval> | undefined;
  function send() {
    clearInterval(timer);
    at = 0; dir = 1;
    timer = setInterval(() => {
      if (dir > 0 && at >= layers.length - 1) dir = -1;
      else if (dir < 0 && at <= 0) { clearInterval(timer); at = -1; return; }
      at += dir;
    }, 450);
  }
  $effect(() => () => clearInterval(timer));
</script>

<div class="stack">
  {#each layers as l, i (i)}
    <button class="layer" class:sel={sel === i} class:hot={at === i} style="--c:{PALETTE[i % PALETTE.length]}; animation-delay:{i * 80}ms" onclick={() => (sel = sel === i ? -1 : i)}>
      <span class="n">{i + 1}</span>
      <span class="name">{@html l.name}</span>
      {#if at === i}<span class="pkt">{opts.packet ?? "request"} {dir > 0 ? "↓" : "↑"}</span>{/if}
    </button>
    {#if sel === i && l.what}<div class="what">{@html l.what}</div>{/if}
  {/each}
</div>
<div class="row">
  {#if opts.packet}<button class="btn sm primary" onclick={send}>▶ Send a {opts.packet}</button>{/if}
  <span class="faint small">Tap a layer to see what it does.</span>
</div>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .layer {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: var(--r-md);
    border: 1.5px solid color-mix(in srgb, var(--c) 45%, transparent);
    background: color-mix(in srgb, var(--c) 10%, var(--surface));
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
    animation: slide 450ms var(--ease-spring) both;
    transition: all 250ms var(--ease);
  }
  @keyframes slide {
    from {
      opacity: 0;
      transform: translateX(-14px);
    }
  }
  .layer.hot,
  .layer.sel {
    background: color-mix(in srgb, var(--c) 28%, var(--surface));
    transform: scale(1.015);
  }
  .n {
    font-family: var(--font-code);
    font-size: 11px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--c);
    color: #fff;
    flex: none;
  }
  .name {
    font-weight: 600;
    font-size: 14px;
    flex: 1;
  }
  .pkt {
    font-family: var(--font-code);
    font-size: 11.5px;
    padding: 2px 8px;
    border-radius: 999px;
    background: var(--c);
    color: #fff;
    animation: pop 300ms var(--ease-spring);
  }
  @keyframes pop {
    from {
      transform: scale(0.5);
    }
  }
  .what {
    font-size: 13.5px;
    color: var(--text-2);
    padding: 4px 12px 8px 42px;
  }
</style>
