---
title: Probability, statistics and stochastic calculus
blurb: Bayes, the laws of large numbers, fat tails, Brownian motion, Itô — the maths of uncertainty and of markets.
section: Workhorses
---

## The essentials

- **Bayes' theorem**: P(H|D) = P(D|H)P(H)/P(D). Update beliefs with evidence.
- **Law of large numbers**: averages converge to the mean.
- **Central limit theorem**: sums of many independent finite-variance variables → Gaussian.
- **Fat tails**: when variance is infinite or tails decay like power laws, the CLT fails and extremes dominate (market crashes, earthquakes, wealth). **Mandelbrot** (1963) showed cotton prices were fat-tailed.

## Two schools of statistics

| | frequentist | Bayesian |
|---|---|---|
| probability means | long-run frequency | degree of belief |
| tools | p-values, confidence intervals, hypothesis tests | priors, posteriors, MCMC |
| pitfall | p-hacking, "significant ≠ important" | priors can smuggle assumptions |

## Stochastic processes

| process | idea | used for |
|---|---|---|
| **Random walk / Brownian motion** | independent Gaussian increments; variance ∝ t | diffusion, stock prices |
| **Geometric Brownian motion** | log-price is Brownian | Black–Scholes |
| **Ornstein–Uhlenbeck** | mean-reverting | interest rates, pairs trading spreads |
| **Poisson process** | random arrivals at rate λ | order arrivals, radioactive decay |
| **Markov chain** | future depends only on present | MCMC, PageRank, credit ratings |
| **Martingale** | expected future = present | "fair game"; no-arbitrage pricing |

**Itô calculus**: Brownian paths are nowhere differentiable, and (dW)² = dt. So the chain rule gains a term: df = f′dX + ½f″(dX)². That extra term is why the Black–Scholes equation is a **heat equation** in disguise.

```answer
? A test for a disease is 99% sensitive and 99% specific. The disease affects 1 in 1000 people. You test positive. Probability you have it, to 2 decimal places?
= 0.09
tolerance: 0.01
> P = 0.99×0.001 / (0.99×0.001 + 0.01×0.999) ≈ 0.00099 / 0.01098 ≈ 0.09. Base rates dominate.
```

```choice
? Brownian motion's standard deviation after time t grows like…
- [x] √t // Diffusion: variance ∝ t.
- [ ] t
- [ ] t²
> Volatility "per √time": annual vol ≈ daily vol × √252.
```

```choice
? Why do risk models built on the Gaussian underestimate crashes?
- [x] Real returns are fat-tailed: extreme moves are far more common than a normal distribution predicts // e.g. 1987 was a >20-sigma day under a Gaussian.
- [ ] Markets never crash
- [ ] Gaussians overestimate risk
```

```reflect
? Explain the Itô correction to someone who knows ordinary calculus.
- Brownian increments have size √dt
- so squared increments are order dt, not negligible
- Taylor expansion keeps the second-order term → ½f″ dt
model: In ordinary calculus, (dx)² is negligible. A Brownian increment has size about √dt, so its square is about dt — the same order as the first-order terms. Taylor-expanding to second order therefore keeps a ½f″ σ² dt term. That's Itô's lemma, and it's why, for example, the expected log-return is lower than the expected return by σ²/2.
```

```cards
Bayes' theorem :: Posterior ∝ likelihood × prior.
CLT :: Sums of finite-variance variables → Gaussian.
Fat tails :: Extremes much likelier than Gaussian predicts.
Martingale :: Expected future value = current value.
Itô's lemma :: Chain rule with an extra ½f″ dt term.
Ornstein–Uhlenbeck :: Mean-reverting random process.
