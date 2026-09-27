---
title: Bubbles, crashes and the history of money
blurb: From tulips to FTX — the recurring patterns and the ideas that came from each disaster.
section: History
---

```order
? Put these episodes in chronological order.
1. Tulip mania (Netherlands)
2. South Sea Bubble (Britain; Newton lost money)
3. Wall Street Crash → Great Depression
4. Bretton Woods ends: dollar leaves gold
5. Black Monday: Dow falls 22.6% in a day
6. Dot-com bubble bursts
7. Global Financial Crisis (Lehman fails)
8. Flash Crash: US stocks drop ~9% and recover within minutes
9. COVID crash and rebound
> 1637 → 1720 → 1929 → 1971 → 1987 → 2000 → 2008 → 2010 → 2020.
```

| episode | lesson |
|---|---|
| **1929** | leverage (margin), bank runs → deposit insurance, SEC |
| **1987** | "portfolio insurance" feedback loops → circuit breakers; birth of the vol smile |
| **1998 LTCM** | leverage + liquidity risk + correlation breakdown |
| **2008** | securitised subprime mortgages, AAA ratings on junk, repo runs, interconnected banks → Basel III, central clearing of swaps |
| **2010 Flash Crash** | fragile liquidity from fast algorithms → better circuit breakers ("limit up–limit down") |
| **2012 Knight Capital** | a deployment error activated dead code; lost ~$440M in 45 minutes — why trading firms obsess over release engineering and kill switches |
| **2022 FTX** | commingled customer funds, no controls |

## Ideas worth knowing

- **Efficient market hypothesis** (Fama) vs **behavioural finance** (Kahneman, Shiller) — prices are hard to beat, but not always rational.
- **Minsky's financial instability hypothesis**: stability breeds risk-taking breeds instability.
- **Reflexivity** (Soros): beliefs move prices which move fundamentals.
- **Money** as a social technology: commodity money → gold standard → **fiat** → central bank digital money; central banks steer via the **interest rate** (the RBA's cash rate in Australia).

```choice
? What single bug-free-looking event does Knight Capital teach every trading engineer?
- [x] A bad deployment reactivated old code and it traded wildly; controls and kill switches matter as much as strategy // Operations risk.
- [ ] A hacker stole its funds
- [ ] It was fined for insider trading
```

```answer
? In what year did Lehman Brothers collapse?
= 2008
```

```reflect
? Name a pattern shared by most financial crises.
- leverage/borrowing
- a new asset or innovation with a story
- liquidity/confidence evaporates → forced selling spiral
model: Most crises share leverage built on a compelling story about a new asset or innovation, a long calm that makes risk look small (Minsky), and then a shock that forces leveraged holders to sell, which drops prices, which forces more selling. Liquidity vanishes precisely when everyone needs it.
```

```cards
EMH :: Prices reflect available information; hard to beat.
Minsky moment :: Stability breeds leverage, then collapse.
Flash Crash :: 6 May 2010; minutes-long plunge and recovery.
Knight Capital :: 2012 deployment bug; ~$440M lost in 45 minutes.
Fiat money :: Money by decree, not backed by a commodity.
RBA cash rate :: Australia's policy interest rate.
