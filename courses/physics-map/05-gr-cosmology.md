---
title: Gravity and the cosmos
blurb: General relativity, black holes, gravitational waves, the ΛCDM universe and its cracks.
section: Large scales
---

## General relativity in one line

**G_μν + Λg_μν = (8πG/c⁴) T_μν** — "matter tells spacetime how to curve; spacetime tells matter how to move" (Wheeler). Free fall = following **geodesics**. The **equivalence principle** is the seed.

Tests: Mercury's perihelion, light bending (1919), gravitational redshift, **GPS** (needs ~38 µs/day correction — without it errors grow ~10 km/day), black hole images (EHT 2019), **gravitational waves** (LIGO 2015, Nobel 2017).

```viz spacetime
> Special relativity's time dilation, live: γ = 1/√(1−v²/c²). Near c the moving clock almost stops.
```

## Black holes

- Schwarzschild radius r_s = 2GM/c² (~3 km per solar mass).
- **Hawking radiation** (1974): black holes have temperature ∝ 1/M and evaporate.
- **Information paradox**: does evaporation destroy information? The **Page curve** / "island" calculations (2019+) suggest information escapes — a live frontier.

```viz lightcone
> The causal structure of spacetime. Nothing, not even information, gets outside the light cone.
```

## ΛCDM — the standard cosmology

| ingredient | share of today's energy density |
|---|---|
| Dark energy (Λ) | ~68% |
| Dark matter | ~27% |
| Ordinary matter | ~5% |

Evidence: the **CMB** (380,000 years after the Big Bang), big-bang nucleosynthesis, galaxy rotation curves, lensing, large-scale structure. **Inflation** proposed for the flatness/horizon problems. Age ≈ **13.8 billion years**.

**Cracks**: the **Hubble tension** (early-universe vs local measurements of H₀ disagree ~70 vs ~67 km/s/Mpc, beyond errors); hints from DESI (2024–25) that dark energy may evolve; what dark matter *is*.

```viz bars unit=% title="What the universe is made of"
Dark energy | 68 | drives accelerating expansion; a cosmological constant Λ?
Dark matter | 27 | gravitates, doesn't shine; unknown particle?
Ordinary matter | 5 | everything in the periodic table
— of which stars | 0.5 | most ordinary matter is diffuse gas
> Today's cosmic energy budget (%).
```

```answer
? Schwarzschild radius is ~3 km per solar mass. Roughly what is it for a 10-solar-mass black hole, in km?
= 30
tolerance: 1
```

```viz timeline
-13.8e9 | Big Bang | 13.8 billion years ago | (plus inflation in the first ~10⁻³² s)
-13.79999e9 | Nucleosynthesis | first ~3 minutes | hydrogen, helium, a little lithium
-13.7996e9 | CMB released | 380,000 years | atoms form; the universe turns transparent
-13.6e9 | First stars | ~100–200 million years | cosmic dawn (JWST is finding early galaxies)
-9.2e9 | Milky Way disk | ~10 billion years ago |
-5e9 | Dark energy takes over | ~5 billion years ago | expansion starts accelerating
-4.6e9 | Sun and Earth | 4.6 billion years ago |
0 | Today | now | 13.8 billion years
> Cosmic history (not to scale; the first few entries are crammed into the first half-million years).
```

```choice
? Why do GPS satellites need relativistic corrections?
- [x] Their clocks run faster from weaker gravity (~+45 µs/day) and slower from speed (~−7 µs/day); net ~+38 µs/day // Uncorrected, position errors grow ~10 km per day.
- [ ] Because of the speed of the receiver
- [ ] They don't; it's a myth
```

```choice
? What fraction of today's universe is ordinary (baryonic) matter?
- [x] About 5% // Everything we've ever touched.
- [ ] About 27%
- [ ] About 68%
```

```reflect
? What is the Hubble tension and why does it matter?
- two methods measure H₀: early universe (CMB+model) vs local distance ladder
- disagree beyond quoted errors
- either systematics or new physics beyond ΛCDM
model: The expansion rate today can be inferred from the early universe (the CMB plus the ΛCDM model) or measured locally with Cepheids and supernovae. They disagree by more than their errors — about 67 vs 73 km/s/Mpc. Either there are hidden systematic errors or ΛCDM is missing something, like early dark energy or new particle physics.
```

```recall Gravity is geometry
? General relativity and the cosmos, in brief.
Matter tells spacetime how to curve, and spacetime tells matter how to move. Gravity is locally indistinguishable from acceleration. The cosmic microwave background is light from 380,000 years after the Big Bang.
> The first sentence is John Wheeler's famous summary of Einstein's equations.
```

```cards
Einstein equations :: Curvature = 8πG/c⁴ × stress-energy.
Equivalence principle :: Gravity is locally indistinguishable from acceleration.
Hawking radiation :: Black holes have temperature and evaporate.
CMB :: Light from 380,000 years after the Big Bang.
ΛCDM :: Dark energy + cold dark matter standard model of cosmology.
Hubble tension :: Early vs late H₀ measurements disagree.
