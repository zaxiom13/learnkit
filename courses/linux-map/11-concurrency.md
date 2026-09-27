---
title: Concurrency, locks and lock-free
blurb: Threads, mutexes, atomics, memory ordering and the ring buffer that runs half of finance.
section: Low latency
---

## The ladder

| tool | cost | when |
|---|---|---|
| **Processes** | isolated memory; talk via IPC | safety, crash isolation |
| **Threads** | share memory | parallelism within a program |
| **Mutex** | cheap if uncontended; if contended, sleeps via **futex** syscall | general shared state |
| **Spinlock** | burns CPU waiting | very short sections, dedicated cores |
| **Atomics** (compare-and-swap, fetch-add) | a single CPU instruction, with cache-line traffic | counters, flags, lock-free structures |
| **Lock-free / wait-free structures** | complex, no blocking | hot paths |
| **Shared-memory IPC** (`mmap`, `/dev/shm`) | processes share RAM directly | fastest cross-process messaging |

## Memory ordering — the physics-y bit

CPUs and compilers **reorder** memory operations for speed. On one core you never notice; across cores another thread can see writes "out of order". Languages give you **memory orders**: `relaxed`, `acquire`, `release`, `seq_cst` (C++/Rust). x86 is fairly strong (TSO); ARM is weaker, so bugs appear when code moves to ARM.

## The single-producer single-consumer ring buffer

The classic HFT structure (see the **LMAX Disruptor**): a fixed array, a write index owned by the producer, a read index owned by the consumer. No locks — each index has one writer. Pad indices onto separate **cache lines (64 bytes)** to avoid **false sharing**.

```choice
? Two threads on different cores increment different counters that sit in the same 64-byte cache line. What happens?
- [x] False sharing: the line ping-pongs between cores and both slow down // Pad to separate lines.
- [ ] Nothing — they're different variables
- [ ] A deadlock
> Caches work in lines, not variables. Coherence traffic makes "independent" writes interfere.
```

```choice
? Which bug: thread A holds lock 1 and waits for lock 2; thread B holds lock 2 and waits for lock 1.
- [x] Deadlock // Fix with a global lock ordering.
- [ ] Race condition
- [ ] Priority inversion
- [ ] Livelock
> Priority inversion is a *low*-priority holder blocking a high-priority waiter — it famously hit the Mars Pathfinder rover in 1997.
```

```answer
? How many bytes is a typical x86 cache line?
= 64
> Some Apple ARM chips use 128-byte lines; padding to 128 is a safe cross-platform choice.
```

```reflect
? Why is a single-producer single-consumer ring buffer lock-free, and where must you be careful?
- each index written by only one thread
- consumer reads producer index with acquire, producer publishes with release
- cache-line padding / fixed size / backpressure when full
model: Each index has exactly one writer — the producer owns head, the consumer owns tail — so no lock is needed. The producer writes the slot then publishes the new head with release ordering; the consumer reads head with acquire so it sees the slot's data. Put head and tail on separate cache lines to avoid false sharing, and decide what happens when the buffer is full.
```

```cards
futex :: Fast userspace mutex: only enters the kernel on contention.
CAS :: Compare-and-swap: atomic "set if still equal".
Acquire / release :: Memory orders that publish data safely between threads.
False sharing :: Different variables, same cache line → slowdown.
LMAX Disruptor :: Famous lock-free ring-buffer design from a trading exchange.
Priority inversion :: Low-priority thread holding a lock blocks a high-priority one.
