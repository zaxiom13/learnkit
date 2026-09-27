<script lang="ts">
  import Range from "./Range.svelte";
  import { ncdf, path } from "../../lib/viz";
  // Black–Scholes call/put value vs spot, with payoff at expiry and Greeks at the chosen spot.
  let K = $state(100), sig = $state(25), T = $state(0.5), r = $state(4), S0 = $state(100);
  let put = $state(false);
  const bs = (S: number, T: number) => {
    if (T <= 0) return { v: put ? Math.max(K - S, 0) : Math.max(S - K, 0), d: 0, g: 0 };
    const s = sig / 100, rr = r / 100;
    const d1 = (Math.log(S / K) + (rr + (s * s) / 2) * T) / (s * Math.sqrt(T)), d2 = d1 - s * Math.sqrt(T);
    const call = S * ncdf(d1) - K * Math.exp(-rr * T) * ncdf(d2);
    const v = put ? call - S + K * Math.exp(-rr * T) : call;
    const pdf = Math.exp((-d1 * d1) / 2) / Math.sqrt(2 * Math.PI);
    return { v, d: put ? ncdf(d1) - 1 : ncdf(d1), g: pdf / (S * s * Math.sqrt(T)) };
  };
  const X = (S: number) => 20 + ((S - 50) / 100) * 600, Y = (v: number) => 190 - v * 3.4;
  const curve = $derived(path(Array.from({ length: 101 }, (_, i) => { const S = 50 + i; return [X(S), Y(bs(S, T).v)] as [number, number]; })));
  const payoff = $derived(path(Array.from({ length: 101 }, (_, i) => { const S = 50 + i; return [X(S), Y(put ? Math.max(K - S, 0) : Math.max(S - K, 0))] as [number, number]; })));
  const now = $derived(bs(S0, T));
</script>

<svg viewBox="0 0 640 210">
  <line x1="20" x2="620" y1="190" y2="190" stroke="var(--line-strong)" />
  <line x1={X(K)} x2={X(K)} y1="20" y2="190" stroke="var(--text-3)" stroke-dasharray="3 4" /><text x={X(K) + 4} y="30" font-size="10" opacity="0.7">strike</text>
  <path d={payoff} fill="none" stroke="var(--text-3)" stroke-width="2" stroke-dasharray="6 4" />
  <path d={curve} fill="none" stroke="var(--accent)" stroke-width="3" />
  <line x1={X(S0) - 60} x2={X(S0) + 60} y1={Y(now.v) + now.d * 60 * 3.4 * (100 / 600)} y2={Y(now.v) - now.d * 60 * 3.4 * (100 / 600)} stroke="var(--coral)" stroke-width="2" />
  <circle cx={X(S0)} cy={Y(now.v)} r="6" fill="var(--coral)" />
  <text x="24" y="16" font-size="11">value today (blue) vs payoff at expiry (dashed) · red line = delta</text>
  {#each [60, 80, 100, 120, 140] as s (s)}<text x={X(s)} y="204" font-size="10" text-anchor="middle" opacity="0.6">{s}</text>{/each}
</svg>
<div class="row">
  <span class="stat">price {now.v.toFixed(2)}</span><span class="stat">Δ {now.d.toFixed(3)}</span><span class="stat">Γ {now.g.toFixed(4)}</span>
  <button class="btn sm" class:primary={!put} onclick={() => (put = false)}>call</button><button class="btn sm" class:primary={put} onclick={() => (put = true)}>put</button>
</div>
<div class="ctl">
  <Range label="spot S" min={50} max={150} bind:value={S0} />
  <Range label="volatility σ %" min={1} max={100} bind:value={sig} />
  <Range label="time to expiry (y)" min={0} max={2} step={0.01} bind:value={T} fmt={(v) => v.toFixed(2)} />
  <Range label="rate r %" min={0} max={10} step={0.25} bind:value={r} fmt={(v) => v.toFixed(2)} />
</div>
<p class="faint small">Slide time to 0: the smooth curve collapses onto the hockey-stick payoff (theta decay). Raise vol: every option gets more valuable. Gamma, the curvature, is biggest at the strike near expiry.</p>
