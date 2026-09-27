---
title: Networking, from sockets to kernel bypass
blurb: How packets reach your program, why the normal path is too slow for HFT, and the families of fixes.
section: Low latency
---

## The normal path

NIC receives packet → **interrupt** → kernel driver → TCP/IP stack → socket buffer → your program's `recv` syscall copies it out. Robust and general — and several microseconds.

Waiting efficiently for many sockets: **`select` → `poll` → `epoll`** (Linux's scalable one) → **`io_uring`** (modern async I/O via shared ring buffers, fewer syscalls).

## The families of speed-ups

| family | idea | names |
|---|---|---|
| **Tune the kernel path** | busy-poll the socket, interrupt coalescing, RSS queues | `SO_BUSY_POLL`, `ethtool -C`, IRQ affinity |
| **Kernel bypass** | map the NIC into user space; your code reads packets directly | **Solarflare/AMD OpenOnload & ef_vi**, **DPDK**, Mellanox/NVIDIA **VMA** |
| **In-kernel fast path** | run small programs at the driver | **XDP / AF_XDP** (eBPF) |
| **Remote memory** | write into another machine's RAM | **RDMA** / InfiniBand / RoCE |
| **Hardware** | put the logic on the card | **FPGA** / SmartNIC trading, tick-to-trade in nanoseconds |

## Finance-specific networking

- **Multicast UDP** — exchanges broadcast market data to many subscribers at once; you "join a group". Gaps are handled by sequence numbers and recovery feeds.
- **TCP** — for order entry (sessions, e.g. **FIX** protocol or exchange-native binary protocols).
- **Co-location** — your servers sit in the exchange's data centre (for the ASX: its Sydney co-location facility) so light travels metres, not kilometres.
- **Time sync** — regulators and strategies need accurate timestamps: **PTP** (IEEE 1588, sub-microsecond) over NTP; hardware timestamping on the NIC (`SO_TIMESTAMPING`).

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
