<script lang="ts">
  // Type DNA; see transcription to mRNA and translation to amino acids (standard code).
  const B = "TCAG";
  const AA = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG";
  const NAMES: Record<string, string> = { F: "Phe", L: "Leu", S: "Ser", Y: "Tyr", "*": "STOP", C: "Cys", W: "Trp", P: "Pro", H: "His", Q: "Gln", R: "Arg", I: "Ile", M: "Met", T: "Thr", N: "Asn", K: "Lys", V: "Val", A: "Ala", D: "Asp", E: "Glu", G: "Gly" };
  const tr = (c: string) => AA[B.indexOf(c[0]) * 16 + B.indexOf(c[1]) * 4 + B.indexOf(c[2])];
  let dna = $state("ATGGTGCACCTGACTCCTGAGGAGAAGTCTTAA");
  const clean = $derived(dna.toUpperCase().replace(/[^ACGT]/g, ""));
  const codons = $derived(clean.match(/.{3}/g) ?? []);
  const COL: Record<string, string> = { A: "#f2594b", C: "#3f4cf5", G: "#19935f", T: "#c98110", U: "#c98110" };
  function sickle() { dna = "ATGGTGCACCTGACTCCTGTGGAGAAGTCTTAA"; }
  function normal() { dna = "ATGGTGCACCTGACTCCTGAGGAGAAGTCTTAA"; }
  function mutate() { const i = Math.floor(Math.random() * clean.length); dna = clean.slice(0, i) + "ACGT"[Math.floor(Math.random() * 4)] + clean.slice(i + 1); }
</script>

<input bind:value={dna} aria-label="DNA sequence" spellcheck="false" />
<div class="lane"><span class="tag">DNA</span>{#each [...clean] as b, i (i)}<span class="b" style="background:{COL[b]}">{b}</span>{/each}</div>
<div class="lane"><span class="tag">mRNA</span>{#each [...clean.replace(/T/g, "U")] as b, i (i)}<span class="b" style="background:{COL[b]}; animation-delay:{i * 15}ms">{b}</span>{/each}</div>
<div class="lane"><span class="tag">protein</span>
  {#each codons as c, i (i)}{@const a = tr(c)}<span class="aa" class:stop={a === "*"} class:start={i === 0 && a === "M"} title={c}>{NAMES[a]}</span>{/each}
</div>
<div class="row"><button class="btn sm" onclick={normal}>β-globin (normal)</button><button class="btn sm" onclick={sickle}>sickle-cell (A→T)</button><button class="btn sm" onclick={mutate}>random point mutation</button></div>
<p class="faint small">This is the start of the human β-globin gene. Change one letter (GAG→GTG) and Glu becomes Val: that's sickle-cell disease. Many other changes are silent, because 64 codons map to only 20 amino acids.</p>

<style>
  input {
    width: 100%;
    font-family: var(--font-code);
    font-size: 13px;
    padding: 8px 10px;
    border-radius: 8px;
    border: 1px solid var(--line-strong);
    background: var(--surface-2);
    color: var(--text);
    margin-bottom: 8px;
  }
  .lane {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    align-items: center;
    margin: 4px 0;
  }
  .tag {
    width: 62px;
    font-size: 11px;
    color: var(--text-3);
  }
  .b {
    width: 17px;
    height: 20px;
    display: grid;
    place-items: center;
    font-family: var(--font-code);
    font-size: 11px;
    color: #fff;
    border-radius: 3px;
    animation: in 300ms both;
  }
  @keyframes in {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
  }
  .aa {
    width: 53px;
    text-align: center;
    font-family: var(--font-code);
    font-size: 11px;
    padding: 3px 0;
    border-radius: 999px;
    background: var(--accent-soft);
    color: var(--accent);
  }
  .aa.start {
    background: var(--good);
    color: #fff;
  }
  .aa.stop {
    background: var(--bad);
    color: #fff;
  }
</style>
