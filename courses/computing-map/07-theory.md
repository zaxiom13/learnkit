---
title: Theory — what can be computed, and how fast
blurb: Turing machines, halting, P vs NP, complexity classes, information theory — the physics of computation.
section: Foundations
---

## Computability

- **Turing machine (1936)**: a minimal model that captures "any algorithm" (the **Church–Turing thesis**).
- **Halting problem**: no program can decide, for every program and input, whether it halts. Proof by diagonalisation — the same trick as Cantor and Gödel.
- **Rice's theorem**: every non-trivial question about what a program *does* is undecidable. (That's why perfect bug-finders can't exist.)

<figure class="diagram">
<svg viewBox="0 0 640 230">
<ellipse cx="320" cy="120" rx="300" ry="105" fill="color-mix(in srgb, var(--warn) 10%, transparent)" stroke="var(--warn)" stroke-width="2"/>
<ellipse cx="290" cy="130" rx="220" ry="80" fill="color-mix(in srgb, var(--coral) 10%, transparent)" stroke="var(--coral)" stroke-width="2"/>
<ellipse cx="230" cy="140" rx="120" ry="55" fill="color-mix(in srgb, var(--good) 14%, transparent)" stroke="var(--good)" stroke-width="2"/>
<ellipse cx="420" cy="115" rx="70" ry="38" fill="color-mix(in srgb, #7b43c9 18%, transparent)" stroke="#7b43c9" stroke-width="2" stroke-dasharray="5 4" class="pulse"/>
<g font-size="12.5">
<text x="560" y="40" font-weight="700">PSPACE</text><text x="560" y="56" font-size="10.5">chess, Go (generalised)</text>
<text x="440" y="70" font-weight="700">NP</text>
<text x="200" y="130" font-weight="700">P</text><text x="170" y="150" font-size="10.5">sorting, shortest path,</text><text x="170" y="165" font-size="10.5">linear programming, primality</text>
<text x="420" y="110" text-anchor="middle" font-weight="700">NP-complete</text><text x="420" y="126" text-anchor="middle" font-size="10.5">SAT, TSP, sudoku, knapsack</text>
<text x="330" y="200" font-size="10.5">factoring: in NP, probably not NP-complete; in BQP (quantum-easy)</text>
</g></svg>
<figcaption>The standard picture, assuming P ≠ NP (nobody has proved it). If any NP-complete problem fell to a fast algorithm, the purple and green regions would merge.</figcaption>
</figure>

## Complexity

| class | informally |
|---|---|
| **P** | solvable in polynomial time |
| **NP** | solutions checkable in polynomial time (sudoku, SAT, travelling salesman decision) |
| **NP-complete** | the hardest in NP; solve one fast → solve all (SAT was first: Cook–Levin 1971) |
| **NP-hard** | at least as hard as NP-complete (may not be in NP) |
| **PSPACE** | polynomial memory (many games) |
| **BQP** | efficient on a quantum computer (factoring is here) |

**P vs NP** is a Millennium Prize problem ($1M). Most believe P ≠ NP.

## Big-O you should feel

| O(…) | example | n = 10⁶ |
|---|---|---|
| 1 | hash lookup | instant |
| log n | binary search | ~20 steps |
| n | scan | 10⁶ |
| n log n | sorting | ~2×10⁷ |
| n² | naive pairwise | 10¹² — hours |
| 2ⁿ | brute-force subsets | never |

```viz bigo
> Feel the difference. At n = 60, 2ⁿ is about 10¹⁸ steps: centuries on a modern CPU.
```

## Physics of computation

- **Shannon entropy** H = −Σ p log₂ p bits: the limit of lossless compression.
- **Landauer's principle**: erasing one bit costs at least kT ln 2 of energy — information is physical.
- **Reversible computing** and **quantum computing** both grow from this.

```viz sort
> Same data, two algorithms. Merge sort does about n log₂ n ≈ 200 comparisons for 40 items. Bubble sort needs about n²/2 ≈ 800.
```

```answer
? Binary search over 1,000,000 sorted items needs about how many comparisons? (nearest whole number)
= 20
tolerance: 1
> log₂(10⁶) ≈ 19.9.
```

```choice
? Someone claims a tool that detects every infinite loop in any program. What do you say?
- [x] Impossible in general — that's the halting problem // Tools can catch many cases, never all.
- [ ] Possible with enough compute
- [ ] Possible for compiled languages only
> Undecidable, not just hard. Practical tools use approximations and timeouts.
```

```answer
? What is the Shannon entropy, in bits, of a fair coin flip?
= 1
```

```reflect
? Explain why NP-completeness matters in practice even though we don't know if P = NP.
- if your problem is NP-complete, don't expect an exact fast algorithm
- use approximations, heuristics, special structure, or SAT/ILP solvers
- reductions let you reuse solvers
model: If you can show your problem is NP-complete, you stop searching for a fast exact algorithm that almost certainly doesn't exist. Instead you use heuristics, approximation algorithms, exploit special structure, or reduce it to SAT or integer programming and let industrial-strength solvers do the work.
```

```recall Limits of computation
? Computability and complexity, in four statements.
The halting problem is undecidable in general. NP is the class of problems whose solutions can be verified in polynomial time. NP-complete problems are the hardest in NP, and SAT was the first. Erasing a bit costs at least kT ln 2.
```

```cards
Church–Turing thesis :: Anything algorithmically computable is Turing-computable.
Halting problem :: Undecidable in general.
NP :: Solutions verifiable in polynomial time.
NP-complete :: Hardest problems in NP; SAT was first.
Shannon entropy :: −Σ p log p; the compression limit.
Landauer's principle :: Erasing a bit costs ≥ kT ln 2.
