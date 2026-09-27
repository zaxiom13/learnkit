---
title: Hardware from transistor to GPU
blurb: Pipelines, caches, branch prediction, GPUs, FPGAs and the numbers every engineer should know.
section: Foundations
---

## Latency numbers (orders of magnitude)

| operation | time |
|---|---|
| L1 cache hit | ~1 ns |
| Branch mispredict | ~5 ns |
| L3 cache hit | ~10–20 ns |
| Main memory (DRAM) | ~80–100 ns |
| NVMe SSD read | ~20–100 µs |
| Same-datacentre round trip | ~100–500 µs |
| Sydney ↔ US West Coast round trip | ~140–160 ms |

Light travels ~30 cm per nanosecond in vacuum, ~20 cm/ns in fibre. That's why co-location matters and why HFT firms built **microwave links** (straighter and faster than fibre).

## Inside a modern CPU

- **Pipelining**: many instructions in flight at different stages.
- **Superscalar + out-of-order execution**: run independent instructions in parallel, retire in order.
- **Branch prediction** and **speculative execution**: guess the path, roll back if wrong (the root of Spectre).
- **Cache hierarchy** L1/L2/L3 and **prefetching**: memory is the bottleneck ("memory wall").
- **SIMD** units: AVX-512 on x86, NEON/SVE on ARM.

## Beyond the CPU

| chip | strength |
|---|---|
| **GPU** | thousands of simple cores; matrix maths; ML training; CUDA ecosystem (NVIDIA) |
| **TPU / NPU** | matrix units specialised for neural nets |
| **FPGA** | reconfigurable logic; deterministic nanosecond pipelines — HFT tick-to-trade |
| **ASIC** | custom silicon; fastest, most expensive to make (bitcoin miners, network switches) |

Physics at the bottom: **MOSFETs**, now **FinFET → gate-all-around** transistors at "2–3 nm" nodes (marketing names, not literal sizes). **Moore's law** (transistor counts doubling ~every 2 years) slowed; **Dennard scaling** (power density constant) ended ~2006 — hence multicore instead of faster clocks.

```answer
? Light in fibre travels about 20 cm per nanosecond. How many microseconds for one-way travel over 100 km of fibre?
= 500
tolerance: 10
> 100 km = 10⁷ cm; ÷ 20 cm/ns = 5×10⁵ ns = 500 µs.
```

```choice
? Why did clock speeds stall around 3–5 GHz since the mid-2000s?
- [x] Power density/heat: Dennard scaling ended, so faster clocks meant too much heat // Chips went multicore instead.
- [ ] Transistors stopped shrinking
- [ ] Software couldn't use faster clocks
> Dynamic power ∝ C·V²·f; once voltage stopped scaling down, frequency couldn't go up freely.
```

```choice
? Which chip gives deterministic nanosecond reaction for a trading strategy?
- [x] FPGA // Logic wired for the task, no OS, no cache misses.
- [ ] GPU // High throughput, but latency is poor for single events.
- [ ] A bigger CPU
```

```reflect
? Explain why a sorted array can be processed faster than an unsorted one in some loops (the famous branch-prediction example).
- loop has a data-dependent if
- sorted data makes the branch predictable
- mispredictions flush the pipeline (~5+ ns each)
model: If a loop branches on the value (e.g. "if x > 128"), sorted data makes the outcome a long run of false then true, which the predictor learns perfectly. Random data makes it a coin flip, so about half the branches mispredict, each flushing the pipeline — often several times slower overall.
```

```cards
L1 vs DRAM :: ~1 ns vs ~100 ns — a 100× gap.
Branch prediction :: CPU guesses branch direction to keep the pipeline full.
Out-of-order execution :: Run ready instructions early, retire in order.
GPU :: Massive parallel throughput for matrix maths.
FPGA :: Reconfigurable hardware; deterministic nanosecond latency.
Dennard scaling :: Ended ~2006 → multicore era.
