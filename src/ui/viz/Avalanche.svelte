<script lang="ts">
  let a = $state("transfer $100 to Alice");
  let b = $state("transfer $900 to Alice");
  let ha = $state(""), hb = $state("");
  async function h(s: string) {
    const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
    return [...new Uint8Array(d)].map((x) => x.toString(2).padStart(8, "0")).join("");
  }
  $effect(() => { h(a).then((v) => (ha = v)); });
  $effect(() => { h(b).then((v) => (hb = v)); });
  const diff = $derived(ha && hb ? [...ha].filter((c, i) => c !== hb[i]).length : 0);
  const hex = (bits: string) => bits.match(/.{4}/g)?.map((n) => parseInt(n, 2).toString(16)).join("") ?? "";
</script>

<div class="ins">
  <input bind:value={a} aria-label="message A" />
  <input bind:value={b} aria-label="message B" />
</div>
<div class="grid">
  {#each [...ha] as bit, i (i)}
    <span class="cell" class:one={bit === "1"} class:diff={hb[i] !== bit}></span>
  {/each}
</div>
<div class="row">
  <span class="stat">SHA-256 A: {hex(ha).slice(0, 16)}…</span>
  <span class="stat">B: {hex(hb).slice(0, 16)}…</span>
  <span class="stat" style="color:var(--coral)">{diff} / 256 bits differ ({Math.round((diff / 256) * 100)}%)</span>
</div>
<p class="faint small">Red cells are bits that differ between the two hashes. Change one character: about half the bits flip, and you can't predict which. That's the avalanche effect. This runs real SHA-256 in your browser.</p>

<style>
  .ins {
    display: grid;
    gap: 6px;
  }
  input {
    font: inherit;
    font-family: var(--font-code);
    font-size: 13px;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--line-strong);
    background: var(--surface-2);
    color: var(--text);
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(32, 1fr);
    gap: 2px;
    margin-top: 10px;
  }
  .cell {
    aspect-ratio: 1;
    border-radius: 2px;
    background: var(--surface-3);
    transition: background 250ms;
  }
  .cell.one {
    background: var(--accent);
  }
  .cell.diff {
    background: var(--coral);
  }
</style>
