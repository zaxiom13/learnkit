---
title: CPUs, scheduling and jitter
blurb: How Linux decides who runs, and the knobs low-latency shops turn to make a core belong to one thread.
section: Low latency
---

In HFT the enemy isn't average speed, it's **jitter** — the rare 50 µs stall at the worst moment. Most jitter comes from the thread being **interrupted or moved**.

## Where interruptions come from

- The **scheduler** runs another task on your core.
- **Interrupts (IRQs)** from network cards, disks, timers.
- The **timer tick** — the kernel waking up periodically (e.g. 1000×/s).
- **Power saving**: CPU sleep states (C-states) and frequency changes take microseconds to wake from.
- **Migration**: moving to another core loses warm caches.

<figure class="diagram">
<svg viewBox="0 0 640 210">
<text x="10" y="18" font-size="12" opacity="0.7">16-core box, before → after tuning</text>
<g font-size="11">
<rect x="10" y="30" width="300" height="160" rx="12" fill="var(--surface-2)"/>
<text x="160" y="50" text-anchor="middle">default: everything everywhere</text>
<rect x="24" y="62" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="54" y="78" text-anchor="middle" class="blink" style="animation-delay:0.00s">⚡</text><rect x="94" y="62" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="124" y="78" text-anchor="middle" class="blink" style="animation-delay:0.13s">·</text><rect x="164" y="62" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="194" y="78" text-anchor="middle" class="blink" style="animation-delay:0.26s">·</text><rect x="234" y="62" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="264" y="78" text-anchor="middle" class="blink" style="animation-delay:0.39s">⚡</text><rect x="24" y="92" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="54" y="108" text-anchor="middle" class="blink" style="animation-delay:0.52s">·</text><rect x="94" y="92" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="124" y="108" text-anchor="middle" class="blink" style="animation-delay:0.65s">·</text><rect x="164" y="92" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="194" y="108" text-anchor="middle" class="blink" style="animation-delay:0.78s">⚡🧵</text><rect x="234" y="92" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="264" y="108" text-anchor="middle" class="blink" style="animation-delay:0.91s">·</text><rect x="24" y="122" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="54" y="138" text-anchor="middle" class="blink" style="animation-delay:1.04s">·</text><rect x="94" y="122" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="124" y="138" text-anchor="middle" class="blink" style="animation-delay:1.17s">⚡</text><rect x="164" y="122" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="194" y="138" text-anchor="middle" class="blink" style="animation-delay:1.30s">·</text><rect x="234" y="122" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="264" y="138" text-anchor="middle" class="blink" style="animation-delay:1.43s">·</text><rect x="24" y="152" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="54" y="168" text-anchor="middle" class="blink" style="animation-delay:1.56s">⚡</text><rect x="94" y="152" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="124" y="168" text-anchor="middle" class="blink" style="animation-delay:1.69s">·</text><rect x="164" y="152" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="194" y="168" text-anchor="middle" class="blink" style="animation-delay:1.82s">·</text><rect x="234" y="152" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="264" y="168" text-anchor="middle" class="blink" style="animation-delay:1.95s">⚡</text>
<rect x="330" y="30" width="300" height="160" rx="12" fill="var(--surface-2)"/>
<text x="480" y="50" text-anchor="middle">tuned: housekeeping vs isolated</text>
<rect x="344" y="62" width="60" height="24" rx="6" fill="var(--warn)"/><text x="374" y="78" text-anchor="middle" style="fill:#fff">IRQs</text><rect x="414" y="62" width="60" height="24" rx="6" fill="var(--warn)"/><text x="444" y="78" text-anchor="middle" style="fill:#fff">IRQs</text><rect x="484" y="62" width="60" height="24" rx="6" fill="var(--accent)"/><text x="514" y="78" text-anchor="middle" style="fill:#fff">🧵 hot</text><rect x="554" y="62" width="60" height="24" rx="6" fill="var(--accent)"/><text x="584" y="78" text-anchor="middle" style="fill:#fff">quiet</text><rect x="344" y="92" width="60" height="24" rx="6" fill="var(--accent)"/><text x="374" y="108" text-anchor="middle" style="fill:#fff">quiet</text><rect x="414" y="92" width="60" height="24" rx="6" fill="var(--accent)"/><text x="444" y="108" text-anchor="middle" style="fill:#fff">quiet</text><rect x="484" y="92" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="514" y="108" text-anchor="middle" style="fill:var(--text)">other</text><rect x="554" y="92" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="584" y="108" text-anchor="middle" style="fill:var(--text)">other</text><rect x="344" y="122" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="374" y="138" text-anchor="middle" style="fill:var(--text)">other</text><rect x="414" y="122" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="444" y="138" text-anchor="middle" style="fill:var(--text)">other</text><rect x="484" y="122" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="514" y="138" text-anchor="middle" style="fill:var(--text)">other</text><rect x="554" y="122" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="584" y="138" text-anchor="middle" style="fill:var(--text)">other</text><rect x="344" y="152" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="374" y="168" text-anchor="middle" style="fill:var(--text)">other</text><rect x="414" y="152" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="444" y="168" text-anchor="middle" style="fill:var(--text)">other</text><rect x="484" y="152" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="514" y="168" text-anchor="middle" style="fill:var(--text)">other</text><rect x="554" y="152" width="60" height="24" rx="6" fill="var(--surface-3)"/><text x="584" y="168" text-anchor="middle" style="fill:var(--text)">other</text>
</g></svg>
<figcaption>Left: interrupts (⚡), ticks and other tasks land on every core, including the trading thread's (🧵). Right: interrupts are herded onto cores 0–1, cores 2–5 are isolated with <code>isolcpus</code>/<code>nohz_full</code>, and the hot thread owns core 2.</figcaption>
</figure>

## The toolkit — by name and purpose

| knob | what it does |
|---|---|
| **CPU affinity** (`taskset`, `sched_setaffinity`) | pin a thread to a specific core |
| **`isolcpus`** (boot parameter) | keep the general scheduler off chosen cores |
| **`nohz_full`** (boot parameter) | stop the timer tick on a core running a single task |
| **`rcu_nocbs`** (boot parameter) | move kernel RCU housekeeping off those cores |
| **IRQ affinity** (`/proc/irq/*/smp_affinity`, stop `irqbalance`) | steer interrupts to housekeeping cores |
| **Real-time policies** `SCHED_FIFO` / `SCHED_RR` (`chrt`) | the thread runs until it yields; beats normal tasks |
| **C-states / `intel_idle.max_cstate`, fixed frequency** | keep cores awake and at a steady clock |
| **`tuned` profiles** (e.g. `latency-performance`) | apply many of the above in one go |
| **Busy polling / spinning** | never sleep — loop checking for work, burning 100% of a core |

```viz jitter
> Turn the knobs on one by one and watch the p99.9 line. Every trading-infrastructure interview is secretly about this picture.
```

```steps Designing a "quiet" core for a market-data thread
Box: 16 cores. One thread must react to packets in microseconds.
---
Reserve cores 2–5 for trading: boot with `isolcpus=2-5 nohz_full=2-5 rcu_nocbs=2-5`.
---
Steer network and other IRQs to cores 0–1 (housekeeping); disable `irqbalance`.
---
Pin the market-data thread to core 2 with affinity; it busy-polls, never sleeping.
---
Disable deep C-states and turbo variability so the core never has to wake up or change speed.
---
Result: core 2 runs one thread, with no ticks, no IRQs, no neighbours → minimal jitter.
```

```choice
? A thread is pinned and alone on its core, but still sees periodic ~1–4 ms spikes. Most likely culprit to remove?
- [x] The scheduler timer tick — fix with nohz_full // Periodic, regular spikes smell like the tick.
- [ ] Too little RAM
- [ ] The shell's history file
> Regular periodic noise = timer tick or a housekeeping kernel thread. nohz_full + rcu_nocbs target exactly that.
```

```choice
? Why do HFT threads "spin" (busy-poll) instead of sleeping until data arrives?
- [ ] It uses less power
- [x] Waking a sleeping thread costs microseconds; spinning reacts in nanoseconds // Trade CPU for latency.
- [ ] Sleeping is not allowed on Linux
> Sleep → interrupt → scheduler → wake-up is slow. A dedicated spinning core is already awake and hot in cache.
```

```answer
? Which boot parameter keeps the normal scheduler from placing tasks on chosen cores?
= isolcpus
hint: "isolate CPUs"
> Newer setups often use cgroup cpusets for the same goal, but isolcpus is the classic answer.
```

```reflect
? Explain the difference between average latency and tail latency (p99/p99.9), and why HFT cares about the tail.
- average hides rare slow events
- p99.9 = the slowest 1 in 1000
- a missed opportunity or adverse fill happens exactly at those moments
model: Average latency smooths away the rare stalls; p99.9 tells you the slowest 1 in 1000 events. In trading, bursts of activity are when money is made or lost — and those are exactly when stalls tend to hit — so you engineer for a tight, predictable tail, not a good average.
```

```recall Taming jitter
? The kernel knobs that keep a hot core quiet.
isolcpus keeps the scheduler off reserved cores. nohz_full stops the timer tick on single-task cores. IRQ affinity moves hardware interrupts elsewhere. Busy polling spins instead of sleeping, trading a core for lower latency.
```

```cards
Jitter :: Variation in latency; the real enemy in HFT.
isolcpus :: Boot param reserving cores away from the scheduler.
nohz_full :: Stops the periodic timer tick on single-task cores.
IRQ affinity :: Choose which cores handle hardware interrupts.
SCHED_FIFO :: Real-time policy: runs until it yields or a higher priority arrives.
Busy polling :: Spin checking for work instead of sleeping.
