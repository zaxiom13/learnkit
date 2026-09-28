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

<figure class="diagram">
<svg viewBox="0 0 640 200">
<path d="M20 180.0L23 180.0L26 180.0L29 180.0L32 180.0L35 180.0L38 180.0L41 180.0L44 180.0L47 180.0L50 180.0L53 180.0L56 179.9L59 179.9L62 179.9L65 179.9L68 179.9L71 179.9L74 179.8L77 179.8L80 179.8L83 179.7L86 179.7L89 179.7L92 179.6L95 179.5L98 179.4L101 179.3L104 179.2L107 179.1L110 179.0L113 178.8L116 178.7L119 178.5L122 178.2L125 178.0L128 177.7L131 177.3L134 177.0L137 176.6L140 176.1L143 175.6L146 175.0L149 174.4L152 173.7L155 173.0L158 172.1L161 171.2L164 170.2L167 169.1L170 167.9L173 166.6L176 165.2L179 163.7L182 162.0L185 160.2L188 158.3L191 156.3L194 154.1L197 151.8L200 149.4L203 146.8L206 144.0L209 141.1L212 138.1L215 134.9L218 131.5L221 128.1L224 124.4L227 120.7L230 116.9L233 112.9L236 108.8L239 104.7L242 100.4L245 96.1L248 91.8L251 87.4L254 83.0L257 78.5L260 74.2L263 69.8L266 65.5L269 61.3L272 57.2L275 53.2L278 49.3L281 45.6L284 42.1L287 38.8L290 35.7L293 32.8L296 30.2L299 27.9L302 25.8L305 24.1L308 22.6L311 21.5L314 20.7L317 20.2L320 20.0L323 20.2L326 20.7L329 21.5L332 22.6L335 24.1L338 25.8L341 27.9L344 30.2L347 32.8L350 35.7L353 38.8L356 42.1L359 45.6L362 49.3L365 53.2L368 57.2L371 61.3L374 65.5L377 69.8L380 74.2L383 78.5L386 83.0L389 87.4L392 91.8L395 96.1L398 100.4L401 104.7L404 108.8L407 112.9L410 116.9L413 120.7L416 124.4L419 128.1L422 131.5L425 134.9L428 138.1L431 141.1L434 144.0L437 146.8L440 149.4L443 151.8L446 154.1L449 156.3L452 158.3L455 160.2L458 162.0L461 163.7L464 165.2L467 166.6L470 167.9L473 169.1L476 170.2L479 171.2L482 172.1L485 173.0L488 173.7L491 174.4L494 175.0L497 175.6L500 176.1L503 176.6L506 177.0L509 177.3L512 177.7L515 178.0L518 178.2L521 178.5L524 178.7L527 178.8L530 179.0L533 179.1L536 179.2L539 179.3L542 179.4L545 179.5L548 179.6L551 179.7L554 179.7L557 179.7L560 179.8L563 179.8L566 179.8L569 179.9L572 179.9L575 179.9L578 179.9L581 179.9L584 179.9L587 180.0L590 180.0L593 180.0L596 180.0L599 180.0L602 180.0L605 180.0L608 180.0L611 180.0L614 180.0L617 180.0L620 180.0" fill="none" stroke="var(--accent)" stroke-width="3" class="draw"/>
<path d="M20 178.3L23 178.3L26 178.2L29 178.2L32 178.2L35 178.1L38 178.1L41 178.0L44 178.0L47 177.9L50 177.9L53 177.9L56 177.8L59 177.8L62 177.7L65 177.7L68 177.6L71 177.5L74 177.5L77 177.4L80 177.4L83 177.3L86 177.2L89 177.2L92 177.1L95 177.0L98 176.9L101 176.8L104 176.8L107 176.7L110 176.6L113 176.5L116 176.4L119 176.3L122 176.2L125 176.0L128 175.9L131 175.8L134 175.7L137 175.5L140 175.4L143 175.2L146 175.1L149 174.9L152 174.7L155 174.5L158 174.4L161 174.1L164 173.9L167 173.7L170 173.5L173 173.2L176 172.9L179 172.7L182 172.4L185 172.0L188 171.7L191 171.3L194 170.9L197 170.5L200 170.1L203 169.6L206 169.1L209 168.6L212 168.0L215 167.4L218 166.7L221 166.0L224 165.2L227 164.4L230 163.4L233 162.5L236 161.4L239 160.2L242 158.9L245 157.5L248 156.0L251 154.3L254 152.5L257 150.5L260 148.2L263 145.8L266 143.1L269 140.1L272 136.8L275 133.2L278 129.2L281 124.8L284 120.0L287 114.8L290 109.2L293 103.2L296 96.9L299 90.5L302 84.0L305 77.8L308 72.0L311 67.1L314 63.2L317 60.8L320 60.0L323 60.8L326 63.2L329 67.1L332 72.0L335 77.8L338 84.0L341 90.5L344 96.9L347 103.2L350 109.2L353 114.8L356 120.0L359 124.8L362 129.2L365 133.2L368 136.8L371 140.1L374 143.1L377 145.8L380 148.2L383 150.5L386 152.5L389 154.3L392 156.0L395 157.5L398 158.9L401 160.2L404 161.4L407 162.5L410 163.4L413 164.4L416 165.2L419 166.0L422 166.7L425 167.4L428 168.0L431 168.6L434 169.1L437 169.6L440 170.1L443 170.5L446 170.9L449 171.3L452 171.7L455 172.0L458 172.4L461 172.7L464 172.9L467 173.2L470 173.5L473 173.7L476 173.9L479 174.1L482 174.4L485 174.5L488 174.7L491 174.9L494 175.1L497 175.2L500 175.4L503 175.5L506 175.7L509 175.8L512 175.9L515 176.0L518 176.2L521 176.3L524 176.4L527 176.5L530 176.6L533 176.7L536 176.8L539 176.8L542 176.9L545 177.0L548 177.1L551 177.2L554 177.2L557 177.3L560 177.4L563 177.4L566 177.5L569 177.5L572 177.6L575 177.7L578 177.7L581 177.8L584 177.8L587 177.9L590 177.9L593 177.9L596 178.0L599 178.0L602 178.1L605 178.1L608 178.2L611 178.2L614 178.2L617 178.3L620 178.3" fill="none" stroke="var(--coral)" stroke-width="3" class="draw" style="animation-delay:.6s"/>
<text x="330" y="16" font-size="12" style="fill:var(--accent)">Gaussian: tails die off like e^(−x²)</text>
<text x="330" y="34" font-size="12" style="fill:var(--coral)">fat-tailed (Cauchy/power law): tails decay like 1/x²</text>
<rect x="520" y="150" width="100" height="32" rx="6" fill="none" stroke="var(--coral)" stroke-dasharray="4 3" class="blink"/><text x="570" y="146" text-anchor="middle" font-size="10.5">crashes live here</text>
</svg>
<figcaption>Same-looking middles, wildly different tails. In a Gaussian world a 1987-style day essentially never happens. In a fat-tailed world it's just a Tuesday.</figcaption>
</figure>

## Two schools of statistics

| | frequentist | Bayesian |
|---|---|---|
| probability means | long-run frequency | degree of belief |
| tools | p-values, confidence intervals, hypothesis tests | priors, posteriors, MCMC |
| pitfall | p-hacking, "significant ≠ important" | priors can smuggle assumptions |

```viz bayes
> 1,000 people, one test. With a rare disease, most positives are false alarms. Slide the base rate up and watch P(sick | +) jump.
```

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

```viz brownian
> Brownian motion: the spread grows like √t, and that one fact drives diffusion, option pricing and the √252 in every volatility calculation.
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

```recall The essentials
? Bayes, the central limit theorem and martingales.
Bayes' theorem: the posterior is proportional to the likelihood times the prior. The central limit theorem: sums of finite-variance variables tend to a Gaussian. A martingale is a process whose expected future value is its current value.
```

```cards
Bayes' theorem :: Posterior ∝ likelihood × prior.
CLT :: Sums of finite-variance variables → Gaussian.
Fat tails :: Extremes much likelier than Gaussian predicts.
Martingale :: Expected future value = current value.
Itô's lemma :: Chain rule with an extra ½f″ dt term.
Ornstein–Uhlenbeck :: Mean-reverting random process.
