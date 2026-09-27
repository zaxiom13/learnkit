<script lang="ts">
  import { cells, PALETTE, type VizProps } from "../../lib/viz";
  let { lines }: VizProps = $props();
  // data: ". Name | note" — the number of leading dots is the depth (1 = root level)
  type N = { name: string; note: string; depth: number; kids: N[]; open: boolean; c: string };
  function build(lines: string[]) {
    const out: N[] = [];
    const stack: N[] = [];
    let top = 0;
    for (const l of lines) {
      const m = /^(\.+)\s*(.*)$/.exec(l);
      if (!m) continue;
      const [name, note] = cells(m[2]);
      const n: N = { name, note: note ?? "", depth: m[1].length, kids: [], open: m[1].length < 2, c: "" };
      while (stack.length && stack[stack.length - 1].depth >= n.depth) stack.pop();
      if (stack.length) { n.c = stack[stack.length - 1].c; stack[stack.length - 1].kids.push(n); }
      else { n.c = PALETTE[top++ % PALETTE.length]; out.push(n); }
      stack.push(n);
    }
    return out;
  }
  // svelte-ignore state_referenced_locally
  let tree = $state<N[]>(build(lines));
  let note = $state("");
</script>

{#snippet node(n: N)}
  <li>
    <button class="nd" style="--c:{n.c}" onclick={() => { n.open = !n.open; note = n.note ? `<b>${n.name}</b> — ${n.note}` : ""; }}>
      {#if n.kids.length}<span class="car" class:open={n.open}>▸</span>{:else}<span class="leaf"></span>{/if}
      {@html n.name}
      {#if n.kids.length && !n.open}<span class="cnt">+{n.kids.length}</span>{/if}
    </button>
    {#if n.open && n.kids.length}
      <ul>{#each n.kids as k, i (i)}{@render node(k)}{/each}</ul>
    {/if}
  </li>
{/snippet}

<ul class="tree">{#each tree as r, i (i)}{@render node(r)}{/each}</ul>
<div class="readout">{#if note}{@html note}{:else}<span class="faint">Tap a branch to open it and read about it.</span>{/if}</div>

<style>
  .tree,
  .tree :global(ul) {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  .tree :global(ul) {
    padding-left: 18px;
    border-left: 2px dashed var(--line-strong);
    margin-left: 9px;
    animation: grow 300ms var(--ease);
  }
  @keyframes grow {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
  }
  .nd {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    font-size: 14px;
    padding: 4px 8px;
    margin: 1px 0;
    border-radius: 8px;
    cursor: pointer;
  }
  .nd:hover {
    background: color-mix(in srgb, var(--c) 14%, transparent);
  }
  .car {
    color: var(--c);
    transition: transform 200ms var(--ease);
    display: inline-block;
  }
  .car.open {
    transform: rotate(90deg);
  }
  .leaf {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--c);
  }
  .cnt {
    font-size: 11px;
    color: var(--text-3);
    font-family: var(--font-code);
  }
</style>
