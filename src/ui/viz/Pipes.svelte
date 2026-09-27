<script lang="ts">
  import { cells } from "../../lib/viz";
  import type { VizProps } from "../../lib/viz";
  let { lines }: VizProps = $props();
  // data: "stage command | output after this stage (use \n-separated sample lines via ;)"
  const stages = $derived(lines.map((l) => { const [cmd, out] = cells(l); return { cmd, out: (out ?? "").split(";").map((s) => s.trim()) }; }));
  let upto = $state(0);
</script>

<div class="pipe">
  {#each stages as s, i (i)}
    <button class="st" class:on={i <= upto} onclick={() => (upto = i)}><code>{s.cmd}</code></button>
    {#if i < stages.length - 1}<span class="arrow" class:on={i < upto}>|</span>{/if}
  {/each}
</div>
{#key upto}
  <pre class="out">{#each stages[upto]?.out ?? [] as o, i (i)}<span style="animation-delay:{i * 50}ms">{o}
</span>{/each}</pre>
{/key}
<div class="row">
  <button class="btn sm" onclick={() => (upto = Math.max(0, upto - 1))}>← stage</button>
  <button class="btn sm primary" onclick={() => (upto = Math.min(stages.length - 1, upto + 1))}>add next stage →</button>
</div>

<style>
  .pipe {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
  }
  .st {
    border: 1.5px solid var(--line-strong);
    background: var(--surface-2);
    border-radius: 8px;
    padding: 5px 8px;
    cursor: pointer;
    color: inherit;
    opacity: 0.55;
    transition: all 200ms var(--ease);
  }
  .st.on {
    opacity: 1;
    border-color: var(--accent);
    background: var(--accent-soft);
  }
  .arrow {
    font-family: var(--font-code);
    font-weight: 700;
    color: var(--text-3);
  }
  .arrow.on {
    color: var(--accent);
  }
  .out {
    margin-top: 10px;
    background: #15141d;
    color: #d8f5c8;
    padding: 12px;
    border-radius: 10px;
    font-size: 12.5px;
    min-height: 60px;
    overflow-x: auto;
  }
  .out span {
    display: inline;
    animation: fade 300ms both;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
  }
</style>
