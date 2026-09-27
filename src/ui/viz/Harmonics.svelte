<script lang="ts">
  import { loop, path } from "../../lib/viz";
  // Two tones; hear and see consonance vs beating. Uses Web Audio.
  const IV: [string, number][] = [["unison 1:1", 1], ["octave 2:1", 2], ["fifth 3:2", 1.5], ["fourth 4:3", 4 / 3], ["major third 5:4", 1.25], ["equal-tempered fifth", 2 ** (7 / 12)], ["tritone √2", Math.SQRT2], ["minor second 16:15", 16 / 15], ["out of tune 1.01", 1.01]];
  let ratio = $state(1.5), base = 220;
  let ctx: AudioContext | null = null;
  let oscs: OscillatorNode[] = [];
  let playing = $state(false);
  function play() {
    stop();
    ctx ??= new AudioContext();
    const g = ctx.createGain(); g.gain.value = 0.12; g.connect(ctx.destination);
    for (const f of [base, base * ratio]) { const o = ctx.createOscillator(); o.type = "sawtooth"; o.frequency.value = f; const lp = ctx.createBiquadFilter(); lp.frequency.value = 2200; o.connect(lp).connect(g); o.start(); oscs.push(o); }
    playing = true;
    setTimeout(stop, 2200);
  }
  function stop() { for (const o of oscs) try { o.stop(); } catch {} oscs = []; playing = false; }
  $effect(() => () => stop());
  let t = $state(0);
  function step(dt: number) { t += dt * 0.25; }
  const wave = $derived(path(Array.from({ length: 321 }, (_, i) => { const x = i / 320 * 12 + t; return [i * 2, 60 - (Math.sin(2 * Math.PI * x) + Math.sin(2 * Math.PI * x * ratio)) * 22] as [number, number]; })));
  const harm = $derived(Array.from({ length: 12 }, (_, k) => [(k + 1), (k + 1) * ratio]));
</script>

<svg viewBox="0 0 640 200" use:loop={step}>
  <path d={wave} fill="none" stroke="var(--accent)" stroke-width="2" />
  <text x="0" y="128" font-size="11" opacity="0.7">harmonics of each note (in units of the low note)</text>
  {#each harm as [a, b], k (k)}
    <line x1={a * 50} x2={a * 50} y1="140" y2="160" stroke="var(--accent)" stroke-width="3" />
    {#if b * 50 < 640}<line x1={b * 50} x2={b * 50} y1="165" y2="185" stroke="var(--coral)" stroke-width="3" />{/if}
    {#each harm as [a2], j (j)}{#if Math.abs(a2 - b) < 0.02 && b * 50 < 640}<circle cx={b * 50} cy="162" r="7" fill="none" stroke="var(--good)" stroke-width="2" />{/if}{/each}
  {/each}
</svg>
<div class="row">{#each IV as [l, r] (l)}<button class="btn sm" class:primary={Math.abs(ratio - r) < 1e-9} onclick={() => { ratio = r; play(); }}>{l}</button>{/each}</div>
<div class="row"><button class="btn sm primary" onclick={play}>{playing ? "🔊 playing…" : "▶ play"}</button><span class="stat">{base} Hz + {(base * ratio).toFixed(1)} Hz</span></div>
<p class="faint small">Green circles mark harmonics the two notes share. Simple ratios share many and sound smooth. Near-misses beat against each other, and you can hear the wobble on "out of tune". The equal-tempered fifth is so close to 3:2 that the beating is slow.</p>
