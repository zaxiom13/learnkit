---
title: The cell and its code
blurb: DNA → RNA → protein: biology as an information-processing system.
section: Machinery
---

**The central dogma**: DNA is **transcribed** into RNA, which is **translated** into protein. DNA uses 4 bases (A, C, G, T); 3 bases (a **codon**) specify one of 20 amino acids — 64 codons, so the code is redundant.

| thing | computing analogy |
|---|---|
| **Genome** | source code (~3.1 billion base pairs in humans, ~20,000 protein-coding genes) |
| **Gene expression / regulation** | which functions are called, when |
| **Proteins** | the running programs and machines (enzymes, motors, receptors) |
| **Ribosome** | the interpreter translating mRNA into protein |
| **Epigenetics** | config flags (methylation, histones) changing expression without changing code |
| **Mutation** | bit flips; most harmless, some break things, rare ones help |

**Protein folding**: the amino-acid sequence determines a 3D shape — which determines function. Predicting it was a 50-year grand challenge until **AlphaFold 2 (2020)** (Nobel Chemistry 2024 to Hassabis & Jumper, with Baker for protein design).

```answer
? How many possible codons are there with 4 bases taken 3 at a time?
= 64
```

```choice
? Why can a single-letter DNA change cause disease (e.g. sickle-cell)?
- [x] It changes one amino acid, altering the protein's shape and function // Sickle-cell: glutamate → valine in haemoglobin.
- [ ] It deletes the whole chromosome
- [ ] DNA letters are directly toxic
```

```reflect
? Describe the cell as a computer, and where the analogy breaks.
- DNA as code, ribosome as interpreter, regulation as control flow
- breaks: massively parallel, stochastic, analogue chemistry, no clean hardware/software split, code evolved not designed
model: DNA stores instructions, RNA copies carry them out of the nucleus, ribosomes interpret them into proteins that do the work, and regulatory networks act like control flow. But the cell is massively parallel, noisy and chemical; the "code" also physically builds its own hardware; and it was shaped by evolution, so it's full of redundancy and hacks rather than clean design.
```

```cards
Central dogma :: DNA → RNA → protein.
Codon :: Three bases coding one amino acid.
Human genome :: ~3.1 billion base pairs, ~20,000 protein-coding genes.
Epigenetics :: Heritable expression changes without sequence changes.
AlphaFold :: AI that predicts protein structure (Nobel 2024).
