---
title: Quantum foundations and quantum information
blurb: Entanglement, Bell, decoherence, interpretations — and qubits, error correction and what quantum computers are actually good for.
section: Quantum
---

## Foundations in five facts

1. States are vectors in Hilbert space; observables are Hermitian operators; probabilities by the **Born rule** |⟨φ|ψ⟩|².
2. **Entanglement**: joint states that aren't products of individual states.
3. **Bell's theorem (1964)**: no *local hidden-variable* theory reproduces quantum predictions. Experiments (Aspect 1982; loophole-free 2015) agree with QM. **Nobel 2022**: Aspect, Clauser, Zeilinger.
4. **No-cloning**: unknown quantum states can't be copied.
5. **Decoherence**: entanglement with the environment makes superpositions look like classical mixtures — explains why we don't see cats in superposition, but not (alone) why one outcome occurs.

```viz waves
> The double slit, where quantum mechanics starts. Amplitudes add, then you square. Add a which-path detector and the fringes vanish.
```

## Interpretations (the philosophy branch)

| interpretation | the claim |
|---|---|
| **Copenhagen** | don't ask what happens between measurements; collapse on measurement |
| **Many-worlds (Everett)** | no collapse; all branches exist |
| **Pilot wave (de Broglie–Bohm)** | real particles guided by a wave; explicitly non-local |
| **Objective collapse (GRW, Penrose)** | collapse is a real physical process; testable |
| **QBism** | the wavefunction is an agent's beliefs |
| **Relational** | states are relative to observers |

They all agree on predictions (except collapse models, in principle).

```viz bell
> Bell's inequality as a slider. No local hidden-variable model can push S above 2. Quantum mechanics reaches 2√2, and so do experiments (Nobel 2022).
```

## Quantum computing

- **Qubit**: α|0⟩ + β|1⟩; n qubits span 2ⁿ amplitudes — but you only read n bits out.
- **Gates** are unitaries; circuits interfere amplitudes so wrong answers cancel.
- **Algorithms**: Shor (factoring, exponential), Grover (search, quadratic), **quantum simulation** (chemistry/materials — the most likely real win), HHL (linear systems, with caveats).
- **Platforms**: superconducting (Google, IBM), trapped ions (Quantinuum, IonQ), neutral atoms (QuEra, Pasqal), photonics (PsiQuantum — building in **Brisbane**), spin qubits in silicon (Silicon Quantum Computing, **Sydney**).
- **Error correction**: encode one **logical** qubit in many physical ones (surface code). Current era is **NISQ** → early fault tolerance.

<figure class="diagram">
<svg viewBox="0 0 640 220">
<g transform="translate(160 110)">
<ellipse rx="90" ry="26" fill="none" stroke="var(--line-strong)" stroke-dasharray="4 4"/>
<circle r="90" fill="color-mix(in srgb, var(--accent) 8%, transparent)" stroke="var(--line-strong)" stroke-width="1.5"/>
<line y1="-90" y2="90" stroke="var(--line-strong)"/><line x1="-90" x2="90" stroke="var(--line-strong)"/>
<text y="-98" text-anchor="middle" font-size="13">|0⟩</text><text y="112" text-anchor="middle" font-size="13">|1⟩</text>
<text x="98" y="4" font-size="12">|+⟩</text>
<g class="spin"><line x1="0" y1="0" x2="52" y2="-58" stroke="var(--coral)" stroke-width="4" stroke-linecap="round"/><circle cx="52" cy="-58" r="7" fill="var(--coral)"/></g>
</g>
<g font-size="12.5">
<text x="320" y="50">a qubit = a point on the Bloch sphere</text>
<text x="320" y="76" font-size="11.5">north/south poles: |0⟩ and |1⟩ (classical bits)</text>
<text x="320" y="98" font-size="11.5">equator: equal superpositions, differing in phase</text>
<text x="320" y="120" font-size="11.5">gates = rotations of the sphere</text>
<text x="320" y="142" font-size="11.5">measurement: snaps to a pole, with Born-rule odds</text>
<text x="320" y="172" font-size="11.5" style="fill:var(--coral)">n qubits: 2ⁿ amplitudes, but you read out only n bits</text>
</g></svg>
<figcaption>The Bloch sphere: the picture every quantum-computing interview expects you to be able to sketch.</figcaption>
</figure>

```choice
? What does Bell's theorem rule out?
- [x] Local hidden-variable theories // Not all hidden variables — Bohmian mechanics survives by being non-local.
- [ ] All hidden variables
- [ ] Faster-than-light signalling // QM already forbids signalling; entanglement can't send messages.
- [ ] Quantum mechanics
```

```viz timeline
1900 | Planck's quantum | 1900 | E = hν fixes the blackbody spectrum
1905 | Einstein: photons | 1905 | the photoelectric effect
1913 | Bohr atom | 1913 | quantised orbits
1925 | Heisenberg matrix mechanics | 1925 |
1926 | Schrödinger equation | 1926 | wave mechanics; Born rule soon after
1927 | Solvay conference | 1927 | Einstein vs Bohr
1935 | EPR and the cat | 1935 | "spooky action"; Schrödinger's cat
1948 | QED | 1948 | Feynman, Schwinger, Tomonaga
1964 | Bell's theorem | 1964 |
1981 | Feynman: simulate physics with quantum computers | 1981 |
1994 | Shor's algorithm | 1994 |
2019 | "quantum supremacy" claim | 2019 | Google's Sycamore
2022 | Nobel for Bell tests | 2022 | Aspect, Clauser, Zeilinger
> A century of quantum.
```

```answer
? How many complex amplitudes describe a general state of 10 qubits?
= 1024
> 2¹⁰. At ~50 qubits, a full classical state vector no longer fits in memory.
```

```choice
? Where is a quantum computer most likely to beat classical computers first in a useful way?
- [x] Simulating quantum systems (molecules, materials) // Feynman's original 1981 motivation.
- [ ] Running web servers
- [ ] Speeding up every algorithm exponentially
> Quantum speed-ups are special, not general.
```

```viz spectrum
> Where it all began. Classical physics predicted infinite ultraviolet output from a hot body. Planck's quantum (1900) gives this curve instead.
```

```reflect
? Explain entanglement to a non-physicist without saying "spooky" or claiming it sends signals.
- correlated outcomes stronger than any classical scheme allows (Bell)
- each side alone looks random
- no information can be sent this way
model: Two entangled particles give measurement results that are correlated in a way no pre-agreed classical plan can reproduce — that's what Bell tests show. But each person alone just sees random results; only when they compare notes do the correlations appear, so you can't use it to send a message.
```

```recall Quantum in three facts
? The Born rule, Bell and no-cloning.
The Born rule: probability is the squared magnitude of the amplitude. Bell's theorem: no local hidden-variable theory can reproduce quantum mechanics. The no-cloning theorem: an unknown quantum state cannot be copied.
```

```cards
Born rule :: Probability = |amplitude|².
Bell's theorem :: No local hidden variables reproduce QM.
Decoherence :: Environment entanglement suppresses interference.
No-cloning :: Unknown quantum states can't be copied.
Surface code :: Leading quantum error-correcting code.
NISQ :: Noisy intermediate-scale quantum era.
