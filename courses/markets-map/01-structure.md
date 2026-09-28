---
title: How a market actually works
blurb: Exchanges, the limit order book, market makers, and who's on the other side of your trade.
section: Market structure
---

## The limit order book

Buyers post **bids**, sellers post **asks** (offers). The highest bid and lowest ask are the **best bid/offer (BBO)**; the gap is the **spread**. A **limit order** waits in the book; a **market order** crosses the spread and trades immediately against resting orders. Matching is usually **price–time priority**: best price first, then earliest.

| participant | role |
|---|---|
| **Market maker** | posts bids and asks continuously, earns the spread, manages inventory risk (Optiver, IMC, Citadel Securities…) |
| **Prop trading firm** | trades its own capital with systematic strategies |
| **Hedge fund** | manages outside money; many styles |
| **Asset manager / super fund** | large, slow, long-term investors (Australia's superannuation pool is one of the largest in the world) |
| **Broker** | routes client orders |
| **Exchange** | runs the matching engine and publishes market data (ASX, Cboe, CME, Nasdaq…) |
| **Clearing house (CCP)** | becomes buyer to every seller and seller to every buyer; removes counterparty risk |
| **Regulator** | in Australia: **ASIC** (markets), **APRA** (banks/super), RBA (central bank) |

```viz orderbook
> A live (simulated) limit order book. Send market orders of different sizes and watch them walk the book: bigger orders pay more slippage.
```

## Market-making economics

Earn half the spread on each side; lose to **adverse selection** (trading with someone who knows more — the price moves against you right after). A good market maker's edge = spread captured − adverse selection − costs, over millions of trades.

```answer
? Best bid 100.02, best ask 100.05. What is the spread (in price units)?
= 0.03
tolerance: 0.0001
```

```choice
? A market maker keeps getting filled on bids just before the price drops. What's the name for this?
- [x] Adverse selection // Trading against better-informed flow.
- [ ] Front-running
- [ ] Slippage
> The market maker widens spreads or skews quotes when flow looks "toxic".
```

<figure class="diagram">
<svg viewBox="0 0 640 200">
<g font-size="12">
<rect x="250" y="70" width="140" height="60" rx="12" fill="var(--accent)"/><text x="320" y="96" text-anchor="middle" style="fill:#fff" font-weight="700">Exchange</text><text x="320" y="114" text-anchor="middle" style="fill:#fff" font-size="10.5">matching engine</text>
<rect x="10" y="20" width="150" height="40" rx="10" fill="var(--good)"/><text x="85" y="45" text-anchor="middle" style="fill:#fff">market maker (quotes)</text>
<rect x="10" y="140" width="150" height="40" rx="10" fill="var(--warn)"/><text x="85" y="165" text-anchor="middle" style="fill:#fff">investor via broker</text>
<rect x="480" y="20" width="150" height="40" rx="10" fill="#7b43c9"/><text x="555" y="45" text-anchor="middle" style="fill:#fff">clearing house (CCP)</text>
<rect x="480" y="140" width="150" height="40" rx="10" fill="var(--coral)"/><text x="555" y="165" text-anchor="middle" style="fill:#fff">market data → everyone</text>
<path d="M160 40 C210 40 220 85 250 90" stroke="var(--good)" stroke-width="2.5" fill="none" class="flow"/>
<path d="M160 160 C210 160 220 115 250 110" stroke="var(--warn)" stroke-width="2.5" fill="none" class="flow"/>
<path d="M390 90 C430 80 440 40 480 40" stroke="#7b43c9" stroke-width="2.5" fill="none" class="flow"/>
<path d="M390 110 C430 120 440 160 480 160" stroke="var(--coral)" stroke-width="2.5" fill="none" class="flow"/>
<text x="195" y="30" font-size="10">limit orders</text><text x="195" y="186" font-size="10">market order</text><text x="420" y="30" font-size="10">trade to settle</text><text x="410" y="186" font-size="10">prices, trades</text>
</g></svg>
<figcaption>Who talks to whom. The matching engine is the heart; the CCP guarantees the trade settles even if one side goes bust.</figcaption>
</figure>

```steps A market order walking the book
Asks: 100 @ 10.00, 200 @ 10.01, 500 @ 10.02. You market-buy 250.
---
Take 100 @ 10.00.
---
Take the remaining 150 @ 10.01.
---
Average price = (100×10.00 + 150×10.01)/250 = 10.006. The difference from 10.00 is **slippage / market impact**.
```

```reflect
? Explain what a market maker does and how it makes money, in 3 sentences.
- quotes both sides continuously
- earns the spread / rebates
- manages inventory and adverse-selection risk, needs speed
model: A market maker continuously posts prices to buy and sell, providing liquidity so others can trade instantly. It earns a small spread on each round trip. The risk is ending up with inventory just as prices move, especially against informed traders, so it hedges quickly, updates quotes in microseconds, and relies on huge volume and tight risk control.
```

```recall The order book
? How a limit order book matches trades.
The bid is the best price to sell to; the ask is the best price to buy from. The spread is ask minus bid. Orders are matched by price-time priority: better price first, then earlier order. Market makers earn the spread but risk adverse selection.
```

```cards
Bid / ask :: Best price to sell to / buy from.
Spread :: Ask − bid.
Price–time priority :: Better price first, then earlier order.
Market maker :: Liquidity provider earning the spread.
Adverse selection :: Losing to better-informed traders.
CCP :: Central counterparty that guarantees trades.
