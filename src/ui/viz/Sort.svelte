<script lang="ts">
  import { rng } from "../../lib/viz";
  // Race bubble sort (n²) against merge sort (n log n) on the same data.
  const N = 40;
  let seed = $state(1);
  type Frame = { a: number[]; hi: number[] };
  function bubble(a0: number[]) { const a = [...a0], f: Frame[] = []; for (let i = 0; i < a.length; i++) for (let j = 0; j < a.length - 1 - i; j++) { if (a[j] > a[j + 1]) [a[j], a[j + 1]] = [a[j + 1], a[j]]; f.push({ a: [...a], hi: [j, j + 1] }); } return f; }
  function merge(a0: number[]) { const a = [...a0], f: Frame[] = []; const go = (lo: number, hi: number) => { if (hi - lo < 2) return; const m = (lo + hi) >> 1; go(lo, m); go(m, hi); const L = a.slice(lo, m), R = a.slice(m, hi); let i = 0, j = 0, k = lo; while (i < L.length || j < R.length) { a[k] = j >= R.length || (i < L.length && L[i] <= R[j]) ? L[i++] : R[j++]; f.push({ a: [...a], hi: [k] }); k++; } }; go(0, a.length); return f; }
  const data = $derived.by(() => { const r = rng(seed); return Array.from({ length: N }, () => 5 + Math.floor(r() * 95)); });
  const fb = $derived(bubble(data)), fm = $derived(merge(data));
  let t = $state(0);
  let timer: ReturnType<typeof setInterval> | undefined;
  function run() { clearInterval(timer); t = 0; timer = setInterval(() => { t += 6; if (t > fb.length) clearInterval(timer); }, 16); }
  $effect(() => () => clearInterval(timer));
  const cur = (f: Frame[]) => f[Math.min(t, f.length - 1)] ?? { a: data, hi: [] };
</script>

{#each [["Bubble sort · O(n²)", fb], ["Merge sort · O(n log n)", fm]] as [label, f] (label)}
  {@const fr = cur(f as Frame[])}
  <div class="lab">{label} <span class="faint">— {Math.min(t, (f as Frame[]).length)} / {(f as Frame[]).length} steps {t >= (f as Frame[]).length ? "✓ done" : ""}</span></div>
  <svg viewBox="0 0 640 90">
    {#each fr.a as v, i (i)}
      <rect x={i * 16} y={90 - v * 0.85} width="13" height={v * 0.85} rx="2" fill={fr.hi.includes(i) ? "var(--coral)" : "var(--accent)"} />
    {/each}
  </svg>
{/each}
<div class="row"><button class="btn sm primary" onclick={run}>▶ Race</button><button class="btn sm" onclick={() => { seed++; t = 0; }}>shuffle</button></div>

<style>
  .lab {
    font-size: 13px;
    font-weight: 600;
    margin: 8px 0 4px;
  }
</style>
