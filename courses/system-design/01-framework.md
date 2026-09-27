---
title: The four-step framework
blurb: Every design interview goes better with the same simple shape.
section: Foundations
---

A system design interview isn't a quiz with one right answer. The interviewer wants to watch you **think**: ask good questions, make trade-offs, and explain them. Having a reliable structure frees your head for the interesting parts.

Here's the shape we'll use for every problem:

1. **Clarify** the requirements — what must it do, and how big is it?
2. **Estimate** the scale — a few rough numbers.
3. **Sketch** the high-level design — boxes and arrows.
4. **Deep-dive** into the hardest part — and talk about trade-offs.

```order
? Put the four steps in order.
1. Clarify the requirements
2. Estimate the scale
3. Sketch the high-level design
4. Deep-dive into the hardest part
> Clarify first — designing the wrong system perfectly still fails. Then numbers, then the big picture, then depth.
```

## Clarify: functional and non-functional

**Functional requirements** are what the system *does*: "users can post a photo", "followers see new photos in a feed".

**Non-functional requirements** are how *well* it does it: latency, availability, consistency, durability, scale.

```choice
? Which of these is a non-functional requirement?
- [ ] Users can delete their own comments
- [x] The feed should load in under 200 ms for 99% of requests // Latency is about how well, not what.
- [ ] Users can follow other users
- [ ] Posts can include up to 10 photos
> Non-functional requirements describe qualities — speed, reliability, scale — rather than features.
```

```choice
? The interviewer says "design a URL shortener". What's the best first move?
- [ ] Start drawing a load balancer and three app servers
- [ ] Pick a database
- [x] Ask how many URLs per day, whether links expire, and whether custom aliases are needed // Questions first: they change the design.
- [ ] Explain consistent hashing
> The first few minutes are for questions. The answers — scale, features, constraints — decide everything else.
```

## Scope it down

You have about 45 minutes. It's fine — good, even — to say *"I'll focus on posting and reading the feed, and leave search and ads out of scope."*

```reflect
? In two or three sentences: why is it smart to agree the scope out loud with the interviewer before designing?
- mentions limited time
- mentions avoiding building the wrong thing
- mentions that the interviewer can redirect you early
model: With limited time you can't design everything, so agreeing the scope keeps you on the parts that matter. Saying it out loud also lets the interviewer redirect you early, before you've spent ten minutes on something they don't care about.
```

```cards
Functional requirement :: What the system does — its features.
Non-functional requirement :: How well it does it — latency, availability, scale, consistency.
The four steps :: Clarify → Estimate → Sketch → Deep-dive.
```
