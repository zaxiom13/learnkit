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

<figure class="diagram">
<svg viewBox="0 0 640 200">
<path d="M60 60 C140 60 170 170 240 170 C290 170 300 110 320 110 C340 110 350 170 400 170 C470 170 500 60 580 60" fill="none" stroke="var(--accent)" stroke-width="4"/>
<circle r="11" fill="var(--coral)"><animateMotion dur="4s" repeatCount="indefinite" keyPoints="0.5;0.5;0.3;0.3" keyTimes="0;0.25;0.6;1" calcMode="spline" keySplines="0 0 1 1;0.4 0 0.2 1;0 0 1 1" path="M60 49 C140 49 170 159 240 159 C290 159 300 99 320 99 C340 99 350 159 400 159 C470 159 500 49 580 49"/></circle>
<text x="320" y="92" text-anchor="middle" font-size="12">symmetric, unstable top</text>
<text x="240" y="195" text-anchor="middle" font-size="12">the ball picks one valley</text>
<text x="560" y="40" text-anchor="middle" font-size="11" opacity="0.7">V(φ) = −μ²|φ|² + λ|φ|⁴</text>
</svg>
<figcaption>The "Mexican hat" potential (in cross-section). The law is symmetric, but the ground state isn't: the ball has to roll into <i>some</i> valley. The Higgs field's vacuum sits in the trough, and that choice gives the W and Z their mass.</figcaption>
</figure>

## Gauge theory: forces from symmetry

Demand that a phase symmetry hold **locally** (a different phase at each point). Derivatives then pick up extra terms — to cancel them you must introduce a **gauge field**. That field is a force carrier.

| gauge group | force | carrier(s) |
|---|---|---|
| **U(1)** | electromagnetism | photon |
| **SU(2)** (× U(1), broken) | weak force | W⁺, W⁻, Z |
| **SU(3)** | strong force (QCD) | 8 gluons |

**The Standard Model** = SU(3) × SU(2) × U(1) + three generations of quarks and leptons + the **Higgs field**, whose non-zero vacuum value breaks SU(2)×U(1) → U(1)_EM, giving W and Z (and fermions) mass. Higgs boson found at CERN in **2012**.

Gravity is *not* in it. Nor are dark matter, dark energy, or neutrino masses in the original form.

```viz bars log=1 unit=" GeV" title="The mass puzzle"
electron | 0.000511
up quark | 0.0022
down quark | 0.0047
muon | 0.1057
proton (composite) | 0.938
tau | 1.777
W boson | 80.4
Z boson | 91.19
Higgs | 125.1
top quark | 172.7
> Masses in GeV, log scale: a 340,000× spread from electron to top quark, and nobody knows why. Note the proton is mostly QCD binding energy; its quarks weigh only ~1% of it.
```

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

```viz tree
. Fermions (matter, spin ½) | three generations, each heavier copy of the first
.. Quarks | feel the strong force; confined in hadrons
... up, down | protons (uud), neutrons (udd)
... charm, strange | 2nd generation
... top, bottom | top ≈ 173 GeV — heaviest known particle
.. Leptons | no strong force
... electron, e-neutrino | chemistry, beta decay
... muon, μ-neutrino | cosmic rays, g−2 experiments
... tau, τ-neutrino | heaviest lepton
. Gauge bosons (forces, spin 1) | from SU(3)×SU(2)×U(1)
.. photon | electromagnetism, massless
.. W⁺ W⁻ Z | weak force, ~80–91 GeV
.. 8 gluons | strong force
. Higgs boson (spin 0) | 125 GeV, found 2012
. Not in the model | gravity (graviton?), dark matter, neutrino masses
> The Standard Model particle zoo. Tap to open.
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

```recall Noether's theorem
? The link between symmetry and conservation.
Every continuous symmetry gives a conservation law. Time symmetry gives conservation of energy, space symmetry gives momentum, and rotation symmetry gives angular momentum.
> Gauge theory pushes the same idea further: making a symmetry local demands a force field.
```

```cards
Noether's theorem :: Continuous symmetry ⇒ conservation law.
Gauge field :: Field required to make a symmetry local; a force carrier.
Standard Model group :: SU(3) × SU(2) × U(1).
Higgs mechanism :: Vacuum breaks electroweak symmetry, giving W, Z mass.
CPT theorem :: Every local Lorentz-invariant QFT conserves CPT.
