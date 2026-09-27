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

```cards
Bid / ask :: Best price to sell to / buy from.
Spread :: Ask − bid.
Price–time priority :: Better price first, then earlier order.
Market maker :: Liquidity provider earning the spread.
Adverse selection :: Losing to better-informed traders.
CCP :: Central counterparty that guarantees trades.
