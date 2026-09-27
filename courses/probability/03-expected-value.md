---
title: Expected value
blurb: The long-run average — and how to tell a good bet from a bad one.
section: Decisions
---

The **expected value** of a game is what you'd win per play *on average* if you played forever: each outcome's value times its probability, all added up.

```steps A dice game
You pay £1 to play. Roll a die: a 6 wins £4 (so you're up £3); anything else, you lose your £1.
---
Win £3 with probability 1/6; lose £1 with probability 5/6.
---
Expected value = (1/6 × 3) + (5/6 × −1) = 3/6 − 5/6 = **−2/6 ≈ −£0.33** per play.
---
Negative expected value: over many games you lose about 33p each time. Don't play!
```

```answer
? A raffle ticket costs £2. There's a 1-in-100 chance of winning £150. What's the expected value of buying a ticket, in pounds?
= -0.5
= -0.50
tolerance: 0.01
hint: Winning: +£148 with probability 1/100. Losing: −£2 with probability 99/100.
> (1/100 × 148) + (99/100 × −2) = 1.48 − 1.98 = −£0.50.
```

```viz kelly
> Expected value isn't the whole story. A bet with positive EV can still ruin you if you stake too much of your bankroll each time.
```

```choice
? A game has positive expected value. Which statement is true?
- [ ] You'll definitely win money the next time you play
- [x] Over many plays, you'd expect to come out ahead on average // It's a long-run average.
- [ ] You can't lose any single game
> Expected value describes the long run. Any single play can still go against you.
```

```viz montecarlo
> The law of large numbers, live: averages of random samples converge on the true value, with error ∝ 1/√N.
```

```cards
Expected value :: Sum of (value × probability) over every outcome.
Negative EV :: On average you lose — the house edge.
EV and one play :: EV says nothing certain about a single play, only the long-run average.
```
