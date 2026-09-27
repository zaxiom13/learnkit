---
title: Derivatives and Black–Scholes
blurb: Futures, options, the Greeks — and the heat equation hiding in option pricing.
section: Pricing
---

| instrument | what it is |
|---|---|
| **Future / forward** | agree now to trade later at a fixed price |
| **Option (call / put)** | the *right* but not obligation to buy/sell at a strike price |
| **Swap** | exchange cash-flow streams (e.g. fixed vs floating interest) |
| **ETF** | a fund traded like a stock; market makers keep its price near its holdings via creation/redemption |
| **CDS** | insurance against a borrower defaulting |

## The key idea: replication and no-arbitrage

If you can build a portfolio that pays the same as the option in every scenario, the option must cost the same as the portfolio — otherwise there's free money (**arbitrage**). Continuously re-hedging with the underlying (**delta hedging**) removes the risk, so the option's price doesn't depend on anyone's view of where the stock is going — only on **volatility**.

**Black–Scholes (1973)**: assume geometric Brownian motion; apply Itô; hedge away the randomness; get

∂V/∂t + ½σ²S² ∂²V/∂S² + rS ∂V/∂S − rV = 0

Change variables x = ln S and it becomes the **heat equation**. (Nobel 1997 to Scholes and Merton; Black had died.)

## The Greeks

| Greek | sensitivity to |
|---|---|
| **Delta** Δ | underlying price |
| **Gamma** Γ | delta's change (curvature) |
| **Vega** | volatility |
| **Theta** Θ | time passing (decay) |
| **Rho** | interest rates |

**Implied volatility**: invert Black–Scholes from market prices. Plotted against strike it's not flat — the **volatility smile/skew** — the market's admission that returns are fat-tailed and crashes happen.

```answer
? A call has delta 0.5. The stock rises $2. Approximately how much does the option price change, in dollars?
= 1
tolerance: 0.01
```

```choice
? Put–call parity: for European options, C − P equals…
- [x] S − K·e^{−rT} // Stock minus discounted strike.
- [ ] 0
- [ ] K − S
> Violations are arbitrage: exactly the kind of thing market makers trade away instantly.
```

```choice
? Why does the Black–Scholes price not depend on the stock's expected return?
- [x] The option can be replicated by delta hedging, so only volatility matters; drift is hedged away // Risk-neutral pricing.
- [ ] Because stocks always return zero
- [ ] It's an error in the model
```

```reflect
? Explain implied volatility and the smile to an interviewer.
- the σ that makes Black–Scholes match the market price
- differs by strike → smile/skew
- reflects fat tails, crash risk, supply/demand for protection
model: Implied volatility is the volatility you plug into Black–Scholes to reproduce an option's market price. If the model were right, it would be the same for every strike. It isn't: out-of-the-money puts trade at higher implied vol — the skew — because the market prices in fat tails and crash risk, and because investors pay up for downside protection.
```

```cards
Call / put :: Right to buy / sell at the strike.
Arbitrage :: Riskless profit; pricing forbids it.
Delta hedging :: Offsetting option exposure with the underlying.
Black–Scholes :: Option PDE ≅ heat equation.
Gamma :: Curvature; how fast delta changes.
Implied vol smile :: IV varies by strike; model's known flaw.
