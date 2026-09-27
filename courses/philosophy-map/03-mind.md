---
title: Mind, consciousness and AI
blurb: The hard problem, functionalism, Chinese rooms, free will — the questions LLMs made urgent.
section: Mind
---

| position | claim |
|---|---|
| **Dualism** (Descartes) | mind and matter are different substances |
| **Physicalism** | everything is physical; mind is what brains do |
| **Functionalism** | mental states are defined by their functional role — so minds could run on silicon |
| **Illusionism** (Dennett, Frankish) | "phenomenal consciousness" as we conceive it is a kind of illusion |
| **Panpsychism** | consciousness is a basic feature of matter |
| **Integrated Information Theory** (Tononi) | consciousness = integrated information Φ |
| **Global Workspace Theory** (Baars, Dehaene) | consciousness = information broadcast across the brain |

<figure class="diagram">
<svg viewBox="0 0 640 200">
<rect x="180" y="30" width="280" height="140" rx="10" fill="var(--surface-2)" stroke="var(--line-strong)" stroke-width="2"/>
<text x="320" y="22" text-anchor="middle" font-size="12" font-weight="700">the Chinese Room</text>
<text x="320" y="95" text-anchor="middle" font-size="30" class="bob">🧑📖</text>
<text x="320" y="130" text-anchor="middle" font-size="11">follows a rulebook: "if you see 你好, write 你好！"</text>
<text x="320" y="148" text-anchor="middle" font-size="11">understands no Chinese</text>
<rect x="30" y="80" width="80" height="34" rx="8" fill="var(--accent)"/><text x="70" y="102" text-anchor="middle" font-size="15" style="fill:#fff">你好?</text>
<rect x="530" y="80" width="80" height="34" rx="8" fill="var(--good)"/><text x="570" y="102" text-anchor="middle" font-size="15" style="fill:#fff">你好！</text>
<path d="M110 97 H180" stroke="var(--accent)" stroke-width="3" class="flow"/><path d="M460 97 H530" stroke="var(--good)" stroke-width="3" class="flow"/>
<text x="320" y="192" text-anchor="middle" font-size="11.5">outside, it looks fluent. Does anything in the room understand? (Searle says no; the "systems reply" says the whole room does)</text>
</svg>
<figcaption>Searle's 1980 argument, now aimed squarely at language models.</figcaption>
</figure>

## Famous thought experiments

- **What is it like to be a bat?** (Nagel 1974): subjective experience resists objective description.
- **The hard problem** (Chalmers 1995): why is there *experience* at all, beyond information processing?
- **Mary's room** (Jackson): a colour scientist who has never seen red — does she learn something when she does?
- **Chinese room** (Searle 1980): symbol manipulation isn't understanding — the argument now aimed at LLMs.
- **Philosophical zombies**: physically identical, no experience — conceivable?
- **Turing test** (1950): replace "can machines think?" with "can they converse indistinguishably?"

```viz neuron
> What the physicalist says a thought is made of: spikes. One leaky integrate-and-fire neuron, of 86 billion.
```

## Free will

**Hard determinism** (no free will), **libertarianism** (free will, determinism false), **compatibilism** (free will = acting from your own reasons, compatible with determinism — the majority view among philosophers). Quantum randomness doesn't obviously help: random isn't free.

```choice
? Searle's Chinese Room argues that…
- [x] Following rules to manipulate symbols isn't enough for understanding // Syntax isn't semantics.
- [ ] Chinese is harder than English
- [ ] Computers can never pass the Turing test
```

```answer
? Who coined "the hard problem of consciousness"? (surname)
= Chalmers
= David Chalmers
```

```reflect
? Does an LLM understand language? Give the strongest argument on each side.
- yes: functionalism / behaviour and internal representations track meaning
- no: Chinese room / no grounding or experience
- clarifies what "understand" means
model: For: by functionalist lights, understanding is doing the right things with information, and LLMs build rich internal representations that generalise and reason. Against: Searle-style arguments say symbol manipulation isn't meaning, and LLMs lack grounding in perception, action and experience. Much hinges on whether "understanding" is a functional capacity or requires consciousness.
```

```cards
Hard problem :: Why is there subjective experience at all?
Functionalism :: Mind defined by function, not substrate.
Chinese room :: Syntax isn't semantics (Searle).
Compatibilism :: Free will is compatible with determinism.
Global workspace :: Consciousness as brain-wide broadcast.
