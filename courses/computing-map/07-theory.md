---
title: Theory — what can be computed, and how fast
blurb: Turing machines, halting, P vs NP, complexity classes, information theory — the physics of computation.
section: Foundations
---

## Computability

- **Turing machine (1936)**: a minimal model that captures "any algorithm" (the **Church–Turing thesis**).
- **Halting problem**: no program can decide, for every program and input, whether it halts. Proof by diagonalisation — the same trick as Cantor and Gödel.
- **Rice's theorem**: every non-trivial question about what a program *does* is undecidable. (That's why perfect bug-finders can't exist.)

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

## Physics of computation

- **Shannon entropy** H = −Σ p log₂ p bits: the limit of lossless compression.
- **Landauer's principle**: erasing one bit costs at least kT ln 2 of energy — information is physical.
- **Reversible computing** and **quantum computing** both grow from this.

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

```cards
Church–Turing thesis :: Anything algorithmically computable is Turing-computable.
Halting problem :: Undecidable in general.
NP :: Solutions verifiable in polynomial time.
NP-complete :: Hardest problems in NP; SAT was first.
Shannon entropy :: −Σ p log p; the compression limit.
Landauer's principle :: Erasing a bit costs ≥ kT ln 2.
