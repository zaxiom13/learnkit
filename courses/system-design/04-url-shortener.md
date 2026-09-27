---
title: Worked problem — a URL shortener
blurb: Put the framework to work on a classic interview question.
section: Practice
---

Let's design a URL shortener like bit.ly, using our four steps.

## 1. Clarify

We agree with the interviewer:

- Create a short link for a long URL; visiting the short link redirects.
- 100 million new links a month; reads are **100×** writes.
- Links never expire. Custom aliases are out of scope.

## 2. Estimate

```answer
? 100 million new links a month is roughly how many writes per second? (A month ≈ 2.5 million seconds.)
= 40
tolerance: 5
hint: 100,000,000 ÷ 2,500,000.
> About 40 writes a second — and at 100× reads, about 4,000 redirects a second.
```

## 3. Sketch

Client → load balancer → app servers → a key-value store mapping `code → long URL`, with a cache in front for hot links.

```choice
? What's the best store for code → URL lookups at this scale?
- [x] A key-value store — every read is a lookup by key // Simple access pattern, huge scale.
- [ ] A relational database with complex joins
- [ ] A message queue
> The only query is "given this code, what's the URL?" — exactly what key-value stores are built for.
```

## 4. Deep-dive: generating codes

```steps How long should codes be?
Codes use 62 characters: a–z, A–Z, 0–9.
---
With 6 characters: 62⁶ ≈ **57 billion** codes.
---
We create 100 million a month ≈ 1.2 billion a year, so 6 characters lasts about **45 years**. 7 characters gives far more headroom.
```

```choice
? Two servers generate codes at the same moment. How do you avoid collisions?
- [ ] Hope it doesn't happen
- [x] Give each server its own range of numeric ids (from a counter service) and encode them in base 62 // Unique by construction.
- [ ] Generate random codes and never check
> Allocating ID ranges per server makes codes unique by construction, with no coordination on every request.
```

```reflect
? Explain the whole design back in 4–5 sentences, as if to the interviewer.
- states the scale (≈40 writes/s, ≈4,000 reads/s)
- mentions the key-value store and the cache
- explains how codes are generated without collisions
- mentions a trade-off or next step (e.g. analytics, expiry)
model: We expect about 40 new links and 4,000 redirects a second, so reads dominate. Requests go through a load balancer to stateless app servers, which look up codes in a key-value store with a cache in front for popular links. Codes are 7-character base-62 encodings of numeric IDs, and each server takes ID ranges from a counter service so codes never collide. Next I'd discuss analytics on clicks, which I'd push onto a queue so redirects stay fast.
```
