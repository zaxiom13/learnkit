---
title: Counting outcomes
blurb: Probability is just "how many ways it can happen" over "how many ways anything can happen".
section: Basics
---

When every outcome is equally likely, probability is a fraction:

> **P(event) = favourable outcomes ÷ all possible outcomes**

A fair die has 6 equally likely faces. The chance of rolling a 4 is 1 out of 6.

```answer
? What's the probability of rolling an even number on a fair six-sided die? Answer as a fraction or decimal.
= 1/2
= 3/6
= 0.5
= 50%
> The even faces are 2, 4 and 6: three favourable outcomes out of six, so 3/6 = 1/2.
```

## Two dice

Roll two dice and there are 6 × 6 = **36** equally likely pairs.

<figure class="diagram">
<svg viewBox="0 0 640 210"><rect x="60" y="20" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="79" y="38" text-anchor="middle" font-size="11" style="fill:var(--text)">1,1</text><rect x="102" y="20" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="121" y="38" text-anchor="middle" font-size="11" style="fill:var(--text)">1,2</text><rect x="144" y="20" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="163" y="38" text-anchor="middle" font-size="11" style="fill:var(--text)">1,3</text><rect x="186" y="20" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="205" y="38" text-anchor="middle" font-size="11" style="fill:var(--text)">1,4</text><rect x="228" y="20" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="247" y="38" text-anchor="middle" font-size="11" style="fill:var(--text)">1,5</text><rect x="270" y="20" width="38" height="26" rx="5" fill="var(--coral)"/><text x="289" y="38" text-anchor="middle" font-size="11" style="fill:#fff">1,6</text><rect x="60" y="50" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="79" y="68" text-anchor="middle" font-size="11" style="fill:var(--text)">2,1</text><rect x="102" y="50" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="121" y="68" text-anchor="middle" font-size="11" style="fill:var(--text)">2,2</text><rect x="144" y="50" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="163" y="68" text-anchor="middle" font-size="11" style="fill:var(--text)">2,3</text><rect x="186" y="50" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="205" y="68" text-anchor="middle" font-size="11" style="fill:var(--text)">2,4</text><rect x="228" y="50" width="38" height="26" rx="5" fill="var(--coral)"/><text x="247" y="68" text-anchor="middle" font-size="11" style="fill:#fff">2,5</text><rect x="270" y="50" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="289" y="68" text-anchor="middle" font-size="11" style="fill:var(--text)">2,6</text><rect x="60" y="80" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="79" y="98" text-anchor="middle" font-size="11" style="fill:var(--text)">3,1</text><rect x="102" y="80" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="121" y="98" text-anchor="middle" font-size="11" style="fill:var(--text)">3,2</text><rect x="144" y="80" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="163" y="98" text-anchor="middle" font-size="11" style="fill:var(--text)">3,3</text><rect x="186" y="80" width="38" height="26" rx="5" fill="var(--coral)"/><text x="205" y="98" text-anchor="middle" font-size="11" style="fill:#fff">3,4</text><rect x="228" y="80" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="247" y="98" text-anchor="middle" font-size="11" style="fill:var(--text)">3,5</text><rect x="270" y="80" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="289" y="98" text-anchor="middle" font-size="11" style="fill:var(--text)">3,6</text><rect x="60" y="110" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="79" y="128" text-anchor="middle" font-size="11" style="fill:var(--text)">4,1</text><rect x="102" y="110" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="121" y="128" text-anchor="middle" font-size="11" style="fill:var(--text)">4,2</text><rect x="144" y="110" width="38" height="26" rx="5" fill="var(--coral)"/><text x="163" y="128" text-anchor="middle" font-size="11" style="fill:#fff">4,3</text><rect x="186" y="110" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="205" y="128" text-anchor="middle" font-size="11" style="fill:var(--text)">4,4</text><rect x="228" y="110" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="247" y="128" text-anchor="middle" font-size="11" style="fill:var(--text)">4,5</text><rect x="270" y="110" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="289" y="128" text-anchor="middle" font-size="11" style="fill:var(--text)">4,6</text><rect x="60" y="140" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="79" y="158" text-anchor="middle" font-size="11" style="fill:var(--text)">5,1</text><rect x="102" y="140" width="38" height="26" rx="5" fill="var(--coral)"/><text x="121" y="158" text-anchor="middle" font-size="11" style="fill:#fff">5,2</text><rect x="144" y="140" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="163" y="158" text-anchor="middle" font-size="11" style="fill:var(--text)">5,3</text><rect x="186" y="140" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="205" y="158" text-anchor="middle" font-size="11" style="fill:var(--text)">5,4</text><rect x="228" y="140" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="247" y="158" text-anchor="middle" font-size="11" style="fill:var(--text)">5,5</text><rect x="270" y="140" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="289" y="158" text-anchor="middle" font-size="11" style="fill:var(--text)">5,6</text><rect x="60" y="170" width="38" height="26" rx="5" fill="var(--coral)"/><text x="79" y="188" text-anchor="middle" font-size="11" style="fill:#fff">6,1</text><rect x="102" y="170" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="121" y="188" text-anchor="middle" font-size="11" style="fill:var(--text)">6,2</text><rect x="144" y="170" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="163" y="188" text-anchor="middle" font-size="11" style="fill:var(--text)">6,3</text><rect x="186" y="170" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="205" y="188" text-anchor="middle" font-size="11" style="fill:var(--text)">6,4</text><rect x="228" y="170" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="247" y="188" text-anchor="middle" font-size="11" style="fill:var(--text)">6,5</text><rect x="270" y="170" width="38" height="26" rx="5" fill="var(--surface-2)"/><text x="289" y="188" text-anchor="middle" font-size="11" style="fill:var(--text)">6,6</text><text x="400" y="80" font-size="13">36 equally likely outcomes</text><text x="400" y="104" font-size="13" style="fill:var(--coral)">6 of them sum to 7</text><text x="400" y="128" font-size="13">P(7) = 6/36 = 1/6</text></svg>
<figcaption>Two dice as a 6×6 grid. The diagonal of 7s is the longest, which is why 7 is the most common total.</figcaption>
</figure>

```steps Rolling a total of 7
List the pairs that add to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1).
---
That's **6** favourable outcomes.
---
6 ÷ 36 = **1/6**. Seven is the most likely total — which is why it matters so much in dice games.
```

```answer
? Two dice: what's the probability their total is 2?
= 1/36
= /^0?\.0278?$/
hint: How many pairs add up to 2?
> Only (1,1) works, so it's 1 out of 36.
```

```viz bars title="Two-dice totals"
2 | 1
3 | 2
4 | 3
5 | 4
6 | 5
7 | 6 | the most likely total
8 | 5
9 | 4
10 | 3
11 | 2
12 | 1
> Ways to make each total with two dice (out of 36).
```

```choice
? Which total of two dice is *least* likely?
- [x] 2 (tied with 12) // Only one way each: (1,1) and (6,6).
- [ ] 7
- [ ] 6
- [ ] 10
> Totals near the middle have the most combinations; the extremes 2 and 12 have just one each.
```

```cards
Probability of an event :: Favourable outcomes ÷ all equally likely outcomes.
Outcomes for two dice :: 36 (6 × 6).
Most likely two-dice total :: 7 — six ways out of 36.
```
