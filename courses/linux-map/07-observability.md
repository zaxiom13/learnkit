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

<figure class="diagram">
<svg viewBox="0 0 640 190">
<g font-size="11" style="fill:#fff">
<rect x="10" y="150" width="620" height="26" fill="#c05b11" rx="3"/><text x="320" y="167" text-anchor="middle" style="fill:#fff">main()</text>
<rect x="10" y="122" width="400" height="26" fill="#d9731f" rx="3"/><text x="210" y="139" text-anchor="middle" style="fill:#fff">on_market_data()</text>
<rect x="412" y="122" width="218" height="26" fill="#e08a2c" rx="3"/><text x="521" y="139" text-anchor="middle" style="fill:#fff">send_orders()</text>
<rect x="10" y="94" width="260" height="26" fill="#e39a33" rx="3"/><text x="140" y="111" text-anchor="middle" style="fill:#fff">parse_message()</text>
<rect x="272" y="94" width="138" height="26" fill="#eaa93f" rx="3"/><text x="341" y="111" text-anchor="middle" style="fill:#fff">update_book()</text>
<rect x="412" y="94" width="120" height="26" fill="#ecb347" rx="3"/><text x="472" y="111" text-anchor="middle" style="fill:#fff">encode()</text>
<rect x="534" y="94" width="96" height="26" fill="#f0c257" rx="3"/><text x="582" y="111" text-anchor="middle" style="fill:#1c1a24">sendmsg</text>
<rect x="10" y="66" width="210" height="26" fill="#f2594b" rx="3" class="pulse"/><text x="115" y="83" text-anchor="middle" style="fill:#fff">memcpy ← hot!</text>
<rect x="222" y="66" width="48" height="26" fill="#f0c257" rx="3"/>
<rect x="272" y="66" width="80" height="26" fill="#f4d06a" rx="3"/><text x="312" y="83" text-anchor="middle" style="fill:#1c1a24">map::find</text>
</g>
<text x="10" y="40" font-size="12">width = share of CPU samples · height = call depth</text>
</svg>
<figcaption>A flame graph: look for the widest boxes near the top. Here a stray <code>memcpy</code> inside message parsing eats a third of the CPU.</figcaption>
</figure>

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

```viz tree
. Is the whole box slow? | overview
.. top / htop | CPU and memory per process
.. vmstat / mpstat | system-wide CPU, run queue, swapping
.. iostat | disk utilisation and latency
. Which code burns CPU? | profiling
.. perf record + flame graph | sampled call stacks
.. perf stat | cache misses, IPC, branch misses
. What is it waiting on? | tracing
.. strace | syscalls (high overhead!)
.. offcputime / runqlat (BCC) | time spent blocked or waiting for a CPU
.. biolatency | disk I/O latency histogram
. Network? | packets
.. ss | socket states, queues
.. tcpdump | raw packets
.. tcpretrans (BCC) | who is retransmitting
> Start from the question, and the tool follows.
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
