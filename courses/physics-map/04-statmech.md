---
title: Statistical mechanics, entropy and information
blurb: From Boltzmann to Shannon to black holes — and why the same equations run markets and neural nets.
section: Many bodies
---

## The core

- Microstates vs macrostates. **Boltzmann entropy** S = k_B ln Ω.
- **Gibbs/canonical ensemble**: p_i = e^(−βE_i)/Z, β = 1/k_BT. The **partition function** Z generates everything: F = −k_BT ln Z.
- **Second law**: entropy of an isolated system doesn't decrease — statistically overwhelming, not absolute.
- **Fluctuation–dissipation**: the way a system jiggles at equilibrium tells you how it responds to a push.

```viz softmax title="Boltzmann distribution" t=1
ground state E=0 | 0
E = 1 | -1
E = 2 | -2
E = 3 | -3
E = 4 | -4
E = 5 | -5
> A ladder of energy levels with Boltzmann weights e^(−E/kT). Cold: everything sits in the ground state. Hot: the levels even out. It's the same maths as an LLM's temperature knob.
```

## Information is physical

| idea | statement |
|---|---|
| **Shannon entropy** | H = −Σ p log p; same form as Gibbs entropy |
| **Maxwell's demon** | resolved by **Landauer**: erasing the demon's memory costs kT ln 2 per bit |
| **Jaynes' maximum entropy** | stat mech is inference: the least-biased distribution given constraints |
| **Bekenstein–Hawking** | black hole entropy S = k_B A / 4ℓ_P² — proportional to *area*, not volume → holography |

```viz ising
> The Ising model: a phase transition you can watch. Cool below T꜀ ≈ 2.27 and magnetised domains appear. At T꜀ there are clusters of every size, which is scale invariance (what the renormalisation group explains).
```

## Phase transitions and universality

Near a critical point, correlation length diverges; microscopic details wash out. Very different systems (liquid–gas, ferromagnets) share **critical exponents** — **universality**, explained by **Wilson's renormalisation group** (Nobel 1982). RG = "zoom out and see which couplings matter". It's the deepest idea of 20th-century theoretical physics and it reappears in ML theory.

```viz brownian
> Einstein 1905 and Bachelier 1900: the same random walk describes pollen grains and stock prices.
```

## Leaks into other fields

- **Brownian motion** (Einstein 1905) → Bachelier had already used it for **stock prices** (1900) → Black–Scholes.
- Ising model ↔ Hopfield networks ↔ Boltzmann machines.
- **Simulated annealing**: optimisation by slowly cooling a fake physical system.
- **Monte Carlo / Metropolis (1953)**: born at Los Alamos, now everywhere from option pricing to Bayesian inference.

```answer
? A two-level system has energies 0 and ε, with ε = k_BT. What is p(ε)/p(0), to 2 decimal places?
= 0.37
tolerance: 0.01
> e^(−1) ≈ 0.368.
```

```choice
? Why do very different materials share the same critical exponents?
- [x] Near criticality only symmetry and dimensionality matter — the RG flows to the same fixed point // Universality.
- [ ] They're secretly the same material
- [ ] Coincidence
```

```choice
? Black hole entropy scales with…
- [ ] volume
- [x] horizon area // The seed of the holographic principle and AdS/CFT.
- [ ] mass to the first power
```

```reflect
? Explain why the second law is "statistical" rather than absolute.
- macrostates with more microstates are overwhelmingly more likely
- decreases are possible but exponentially unlikely for large N
- fluctuation theorems quantify it for small systems
model: The second law says systems drift to macrostates with vastly more microstates, simply because those are overwhelmingly more probable. For 10²³ particles a decrease is so unlikely it never happens in practice; for tiny systems it does, and fluctuation theorems (Jarzynski, Crooks) give the exact odds.
```

```cards
S = k ln Ω :: Boltzmann's entropy.
Partition function :: Z = Σ e^(−βE); generates thermodynamics.
Landauer :: Erasing a bit costs ≥ kT ln 2.
Renormalisation group :: How physics changes with scale; explains universality.
Bekenstein–Hawking :: Black hole entropy ∝ area.
Metropolis algorithm :: Monte Carlo sampling from e^(−βE).
