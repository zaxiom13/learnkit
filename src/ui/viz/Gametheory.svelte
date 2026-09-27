<script lang="ts">
  import { loop } from "../../lib/viz";
  // Iterated prisoner's dilemma tournament: strategies play round-robin.
  const S = {
    "Always cooperate": () => "C",
    "Always defect": () => "D",
    "Tit for tat": (m: string[], o: string[]) => o[o.length - 1] ?? "C",
    "Grudger": (m: string[], o: string[]) => (o.includes("D") ? "D" : "C"),
    "Random": () => (Math.random() < 0.5 ? "C" : "D"),
    "Tit for two tats": (m: string[], o: string[]) => (o.slice(-2).join("") === "DD" ? "D" : "C"),
  } as Record<string, (m: string[], o: string[]) => string>;
  const PAY: Record<string, [number, number]> = { CC: [3, 3], CD: [0, 5], DC: [5, 0], DD: [1, 1] };
  const names = Object.keys(S);
  let scores = $state<Record<string, number>>(Object.fromEntries(names.map((n) => [n, 0])));
  let rounds = $state(0), running = $state(false);
  let last = $state("");
  function match(a: string, b: string) { const ma: string[] = [], mb: string[] = []; let sa = 0, sb = 0; for (let i = 0; i < 20; i++) { const x = S[a](ma, mb), y = S[b](mb, ma); ma.push(x); mb.push(y); const [p, q] = PAY[x + y]; sa += p; sb += q; } return [sa, sb, ma.join(""), mb.join("")]; }
  let acc = 0;
  function step(dt: number) {
    if (!running) return;
    acc += dt; if (acc < 0.12) return; acc = 0;
    const a = names[Math.floor(Math.random() * names.length)], b = names[Math.floor(Math.random() * names.length)];
    const [sa, sb, ma, mb] = match(a, b) as [number, number, string, string];
    scores[a] += sa; scores[b] += sb; rounds++;
    last = `${a}: ${ma}\n${b}: ${mb}`;
  }
  const ranked = $derived(Object.entries(scores).sort((x, y) => y[1] - x[1]));
  const mx = $derived(Math.max(1, ...Object.values(scores)));
</script>

<table class="pay"><tbody>
  <tr><td></td><td>they cooperate</td><td>they defect</td></tr>
  <tr><td>you cooperate</td><td class="g">3, 3</td><td class="b">0, 5</td></tr>
  <tr><td>you defect</td><td class="b">5, 0</td><td>1, 1</td></tr>
</tbody></table>
<div class="rank" use:loop={step}>
  {#each ranked as [n, s], i (n)}<div class="r"><span>{i + 1}. {n}</span><span class="t"><span class="f" style="width:{(s / mx) * 100}%"></span></span><span class="v">{s}</span></div>{/each}
</div>
{#if last}<pre class="log">{last}</pre>{/if}
<div class="row"><button class="btn sm primary" onclick={() => (running = !running)}>{running ? "pause" : "▶ run tournament"}</button><button class="btn sm" onclick={() => { scores = Object.fromEntries(names.map((n) => [n, 0])); rounds = 0; }}>reset</button><span class="stat">{rounds} matches</span></div>
<p class="faint small">In one round, defecting is always better for you, yet mutual defection is worse for both. Repeat the game and nice, retaliatory, forgiving strategies like Tit for Tat tend to win (Axelrod's tournaments, 1980). It's a model of trust, cartels, arms races and why cooperation evolves.</p>

<style>
  .pay {
    font-size: 12.5px;
    border-collapse: collapse;
    margin-bottom: 10px;
  }
  .pay td {
    padding: 5px 9px;
    border: 1px solid var(--line);
    text-align: center;
  }
  .g {
    background: var(--good-soft);
  }
  .b {
    background: var(--bad-soft);
  }
  .r {
    display: grid;
    grid-template-columns: 150px 1fr 60px;
    gap: 8px;
    align-items: center;
    font-size: 13px;
    margin-bottom: 4px;
  }
  .t {
    height: 12px;
    background: var(--surface-3);
    border-radius: 6px;
    overflow: hidden;
  }
  .f {
    display: block;
    height: 100%;
    background: var(--accent);
    transition: width 200ms;
  }
  .v {
    font-family: var(--font-code);
    font-size: 12px;
    text-align: right;
  }
  .log {
    font-size: 11px;
    background: var(--surface-2);
    padding: 8px;
    border-radius: 8px;
    overflow-x: auto;
  }
</style>
