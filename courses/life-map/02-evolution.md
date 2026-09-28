---
title: Evolution — the algorithm
blurb: Variation, selection, inheritance, and why evolution is the most powerful optimiser we know.
section: Machinery
---

**Darwin & Wallace (1858–59)**: heritable variation + differential reproduction ⇒ adaptation. Add **Mendel's genetics** and population genetics (Fisher, Haldane, Wright) → the **modern synthesis**. Add DNA → molecular evolution.

| concept | meaning |
|---|---|
| **Natural selection** | variants that reproduce more spread |
| **Genetic drift** | random changes in frequency, strong in small populations |
| **Sexual selection** | traits that win mates (peacock tails) |
| **Kin selection** | helping relatives spreads shared genes (Hamilton's rule: rB > C) |
| **Selfish gene** (Dawkins) | the gene's-eye view of evolution |
| **Convergent evolution** | similar solutions evolve independently (eyes, wings) |
| **Punctuated equilibrium** | long stasis, rapid bursts (Gould & Eldredge) |
| **Evo-devo** | how small changes in developmental genes produce big body changes |

```viz evolution
> Cumulative selection vs blind chance. Dawkins' weasel program, live.
```

## Evolution as an algorithm

It's a population-based stochastic optimiser — the inspiration for **genetic algorithms** and evolution strategies. It doesn't aim; it climbs fitness landscapes locally and can get stuck (the eye's blind spot, the recurrent laryngeal nerve looping round the aorta — in giraffes, metres long).

**Australia**: long isolation → marsupials and monotremes (the platypus lays eggs), eucalypts; a natural experiment in evolution.

```viz tree
. LUCA | last universal common ancestor, ~4 billion years ago
.. Bacteria | most of life's chemistry
.. Archaea | extremophiles, and our nuclear ancestors
... Eukaryotes | cells with a nucleus (after swallowing a bacterium → mitochondria)
.... Plants | photosynthesis via captured cyanobacteria (chloroplasts)
.... Fungi | closer to animals than plants!
.... Animals | multicellular movers
..... Vertebrates | backbones
...... Fish → tetrapods | onto land ~375 million years ago
....... Mammals | milk, fur
........ Monotremes | platypus, echidna — lay eggs
........ Marsupials | kangaroo, koala — pouches; Australia's radiation
........ Placentals | us
......... Primates → Homo sapiens | ~300,000 years ago
> The tree of life, from one ancestor to you. Tap to climb it.
```

```choice
? Hamilton's rule rB > C explains…
- [x] Altruism toward relatives: help if relatedness × benefit exceeds cost // Kin selection.
- [ ] Why mutations happen
- [ ] Why the sky is blue
```

```answer
? Under Hamilton's rule, a full sibling has relatedness r = 0.5. If helping costs you C = 1, what benefit B to your sibling makes it exactly break-even?
= 2
```

```viz population
> Ecology is evolution's arena: populations of predators and prey drive each other in cycles.
```

```reflect
? Explain a "bad design" in the human body that makes sense in light of evolution.
- names the feature
- explains the historical constraint
- evolution modifies what exists; no redesign
model: The recurrent laryngeal nerve loops down under the aorta and back up to the larynx. In our fish ancestors that route was direct; as necks lengthened, the nerve was dragged along with the heart. Evolution can only tweak what exists, so the detour remains — in giraffes it's several metres long.
```

```recall Evolution as an algorithm
? The mechanisms that change gene frequencies.
Natural selection: heritable variants that reproduce more, spread. Genetic drift: random changes in frequency, strongest in small populations. Hamilton's rule: helping kin evolves when r times B is greater than C.
```

```cards
Natural selection :: Heritable variants that reproduce more spread.
Genetic drift :: Random frequency change; strong in small populations.
Hamilton's rule :: rB > C.
Convergent evolution :: Same solution evolves independently.
Monotreme :: Egg-laying mammal (platypus, echidna).
