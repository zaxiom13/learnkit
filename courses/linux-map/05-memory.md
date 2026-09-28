---
title: Memory — virtual, cached, huge and local
blurb: Page faults, the page cache, huge pages and NUMA — why "RAM is RAM" is false.
section: Low latency
---

Every process sees a private **virtual address space**. The kernel maps it onto physical RAM in **pages** (usually 4 KB). The CPU caches recent translations in the **TLB**.

<figure class="diagram">
<svg viewBox="0 0 640 200">
<g font-size="11.5">
<text x="80" y="16" text-anchor="middle" font-weight="700">virtual (per process)</text>
<rect x="30" y="26" width="100" height="17" rx="3" fill="var(--accent)"/><text x="80" y="39" text-anchor="middle" style="fill:#fff">page 0</text><rect x="30" y="46" width="100" height="17" rx="3" fill="var(--accent)"/><text x="80" y="59" text-anchor="middle" style="fill:#fff">page 1</text><rect x="30" y="66" width="100" height="17" rx="3" fill="var(--surface-3)"/><text x="80" y="79" text-anchor="middle" style="fill:var(--text)">page 2</text><rect x="30" y="86" width="100" height="17" rx="3" fill="var(--coral)"/><text x="80" y="99" text-anchor="middle" style="fill:#fff">page 3</text><rect x="30" y="106" width="100" height="17" rx="3" fill="var(--coral)"/><text x="80" y="119" text-anchor="middle" style="fill:#fff">page 4</text><rect x="30" y="126" width="100" height="17" rx="3" fill="var(--surface-3)"/><text x="80" y="139" text-anchor="middle" style="fill:var(--text)">page 5</text><rect x="30" y="146" width="100" height="17" rx="3" fill="var(--good)"/><text x="80" y="159" text-anchor="middle" style="fill:#fff">page 6</text><rect x="30" y="166" width="100" height="17" rx="3" fill="var(--surface-3)"/><text x="80" y="179" text-anchor="middle" style="fill:var(--text)">page 7</text>
<rect x="250" y="70" width="110" height="60" rx="10" fill="var(--warn)"/><text x="305" y="95" text-anchor="middle" style="fill:#fff" font-weight="700">TLB</text><text x="305" y="113" text-anchor="middle" style="fill:#fff" font-size="10">cached translations</text>
<text x="545" y="16" text-anchor="middle" font-weight="700">physical RAM</text>
<rect x="490" y="26" width="110" height="17" rx="3" fill="var(--surface-3)"/><text x="545" y="39" text-anchor="middle" style="fill:var(--text)">frame 3</text><rect x="490" y="46" width="110" height="17" rx="3" fill="var(--accent)"/><text x="545" y="59" text-anchor="middle" style="fill:#fff">frame 10</text><rect x="490" y="66" width="110" height="17" rx="3" fill="var(--coral)"/><text x="545" y="79" text-anchor="middle" style="fill:#fff">frame 17</text><rect x="490" y="86" width="110" height="17" rx="3" fill="var(--surface-3)"/><text x="545" y="99" text-anchor="middle" style="fill:var(--text)">frame 24</text><rect x="490" y="106" width="110" height="17" rx="3" fill="var(--good)"/><text x="545" y="119" text-anchor="middle" style="fill:#fff">frame 31</text><rect x="490" y="126" width="110" height="17" rx="3" fill="var(--accent)"/><text x="545" y="139" text-anchor="middle" style="fill:#fff">frame 38</text><rect x="490" y="146" width="110" height="17" rx="3" fill="var(--coral)"/><text x="545" y="159" text-anchor="middle" style="fill:#fff">frame 45</text><rect x="490" y="166" width="110" height="17" rx="3" fill="var(--surface-3)"/><text x="545" y="179" text-anchor="middle" style="fill:var(--text)">frame 52</text>
<path d="M130 34 C200 34 180 100 250 100" class="flow" stroke="var(--accent)" stroke-width="2" fill="none"/>
<path d="M360 100 C420 100 430 54 490 54" class="flow" stroke="var(--accent)" stroke-width="2" fill="none"/>
<path d="M130 94 C300 180 380 170 490 74" class="flow" stroke="var(--coral)" stroke-width="2" fill="none"/>
<path d="M130 154 C300 190 420 150 490 114" class="flow" stroke="var(--good)" stroke-width="2" fill="none"/>
<text x="80" y="195" text-anchor="middle" font-size="10.5" opacity="0.7">grey = not mapped → page fault</text>
</g></svg>
<figcaption>Every address your program uses is virtual. Page tables map it to a physical frame, the TLB caches recent lookups, and touching an unmapped page traps into the kernel (a page fault).</figcaption>
</figure>

## The events that cost you

| event | what happens | fix class |
|---|---|---|
| **Page fault** | touching a page not yet mapped — kernel must step in | pre-fault at startup; `mlock`/`mlockall` |
| **Swap** | page pushed to disk; touching it = disaster | disable swap or lock memory |
| **TLB miss** | address translation not cached | **huge pages** (2 MB / 1 GB) |
| **Remote NUMA access** | memory attached to the other CPU socket | allocate memory local to the core (`numactl`, libnuma) |
| **Cache miss** | data not in L1/L2/L3 | data layout, avoid false sharing |

```viz bars log=1 unit=" MB" title="TLB reach"
4 KB pages | 6 | 1,536 TLB entries × 4 KB ≈ 6 MB of memory reachable without a TLB miss
2 MB huge pages | 3072 | 1,536 × 2 MB ≈ 3 GB — a whole order book and more
1 GB huge pages | 1572864 | 1,536 × 1 GB — effectively all of RAM
> How much memory the TLB can "see" at once (TLB reach, in MB) with an illustrative 1,536-entry TLB. Huge pages multiply it by 512×, then 512× again.
```

## NUMA in one picture

Big servers have 2+ CPU **sockets**, each with its **own RAM**. Reaching the other socket's memory is noticeably slower. Rule: **thread, its memory, and its network card on the same NUMA node.**

```viz numa
> Move the thread, its memory and the NIC between sockets. Latency is lowest only when all three are local.
```

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

```recall Memory costs
? The memory events that cost you latency, and the fixes.
A page fault means the kernel must intervene; mlock pins memory so it never swaps. Huge pages mean fewer TLB misses. On NUMA machines, remote memory is slower than local. False sharing is two cores writing different variables on the same cache line.
```

```cards
Page fault :: Touching memory that isn't mapped yet — the kernel must intervene.
mlock / mlockall :: Pin memory in RAM; never swap it.
Huge pages :: 2 MB / 1 GB pages → fewer TLB misses.
NUMA :: Each socket has local RAM; remote access is slower.
Page cache :: Idle RAM used to cache files.
False sharing :: Two cores writing different variables on the same cache line — slows both.
