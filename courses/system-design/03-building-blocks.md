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

<figure class="diagram">
<svg viewBox="0 0 640 200">
<g font-size="12">
<text x="40" y="100" font-size="26">👥</text>
<rect x="110" y="75" width="90" height="40" rx="10" fill="var(--accent)"/><text x="155" y="100" text-anchor="middle" style="fill:#fff">LB</text>
<rect x="250" y="30" width="90" height="36" rx="10" fill="var(--good)"/><text x="295" y="53" text-anchor="middle" style="fill:#fff">app 1</text><path d="M200 95 L250 48" stroke="var(--line-strong)" stroke-width="2" class="flow"/><path d="M340 48 L400 60" stroke="var(--line-strong)" stroke-width="2"/><path d="M340 48 L400 150" stroke="var(--line-strong)" stroke-width="2"/><rect x="250" y="80" width="90" height="36" rx="10" fill="var(--good)"/><text x="295" y="103" text-anchor="middle" style="fill:#fff">app 2</text><path d="M200 95 L250 98" stroke="var(--line-strong)" stroke-width="2" class="flow"/><path d="M340 98 L400 60" stroke="var(--line-strong)" stroke-width="2"/><path d="M340 98 L400 150" stroke="var(--line-strong)" stroke-width="2"/><rect x="250" y="130" width="90" height="36" rx="10" fill="var(--good)"/><text x="295" y="153" text-anchor="middle" style="fill:#fff">app 3</text><path d="M200 95 L250 148" stroke="var(--line-strong)" stroke-width="2" class="flow"/><path d="M340 148 L400 60" stroke="var(--line-strong)" stroke-width="2"/><path d="M340 148 L400 150" stroke="var(--line-strong)" stroke-width="2"/>
<rect x="400" y="40" width="100" height="40" rx="10" fill="var(--warn)"/><text x="450" y="65" text-anchor="middle" style="fill:#fff">cache</text>
<rect x="400" y="130" width="100" height="40" rx="10" fill="#7b43c9"/><text x="450" y="155" text-anchor="middle" style="fill:#fff">database</text>
<rect x="530" y="85" width="100" height="40" rx="10" fill="var(--coral)"/><text x="580" y="110" text-anchor="middle" style="fill:#fff">queue → workers</text>
<path d="M500 150 L530 110" stroke="var(--line-strong)" stroke-width="2" class="flow"/>
<path d="M68 95 H110" stroke="var(--line-strong)" stroke-width="2" class="flow"/>
<circle r="5" fill="var(--coral)"><animateMotion dur="2.4s" repeatCount="indefinite" path="M68 95 H155 L295 98 L450 60"/></circle>
</g></svg>
<figcaption>The standard skeleton: a load balancer, stateless app servers, a cache in front of the database, and a queue for slow work.</figcaption>
</figure>

## Caches go stale

A cache is a copy — and copies can go out of date. Common strategies:

- **TTL (time to live):** entries expire after N seconds.
- **Write-through:** update the cache whenever you write the database.
- **Cache-aside:** read from the cache; on a miss, read the database and fill the cache.

```viz hashring
> When one database isn't enough: shard it. Consistent hashing keeps resharding cheap.
```

```recall The building blocks
? What each standard component is for.
A load balancer spreads traffic across servers and removes a single point of failure. A cache is a fast in-memory copy of hot data that can go stale. A message queue buffers work and absorbs spikes. A CDN serves static content from near the user.
```

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
