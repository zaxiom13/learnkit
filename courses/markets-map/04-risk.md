---
title: Risk, portfolios and ruin
blurb: Diversification, Markowitz, VaR, Kelly, leverage and the ways firms blow up.
section: Trading
---

## Portfolio theory

- **Markowitz (1952)**: choose weights to maximise return for a given variance — a convex quadratic optimisation. Diversification works because correlations < 1.
- **CAPM**: expected excess return ∝ **beta** to the market.
- **Factor models** (Fama–French, Barra): returns explained by exposures to market, size, value, momentum, sectors…
- Correlations **go to 1 in a crisis** — diversification fails exactly when you need it.

## Measuring risk

| measure | meaning | flaw |
|---|---|---|
| **Volatility** | standard deviation of returns | treats up and down alike |
| **VaR (99%, 1 day)** | loss not exceeded on 99% of days | says nothing about the 1% |
| **Expected shortfall (CVaR)** | average loss in the worst 1% | needs tail modelling |
| **Max drawdown** | largest peak-to-trough fall | path-dependent |
| **Stress tests** | replay 1987, 2008, 2020 | only the crises you imagined |

## Sizing: Kelly

To maximise long-run growth, bet a fraction f* = edge/odds (for simple bets) — for a Gaussian strategy, f* ≈ μ/σ². Full Kelly is brutally volatile; practitioners bet **half-Kelly or less**. Over-betting guarantees ruin even with an edge. (This is where **ergodicity** bites: the average across people ≠ the path of one person.)

```answer
? Kelly for an even-money bet you win 60% of the time: f* = p − q. What fraction of bankroll?
= 0.2
= 20%
```

```choice
? Why did Long-Term Capital Management (1998) collapse despite Nobel laureates?
- [x] Huge leverage on trades that assumed stable correlations; the Russian default made them all lose at once // Liquidity dried up.
- [ ] Fraud
- [ ] Their computers failed
> The Fed organised a bailout by 14 banks. Lesson: leverage + crowded trades + liquidity risk.
```

```reflect
? Explain why VaR alone is dangerous.
- tells threshold, not size of tail losses
- based on historical/normal assumptions → underestimates fat tails
- can be gamed; correlations change in crises
model: VaR tells you the loss you won't exceed 99% of the time but nothing about how bad the other 1% is — and that's where firms die. It's often computed from calm historical data or Gaussian assumptions, so it understates fat tails, and positions can be arranged to look safe under VaR while hiding huge tail risk. Pair it with expected shortfall and stress tests.
```

```cards
Diversification :: Lower risk via imperfectly correlated assets.
Beta :: Sensitivity to the market.
VaR :: Loss threshold at a confidence level.
Expected shortfall :: Average loss beyond VaR.
Kelly criterion :: Growth-optimal bet size; use a fraction.
Max drawdown :: Worst peak-to-trough loss.
