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

<figure class="diagram">
<svg viewBox="0 0 640 200"><g class="bob"><line x1="20" y1="100.0" x2="20" y2="100.0" stroke="#f2594b" stroke-width="4" opacity="0.8"/><line x1="40" y1="121.57414923718913" x2="40" y2="78.42585076281087" stroke="#3f4cf5" stroke-width="4" opacity="0.8"/><line x1="60" y1="137.86619431635535" x2="60" y2="62.13380568364466" stroke="#19935f" stroke-width="4" opacity="0.8"/><line x1="80" y1="144.88727439718247" x2="80" y2="55.11272560281755" stroke="#c98110" stroke-width="4" opacity="0.8"/><line x1="100" y1="140.91838420715567" x2="100" y2="59.081615792844325" stroke="#f2594b" stroke-width="4" opacity="0.8"/><line x1="120" y1="126.93124648467804" x2="120" y2="73.06875351532196" stroke="#3f4cf5" stroke-width="4" opacity="0.8"/><line x1="140" y1="106.35040036269402" x2="140" y2="93.64959963730598" stroke="#19935f" stroke-width="4" opacity="0.8"/><line x1="160" y1="84.2147547539671" x2="160" y2="115.7852452460329" stroke="#c98110" stroke-width="4" opacity="0.8"/><line x1="180" y1="65.94388771114323" x2="180" y2="134.05611228885675" stroke="#f2594b" stroke-width="4" opacity="0.8"/><line x1="200" y1="56.011144705070635" x2="200" y2="143.98885529492935" stroke="#3f4cf5" stroke-width="4" opacity="0.8"/><line x1="220" y1="56.84840764015877" x2="220" y2="143.15159235984123" stroke="#19935f" stroke-width="4" opacity="0.8"/><line x1="240" y1="68.25068534933237" x2="240" y2="131.74931465066763" stroke="#c98110" stroke-width="4" opacity="0.8"/><line x1="260" y1="87.42630258104833" x2="260" y2="112.57369741895167" stroke="#f2594b" stroke-width="4" opacity="0.8"/><line x1="280" y1="109.6803994639517" x2="280" y2="90.3196005360483" stroke="#3f4cf5" stroke-width="4" opacity="0.8"/><line x1="300" y1="129.5643969423455" x2="300" y2="70.43560305765449" stroke="#19935f" stroke-width="4" opacity="0.8"/><line x1="320" y1="142.20999895486324" x2="320" y2="57.79000104513675" stroke="#c98110" stroke-width="4" opacity="0.8"/><line x1="340" y1="144.52112109805216" x2="340" y2="55.47887890194782" stroke="#f2594b" stroke-width="4" opacity="0.8"/><line x1="360" y1="135.93192006805705" x2="360" y2="64.06807993194295" stroke="#3f4cf5" stroke-width="4" opacity="0.8"/><line x1="380" y1="118.54533183587904" x2="380" y2="81.45466816412096" stroke="#19935f" stroke-width="4" opacity="0.8"/><line x1="400" y1="96.61819957921858" x2="400" y2="103.38180042078142" stroke="#c98110" stroke-width="4" opacity="0.8"/><line x1="420" y1="75.51905000997836" x2="420" y2="124.48094999002164" stroke="#f2594b" stroke-width="4" opacity="0.8"/><line x1="440" y1="60.413690801274846" x2="440" y2="139.58630919872516" stroke="#3f4cf5" stroke-width="4" opacity="0.8"/><line x1="460" y1="55.000440705218345" x2="460" y2="144.99955929478165" stroke="#19935f" stroke-width="4" opacity="0.8"/><line x1="480" y1="60.604652139020715" x2="480" y2="139.39534786097929" stroke="#c98110" stroke-width="4" opacity="0.8"/><line x1="500" y1="75.85421868998043" x2="500" y2="124.14578131001957" stroke="#f2594b" stroke-width="4" opacity="0.8"/><line x1="520" y1="97.01551461919597" x2="520" y2="102.98448538080403" stroke="#3f4cf5" stroke-width="4" opacity="0.8"/><line x1="540" y1="118.90751665719884" x2="540" y2="81.09248334280116" stroke="#19935f" stroke-width="4" opacity="0.8"/><line x1="560" y1="136.17029919482295" x2="560" y2="63.829700805177055" stroke="#c98110" stroke-width="4" opacity="0.8"/><line x1="580" y1="144.57733100626916" x2="580" y2="55.42266899373083" stroke="#f2594b" stroke-width="4" opacity="0.8"/><line x1="600" y1="142.07027749861072" x2="600" y2="57.929722501389264" stroke="#3f4cf5" stroke-width="4" opacity="0.8"/><line x1="620" y1="129.26295280707026" x2="620" y2="70.73704719292974" stroke="#19935f" stroke-width="4" opacity="0.8"/><path d="M20 100.0L22 102.2L24 104.5L26 106.7L28 108.9L30 111.1L32 113.3L34 115.4L36 117.5L38 119.6L40 121.6L42 123.5L44 125.4L46 127.2L48 129.0L50 130.7L52 132.3L54 133.8L56 135.2L58 136.6L60 137.9L62 139.0L64 140.1L66 141.1L68 141.9L70 142.7L72 143.4L74 143.9L76 144.3L78 144.7L80 144.9L82 145.0L84 145.0L86 144.9L88 144.6L90 144.3L92 143.8L94 143.3L96 142.6L98 141.8L100 140.9L102 139.9L104 138.8L106 137.7L108 136.4L110 135.0L112 133.6L114 132.0L116 130.4L118 128.7L120 126.9L122 125.1L124 123.2L126 121.2L128 119.2L130 117.2L132 115.1L134 112.9L136 110.8L138 108.6L140 106.4L142 104.1L144 101.9L146 99.6L148 97.4L150 95.1L152 92.9L154 90.7L156 88.5L158 86.3L160 84.2L162 82.1L164 80.1L166 78.1L168 76.2L170 74.3L172 72.5L174 70.7L176 69.1L178 67.5L180 65.9L182 64.5L184 63.2L186 61.9L188 60.8L190 59.7L192 58.8L194 57.9L196 57.2L198 56.5L200 56.0L202 55.6L204 55.3L206 55.1L208 55.0L210 55.0L212 55.2L214 55.4L216 55.8L218 56.3L220 56.8L222 57.5L224 58.3L226 59.2L228 60.2L230 61.3L232 62.5L234 63.8L236 65.2L238 66.7L240 68.3L242 69.9L244 71.6L246 73.4L248 75.2L250 77.1L252 79.1L254 81.1L256 83.2L258 85.3L260 87.4L262 89.6L264 91.8L266 94.0L268 96.3L270 98.5L272 100.8L274 103.0L276 105.2L278 107.5L280 109.7L282 111.9L284 114.0L286 116.1L288 118.2L290 120.3L292 122.2L294 124.2L296 126.0L298 127.8L300 129.6L302 131.2L304 132.8L306 134.3L308 135.7L310 137.0L312 138.3L314 139.4L316 140.4L318 141.4L320 142.2L322 142.9L324 143.6L326 144.1L328 144.5L330 144.8L332 144.9L334 145.0L336 145.0L338 144.8L340 144.5L342 144.1L344 143.6L346 143.0L348 142.3L350 141.5L352 140.6L354 139.6L356 138.5L358 137.2L360 135.9L362 134.5L364 133.0L366 131.5L368 129.8L370 128.1L372 126.3L374 124.5L376 122.5L378 120.6L380 118.5L382 116.5L384 114.4L386 112.2L388 110.0L390 107.8L392 105.6L394 103.4L396 101.1L398 98.9L400 96.6L402 94.4L404 92.2L406 90.0L408 87.8L410 85.6L412 83.5L414 81.4L416 79.4L418 77.4L420 75.5L422 73.7L424 71.9L426 70.2L428 68.5L430 66.9L432 65.5L434 64.1L436 62.7L438 61.5L440 60.4L442 59.4L444 58.5L446 57.7L448 57.0L450 56.4L452 55.9L454 55.5L456 55.2L458 55.0L460 55.0L462 55.1L464 55.2L466 55.5L468 55.9L470 56.4L472 57.1L474 57.8L476 58.6L478 59.6L480 60.6L482 61.7L484 63.0L486 64.3L488 65.7L490 67.2L492 68.8L494 70.5L496 72.2L498 74.0L500 75.9L502 77.8L504 79.8L506 81.8L508 83.9L510 86.0L512 88.2L514 90.3L516 92.5L518 94.8L520 97.0L522 99.3L524 101.5L526 103.8L528 106.0L530 108.2L532 110.4L534 112.6L536 114.7L538 116.8L540 118.9L542 120.9L544 122.9L546 124.8L548 126.6L550 128.4L552 130.1L554 131.8L556 133.3L558 134.8L560 136.2L562 137.5L564 138.7L566 139.8L568 140.8L570 141.7L572 142.5L574 143.2L576 143.7L578 144.2L580 144.6L582 144.8L584 145.0L586 145.0L588 144.9L590 144.7L592 144.4L594 144.0L596 143.5L598 142.8L600 142.1L602 141.2L604 140.3L606 139.2L608 138.1L610 136.8L612 135.5L614 134.0L616 132.5L618 130.9L620 129.3" fill="none" stroke="var(--accent)" stroke-width="4"/><path d="M20 100.0L22 97.8L24 95.5L26 93.3L28 91.1L30 88.9L32 86.7L34 84.6L36 82.5L38 80.4L40 78.4L42 76.5L44 74.6L46 72.8L48 71.0L50 69.3L52 67.7L54 66.2L56 64.8L58 63.4L60 62.1L62 61.0L64 59.9L66 58.9L68 58.1L70 57.3L72 56.6L74 56.1L76 55.7L78 55.3L80 55.1L82 55.0L84 55.0L86 55.1L88 55.4L90 55.7L92 56.2L94 56.7L96 57.4L98 58.2L100 59.1L102 60.1L104 61.2L106 62.3L108 63.6L110 65.0L112 66.4L114 68.0L116 69.6L118 71.3L120 73.1L122 74.9L124 76.8L126 78.8L128 80.8L130 82.8L132 84.9L134 87.1L136 89.2L138 91.4L140 93.6L142 95.9L144 98.1L146 100.4L148 102.6L150 104.9L152 107.1L154 109.3L156 111.5L158 113.7L160 115.8L162 117.9L164 119.9L166 121.9L168 123.8L170 125.7L172 127.5L174 129.3L176 130.9L178 132.5L180 134.1L182 135.5L184 136.8L186 138.1L188 139.2L190 140.3L192 141.2L194 142.1L196 142.8L198 143.5L200 144.0L202 144.4L204 144.7L206 144.9L208 145.0L210 145.0L212 144.8L214 144.6L216 144.2L218 143.7L220 143.2L222 142.5L224 141.7L226 140.8L228 139.8L230 138.7L232 137.5L234 136.2L236 134.8L238 133.3L240 131.7L242 130.1L244 128.4L246 126.6L248 124.8L250 122.9L252 120.9L254 118.9L256 116.8L258 114.7L260 112.6L262 110.4L264 108.2L266 106.0L268 103.7L270 101.5L272 99.2L274 97.0L276 94.8L278 92.5L280 90.3L282 88.1L284 86.0L286 83.9L288 81.8L290 79.7L292 77.8L294 75.8L296 74.0L298 72.2L300 70.4L302 68.8L304 67.2L306 65.7L308 64.3L310 63.0L312 61.7L314 60.6L316 59.6L318 58.6L320 57.8L322 57.1L324 56.4L326 55.9L328 55.5L330 55.2L332 55.1L334 55.0L336 55.0L338 55.2L340 55.5L342 55.9L344 56.4L346 57.0L348 57.7L350 58.5L352 59.4L354 60.4L356 61.5L358 62.8L360 64.1L362 65.5L364 67.0L366 68.5L368 70.2L370 71.9L372 73.7L374 75.5L376 77.5L378 79.4L380 81.5L382 83.5L384 85.6L386 87.8L388 90.0L390 92.2L392 94.4L394 96.6L396 98.9L398 101.1L400 103.4L402 105.6L404 107.8L406 110.0L408 112.2L410 114.4L412 116.5L414 118.6L416 120.6L418 122.6L420 124.5L422 126.3L424 128.1L426 129.8L428 131.5L430 133.1L432 134.5L434 135.9L436 137.3L438 138.5L440 139.6L442 140.6L444 141.5L446 142.3L448 143.0L450 143.6L452 144.1L454 144.5L456 144.8L458 145.0L460 145.0L462 144.9L464 144.8L466 144.5L468 144.1L470 143.6L472 142.9L474 142.2L476 141.4L478 140.4L480 139.4L482 138.3L484 137.0L486 135.7L488 134.3L490 132.8L492 131.2L494 129.5L496 127.8L498 126.0L500 124.1L502 122.2L504 120.2L506 118.2L508 116.1L510 114.0L512 111.8L514 109.7L516 107.5L518 105.2L520 103.0L522 100.7L524 98.5L526 96.2L528 94.0L530 91.8L532 89.6L534 87.4L536 85.3L538 83.2L540 81.1L542 79.1L544 77.1L546 75.2L548 73.4L550 71.6L552 69.9L554 68.2L556 66.7L558 65.2L560 63.8L562 62.5L564 61.3L566 60.2L568 59.2L570 58.3L572 57.5L574 56.8L576 56.3L578 55.8L580 55.4L582 55.2L584 55.0L586 55.0L588 55.1L590 55.3L592 55.6L594 56.0L596 56.5L598 57.2L600 57.9L602 58.8L604 59.7L606 60.8L608 61.9L610 63.2L612 64.5L614 66.0L616 67.5L618 69.1L620 70.7" fill="none" stroke="var(--coral)" stroke-width="4"/></g>
<text x="320" y="192" text-anchor="middle" font-size="11.5">A pairs with T, C pairs with G: each strand is a template for the other (Watson, Crick, Franklin, Wilkins, 1953)</text></svg>
<figcaption>The double helix. Its complementary pairing is how DNA copies itself.</figcaption>
</figure>

**Protein folding**: the amino-acid sequence determines a 3D shape — which determines function. Predicting it was a 50-year grand challenge until **AlphaFold 2 (2020)** (Nobel Chemistry 2024 to Hassabis & Jumper, with Baker for protein design).

```viz codon
> Transcription and translation, live. Type or mutate the DNA and watch the protein change.
```

```answer
? How many possible codons are there with 4 bases taken 3 at a time?
= 64
```

```viz stack packet=gene
DNA (nucleus) | the archive: ~3.1 billion letters, two copies
RNA polymerase | transcribes one gene into messenger RNA
mRNA | the working copy; spliced, exported to the cytoplasm
Ribosome | reads codons, three letters at a time
tRNA | each brings the matching amino acid
Protein chain | folds into a 3-D machine
Function | enzyme, motor, receptor, antibody…
> The central dogma as a pipeline. Send a gene through.
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
