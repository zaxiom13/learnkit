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

## The core loop

A model is a function with parameters. Define a **loss** (how wrong). Compute its **gradient** with **backpropagation** (the chain rule, automated). Step downhill: **(stochastic) gradient descent**, usually **Adam**. Repeat over mini-batches. Watch **overfitting** (great on training data, bad on new data) — fight it with more data, regularisation, dropout, early stopping, and a held-out **test set**.

## Transformers in five lines

1. Split text into **tokens**; map each to a vector (**embedding**).
2. **Self-attention**: each token builds a query, key and value; attention weights = softmax(QKᵀ/√d); output = weighted sum of values. Every token can look at every other.
3. Stack many layers of attention + feed-forward networks with residual connections.
4. Train to predict the next token on vast text (**pre-training**), then **fine-tune** / **RLHF** to follow instructions.
5. **Scaling laws**: loss falls predictably as a power law in parameters, data and compute.

## Physics hiding inside

- Softmax = **Boltzmann distribution**; the "temperature" knob in sampling is literally that.
- Energy-based models and **Hopfield networks** come from spin glasses (Hopfield and Hinton: 2024 Nobel Prize in Physics).
- **Diffusion models** reverse a noising process — a learned reverse of Langevin / Fokker–Planck dynamics.
- SGD behaves like a noisy particle in a loss landscape.

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
