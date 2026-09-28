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

```viz option
> A Black–Scholes pricer. The blue curve is today's value, the dashed hockey stick is the payoff at expiry, and the red tangent is delta. Slide time to zero and watch the curve collapse onto the payoff.
```

## The Greeks

| Greek | sensitivity to |
|---|---|
| **Delta** Δ | underlying price |
| **Gamma** Γ | delta's change (curvature) |
| **Vega** | volatility |
| **Theta** Θ | time passing (decay) |
| **Rho** | interest rates |

**Implied volatility**: invert Black–Scholes from market prices. Plotted against strike it's not flat — the **volatility smile/skew** — the market's admission that returns are fat-tailed and crashes happen.

<figure class="diagram">
<svg viewBox="0 0 640 190">
<g><rect x="20" y="30" width="140" height="120" rx="12" fill="var(--surface-2)"/><text x="90" y="22" text-anchor="middle" font-size="12" font-weight="700">long call</text><polyline points="10,60 70,60 130,0" transform="translate(20 30)" fill="none" stroke="var(--good)" stroke-width="3"/><line x1="20" x2="160" y1="90" y2="90" stroke="var(--line-strong)" stroke-dasharray="3 3"/></g><g><rect x="175" y="30" width="140" height="120" rx="12" fill="var(--surface-2)"/><text x="245" y="22" text-anchor="middle" font-size="12" font-weight="700">long put</text><polyline points="10,0 70,60 130,60" transform="translate(175 30)" fill="none" stroke="var(--coral)" stroke-width="3"/><line x1="175" x2="315" y1="90" y2="90" stroke="var(--line-strong)" stroke-dasharray="3 3"/></g><g><rect x="330" y="30" width="140" height="120" rx="12" fill="var(--surface-2)"/><text x="400" y="22" text-anchor="middle" font-size="12" font-weight="700">short call</text><polyline points="10,60 70,60 130,120" transform="translate(330 30)" fill="none" stroke="var(--bad)" stroke-width="3"/><line x1="330" x2="470" y1="90" y2="90" stroke="var(--line-strong)" stroke-dasharray="3 3"/></g><g><rect x="485" y="30" width="140" height="120" rx="12" fill="var(--surface-2)"/><text x="555" y="22" text-anchor="middle" font-size="12" font-weight="700">straddle</text><polyline points="10,0 70,60 130,0" transform="translate(485 30)" fill="none" stroke="var(--accent)" stroke-width="3"/><line x1="485" x2="625" y1="90" y2="90" stroke="var(--line-strong)" stroke-dasharray="3 3"/></g>
<text x="320" y="178" text-anchor="middle" font-size="11.5">payoff at expiry vs stock price (the dashed line is zero profit before premium)</text>
</svg>
<figcaption>The four shapes every options interview starts from. A straddle is a pure bet on volatility: you win if the price moves a lot either way.</figcaption>
</figure>

```answer
? A call has delta 0.5. The stock rises $2. Approximately how much does the option price change, in dollars?
= 1
tolerance: 0.01
```

```choice
? Put–call parity: for European options, C − P equals…
- [x] S − K·e^(−rT) // Stock minus discounted strike.
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

```recall Pricing by replication
? The key idea behind option pricing.
A call is the right to buy at the strike; a put is the right to sell. If you can replicate an option with the underlying and cash, its price must match the replication, or there is arbitrage. Delta hedging is that replication done continuously.
```

```cards
Call / put :: Right to buy / sell at the strike.
Arbitrage :: Riskless profit; pricing forbids it.
Delta hedging :: Offsetting option exposure with the underlying.
Black–Scholes :: Option PDE ≅ heat equation.
Gamma :: Curvature; how fast delta changes.
Implied vol smile :: IV varies by strike; model's known flaw.
