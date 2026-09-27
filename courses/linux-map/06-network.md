---
title: Networking, from sockets to kernel bypass
blurb: How packets reach your program, why the normal path is too slow for HFT, and the families of fixes.
section: Low latency
---

## The normal path

NIC receives packet → **interrupt** → kernel driver → TCP/IP stack → socket buffer → your program's `recv` syscall copies it out. Robust and general — and several microseconds.

Waiting efficiently for many sockets: **`select` → `poll` → `epoll`** (Linux's scalable one) → **`io_uring`** (modern async I/O via shared ring buffers, fewer syscalls).

```viz stack packet=packet
Your application | calls <code>recv()</code> and waits
Socket buffer | the kernel queues bytes here and copies them to you
TCP/IP stack | checksums, reassembly, routing, congestion control
Driver + interrupt | NIC raises an IRQ; the kernel's driver pulls the packet off the ring
Network card (NIC) | DMAs the packet into RAM
Wire / fibre | the exchange is metres away in co-location
> The normal path. Every layer is robust and general, and every layer costs time. Kernel bypass deletes the middle three.
```

## The families of speed-ups

| family | idea | names |
|---|---|---|
| **Tune the kernel path** | busy-poll the socket, interrupt coalescing, RSS queues | `SO_BUSY_POLL`, `ethtool -C`, IRQ affinity |
| **Kernel bypass** | map the NIC into user space; your code reads packets directly | **Solarflare/AMD OpenOnload & ef_vi**, **DPDK**, Mellanox/NVIDIA **VMA** |
| **In-kernel fast path** | run small programs at the driver | **XDP / AF_XDP** (eBPF) |
| **Remote memory** | write into another machine's RAM | **RDMA** / InfiniBand / RoCE |
| **Hardware** | put the logic on the card | **FPGA** / SmartNIC trading, tick-to-trade in nanoseconds |

```viz bars log=1 unit=" µs" title="How fast can you react?"
Kernel socket, blocking recv | 10 | wake-up + stack + copy + syscall: roughly several µs to tens of µs
Kernel socket, busy-poll | 4 | no sleeping, still the full stack
Onload (socket API, bypass) | 1.5 | same code, user-space stack
ef_vi / DPDK raw rings | 0.8 | your code reads the NIC ring directly
FPGA on the wire | 0.1 | logic in hardware; no CPU at all
> Rough, order-of-magnitude one-way software latencies (µs) for reacting to a packet. Real numbers vary a lot by hardware and tuning.
```

## Finance-specific networking

- **Multicast UDP** — exchanges broadcast market data to many subscribers at once; you "join a group". Gaps are handled by sequence numbers and recovery feeds.
- **TCP** — for order entry (sessions, e.g. **FIX** protocol or exchange-native binary protocols).
- **Co-location** — your servers sit in the exchange's data centre (for the ASX: its Sydney co-location facility) so light travels metres, not kilometres.
- **Time sync** — regulators and strategies need accurate timestamps: **PTP** (IEEE 1588, sub-microsecond) over NTP; hardware timestamping on the NIC (`SO_TIMESTAMPING`).

<figure class="diagram">
<svg viewBox="0 0 640 200">
<rect x="20" y="75" width="110" height="50" rx="10" fill="var(--accent)"/><text x="75" y="98" text-anchor="middle" style="fill:#fff" font-size="13" font-weight="700">Exchange</text><text x="75" y="114" text-anchor="middle" style="fill:#fff" font-size="10">matching engine</text>
<circle cx="230" cy="100" r="18" fill="var(--warn)"/><text x="230" y="104" text-anchor="middle" font-size="10" style="fill:#fff">switch</text>
<path d="M130 100 H212" stroke="var(--accent)" stroke-width="3" class="flow"/>
<path d="M248 100 C330 100 380 30 470 30" stroke="var(--accent)" stroke-width="2" fill="none" class="flow"/><rect x="470" y="16" width="150" height="28" rx="8" fill="var(--surface-2)" stroke="var(--line-strong)"/><text x="545" y="34" text-anchor="middle" font-size="11.5">market maker A</text><path d="M248 100 C330 100 380 65 470 65" stroke="var(--accent)" stroke-width="2" fill="none" class="flow"/><rect x="470" y="51" width="150" height="28" rx="8" fill="var(--surface-2)" stroke="var(--line-strong)"/><text x="545" y="69" text-anchor="middle" font-size="11.5">prop firm B</text><path d="M248 100 C330 100 380 100 470 100" stroke="var(--accent)" stroke-width="2" fill="none" class="flow"/><rect x="470" y="86" width="150" height="28" rx="8" fill="var(--surface-2)" stroke="var(--line-strong)"/><text x="545" y="104" text-anchor="middle" font-size="11.5">hedge fund C</text><path d="M248 100 C330 100 380 135 470 135" stroke="var(--accent)" stroke-width="2" fill="none" class="flow"/><rect x="470" y="121" width="150" height="28" rx="8" fill="var(--surface-2)" stroke="var(--line-strong)"/><text x="545" y="139" text-anchor="middle" font-size="11.5">bank D</text><path d="M248 100 C330 100 380 170 470 170" stroke="var(--accent)" stroke-width="2" fill="none" class="flow"/><rect x="470" y="156" width="150" height="28" rx="8" fill="var(--surface-2)" stroke="var(--line-strong)"/><text x="545" y="174" text-anchor="middle" font-size="11.5">you</text>
<circle r="5" fill="var(--coral)"><animateMotion dur="1.4s" repeatCount="indefinite" path="M130 100 H230 C330 100 380 170 470 170"/></circle>
<circle r="5" fill="var(--coral)"><animateMotion dur="1.4s" repeatCount="indefinite" path="M130 100 H230 C330 100 380 30 470 30"/></circle>
<circle r="5" fill="var(--coral)"><animateMotion dur="1.4s" repeatCount="indefinite" path="M130 100 H230 C330 100 380 100 470 100"/></circle>
</svg>
<figcaption>UDP multicast: the exchange sends each market-data packet once and the network copies it to every subscriber. Nobody gets a head start from the sender, so the race is decided by <i>your</i> path.</figcaption>
</figure>

```choice
? Market data for thousands of instruments goes to hundreds of firms at once. Which transport fits?
- [x] UDP multicast // One send, many receivers, no per-client connection.
- [ ] One TCP connection per firm
- [ ] HTTP polling
> Multicast scales to any number of subscribers. The cost is no built-in reliability — hence sequence numbers and gap recovery.
```

```choice
? What does "kernel bypass" change?
- [ ] The kernel is removed from the machine
- [x] The app reads/writes NIC queues directly from user space, skipping the kernel's network stack and syscalls // The kernel still runs everything else.
- [ ] Packets skip the network card
> Bypass libraries (Onload, ef_vi, DPDK) give user space direct access to the NIC's rings, cutting latency from microseconds toward hundreds of nanoseconds.
```

```order
? Order from typically slowest to fastest reaction to a market-data packet.
1. Normal kernel socket with blocking recv
2. Kernel socket with busy polling
3. Kernel bypass (e.g. ef_vi / DPDK) with a spinning thread
4. FPGA on the network path
> Each step removes a layer: sleeping, then the kernel stack, then the CPU itself.
```

```answer
? Which protocol synchronises clocks to sub-microsecond accuracy across a trading network? (acronym)
= PTP
= IEEE 1588
hint: Precision Time Protocol.
> NTP is typically millisecond-level; PTP with hardware timestamps gets far below a microsecond.
```

```reflect
? Walk through "tick-to-trade" — what happens between a price change at the exchange and your order arriving back.
- packet leaves exchange, crosses co-lo network to your NIC
- NIC → (bypass) → your spinning thread decodes it
- strategy decides; order encoded
- order sent via TCP/order gateway back to exchange; measured with hardware timestamps
model: The exchange multicasts a market-data packet; it crosses a few metres of co-lo fibre to our NIC. A kernel-bypass stack hands it to a pinned, spinning thread, which decodes it, updates the book, and runs the strategy. If it trades, it encodes an order and sends it over the order-entry TCP session back to the exchange. We measure each hop with NIC hardware timestamps synced by PTP.
```

```cards
epoll :: Linux's scalable "which of my sockets are ready?" API.
io_uring :: Async I/O through shared ring buffers; fewer syscalls.
Kernel bypass :: User-space access to the NIC (Onload/ef_vi, DPDK).
XDP / AF_XDP :: eBPF fast path at the driver.
Multicast :: One-to-many UDP; how exchanges publish market data.
PTP :: Precision Time Protocol — sub-µs clock sync.
FIX :: Classic text-based protocol for orders between firms.
