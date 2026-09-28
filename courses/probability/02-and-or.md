---
title: And, or, not
blurb: Combining events — when to multiply, when to add, and the trick of the complement.
section: Basics
---

## "And" for independent events: multiply

Two events are **independent** when one doesn't affect the other — like two coin flips. The chance both happen is the product.

```answer
? Flip a fair coin twice. What's the probability of two heads?
= 1/4
= 0.25
= 25%
> ½ × ½ = ¼.
```

## "Not": the complement

The chance something *doesn't* happen is 1 minus the chance it does:

> **P(not A) = 1 − P(A)**

This is a superpower for "at least one" questions.

```steps At least one six in four rolls
Direct counting is messy (one six, two sixes, …). Flip the question: what's the chance of **no** sixes?
---
One roll has no six with probability 5/6. Four independent rolls: (5/6)⁴ ≈ **0.482**.
---
So at least one six = 1 − 0.482 ≈ **0.518** — slightly better than even.
```

```answer
? Flip a coin 3 times. What's the probability of at least one head?
= 7/8
= 0.875
hint: What's the chance of no heads at all?
> No heads means tails three times: (½)³ = ⅛. So at least one head = 1 − ⅛ = ⅞.
```

```viz bars unit=% title="At least one six"
1 roll | 16.7
2 rolls | 30.6
3 rolls | 42.1
4 rolls | 51.8 | de Méré's bet: just better than even
6 rolls | 66.5
10 rolls | 83.8
20 rolls | 97.4
> P(at least one six) = 1 − (5/6)ⁿ, in %. The complement trick makes it easy.
```

## "Or" for events that can't both happen: add

If two events are **mutually exclusive**, P(A or B) = P(A) + P(B).

```choice
? Draw one card from a standard deck. What's the chance it's a king or a queen?
- [x] 8/52 // 4 kings + 4 queens; a card can't be both.
- [ ] 4/52
- [ ] 16/52
- [ ] 1/2
> The events can't happen together, so add: 4/52 + 4/52 = 8/52 = 2/13.
```

```viz bayes
> Where "and" and "or" meet: P(sick and positive) vs P(positive). Conditional probability is just a ratio of areas.
```

```reflect
? When can you add probabilities for "or", and when would adding give the wrong answer? Give an example.
- says events must be mutually exclusive to simply add
- gives an overlapping example (e.g. "heart or king")
- mentions subtracting the overlap
model: You can simply add when the events can't happen together. If they overlap — like drawing a heart or a king — adding counts the king of hearts twice, so you subtract the overlap: 13/52 + 4/52 − 1/52 = 16/52.
```

```recall The three rules
? When to multiply, when to add, and the complement trick.
For independent events, the probability of A and B is the product. For events that can't both happen, the probability of A or B is the sum. The probability of not A is one minus the probability of A.
> For any "at least one" question, reach for the complement first.
```
