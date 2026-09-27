---
title: Logic, infinity and the limits of proof
blurb: Cantor, Gödel, Turing, ZFC, category theory and proof assistants — what mathematics can and can't do.
section: Foundations
---

## The story

```order
? Put in order.
1. Cantor shows some infinities are bigger than others
2. Russell's paradox breaks naive set theory
3. Hilbert's programme: prove maths complete and consistent
4. Gödel's incompleteness theorems
5. Turing's halting problem
6. Cohen shows the continuum hypothesis is independent of ZFC
7. Computer-checked proofs (Four Colour, Kepler, Lean's mathlib)
> 1874 → 1901 → 1920s → 1931 → 1936 → 1963 → 1976 onwards.
```

| result | says |
|---|---|
| **Cantor's diagonal argument** | the reals are uncountable: |ℝ| > |ℕ| |
| **Gödel I** | any consistent formal system that can do arithmetic has true statements it can't prove |
| **Gödel II** | such a system can't prove its own consistency |
| **Independence** | the **continuum hypothesis** and the **axiom of choice** can be neither proved nor disproved from ZF(C) |
| **Banach–Tarski** | with the axiom of choice, a ball can be cut into 5 pieces and reassembled into two balls |

## Category theory

Maths about **structure-preserving maps** rather than objects: objects, arrows (morphisms), composition. **Functors** map between categories; **natural transformations** between functors. It unifies algebra, topology and logic, and shaped functional programming (monads in Haskell).

## Proof assistants

**Lean**, **Coq (Rocq)**, **Isabelle**. Mathlib has formalised large chunks of undergraduate and research maths; in 2023–24 Terence Tao led formalisation projects, and AI systems began producing Lean proofs (e.g. olympiad-level results). A plausible future: AI proposes, Lean verifies.

```choice
? What does Gödel's first incompleteness theorem say?
- [x] Any consistent system strong enough for arithmetic has true but unprovable statements // Not "maths is inconsistent".
- [ ] Mathematics is inconsistent
- [ ] Every statement is either provable or disprovable
```

```choice
? Cantor's diagonal argument proves…
- [x] There are more real numbers than natural numbers // Some infinities are bigger.
- [ ] There are infinitely many primes
- [ ] √2 is irrational
```

```answer
? What is the name of the standard axiom system of set theory with the axiom of choice? (4 letters)
= ZFC
```

```reflect
? Explain the common thread between Cantor's diagonal argument, Gödel's theorem and the halting problem.
- self-reference / diagonalisation
- build an object that differs from every item in a list / says "I'm unprovable" / does the opposite of the predictor
- shows limits of lists, proofs, programs
model: All three use diagonalisation: assume a complete list (of reals, proofs, or halting-deciders), then construct something that disagrees with every entry — a real differing in the nth digit, a sentence asserting its own unprovability, a program that does the opposite of what the decider predicts. The contradiction shows the list can't be complete.
```

```cards
Cantor :: Some infinities are larger; ℝ is uncountable.
Gödel I :: Consistent arithmetic has unprovable truths.
Gödel II :: Can't prove your own consistency.
Continuum hypothesis :: Independent of ZFC (Gödel + Cohen).
Category theory :: Mathematics of structure-preserving maps.
Lean :: Proof assistant; mathlib library.
