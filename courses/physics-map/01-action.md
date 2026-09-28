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
| **Path integral (Feynman)** | sum over *all* paths weighted by e^(iS/ħ) | QFT; classical path = stationary phase as ħ → 0 |

```viz pathintegral
> Feynman's picture, live. Every path from A to B is an arrow e^(iS/ħ). Shrink ħ and watch everything cancel except the neighbourhood of the classical path.
```

```steps Why the classical path wins
Quantum amplitude: sum over all paths of e^(iS/ħ).
---
ħ is tiny compared with the action of a macroscopic path, so the phase S/ħ swings wildly between neighbouring paths.
---
Wildly oscillating phases cancel — except near paths where S is stationary (δS = 0), where neighbours share nearly the same phase.
---
So the classical path emerges as the stationary-phase approximation. Classical mechanics is the ħ → 0 limit of quantum mechanics.
```

<figure class="diagram">
<svg viewBox="0 0 640 170">
<g font-size="12">
<rect x="10" y="50" width="115" height="60" rx="12" fill="var(--text-3)"/><text x="67" y="76" text-anchor="middle" style="fill:#fff" font-weight="700">Newton</text><text x="67" y="94" text-anchor="middle" style="fill:#fff" font-size="10.5">F = ma</text><rect x="137" y="50" width="115" height="60" rx="12" fill="var(--accent)"/><text x="194" y="76" text-anchor="middle" style="fill:#fff" font-weight="700">Lagrange</text><text x="194" y="94" text-anchor="middle" style="fill:#fff" font-size="10.5">δ∫L dt = 0</text><rect x="264" y="50" width="115" height="60" rx="12" fill="var(--good)"/><text x="321" y="76" text-anchor="middle" style="fill:#fff" font-weight="700">Hamilton</text><text x="321" y="94" text-anchor="middle" style="fill:#fff" font-size="10.5">q̇ = ∂H/∂p</text><rect x="391" y="50" width="115" height="60" rx="12" fill="var(--coral)"/><text x="448" y="76" text-anchor="middle" style="fill:#fff" font-weight="700">Schrödinger</text><text x="448" y="94" text-anchor="middle" style="fill:#fff" font-size="10.5">iħ∂ψ/∂t = Hψ</text><rect x="518" y="50" width="115" height="60" rx="12" fill="#7b43c9"/><text x="575" y="76" text-anchor="middle" style="fill:#fff" font-weight="700">Feynman</text><text x="575" y="94" text-anchor="middle" style="fill:#fff" font-size="10.5">Σ e^(iS/ħ)</text><path d="M125 80 H137" stroke="var(--text-3)" stroke-width="3" class="flow"/><path d="M252 80 H264" stroke="var(--text-3)" stroke-width="3" class="flow"/><path d="M379 80 H391" stroke="var(--text-3)" stroke-width="3" class="flow"/><path d="M506 80 H518" stroke="var(--text-3)" stroke-width="3" class="flow"/>
<text x="320" y="140" text-anchor="middle" font-size="11.5">{ , } Poisson bracket → [ , ]/iħ commutator · action S → phase S/ħ</text>
<path d="M190 42 C300 20 450 20 560 42" stroke="var(--coral)" stroke-width="2" fill="none" stroke-dasharray="4 4"/><text x="380" y="14" text-anchor="middle" font-size="10.5" style="fill:var(--coral)">ħ → 0 recovers the classical limit</text>
</g></svg>
<figcaption>Five formulations, one idea. Each step keeps the structure of the one before it and generalises it.</figcaption>
</figure>

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

The same template, with **Wick rotation** t → −iτ, turns the quantum path integral into a **statistical partition function** e^(−S_E/ħ) ↔ e^(−βH). Quantum field theory in imaginary time *is* statistical mechanics — the root of lattice QCD, the renormalisation group, and why so many ML ideas (Boltzmann machines, diffusion) feel like physics.

```viz orbit
> Respecting the Hamiltonian structure matters in practice too. A symplectic integrator keeps a planet on its orbit for millions of steps, while naive Euler slowly pumps energy in.
```

```reflect
? Explain to a CS friend why "nature minimises the action" is a powerful organising principle.
- one scalar function encodes all the equations of motion
- symmetries of L give conservation laws (Noether — next lesson)
- same framework runs from particles to fields to quantum (path integral)
model: Instead of writing many coupled equations, you write one scalar — the Lagrangian — and demand the action be stationary; the equations of motion fall out. Symmetries of that one function give conservation laws for free, and the same template extends to fields and, via the path integral, to quantum theory.
```

```recall The principle of least action
? The one principle behind classical and quantum mechanics.
The action is the integral of the Lagrangian over time, and the path a system actually takes makes the action stationary. In quantum mechanics, every path contributes, weighted by e to the i S over h-bar.
```

```cards
Action :: S = ∫ L dt; physical paths make it stationary.
Euler–Lagrange :: d/dt(∂L/∂q̇) − ∂L/∂q = 0.
Hamiltonian :: Energy function generating time evolution in phase space.
Path integral :: Sum over histories weighted by e^(iS/ħ).
Wick rotation :: t → −iτ; quantum ↔ statistical mechanics.
