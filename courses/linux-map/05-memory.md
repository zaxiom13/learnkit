---
title: Memory — virtual, cached, huge and local
blurb: Page faults, the page cache, huge pages and NUMA — why "RAM is RAM" is false.
section: Low latency
---

Every process sees a private **virtual address space**. The kernel maps it onto physical RAM in **pages** (usually 4 KB). The CPU caches recent translations in the **TLB**.

## The events that cost you

| event | what happens | fix class |
|---|---|---|
| **Page fault** | touching a page not yet mapped — kernel must step in | pre-fault at startup; `mlock`/`mlockall` |
| **Swap** | page pushed to disk; touching it = disaster | disable swap or lock memory |
| **TLB miss** | address translation not cached | **huge pages** (2 MB / 1 GB) |
| **Remote NUMA access** | memory attached to the other CPU socket | allocate memory local to the core (`numactl`, libnuma) |
| **Cache miss** | data not in L1/L2/L3 | data layout, avoid false sharing |

## NUMA in one picture

Big servers have 2+ CPU **sockets**, each with its **own RAM**. Reaching the other socket's memory is noticeably slower. Rule: **thread, its memory, and its network card on the same NUMA node.**

```steps A low-latency process at startup
Goal: never page-fault or swap during trading hours.
---
Allocate all the big buffers up front (pools, ring buffers, order books).
---
Back them with **huge pages** to cut TLB misses.
---
Call `mlockall` so nothing can be swapped out, and touch every page once to pre-fault it.
---
Bind memory to the NUMA node of the pinned core and the NIC (`numactl --membind`).
---
During trading: no `malloc`, no new pages, no surprises.
```

```choice
? The trading box has two sockets. The NIC is on socket 0. Where should the market-data thread run?
- [x] A core on socket 0, with its memory on node 0 // Everything local.
- [ ] Socket 1 so the NIC isn't overloaded
- [ ] Anywhere — the scheduler will sort it out
> Crossing the socket interconnect adds latency to every packet and memory access.
```

```answer
? The default page size on x86 Linux is 4 KB. How many 4 KB pages fit in one 2 MB huge page?
= 512
> 2 MB ÷ 4 KB = 2048 KB ÷ 4 KB = 512 — one TLB entry instead of 512.
```

```choice
? What is the page cache?
- [x] Spare RAM the kernel uses to cache file contents // That's why "free" memory looks low on a healthy box.
- [ ] A cache inside the CPU
- [ ] Swap space
> Linux uses idle RAM to cache disk data and gives it back when programs need it. "Available" matters more than "free".
```

```reflect
? Why do low-latency programs avoid calling malloc/new on the hot path?
- allocation may take locks or call into the kernel (brk/mmap)
- new memory can page-fault
- unpredictable timing → jitter
model: A general-purpose allocator can take locks, search free lists, or ask the kernel for more memory, and freshly obtained pages page-fault on first touch. All of that makes timing unpredictable, so you preallocate pools at startup and reuse objects during trading.
```

```cards
Page fault :: Touching memory that isn't mapped yet — the kernel must intervene.
mlock / mlockall :: Pin memory in RAM; never swap it.
Huge pages :: 2 MB / 1 GB pages → fewer TLB misses.
NUMA :: Each socket has local RAM; remote access is slower.
Page cache :: Idle RAM used to cache files.
False sharing :: Two cores writing different variables on the same cache line — slows both.
