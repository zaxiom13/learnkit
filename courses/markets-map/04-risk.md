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

<figure class="diagram">
<svg viewBox="0 0 640 200">
<g font-size="11.5">
<line x1="40" y1="170" x2="600" y2="170" stroke="var(--line-strong)"/><line x1="40" y1="170" x2="40" y2="20" stroke="var(--line-strong)"/>
<text x="600" y="188" text-anchor="end">risk (volatility)</text><text x="44" y="18">expected return</text>
<path d="M90 160 C120 70 250 40 580 30" fill="none" stroke="var(--accent)" stroke-width="3" class="draw"/>
<circle cx="260" cy="120" r="6" fill="var(--text-3)"/><text x="268" y="124" font-size="10.5">stock A</text><circle cx="420" cy="95" r="6" fill="var(--text-3)"/><text x="428" y="99" font-size="10.5">stock B</text><circle cx="520" cy="140" r="6" fill="var(--text-3)"/><text x="528" y="144" font-size="10.5">stock C</text><circle cx="330" cy="150" r="6" fill="var(--text-3)"/><text x="338" y="154" font-size="10.5">bonds</text>
<circle cx="170" cy="85" r="8" fill="var(--good)" class="pulse"/><text x="182" y="80" style="fill:var(--good)">min-variance mix</text>
<line x1="40" y1="140" x2="600" y2="10" stroke="var(--coral)" stroke-dasharray="5 4"/><text x="440" y="36" style="fill:var(--coral)">best Sharpe line</text>
</g></svg>
<figcaption>Markowitz's efficient frontier: mixing imperfectly correlated assets beats every single asset on risk-for-return. Diversification is the only free lunch (until correlations go to 1 in a crisis).</figcaption>
</figure>

## Measuring risk

| measure | meaning | flaw |
|---|---|---|
| **Volatility** | standard deviation of returns | treats up and down alike |
| **VaR (99%, 1 day)** | loss not exceeded on 99% of days | says nothing about the 1% |
| **Expected shortfall (CVaR)** | average loss in the worst 1% | needs tail modelling |
| **Max drawdown** | largest peak-to-trough fall | path-dependent |
| **Stress tests** | replay 1987, 2008, 2020 | only the crises you imagined |

```viz compound
> Compounding, and volatility drag: the median investor earns about r − σ²/2.
```

## Sizing: Kelly

To maximise long-run growth, bet a fraction f* = edge/odds (for simple bets) — for a Gaussian strategy, f* ≈ μ/σ². Full Kelly is brutally volatile; practitioners bet **half-Kelly or less**. Over-betting guarantees ruin even with an edge. (This is where **ergodicity** bites: the average across people ≠ the path of one person.)

```answer
? Kelly for an even-money bet you win 60% of the time: f* = p − q. What fraction of bankroll?
= 0.2
= 20%
```

```viz kelly
> Kelly betting. Growth peaks at f* = 2p − 1 for even-money bets. Push past it and you go broke with an edge.
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
