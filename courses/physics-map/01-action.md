---
title: One principle to rule them all — action
blurb: Lagrangians, Hamiltonians and the path integral: the same idea from classical mechanics to quantum field theory.
section: The spine
---

Almost all of fundamental physics is written the same way: pick fields and a **Lagrangian**, and nature extremises the **action** S = ∫ L dt (or ∫ 𝓛 d⁴x).

| formulation | idea | leads to |
|---|---|---|
| **Newtonian** | forces cause acceleration | engineering intuition |
| **Lagrangian** | δS = 0 → Euler–Lagrange equations | easy coordinates, symmetries, field theory |
| **Hamiltonian** | phase space (q, p), H generates time evolution | statistical mechanics, quantum mechanics (Poisson bracket → commutator) |
| **Hamilton–Jacobi** | action as a wave front | the bridge to Schrödinger's wave mechanics |
| **Path integral (Feynman)** | sum over *all* paths weighted by e^{iS/ħ} | QFT; classical path = stationary phase as ħ → 0 |

```steps Why the classical path wins
Quantum amplitude: sum over all paths of e^{iS/ħ}.
---
ħ is tiny compared with the action of a macroscopic path, so the phase S/ħ swings wildly between neighbouring paths.
---
Wildly oscillating phases cancel — except near paths where S is stationary (δS = 0), where neighbours share nearly the same phase.
---
So the classical path emerges as the stationary-phase approximation. Classical mechanics is the ħ → 0 limit of quantum mechanics.
```

```choice
? In the Hamiltonian→quantum dictionary, the Poisson bracket {A, B} becomes…
- [x] the commutator [A, B] divided by iħ // Dirac's canonical quantisation.
- [ ] the product AB
- [ ] the anticommutator
> {q, p} = 1 becomes [q̂, p̂] = iħ.
```

```answer
? The Euler–Lagrange equation comes from requiring the variation of which quantity to vanish? (one word)
= action
= the action
= S
```

## Where it goes next

The same template, with **Wick rotation** t → −iτ, turns the quantum path integral into a **statistical partition function** e^{−S_E/ħ} ↔ e^{−βH}. Quantum field theory in imaginary time *is* statistical mechanics — the root of lattice QCD, the renormalisation group, and why so many ML ideas (Boltzmann machines, diffusion) feel like physics.

```reflect
? Explain to a CS friend why "nature minimises the action" is a powerful organising principle.
- one scalar function encodes all the equations of motion
- symmetries of L give conservation laws (Noether — next lesson)
- same framework runs from particles to fields to quantum (path integral)
model: Instead of writing many coupled equations, you write one scalar — the Lagrangian — and demand the action be stationary; the equations of motion fall out. Symmetries of that one function give conservation laws for free, and the same template extends to fields and, via the path integral, to quantum theory.
```

```cards
Action :: S = ∫ L dt; physical paths make it stationary.
Euler–Lagrange :: d/dt(∂L/∂q̇) − ∂L/∂q = 0.
Hamiltonian :: Energy function generating time evolution in phase space.
Path integral :: Sum over histories weighted by e^{iS/ħ}.
Wick rotation :: t → −iτ; quantum ↔ statistical mechanics.
