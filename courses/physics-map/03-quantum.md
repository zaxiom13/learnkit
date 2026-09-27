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

## Quantum computing

- **Qubit**: α|0⟩ + β|1⟩; n qubits span 2ⁿ amplitudes — but you only read n bits out.
- **Gates** are unitaries; circuits interfere amplitudes so wrong answers cancel.
- **Algorithms**: Shor (factoring, exponential), Grover (search, quadratic), **quantum simulation** (chemistry/materials — the most likely real win), HHL (linear systems, with caveats).
- **Platforms**: superconducting (Google, IBM), trapped ions (Quantinuum, IonQ), neutral atoms (QuEra, Pasqal), photonics (PsiQuantum — building in **Brisbane**), spin qubits in silicon (Silicon Quantum Computing, **Sydney**).
- **Error correction**: encode one **logical** qubit in many physical ones (surface code). Current era is **NISQ** → early fault tolerance.

```choice
? What does Bell's theorem rule out?
- [x] Local hidden-variable theories // Not all hidden variables — Bohmian mechanics survives by being non-local.
- [ ] All hidden variables
- [ ] Faster-than-light signalling // QM already forbids signalling; entanglement can't send messages.
- [ ] Quantum mechanics
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

```reflect
? Explain entanglement to a non-physicist without saying "spooky" or claiming it sends signals.
- correlated outcomes stronger than any classical scheme allows (Bell)
- each side alone looks random
- no information can be sent this way
model: Two entangled particles give measurement results that are correlated in a way no pre-agreed classical plan can reproduce — that's what Bell tests show. But each person alone just sees random results; only when they compare notes do the correlations appear, so you can't use it to send a message.
```

```cards
Born rule :: Probability = |amplitude|².
Bell's theorem :: No local hidden variables reproduce QM.
Decoherence :: Environment entanglement suppresses interference.
No-cloning :: Unknown quantum states can't be copied.
Surface code :: Leading quantum error-correcting code.
NISQ :: Noisy intermediate-scale quantum era.
