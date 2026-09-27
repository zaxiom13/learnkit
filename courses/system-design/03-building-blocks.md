---
title: The building blocks
blurb: Load balancers, caches, queues, databases — what each is for.
section: Building blocks
---

Almost every design is assembled from the same handful of parts. Knowing *why* you'd reach for each one is most of the battle.

| block | what it's for |
|---|---|
| **Load balancer** | spreads requests across many servers |
| **Cache** | keeps hot data in memory so reads are fast |
| **Message queue** | lets slow work happen later, smoothing spikes |
| **CDN** | serves static files from close to the user |
| **Relational DB** | structured data, transactions, joins |
| **Key-value / NoSQL store** | huge scale, simple lookups by key |
| **Object storage** | large files: images, video, backups |

```choice
? Users upload videos that then need transcoding, which takes minutes. Which block keeps uploads fast?
- [ ] A bigger database
- [x] A message queue: accept the upload, queue a transcode job, process it in the background // Don't make the user wait for slow work.
- [ ] A CDN in front of the upload endpoint
- [ ] More RAM on the web server
> Queues decouple "accept the request" from "do the heavy work", so users get a fast response and workers catch up at their own pace.
```

```choice
? A product page is read 10,000 times for every time it changes. What helps most?
- [x] A cache in front of the database // Read-heavy and rarely changes: classic cache.
- [ ] A message queue
- [ ] Sharding the database by product id
> When reads vastly outnumber writes, caching turns thousands of database reads into one.
```

## Caches go stale

A cache is a copy — and copies can go out of date. Common strategies:

- **TTL (time to live):** entries expire after N seconds.
- **Write-through:** update the cache whenever you write the database.
- **Cache-aside:** read from the cache; on a miss, read the database and fill the cache.

```cards
Load balancer :: Spreads traffic across servers; removes a single point of failure.
Cache :: Fast in-memory copy of hot data. Watch out for staleness.
Message queue :: Buffers work to be done later; absorbs spikes.
CDN :: Serves static content from servers near the user.
Cache-aside :: On a miss, the app reads the DB and fills the cache.
```

```reveal Why not cache everything?
Memory is expensive and caches can serve stale data. Cache what is **read often** and **changes rarely** — and decide how stale is acceptable.
```
