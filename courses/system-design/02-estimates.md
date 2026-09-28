---
title: Back-of-the-envelope maths
blurb: Rough numbers in your head — requests per second, storage, bandwidth.
section: Foundations
---

You don't need precise numbers — you need the **right order of magnitude**. Is it 10 requests a second or 10,000? Gigabytes or petabytes? That decides whether one server will do or you need a fleet.

## Handy constants

| thing | approximately |
|---|---|
| seconds in a day | 86,400 ≈ **100,000** (10⁵) |
| seconds in a month | ≈ 2.5 million |
| 1 million bytes | 1 MB |
| 1 billion bytes | 1 GB |

Rounding a day to 100,000 seconds makes the maths easy and is close enough.

```steps Requests per second
**Problem:** 50 million daily active users each load their feed 10 times a day. What's the average read rate?
---
Total reads per day: 50,000,000 × 10 = **500 million** reads.
---
Divide by seconds in a day (≈100,000): 500,000,000 ÷ 100,000 = **5,000 reads per second** on average.
---
Traffic isn't flat. Peaks are often 2–3× the average, so plan for roughly **10,000–15,000 reads per second** at peak.
```

```answer
? 10 million users each post 2 photos a day. Roughly how many photo uploads per second is that, on average? (Use 100,000 seconds per day.)
= 200
hint: First find uploads per day, then divide by 100,000.
> 10,000,000 × 2 = 20,000,000 uploads a day. 20,000,000 ÷ 100,000 = 200 per second.
```

```viz latency
> Know these orders of magnitude and every estimate gets easier.
```

## Storage

```steps Photo storage
**Problem:** 20 million photos a day, 500 KB each on average. How much storage per year?
---
Per day: 20,000,000 × 500 KB = 10,000,000,000 KB = **10 TB a day**.
---
Per year: 10 TB × 365 ≈ **3.65 PB** — call it roughly **4 PB a year**.
---
That's far too much for one machine: we'll need object storage (like S3) — not a single database.
```

```answer
? A service stores 1 KB per message and receives 1 billion messages a day. How many terabytes (TB) per day is that?
= 1
tolerance: 0.1
hint: 1 billion KB = 1,000,000,000 KB. How many KB in a TB? (1 TB = 1 billion KB.)
> 1,000,000,000 × 1 KB = 1 billion KB = 1 TB a day.
```

```choice
? Your estimate says 3 requests per second. What does that tell you?
- [x] A single well-provisioned server can handle it — don't over-engineer // Scale to the number you computed.
- [ ] You need sharding immediately
- [ ] You need a global CDN before anything else
> Estimates stop you from over- or under-building. Three requests a second is tiny.
```

```recall Handy constants
? The numbers that make estimates quick.
A day has 86,400 seconds, so call it 100,000. A month is about 2.5 million seconds. Peak traffic is often two to three times the average.
> With these, requests per second is just daily total divided by 100,000.
```
