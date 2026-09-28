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

```viz timeline
1637 | Tulip mania | 1637 | bulb contracts at the price of houses
1720 | South Sea Bubble | 1720 | Newton: "I can calculate the motions of heavenly bodies, but not the madness of people"
1929 | Wall Street Crash | Oct 1929 | Dow −89% peak to trough by 1932
1971 | Nixon closes the gold window | Aug 1971 | fiat money era begins
1987 | Black Monday | 19 Oct 1987 | Dow −22.6% in one day
1998 | LTCM | 1998 | leverage ~25:1+, Fed-brokered rescue
2000 | Dot-com bust | 2000–02 | Nasdaq −78%
2008 | Lehman / GFC | Sep 2008 | global banking crisis
2010 | Flash Crash | 6 May 2010 | ~1 trillion dollars vanishes and returns in minutes
2012 | Knight Capital | Aug 2012 | ~$440M lost in 45 minutes to a bad deploy
2020 | COVID crash | Mar 2020 | fastest bear market ever, fastest recovery
2022 | FTX collapses | Nov 2022 | customer funds gone
> Play through four centuries of manias and panics.
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

```viz population
> Boom–bust cycles aren't only in markets. Predator–prey dynamics show the same overshoot-and-crash feedback. Minsky's instability has an ecological cousin.
```

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

```recall Lessons from crashes
? The ideas that history keeps teaching.
The efficient market hypothesis says prices reflect available information. Minsky: stability breeds leverage, and leverage breeds collapse. Fiat money is money by decree, not backed by a commodity.
```

```cards
EMH :: Prices reflect available information; hard to beat.
Minsky moment :: Stability breeds leverage, then collapse.
Flash Crash :: 6 May 2010; minutes-long plunge and recovery.
Knight Capital :: 2012 deployment bug; ~$440M lost in 45 minutes.
Fiat money :: Money by decree, not backed by a commodity.
RBA cash rate :: Australia's policy interest rate.
