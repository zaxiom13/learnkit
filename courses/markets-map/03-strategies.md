---
title: The families of quant strategies
blurb: Market making, statistical arbitrage, momentum, carry, event-driven — and how backtests lie.
section: Trading
---

| family | idea | horizon |
|---|---|---|
| **Market making** | quote both sides, earn spread | microseconds–seconds |
| **Latency arbitrage** | react to price moves on one venue before another | microseconds |
| **Statistical arbitrage / pairs** | mean reversion of related assets' spread (Ornstein–Uhlenbeck) | minutes–days |
| **Momentum / trend following** | winners keep winning (for a while) | days–months (CTAs) |
| **Value / factor investing** | cheap, quality, small, low-vol stocks | months–years |
| **Carry** | earn the yield difference (currencies, futures curves) | months |
| **Volatility trading** | implied vs realised vol | days–months |
| **Event-driven / merger arb** | earnings, takeovers | days–months |
| **Alternative data / ML** | satellite, text, card data | varies |

## The honest truths

- **Alpha decays** as others find it; capacity is limited.
- **Backtest overfitting**: try enough strategies and one looks brilliant by chance. Defences: out-of-sample tests, walk-forward, deflated Sharpe ratio, fewer free parameters, economic rationale.
- **Look-ahead bias** (using data you wouldn't have had), **survivorship bias** (only testing today's surviving companies), ignoring **transaction costs and market impact**.
- **Sharpe ratio** = (return − risk-free) / volatility. Annualise with √252 for daily data.

```answer
? A strategy has daily mean excess return 0.1% and daily volatility 1%. Annualised Sharpe using √252 (to 1 decimal place)?
= 1.6
tolerance: 0.05
> (0.1/1) × √252 ≈ 0.1 × 15.87 ≈ 1.59.
```

```choice
? A researcher tests 1,000 random strategies and reports the best Sharpe. What's the problem?
- [x] Multiple-testing/selection bias: the best of many random strategies looks good by luck // Adjust for the number of trials.
- [ ] Nothing, the best one is the best
- [ ] Sharpe can't be computed for random strategies
```

```choice
? You backtest using today's S&P 500 members over 20 years. Which bias?
- [x] Survivorship bias // Companies that failed or shrank are missing.
- [ ] Look-ahead bias
- [ ] Confirmation bias
```

```reflect
? How would you convince a sceptical PM that a backtest isn't overfit?
- economic rationale for why it works
- out-of-sample / walk-forward results
- few parameters, robust to perturbation
- realistic costs, no look-ahead/survivorship
model: I'd start with why it should work — who's on the other side and why they'd pay. Then show it was developed on one period and tested untouched on another, that performance is stable when parameters are nudged, that it has few knobs, and that results survive realistic costs and impact with point-in-time data free of look-ahead and survivorship bias.
```

```cards
Stat arb :: Trade mean reversion of related assets.
Momentum :: Recent winners tend to keep winning.
Carry :: Earn the yield differential.
Sharpe ratio :: Excess return / volatility.
Overfitting :: Fitting noise; fails out of sample.
Survivorship bias :: Only the survivors are in the dataset.
