---
title: Distributed systems
blurb: Networks fail, clocks lie, machines die. CAP, consensus, replication and the ideas behind every cloud.
section: Data
---

## The fallacies

The network is **not** reliable, latency is **not** zero, bandwidth is **not** infinite, and **there is no global clock**. Every distributed design is a response to these.

<figure class="diagram">
<svg viewBox="0 0 640 210">
<g font-size="13">
<polygon points="320,20 120,190 520,190" fill="none" stroke="var(--line-strong)" stroke-width="2"/>
<circle cx="320" cy="20" r="30" fill="var(--accent)"/><text x="320" y="25" text-anchor="middle" style="fill:#fff" font-weight="700">C</text>
<circle cx="120" cy="190" r="30" fill="var(--good)"/><text x="120" y="195" text-anchor="middle" style="fill:#fff" font-weight="700">A</text>
<circle cx="520" cy="190" r="30" fill="var(--coral)" class="pulse"/><text x="520" y="195" text-anchor="middle" style="fill:#fff" font-weight="700">P</text>
<text x="360" y="30" font-size="11.5">consistency: every read sees the latest write</text>
<text x="160" y="178" font-size="11.5">availability: every request answered</text>
<text x="480" y="150" font-size="11.5" text-anchor="end">partitions happen (not optional)</text>
<text x="200" y="100" font-size="11.5" text-anchor="middle" style="fill:var(--good)">AP: Cassandra, DNS</text>
<text x="450" y="100" font-size="11.5" text-anchor="middle" style="fill:var(--accent)">CP: etcd, ZooKeeper, banks</text>
</g></svg>
<figcaption>Since partitions will happen, the real choice is C vs A while one is in progress.</figcaption>
</figure>

## Key ideas

| idea | one line |
|---|---|
| **Replication** | keep copies on several machines (leader–follower, multi-leader, leaderless) |
| **Partitioning / sharding** | split data by key across machines |
| **CAP theorem** | during a network **P**artition, choose **C**onsistency or **A**vailability |
| **PACELC** | …and **E**lse (normally), trade **L**atency vs **C**onsistency |
| **Consensus** | get machines to agree despite failures: **Paxos**, **Raft** |
| **Linearizability** | behaves like a single copy with instant operations |
| **Eventual consistency** | replicas converge if writes stop |
| **Logical clocks** | Lamport clocks, vector clocks — order without wall time |
| **Idempotency** | doing it twice = doing it once (safe retries) |
| **Exactly-once** | usually "at-least-once delivery + idempotent processing" |

Real systems: **etcd/ZooKeeper** (consensus for config/locks — Kubernetes stores its state in etcd), **Kafka** (replicated log), **Spanner** (uses atomic clocks + GPS, "TrueTime", for global consistency), **CRDTs** (data types that merge without conflicts — collaborative editors).

```viz quorum
> Crash nodes and find the point where writes stop. Raft and Paxos refuse to act without a majority, because two minorities could otherwise both think they're in charge (split brain).
```

```choice
? A bank balance service during a network split. What does CAP force?
- [x] Refuse some requests (stay consistent) or accept them (stay available) and risk divergence // Banks usually pick C.
- [ ] Nothing, if the servers are fast enough
- [ ] It must lose data
> Partitions happen; the choice is what you do during one.
```

```viz hashring
> Partitioning in action. Add and remove servers and count how many keys have to move.
```

```answer
? Raft needs a majority to commit. How many node failures can a 5-node cluster tolerate?
= 2
> Majority of 5 is 3; up to 2 can fail. In general 2f + 1 nodes tolerate f failures.
```

```choice
? Why are payment APIs designed to be idempotent (e.g. with an idempotency key)?
- [x] So a retried request after a timeout doesn't charge twice // You can't tell "failed" from "succeeded but reply lost".
- [ ] To make them faster
- [ ] Because HTTP requires it
> The Two Generals problem: after a timeout you don't know what happened. Idempotency makes retrying safe.
```

```reflect
? Explain why "exactly-once delivery" is mostly a myth and what systems do instead.
- network can lose acks, so sender must retry → duplicates possible
- dedupe with ids / idempotent handlers
- transactions tying consume+produce (Kafka)
model: A sender can't know whether a message was processed if the acknowledgement is lost, so it must retry, which can duplicate. Systems deliver at-least-once and make processing idempotent — dedupe by message id, or commit output and offsets in one transaction — giving exactly-once *effects*.
```

```cards
CAP :: Under partition, pick consistency or availability.
Raft / Paxos :: Consensus algorithms; need a majority.
2f+1 :: Nodes needed to tolerate f crash failures.
Lamport clock :: Counter that orders events causally.
CRDT :: Data type whose replicas merge automatically.
Idempotent :: Applying twice has the same effect as once.
