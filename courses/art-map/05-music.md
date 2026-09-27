---
title: Music — physics, theory and history
blurb: Why harmony works (Fourier and ratios), the scales and chords, and the arc from Bach to electronic music.
section: Listening
---

## The physics

- Pitch = frequency; A4 = 440 Hz. An octave = **2:1**. A perfect fifth ≈ **3:2**.
- A plucked string's **harmonics** are integer multiples of the fundamental. Consonance ≈ shared/aligned harmonics (Helmholtz); roughness from nearby frequencies beating.
- **Timbre** = the harmonic spectrum and envelope — Fourier analysis made audible.
- **Equal temperament**: split the octave into 12 equal steps of 2^{1/12}. Every key sounds the same; every interval but the octave is slightly out of tune (the fifth is off by ~2 cents). A compromise that won in the 18th–19th centuries.

## The theory — names to know

| term | meaning |
|---|---|
| **Major / minor scale** | 7-note patterns (W W H W W W H for major) |
| **Triad** | three notes stacked in thirds (C–E–G) |
| **Tonic / dominant** | home chord (I) / tension chord (V) pulling home |
| **Cadence** | chord progression ending a phrase (V → I) |
| **Modes** | Dorian, Mixolydian… — scales from different starting notes |
| **Counterpoint** | independent melodies combined (Bach) |
| **Syncopation / swing** | off-beat emphasis (jazz, funk) |
| **I–V–vi–IV** | the progression behind countless pop songs |

## The arc

Gregorian chant → **Baroque** (Bach, Vivaldi, Handel) → **Classical** (Haydn, Mozart, Beethoven) → **Romantic** (Chopin, Wagner, Brahms, Tchaikovsky) → **20th century**: Debussy, Stravinsky (*Rite of Spring* riot, 1913), Schoenberg's 12-tone, jazz (Armstrong, Ellington, Parker, Davis, Coltrane), blues → rock 'n' roll → rock, soul, hip-hop; **minimalism** (Reich, Glass); **electronic** (Stockhausen, Kraftwerk, synthesisers, techno, sampling, DAWs).

```answer
? A4 is 440 Hz. What frequency is A5, one octave higher, in Hz?
= 880
```

```answer
? In equal temperament, what is the frequency ratio of one semitone? Give it to 4 decimal places.
= 1.0595
tolerance: 0.0001
> 2^{1/12} ≈ 1.05946.
```

```choice
? Why does a violin sound different from a flute playing the same note?
- [x] Different harmonic spectra and attack/decay envelopes — timbre // Same fundamental, different overtones.
- [ ] They play different frequencies
- [ ] Violins are louder
```

```reflect
? Explain why an octave and a fifth sound consonant, using physics.
- simple frequency ratios 2:1 and 3:2
- many harmonics coincide
- few close-but-unequal partials → little beating/roughness
model: Notes an octave apart (2:1) share every other harmonic of the lower note; a fifth (3:2) shares every third harmonic. Because so many overtones line up exactly, there are few pairs of close-but-different frequencies to beat against each other, so the combination sounds smooth. Complex ratios produce more near-misses and more roughness.
```

```cards
Octave :: 2:1 frequency ratio.
Perfect fifth :: ≈ 3:2.
Equal temperament :: 12 equal semitones of 2^{1/12}.
Timbre :: Harmonic spectrum + envelope.
Counterpoint :: Independent melodies combined.
Dominant → tonic :: V → I, the strongest cadence.
