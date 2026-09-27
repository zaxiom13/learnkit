---
title: Symmetry, Noether and gauge theory
blurb: Conservation laws come from symmetries; forces come from demanding local symmetry. The Standard Model in one lesson.
section: The spine
---

## Noether's theorem (1918)

Every continuous symmetry of the action gives a conserved quantity.

| symmetry | conserved |
|---|---|
| time translation | energy |
| space translation | momentum |
| rotation | angular momentum |
| global phase (U(1)) of a complex field | charge / particle number |
| Lorentz boosts | centre-of-energy motion |

## Gauge theory: forces from symmetry

Demand that a phase symmetry hold **locally** (a different phase at each point). Derivatives then pick up extra terms — to cancel them you must introduce a **gauge field**. That field is a force carrier.

| gauge group | force | carrier(s) |
|---|---|---|
| **U(1)** | electromagnetism | photon |
| **SU(2)** (× U(1), broken) | weak force | W⁺, W⁻, Z |
| **SU(3)** | strong force (QCD) | 8 gluons |

**The Standard Model** = SU(3) × SU(2) × U(1) + three generations of quarks and leptons + the **Higgs field**, whose non-zero vacuum value breaks SU(2)×U(1) → U(1)_EM, giving W and Z (and fermions) mass. Higgs boson found at CERN in **2012**.

Gravity is *not* in it. Nor are dark matter, dark energy, or neutrino masses in the original form.

```answer
? How many gluons does SU(3) have? (dimension of the group = n² − 1)
= 8
```

```choice
? Energy conservation follows from which symmetry?
- [x] Invariance under time translation // Noether.
- [ ] Invariance under rotation
- [ ] Charge conjugation
> In an expanding universe, time-translation symmetry is broken — so global energy conservation is subtle in cosmology.
```

```choice
? What does "spontaneous symmetry breaking" mean?
- [x] The laws are symmetric but the lowest-energy state isn't // A ball in a Mexican-hat potential.
- [ ] The laws themselves change over time
- [ ] A symmetry is broken by an external force
> Ferromagnets, superconductors (which give the photon an effective mass — the Meissner effect) and the Higgs mechanism are all examples.
```

## Discrete symmetries

**C** (charge conjugation), **P** (parity), **T** (time reversal). The weak force violates P maximally (Wu, 1957) and CP slightly (1964). **CPT** together is always conserved in any Lorentz-invariant local QFT. CP violation is one of the Sakharov conditions for why the universe has more matter than antimatter — but the known amount is too small to explain it.

```reflect
? Explain the gauge principle as a story: "why does electromagnetism exist?"
- electron field has a phase symmetry
- demand it locally → derivative isn't covariant
- add a field A_μ that compensates → it's the photon, with Maxwell's equations
model: The electron's wavefunction can be multiplied by a phase without changing physics. If we insist that phase can vary from point to point, ordinary derivatives break the symmetry. To fix that we must add a new field that shifts to compensate — the electromagnetic potential. Give it the simplest allowed dynamics and you get Maxwell's equations. The force is the price of local symmetry.
```

```cards
Noether's theorem :: Continuous symmetry ⇒ conservation law.
Gauge field :: Field required to make a symmetry local; a force carrier.
Standard Model group :: SU(3) × SU(2) × U(1).
Higgs mechanism :: Vacuum breaks electroweak symmetry, giving W, Z mass.
CPT theorem :: Every local Lorentz-invariant QFT conserves CPT.
