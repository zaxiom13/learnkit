---
title: Machine learning and LLMs
blurb: From linear regression to transformers — the concepts, the vocabulary and the physics hiding inside.
section: Intelligence
---

## The families

| family | learns from | examples |
|---|---|---|
| **Supervised** | labelled examples | regression, classification, gradient-boosted trees (XGBoost) |
| **Unsupervised** | unlabelled data | clustering (k-means), PCA, autoencoders |
| **Self-supervised** | the data predicts itself | next-token prediction (LLMs), masked images |
| **Reinforcement learning** | rewards from acting | AlphaGo, robotics, RLHF for chatbots |
| **Generative** | model the data distribution | diffusion models (images), LLMs |

<figure class="diagram">
<svg viewBox="0 0 640 200">
<line x1="80" y1="40" x2="240" y2="40" stroke="var(--accent)" stroke-width="0.6" opacity="0.45"/><line x1="80" y1="40" x2="240" y2="80" stroke="var(--accent)" stroke-width="1.2" opacity="0.45"/><line x1="80" y1="40" x2="240" y2="120" stroke="var(--accent)" stroke-width="1.7999999999999998" opacity="0.45"/><line x1="80" y1="40" x2="240" y2="160" stroke="var(--accent)" stroke-width="2.4" opacity="0.45"/><line x1="80" y1="80" x2="240" y2="40" stroke="var(--accent)" stroke-width="2.4" opacity="0.45"/><line x1="80" y1="80" x2="240" y2="80" stroke="var(--accent)" stroke-width="0.6" opacity="0.45"/><line x1="80" y1="80" x2="240" y2="120" stroke="var(--accent)" stroke-width="1.2" opacity="0.45"/><line x1="80" y1="80" x2="240" y2="160" stroke="var(--accent)" stroke-width="1.7999999999999998" opacity="0.45"/><line x1="80" y1="120" x2="240" y2="40" stroke="var(--accent)" stroke-width="1.7999999999999998" opacity="0.45"/><line x1="80" y1="120" x2="240" y2="80" stroke="var(--accent)" stroke-width="2.4" opacity="0.45"/><line x1="80" y1="120" x2="240" y2="120" stroke="var(--accent)" stroke-width="0.6" opacity="0.45"/><line x1="80" y1="120" x2="240" y2="160" stroke="var(--accent)" stroke-width="1.2" opacity="0.45"/><line x1="80" y1="160" x2="240" y2="40" stroke="var(--accent)" stroke-width="1.2" opacity="0.45"/><line x1="80" y1="160" x2="240" y2="80" stroke="var(--accent)" stroke-width="1.7999999999999998" opacity="0.45"/><line x1="80" y1="160" x2="240" y2="120" stroke="var(--accent)" stroke-width="2.4" opacity="0.45"/><line x1="80" y1="160" x2="240" y2="160" stroke="var(--accent)" stroke-width="0.6" opacity="0.45"/><line x1="240" y1="40" x2="400" y2="40" stroke="var(--accent)" stroke-width="1.2" opacity="0.45"/><line x1="240" y1="40" x2="400" y2="80" stroke="var(--accent)" stroke-width="1.7999999999999998" opacity="0.45"/><line x1="240" y1="40" x2="400" y2="120" stroke="var(--accent)" stroke-width="2.4" opacity="0.45"/><line x1="240" y1="40" x2="400" y2="160" stroke="var(--accent)" stroke-width="0.6" opacity="0.45"/><line x1="240" y1="80" x2="400" y2="40" stroke="var(--accent)" stroke-width="0.6" opacity="0.45"/><line x1="240" y1="80" x2="400" y2="80" stroke="var(--accent)" stroke-width="1.2" opacity="0.45"/><line x1="240" y1="80" x2="400" y2="120" stroke="var(--accent)" stroke-width="1.7999999999999998" opacity="0.45"/><line x1="240" y1="80" x2="400" y2="160" stroke="var(--accent)" stroke-width="2.4" opacity="0.45"/><line x1="240" y1="120" x2="400" y2="40" stroke="var(--accent)" stroke-width="2.4" opacity="0.45"/><line x1="240" y1="120" x2="400" y2="80" stroke="var(--accent)" stroke-width="0.6" opacity="0.45"/><line x1="240" y1="120" x2="400" y2="120" stroke="var(--accent)" stroke-width="1.2" opacity="0.45"/><line x1="240" y1="120" x2="400" y2="160" stroke="var(--accent)" stroke-width="1.7999999999999998" opacity="0.45"/><line x1="240" y1="160" x2="400" y2="40" stroke="var(--accent)" stroke-width="1.7999999999999998" opacity="0.45"/><line x1="240" y1="160" x2="400" y2="80" stroke="var(--accent)" stroke-width="2.4" opacity="0.45"/><line x1="240" y1="160" x2="400" y2="120" stroke="var(--accent)" stroke-width="0.6" opacity="0.45"/><line x1="240" y1="160" x2="400" y2="160" stroke="var(--accent)" stroke-width="1.2" opacity="0.45"/><line x1="400" y1="40" x2="560" y2="40" stroke="var(--accent)" stroke-width="1.7999999999999998" opacity="0.45"/><line x1="400" y1="40" x2="560" y2="80" stroke="var(--accent)" stroke-width="2.4" opacity="0.45"/><line x1="400" y1="40" x2="560" y2="120" stroke="var(--accent)" stroke-width="0.6" opacity="0.45"/><line x1="400" y1="40" x2="560" y2="160" stroke="var(--accent)" stroke-width="1.2" opacity="0.45"/><line x1="400" y1="80" x2="560" y2="40" stroke="var(--accent)" stroke-width="1.2" opacity="0.45"/><line x1="400" y1="80" x2="560" y2="80" stroke="var(--accent)" stroke-width="1.7999999999999998" opacity="0.45"/><line x1="400" y1="80" x2="560" y2="120" stroke="var(--accent)" stroke-width="2.4" opacity="0.45"/><line x1="400" y1="80" x2="560" y2="160" stroke="var(--accent)" stroke-width="0.6" opacity="0.45"/><line x1="400" y1="120" x2="560" y2="40" stroke="var(--accent)" stroke-width="0.6" opacity="0.45"/><line x1="400" y1="120" x2="560" y2="80" stroke="var(--accent)" stroke-width="1.2" opacity="0.45"/><line x1="400" y1="120" x2="560" y2="120" stroke="var(--accent)" stroke-width="1.7999999999999998" opacity="0.45"/><line x1="400" y1="120" x2="560" y2="160" stroke="var(--accent)" stroke-width="2.4" opacity="0.45"/><line x1="400" y1="160" x2="560" y2="40" stroke="var(--accent)" stroke-width="2.4" opacity="0.45"/><line x1="400" y1="160" x2="560" y2="80" stroke="var(--accent)" stroke-width="0.6" opacity="0.45"/><line x1="400" y1="160" x2="560" y2="120" stroke="var(--accent)" stroke-width="1.2" opacity="0.45"/><line x1="400" y1="160" x2="560" y2="160" stroke="var(--accent)" stroke-width="1.7999999999999998" opacity="0.45"/><circle cx="80" cy="40" r="13" fill="var(--good)" class="pulse" style="animation-delay:0.00s"/><circle cx="80" cy="80" r="13" fill="var(--good)" class="pulse" style="animation-delay:0.08s"/><circle cx="80" cy="120" r="13" fill="var(--good)" class="pulse" style="animation-delay:0.16s"/><circle cx="80" cy="160" r="13" fill="var(--good)" class="pulse" style="animation-delay:0.24s"/><circle cx="240" cy="40" r="13" fill="var(--accent)" class="pulse" style="animation-delay:0.35s"/><circle cx="240" cy="80" r="13" fill="var(--accent)" class="pulse" style="animation-delay:0.43s"/><circle cx="240" cy="120" r="13" fill="var(--accent)" class="pulse" style="animation-delay:0.51s"/><circle cx="240" cy="160" r="13" fill="var(--accent)" class="pulse" style="animation-delay:0.59s"/><circle cx="400" cy="40" r="13" fill="var(--accent)" class="pulse" style="animation-delay:0.70s"/><circle cx="400" cy="80" r="13" fill="var(--accent)" class="pulse" style="animation-delay:0.78s"/><circle cx="400" cy="120" r="13" fill="var(--accent)" class="pulse" style="animation-delay:0.86s"/><circle cx="400" cy="160" r="13" fill="var(--accent)" class="pulse" style="animation-delay:0.94s"/><circle cx="560" cy="40" r="13" fill="var(--coral)" class="pulse" style="animation-delay:1.05s"/><circle cx="560" cy="80" r="13" fill="var(--coral)" class="pulse" style="animation-delay:1.13s"/><circle cx="560" cy="120" r="13" fill="var(--coral)" class="pulse" style="animation-delay:1.21s"/><circle cx="560" cy="160" r="13" fill="var(--coral)" class="pulse" style="animation-delay:1.29s"/>
<text x="80" y="195" text-anchor="middle" font-size="11">inputs</text><text x="320" y="195" text-anchor="middle" font-size="11">hidden layers: weighted sums → nonlinearity</text><text x="560" y="195" text-anchor="middle" font-size="11">outputs</text>
<path d="M600 20 C640 20 640 10 560 8 C380 0 200 0 60 10" stroke="var(--coral)" stroke-width="2" fill="none" class="flow"/>
<text x="330" y="14" text-anchor="middle" font-size="10.5" style="fill:var(--coral)">← gradients flow backwards (backprop)</text>
</svg>
<figcaption>Signals pulse forward through the layers. The error signal flows backwards and nudges every weight a little.</figcaption>
</figure>

## The core loop

A model is a function with parameters. Define a **loss** (how wrong). Compute its **gradient** with **backpropagation** (the chain rule, automated). Step downhill: **(stochastic) gradient descent**, usually **Adam**. Repeat over mini-batches. Watch **overfitting** (great on training data, bad on new data) — fight it with more data, regularisation, dropout, early stopping, and a held-out **test set**.

```viz gradient
> Training is a ball rolling downhill on the loss landscape. Click to drop it, then play with the learning rate and noise.
```

## Transformers in five lines

1. Split text into **tokens**; map each to a vector (**embedding**).
2. **Self-attention**: each token builds a query, key and value; attention weights = softmax(QKᵀ/√d); output = weighted sum of values. Every token can look at every other.
3. Stack many layers of attention + feed-forward networks with residual connections.
4. Train to predict the next token on vast text (**pre-training**), then **fine-tune** / **RLHF** to follow instructions.
5. **Scaling laws**: loss falls predictably as a power law in parameters, data and compute.

```viz attention
> Self-attention: every word looks back at the others and decides how much each matters.
```

## Physics hiding inside

- Softmax = **Boltzmann distribution**; the "temperature" knob in sampling is literally that.
- Energy-based models and **Hopfield networks** come from spin glasses (Hopfield and Hinton: 2024 Nobel Prize in Physics).
- **Diffusion models** reverse a noising process — a learned reverse of Langevin / Fokker–Planck dynamics.
- SGD behaves like a noisy particle in a loss landscape.

```viz softmax
> The last step of every LLM: turn scores into probabilities and sample. Temperature is literally the Boltzmann temperature.
```

```choice
? A model scores 99% on training data and 60% on new data. What's happening?
- [x] Overfitting // It memorised instead of generalising.
- [ ] Underfitting
- [ ] The learning rate is zero
> Remedies: more data, regularisation, simpler model, early stopping, augmentation.
```

```choice
? Sampling an LLM with temperature → 0 does what?
- [x] Always picks the most likely token (deterministic, less diverse) // Like a Boltzmann distribution at T→0 collapsing to the ground state.
- [ ] Picks tokens uniformly at random
- [ ] Makes the model more creative
> High temperature flattens the distribution; low sharpens it.
```

```answer
? In attention, scores are QKᵀ divided by the square root of what? (one letter)
= d
= d_k
= dk
hint: The dimension of the key vectors.
```

```reflect
? Explain backpropagation to a physicist in two or three sentences.
- chain rule applied through a computational graph
- one backward pass gives gradients for all parameters (reverse-mode autodiff)
- cost ≈ a small multiple of the forward pass
model: Backprop is reverse-mode automatic differentiation: you run the network forward, then apply the chain rule backwards through the graph, accumulating ∂loss/∂parameter for every parameter in one sweep. It costs only a few times a forward pass, which is why training networks with billions of parameters is feasible.
```

```cards
Loss :: Number measuring how wrong the model is.
Gradient descent :: Step parameters downhill along −∇loss.
Overfitting :: Memorising the training set; fails on new data.
Embedding :: A learned vector representing a token or item.
Self-attention :: Each token weighs all others via softmax(QKᵀ/√d).
RLHF :: Reinforcement learning from human feedback.
Scaling laws :: Loss falls as a power law with compute, data, parameters.
