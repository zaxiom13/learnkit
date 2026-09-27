---
title: Seeing inside — observability
blurb: perf, eBPF, ftrace and friends: how to answer "where did the time go?"
section: Operating it
---

When something is slow, pick a tool by the **question**:

| question | tool class | names |
|---|---|---|
| Is the box busy? | overview | `top`, `htop`, `vmstat`, `mpstat`, `iostat` |
| Which *functions* burn CPU? | sampling profiler | **`perf record` / `perf report`**, flame graphs |
| Cache misses, branch mispredicts? | hardware counters | **`perf stat`** |
| Which syscalls, how long? | tracing | `strace` (slow, simple), **eBPF** (fast) |
| What is the kernel doing? | kernel tracing | **`ftrace`**, `trace-cmd`, `perf trace` |
| Custom question, in production | programmable tracing | **eBPF** via `bpftrace`, BCC tools (`runqlat`, `biolatency`, `tcpretrans`) |

## eBPF in one paragraph

**eBPF** lets you load small, verified programs *into the running kernel* and attach them to events (a syscall, a function, a packet, a scheduler switch). They collect data with tiny overhead and no reboot. It's the modern Swiss-army knife for observability, networking (XDP, Cilium) and security. Worth naming in any systems interview.

```choice
? A strategy's p99 latency doubled after a deploy. Low overhead is needed in production. Best first tool class?
- [ ] strace on the process // Very high overhead; can distort timing.
- [x] eBPF tools (e.g. runqlat for scheduler delay, or a bpftrace histogram) // Low overhead, production-safe.
- [ ] Reboot and see
> strace stops the process on every syscall. eBPF observes from inside the kernel with minimal cost.
```

```steps Reading a flame graph
You ran `perf record -g` and generated a flame graph.
---
Each box is a function; **width = share of CPU time**. Height is just call depth.
---
Look for the **widest plateaus** near the top — that's where time is actually spent.
---
Ask the AI: "explain why `parse_message` is 40% of samples and suggest fixes."
```

```answer
? Which technology lets you run small sandboxed programs inside the Linux kernel for tracing and networking? (4 letters)
= eBPF
= BPF
hint: extended Berkeley Packet Filter.
> eBPF programs are checked by a verifier before loading, so they can't crash the kernel.
```

```reflect
? You're asked in an interview: "A service is slow — how do you investigate?" Outline your answer.
- start broad: is it CPU, memory, disk, network or waiting (USE method)
- measure with the right tool class, not guess
- narrow to the function/syscall/lock
- change one thing, re-measure
model: First I check utilisation, saturation and errors for each resource — CPU, memory, disk, network — to see which is the bottleneck. Then I use the matching tool: perf for CPU hot spots, eBPF tools for scheduler or I/O latency, ss/tcpdump for network. I narrow to the specific function or wait, change one thing, and re-measure against the same percentile.
```

```cards
perf :: Linux profiler: sampling + hardware counters.
Flame graph :: Width = time spent; find the wide plateaus.
eBPF :: Verified programs inside the kernel; low-overhead tracing.
bpftrace :: One-liner language for eBPF.
ftrace :: Built-in kernel function tracer.
USE method :: Utilisation, Saturation, Errors — per resource.
