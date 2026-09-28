---
title: Turning this into a job (Australia)
blurb: Which roles use this knowledge, where they are, and how to talk about it in interviews.
section: Career
---

## Roles that want exactly this

| role | what they do | what they'll probe |
|---|---|---|
| **Low-latency / C++ developer** | trading engines, market-data handlers | memory, CPU caches, lock-free code, networking |
| **Trading infrastructure / systems engineer** | build and tune the boxes and networks | kernel tuning, NUMA, IRQs, PTP, kernel bypass |
| **SRE / platform engineer** | keep systems up at scale | Linux internals, containers (cgroups), observability, incident response |
| **DevOps / cloud engineer** | CI/CD, Kubernetes, infrastructure as code | containers, networking basics, scripting |

```viz tree
. Low-latency developer | C++/Rust hot paths
.. market-data handlers | decode exchange feeds fast
.. order gateways | FIX/binary order entry
.. strategy engines | quoting and hedging logic
. Trading infrastructure | the machines and networks
.. kernel & NIC tuning | isolcpus, IRQs, huge pages
.. time sync | PTP, hardware timestamps
.. networks | co-lo, multicast, switches
. SRE / platform | keep it running
.. containers & orchestration | cgroups, Kubernetes
.. observability | metrics, tracing, alerts
.. incident response | on-call, postmortems
. Quant developer / researcher | the maths side
.. data pipelines | tick data, kdb+/q, Python
.. research tooling | backtesting, simulation
> Where the Linux knowledge from this course plugs in.
```

## The Australian landscape (check current listings)

- **Sydney** is the hub for trading: market makers and proprietary trading firms such as **Optiver**, **IMC**, **Akuna Capital** and **Susquehanna (SIG)** have offices there, and hire graduates and experienced engineers.
- Exchanges: **ASX** and **Cboe Australia** — co-location in Sydney.
- Big banks, super funds and tech companies (Atlassian, Canva and others) hire heavily for SRE/platform roles.
- If you're moving from overseas: the **Skills in Demand** and **employer-sponsored** visas are the usual routes for software roles; trading firms often sponsor. Check the Department of Home Affairs site for current rules.

## How to sound credible

- Use the **precise words**: "pin to an isolated core", "nohz_full", "NUMA-local", "kernel bypass with ef_vi", "p99.9", "cgroup memory.max".
- Always tie a technique to **the problem it solves** — that's what this course trained.
- Have **one project** you can talk about: e.g. measure UDP receive latency with and without CPU pinning and busy polling, and show the histograms.

```choice
? An interviewer asks: "Why would you not put a CPU limit on a latency-critical container?" Best answer?
- [x] CFS quota throttling can pause the process for the rest of the period, causing latency spikes; give it dedicated cores via cpuset instead // Names the mechanism and the alternative.
- [ ] Because limits are slow to configure
- [ ] Because containers can't be limited
> Showing you know *why* (throttling → tail latency) and *what instead* (cpusets) is exactly the signal they want.
```

```order
? Order a strong answer to "tell me about a latency problem you solved".
1. The context and the metric (e.g. p99 of tick-to-trade)
2. How you measured and found the cause
3. What you changed and why
4. The before/after numbers and what you learned
> Situation → diagnosis → action → measured result.
```

```reflect
? Pick one idea from this course and explain it as if to a hiring manager in 60 seconds.
- names the problem it solves
- names the mechanism correctly
- gives a trade-off or when not to use it
model: "Kernel bypass: normally a packet goes through the kernel's network stack and a syscall before our code sees it, costing microseconds. With something like ef_vi or DPDK the NIC's queues are mapped into our process and a pinned thread spins reading them directly. It's much faster and more predictable, but you give up the kernel's conveniences and burn a whole core polling, so we use it only on the hot path."
```

```recall Your pitch
? The roles, and where they are in Australia.
Low-latency developers write the trading hot path. Trading infrastructure engineers tune IRQs, NUMA, PTP and kernel bypass. SREs keep systems reliable at scale. In Australia, the exchanges are the ASX and Cboe Australia.
> Check current listings: firms and roles change, but these job shapes are stable.
```

```cards
Low-latency dev :: Writes the trading hot path; lives in caches, memory and networking.
Trading infra engineer :: Tunes boxes/networks: IRQs, NUMA, PTP, bypass.
SRE :: Reliability at scale: Linux, containers, observability.
Sydney trading firms :: Optiver, IMC, Akuna, SIG (and others).
Australian exchanges :: ASX and Cboe Australia.
