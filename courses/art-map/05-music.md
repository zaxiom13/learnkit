---
title: Music — physics, theory and history
blurb: Why harmony works (Fourier and ratios), the scales and chords, and the arc from Bach to electronic music.
section: Listening
---

## The physics

- Pitch = frequency; A4 = 440 Hz. An octave = **2:1**. A perfect fifth ≈ **3:2**.
- A plucked string's **harmonics** are integer multiples of the fundamental. Consonance ≈ shared/aligned harmonics (Helmholtz); roughness from nearby frequencies beating.
- **Timbre** = the harmonic spectrum and envelope — Fourier analysis made audible.
- **Equal temperament**: split the octave into 12 equal steps of 2^(1/12). Every key sounds the same; every interval but the octave is slightly out of tune (the fifth is off by ~2 cents). A compromise that won in the 18th–19th centuries.

```viz harmonics
> Hear it (sound on). Simple ratios share harmonics and sound consonant; near-misses beat. The equal-tempered fifth is a hair off 3:2.
```

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

```viz fourier
> Timbre is the recipe of harmonics. A square wave is odd harmonics only, like a clarinet's hollow sound. A sawtooth has all of them, bright and buzzy like a violin.
```

## The arc

Gregorian chant → **Baroque** (Bach, Vivaldi, Handel) → **Classical** (Haydn, Mozart, Beethoven) → **Romantic** (Chopin, Wagner, Brahms, Tchaikovsky) → **20th century**: Debussy, Stravinsky (*Rite of Spring* riot, 1913), Schoenberg's 12-tone, jazz (Armstrong, Ellington, Parker, Davis, Coltrane), blues → rock 'n' roll → rock, soul, hip-hop; **minimalism** (Reich, Glass); **electronic** (Stockhausen, Kraftwerk, synthesisers, techno, sampling, DAWs).

<figure class="diagram">
<svg viewBox="0 0 640 210">
<rect x="20" y="30" width="40" height="150" rx="4" fill="var(--accent)" stroke="#333"/><rect x="62" y="30" width="40" height="150" rx="4" fill="#fff" stroke="#333"/><rect x="104" y="30" width="40" height="150" rx="4" fill="var(--accent)" stroke="#333"/><rect x="146" y="30" width="40" height="150" rx="4" fill="#fff" stroke="#333"/><rect x="188" y="30" width="40" height="150" rx="4" fill="var(--accent)" stroke="#333"/><rect x="230" y="30" width="40" height="150" rx="4" fill="#fff" stroke="#333"/><rect x="272" y="30" width="40" height="150" rx="4" fill="#fff" stroke="#333"/><rect x="314" y="30" width="40" height="150" rx="4" fill="#fff" stroke="#333"/><rect x="356" y="30" width="40" height="150" rx="4" fill="#fff" stroke="#333"/><rect x="398" y="30" width="40" height="150" rx="4" fill="#fff" stroke="#333"/><rect x="440" y="30" width="40" height="150" rx="4" fill="#fff" stroke="#333"/><rect x="482" y="30" width="40" height="150" rx="4" fill="#fff" stroke="#333"/><rect x="524" y="30" width="40" height="150" rx="4" fill="#fff" stroke="#333"/><rect x="566" y="30" width="40" height="150" rx="4" fill="#fff" stroke="#333"/><rect x="48" y="30" width="26" height="92" rx="3" fill="#222"/><rect x="90" y="30" width="26" height="92" rx="3" fill="#222"/><rect x="174" y="30" width="26" height="92" rx="3" fill="#222"/><rect x="216" y="30" width="26" height="92" rx="3" fill="#222"/><rect x="258" y="30" width="26" height="92" rx="3" fill="#222"/><rect x="342" y="30" width="26" height="92" rx="3" fill="#222"/><rect x="384" y="30" width="26" height="92" rx="3" fill="#222"/><rect x="468" y="30" width="26" height="92" rx="3" fill="#222"/><rect x="510" y="30" width="26" height="92" rx="3" fill="#222"/><rect x="552" y="30" width="26" height="92" rx="3" fill="#222"/>
<text x="41" y="170" text-anchor="middle" font-size="12" style="fill:#fff">C</text><text x="125" y="170" text-anchor="middle" font-size="12" style="fill:#fff">E</text><text x="209" y="170" text-anchor="middle" font-size="12" style="fill:#fff">G</text>
<text x="330" y="202" text-anchor="middle" font-size="11.5">C major triad = root + major third (4 semitones) + perfect fifth (7 semitones) · frequency ratios ≈ 4 : 5 : 6</text>
</svg>
<figcaption>Chords are stacked intervals. The major triad's ratios (about 4:5:6) are why it sounds so stable.</figcaption>
</figure>

```answer
? A4 is 440 Hz. What frequency is A5, one octave higher, in Hz?
= 880
```

```answer
? In equal temperament, what is the frequency ratio of one semitone? Give it to 4 decimal places.
= 1.0595
tolerance: 0.0001
> 2^(1/12) ≈ 1.05946.
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
Equal temperament :: 12 equal semitones of 2^(1/12).
Timbre :: Harmonic spectrum + envelope.
Counterpoint :: Independent melodies combined.
Dominant → tonic :: V → I, the strongest cadence.
