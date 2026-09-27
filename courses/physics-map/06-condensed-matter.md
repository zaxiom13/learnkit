---
title: Condensed matter and emergence
blurb: More is different — superconductors, topological phases, quasiparticles and the physics inside every chip.
section: Many bodies
---

**"More is different"** (Anderson, 1972): new laws emerge at each level of complexity; reductionism doesn't mean constructionism. Condensed matter is the biggest field in physics and the home of emergence.

## Quasiparticles

Collective excitations behave like particles: **phonons** (sound quanta), **magnons** (spin waves), **excitons**, **polarons**, **plasmons**, **Cooper pairs**, even **anyons** with fractional statistics in 2D. The "electron" in a metal is itself a dressed quasiparticle (**Landau Fermi liquid**).

## Highlights

| phenomenon | idea |
|---|---|
| **Band theory** | Bloch waves in a periodic lattice → bands and gaps → metals, insulators, **semiconductors** (all of electronics) |
| **Superconductivity** | zero resistance, flux expulsion; **BCS** theory: phonon-mediated Cooper pairs (1957). High-T_c cuprates (1986) still not fully understood |
| **Superfluidity** | helium-4 below 2.17 K flows without friction; Bose–Einstein condensation |
| **Quantum Hall effects** | Hall resistance quantised to h/(ne²) with 10⁻⁹ precision — so exact it defines resistance standards; **fractional** version → anyons |
| **Topological insulators** | insulating bulk, protected conducting surface; classified by topology (Nobel 2016: Thouless, Haldane, Kosterlitz) |
| **Graphene / twisted bilayers** | 2D carbon; at the "magic angle" (~1.1°) it superconducts (2018) |

Tools you'll hear: **DFT** (density functional theory — the workhorse of computational materials science and chemistry), tensor networks / **DMRG**, quantum Monte Carlo.

```choice
? Why does a semiconductor conduct better when heated, while a metal conducts worse?
- [x] Heat excites electrons across the band gap in a semiconductor; in a metal, more phonon scattering just adds resistance // Different mechanisms.
- [ ] Both conduct better when hot
- [ ] Semiconductors have no band gap
```

```answer
? Anderson's 1972 essay slogan: "More is ___". (one word)
= different
```

```reflect
? Give one example of emergence from condensed matter and why it challenges naive reductionism.
- names a phenomenon (superconductivity, quantum Hall, phonons…)
- properties not visible in single-particle laws
- universality: details don't matter
model: Superconductivity: nothing in the Schrödinger equation for a single electron hints at zero resistance or flux expulsion. It arises from collective pairing of trillions of electrons, and its key properties (like flux quantisation h/2e) are exact regardless of the material's details. Knowing the fundamental laws doesn't let you construct the phenomenon without new concepts at the collective level.
```

```cards
Quasiparticle :: A collective excitation that behaves like a particle.
Band gap :: Energy gap separating filled and empty bands.
BCS theory :: Superconductivity via phonon-bound Cooper pairs.
Quantum Hall effect :: Exactly quantised Hall resistance.
Topological phase :: Properties protected by topology, not symmetry breaking.
DFT :: Density functional theory — computational workhorse for materials.
