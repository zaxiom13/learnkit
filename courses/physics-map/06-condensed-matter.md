---
title: Condensed matter and emergence
blurb: More is different — superconductors, topological phases, quasiparticles and the physics inside every chip.
section: Many bodies
---

**"More is different"** (Anderson, 1972): new laws emerge at each level of complexity; reductionism doesn't mean constructionism. Condensed matter is the biggest field in physics and the home of emergence.

```viz boids
> Emergence in miniature. Each bird follows three local rules; the flock is a property of the collective. Phonons, superconductivity and phase transitions work the same way: new behaviour at a new scale.
```

## Quasiparticles

Collective excitations behave like particles: **phonons** (sound quanta), **magnons** (spin waves), **excitons**, **polarons**, **plasmons**, **Cooper pairs**, even **anyons** with fractional statistics in 2D. The "electron" in a metal is itself a dressed quasiparticle (**Landau Fermi liquid**).

```viz bands
> Band theory, the physics of every chip: metals have no gap, insulators a huge one, and semiconductors a small one that heat (or doping) can bridge.
```

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

<figure class="diagram">
<svg viewBox="0 0 640 190">
<circle cx="40" cy="40" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="92" cy="40" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="144" cy="40" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="196" cy="40" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="248" cy="40" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="300" cy="40" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="352" cy="40" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="404" cy="40" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="456" cy="40" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="508" cy="40" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="560" cy="40" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="612" cy="40" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="40" cy="90" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="92" cy="90" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="144" cy="90" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="196" cy="90" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="248" cy="90" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="300" cy="90" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="352" cy="90" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="404" cy="90" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="456" cy="90" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="508" cy="90" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="560" cy="90" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="612" cy="90" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="40" cy="140" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="92" cy="140" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="144" cy="140" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="196" cy="140" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="248" cy="140" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="300" cy="140" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="352" cy="140" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="404" cy="140" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="456" cy="140" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="508" cy="140" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="560" cy="140" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/><circle cx="612" cy="140" r="10" fill="var(--surface-3)" stroke="var(--line-strong)"/>
<g><circle r="8" fill="var(--accent)"><animateMotion dur="5s" repeatCount="indefinite" path="M40 65 C200 20 300 110 600 65"/></circle>
<circle r="8" fill="var(--coral)"><animateMotion dur="5s" repeatCount="indefinite" path="M110 75 C270 30 370 120 670 75"/></circle></g>
<text x="320" y="180" text-anchor="middle" font-size="12">electron ① distorts the lattice (grey ions) → the distortion attracts electron ② → a bound Cooper pair</text>
</svg>
<figcaption>BCS superconductivity: two electrons that should repel are glued together by the lattice's vibrations (phonons). The pairs condense into one quantum state that flows without resistance.</figcaption>
</figure>

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
