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

```viz diagonal
> Cantor's diagonal argument, step by step. The same trick underlies Gödel and Turing.
```

## Category theory

Maths about **structure-preserving maps** rather than objects: objects, arrows (morphisms), composition. **Functors** map between categories; **natural transformations** between functors. It unifies algebra, topology and logic, and shaped functional programming (monads in Haskell).

## Proof assistants

**Lean**, **Coq (Rocq)**, **Isabelle**. Mathlib has formalised large chunks of undergraduate and research maths; in 2023–24 Terence Tao led formalisation projects, and AI systems began producing Lean proofs (e.g. olympiad-level results). A plausible future: AI proposes, Lean verifies.

<figure class="diagram">
<svg viewBox="0 0 640 170">
<g><rect x="10" y="40" width="56" height="70" rx="6" fill="var(--surface-2)" stroke="var(--line-strong)"/><text x="38" y="30" text-anchor="middle" font-size="11">room 1</text><circle cx="38" cy="75" r="12" fill="var(--accent)"><animate attributeName="cx" values="38;38;100;100" keyTimes="0;0.3;0.6;1" dur="4s" repeatCount="indefinite"/></circle></g><g><rect x="72" y="40" width="56" height="70" rx="6" fill="var(--surface-2)" stroke="var(--line-strong)"/><text x="100" y="30" text-anchor="middle" font-size="11">room 2</text><circle cx="100" cy="75" r="12" fill="var(--accent)"><animate attributeName="cx" values="100;100;162;162" keyTimes="0;0.3;0.6;1" dur="4s" repeatCount="indefinite"/></circle></g><g><rect x="134" y="40" width="56" height="70" rx="6" fill="var(--surface-2)" stroke="var(--line-strong)"/><text x="162" y="30" text-anchor="middle" font-size="11">room 3</text><circle cx="162" cy="75" r="12" fill="var(--accent)"><animate attributeName="cx" values="162;162;224;224" keyTimes="0;0.3;0.6;1" dur="4s" repeatCount="indefinite"/></circle></g><g><rect x="196" y="40" width="56" height="70" rx="6" fill="var(--surface-2)" stroke="var(--line-strong)"/><text x="224" y="30" text-anchor="middle" font-size="11">room 4</text><circle cx="224" cy="75" r="12" fill="var(--accent)"><animate attributeName="cx" values="224;224;286;286" keyTimes="0;0.3;0.6;1" dur="4s" repeatCount="indefinite"/></circle></g><g><rect x="258" y="40" width="56" height="70" rx="6" fill="var(--surface-2)" stroke="var(--line-strong)"/><text x="286" y="30" text-anchor="middle" font-size="11">room 5</text><circle cx="286" cy="75" r="12" fill="var(--accent)"><animate attributeName="cx" values="286;286;348;348" keyTimes="0;0.3;0.6;1" dur="4s" repeatCount="indefinite"/></circle></g><g><rect x="320" y="40" width="56" height="70" rx="6" fill="var(--surface-2)" stroke="var(--line-strong)"/><text x="348" y="30" text-anchor="middle" font-size="11">room 6</text><circle cx="348" cy="75" r="12" fill="var(--accent)"><animate attributeName="cx" values="348;348;410;410" keyTimes="0;0.3;0.6;1" dur="4s" repeatCount="indefinite"/></circle></g><g><rect x="382" y="40" width="56" height="70" rx="6" fill="var(--surface-2)" stroke="var(--line-strong)"/><text x="410" y="30" text-anchor="middle" font-size="11">room 7</text><circle cx="410" cy="75" r="12" fill="var(--accent)"><animate attributeName="cx" values="410;410;472;472" keyTimes="0;0.3;0.6;1" dur="4s" repeatCount="indefinite"/></circle></g><g><rect x="444" y="40" width="56" height="70" rx="6" fill="var(--surface-2)" stroke="var(--line-strong)"/><text x="472" y="30" text-anchor="middle" font-size="11">room 8</text><circle cx="472" cy="75" r="12" fill="var(--accent)"><animate attributeName="cx" values="472;472;534;534" keyTimes="0;0.3;0.6;1" dur="4s" repeatCount="indefinite"/></circle></g><g><rect x="506" y="40" width="56" height="70" rx="6" fill="var(--surface-2)" stroke="var(--line-strong)"/><text x="534" y="30" text-anchor="middle" font-size="11">room 9</text><circle cx="534" cy="75" r="12" fill="var(--accent)"><animate attributeName="cx" values="534;534;596;596" keyTimes="0;0.3;0.6;1" dur="4s" repeatCount="indefinite"/></circle></g><g><rect x="568" y="40" width="56" height="70" rx="6" fill="var(--surface-2)" stroke="var(--line-strong)"/><text x="596" y="30" text-anchor="middle" font-size="11">room 10</text><circle cx="596" cy="75" r="12" fill="var(--accent)"><animate attributeName="cx" values="596;596;658;658" keyTimes="0;0.3;0.6;1" dur="4s" repeatCount="indefinite"/></circle></g>
<circle cx="38" cy="75" r="12" fill="var(--coral)"><animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.55;0.65;1" dur="4s" repeatCount="indefinite"/></circle>
<text x="320" y="140" text-anchor="middle" font-size="12.5">Hilbert's Hotel is full. A new guest arrives: everyone moves from room n to n + 1.</text>
<text x="320" y="160" text-anchor="middle" font-size="12.5">Room 1 is free. ∞ + 1 = ∞ for countable infinity (but no trick fits all the reals).</text>
</svg>
<figcaption>Countable infinity is weird but manageable. Cantor showed the reals are a strictly bigger infinity.</figcaption>
</figure>

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

```recall The limits of proof
? Cantor and Godel, in three sentences.
Cantor showed some infinities are larger than others: the real numbers are uncountable. Godel's first theorem: any consistent system for arithmetic has true statements it cannot prove. His second: it cannot prove its own consistency.
```

```cards
Cantor :: Some infinities are larger; ℝ is uncountable.
Gödel I :: Consistent arithmetic has unprovable truths.
Gödel II :: Can't prove your own consistency.
Continuum hypothesis :: Independent of ZFC (Gödel + Cohen).
Category theory :: Mathematics of structure-preserving maps.
Lean :: Proof assistant; mathlib library.
