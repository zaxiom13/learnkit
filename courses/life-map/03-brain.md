---
title: The brain
blurb: Neurons, networks, learning, memory, perception — and what AI took from neuroscience.
section: Mind
---

- ~**86 billion neurons**, ~10¹⁴ synapses, running on ~**20 W**.
- A neuron integrates inputs; past a threshold it fires an **action potential** (spike) — an all-or-nothing electrical pulse (Hodgkin–Huxley equations, 1952 — a triumph of biophysics).
- **Synapses** use neurotransmitters: glutamate (excite), GABA (inhibit), dopamine (reward prediction), serotonin, acetylcholine.
- **Learning** = changing synaptic strengths: **Hebb** ("cells that fire together wire together"), long-term potentiation, spike-timing-dependent plasticity.

| region | role |
|---|---|
| **Cortex** | perception, language, planning; six-layered sheet |
| **Prefrontal cortex** | executive control, working memory |
| **Hippocampus** | forming new memories; spatial maps (**place cells**, **grid cells** — Nobel 2014) |
| **Basal ganglia** | action selection, habits; dopamine |
| **Cerebellum** | coordination; more than half the brain's neurons |
| **Amygdala** | emotion, threat |

```viz neuron
> A leaky integrate-and-fire neuron: charge, leak, spike, reset. Turn up the input and it fires faster (rate coding).
```

## Big theories

- **Predictive processing / free-energy principle** (Friston): the brain is a prediction machine minimising surprise — Bayesian inference in wetware.
- **Dopamine = reward-prediction error** (Schultz) — exactly the TD-learning signal of reinforcement learning.
- **Dual process** (Kahneman): fast intuitive System 1, slow deliberate System 2.

<figure class="diagram">
<svg viewBox="0 0 640 220">
<path d="M150 150 C90 150 70 90 110 60 C130 20 220 10 270 30 C320 5 420 15 450 60 C500 70 510 130 470 150 C460 180 400 190 370 170 C330 190 260 185 230 165 C200 175 160 170 150 150Z" fill="color-mix(in srgb, var(--coral) 15%, var(--surface))" stroke="var(--coral)" stroke-width="2.5"/>
<path d="M150 150 C200 140 190 110 240 110" fill="none" stroke="var(--coral)" stroke-width="1.5" opacity="0.6"/>
<ellipse cx="420" cy="170" rx="45" ry="25" fill="color-mix(in srgb, var(--warn) 30%, var(--surface))" stroke="var(--warn)" stroke-width="2"/>
<rect x="300" y="160" width="18" height="50" rx="8" fill="var(--text-3)"/>
<g font-size="11.5">
<circle cx="140" cy="80" r="6" fill="var(--accent)" class="pulse"/><text x="30" y="60">prefrontal cortex</text><text x="30" y="75" font-size="10">planning, control</text>
<circle cx="300" cy="40" r="6" fill="var(--accent)" class="pulse" style="animation-delay:.3s"/><text x="280" y="22">motor/sensory strips</text>
<circle cx="430" cy="70" r="6" fill="var(--accent)" class="pulse" style="animation-delay:.6s"/><text x="470" y="50">visual cortex (back)</text>
<circle cx="290" cy="130" r="6" fill="var(--good)" class="pulse" style="animation-delay:.9s"/><text x="200" y="205">hippocampus (memory)</text>
<circle cx="420" cy="170" r="6" fill="var(--warn)" class="pulse" style="animation-delay:1.2s"/><text x="480" y="190">cerebellum (coordination)</text>
<text x="330" y="215" font-size="10">brainstem</text>
</g></svg>
<figcaption>A rough map. The functions overlap and interconnect far more than any diagram shows.</figcaption>
</figure>

```choice
? Dopamine neurons fire when a reward is better than expected and dip when it's worse. Which RL concept matches?
- [x] Temporal-difference (reward prediction) error // A striking match between biology and AI.
- [ ] Gradient descent
- [ ] The discount factor
```

```answer
? The brain uses roughly how many watts?
= 20
tolerance: 5
```

```viz gradient
> How artificial networks learn: gradient descent on a loss. Whether brains do anything like backprop is an open question.
```

```reflect
? What did artificial neural networks borrow from the brain, and where do they differ?
- borrowed: units summing weighted inputs, learning by changing weights, layered/hierarchical vision (convnets from visual cortex)
- differ: backprop not obviously biological, spikes vs continuous, energy efficiency, far less data-efficient
model: ANNs borrowed the idea of simple units summing weighted inputs, learning by adjusting connection strengths, and hierarchical processing like the visual cortex (which inspired convolutional nets). But brains use spikes and local learning rules rather than obvious backprop, learn from far less data, and run on 20 W where large models need megawatts.
```

```recall The brain in four lines
? Signals, learning, memory and reward.
An action potential is an all-or-nothing electrical spike. Neurons that fire together wire together. The hippocampus forms memories. Dopamine signals reward prediction error.
```

```cards
Action potential :: All-or-nothing electrical spike.
Hebbian learning :: Fire together, wire together.
Hippocampus :: Memory formation; place cells.
Dopamine :: Reward-prediction error signal.
Predictive processing :: Brain as prediction-error minimiser.
