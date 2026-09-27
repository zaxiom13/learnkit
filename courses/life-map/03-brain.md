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

## Big theories

- **Predictive processing / free-energy principle** (Friston): the brain is a prediction machine minimising surprise — Bayesian inference in wetware.
- **Dopamine = reward-prediction error** (Schultz) — exactly the TD-learning signal of reinforcement learning.
- **Dual process** (Kahneman): fast intuitive System 1, slow deliberate System 2.

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

```reflect
? What did artificial neural networks borrow from the brain, and where do they differ?
- borrowed: units summing weighted inputs, learning by changing weights, layered/hierarchical vision (convnets from visual cortex)
- differ: backprop not obviously biological, spikes vs continuous, energy efficiency, far less data-efficient
model: ANNs borrowed the idea of simple units summing weighted inputs, learning by adjusting connection strengths, and hierarchical processing like the visual cortex (which inspired convolutional nets). But brains use spikes and local learning rules rather than obvious backprop, learn from far less data, and run on 20 W where large models need megawatts.
```

```cards
Action potential :: All-or-nothing electrical spike.
Hebbian learning :: Fire together, wire together.
Hippocampus :: Memory formation; place cells.
Dopamine :: Reward-prediction error signal.
Predictive processing :: Brain as prediction-error minimiser.
