---
title: Hardware from transistor to GPU
blurb: Pipelines, caches, branch prediction, GPUs, FPGAs and the numbers every engineer should know.
section: Foundations
---

```viz latency
> The one table every systems engineer carries in their head. Hit "stretch time" to feel it.
```

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

<figure class="diagram">
<svg viewBox="0 0 640 210">
<g font-size="11">
<text x="98" y="18" text-anchor="middle" opacity="0.7">1</text><text x="160" y="18" text-anchor="middle" opacity="0.7">2</text><text x="222" y="18" text-anchor="middle" opacity="0.7">3</text><text x="284" y="18" text-anchor="middle" opacity="0.7">4</text><text x="346" y="18" text-anchor="middle" opacity="0.7">5</text><text x="408" y="18" text-anchor="middle" opacity="0.7">6</text><text x="470" y="18" text-anchor="middle" opacity="0.7">7</text><text x="532" y="18" text-anchor="middle" opacity="0.7">8</text><text x="594" y="18" text-anchor="middle" opacity="0.7">9</text><text x="10" y="46">instr 1</text><text x="10" y="76">instr 2</text><text x="10" y="106">instr 3</text><text x="10" y="136">instr 4</text><text x="10" y="166">instr 5</text><rect x="70" y="30" width="56" height="24" rx="6" fill="var(--accent)"/><text x="98" y="46" text-anchor="middle" style="fill:#fff">F</text><rect x="132" y="30" width="56" height="24" rx="6" fill="var(--good)"/><text x="160" y="46" text-anchor="middle" style="fill:#fff">D</text><rect x="194" y="30" width="56" height="24" rx="6" fill="var(--coral)"/><text x="222" y="46" text-anchor="middle" style="fill:#fff">X</text><rect x="256" y="30" width="56" height="24" rx="6" fill="var(--warn)"/><text x="284" y="46" text-anchor="middle" style="fill:#fff">M</text><rect x="318" y="30" width="56" height="24" rx="6" fill="#7b43c9"/><text x="346" y="46" text-anchor="middle" style="fill:#fff">W</text><rect x="132" y="60" width="56" height="24" rx="6" fill="var(--accent)"/><text x="160" y="76" text-anchor="middle" style="fill:#fff">F</text><rect x="194" y="60" width="56" height="24" rx="6" fill="var(--good)"/><text x="222" y="76" text-anchor="middle" style="fill:#fff">D</text><rect x="256" y="60" width="56" height="24" rx="6" fill="var(--coral)"/><text x="284" y="76" text-anchor="middle" style="fill:#fff">X</text><rect x="318" y="60" width="56" height="24" rx="6" fill="var(--warn)"/><text x="346" y="76" text-anchor="middle" style="fill:#fff">M</text><rect x="380" y="60" width="56" height="24" rx="6" fill="#7b43c9"/><text x="408" y="76" text-anchor="middle" style="fill:#fff">W</text><rect x="194" y="90" width="56" height="24" rx="6" fill="var(--accent)"/><text x="222" y="106" text-anchor="middle" style="fill:#fff">F</text><rect x="256" y="90" width="56" height="24" rx="6" fill="var(--good)"/><text x="284" y="106" text-anchor="middle" style="fill:#fff">D</text><rect x="318" y="90" width="56" height="24" rx="6" fill="var(--coral)"/><text x="346" y="106" text-anchor="middle" style="fill:#fff">X</text><rect x="380" y="90" width="56" height="24" rx="6" fill="var(--warn)"/><text x="408" y="106" text-anchor="middle" style="fill:#fff">M</text><rect x="442" y="90" width="56" height="24" rx="6" fill="#7b43c9"/><text x="470" y="106" text-anchor="middle" style="fill:#fff">W</text><rect x="256" y="120" width="56" height="24" rx="6" fill="var(--accent)"/><text x="284" y="136" text-anchor="middle" style="fill:#fff">F</text><rect x="318" y="120" width="56" height="24" rx="6" fill="var(--good)"/><text x="346" y="136" text-anchor="middle" style="fill:#fff">D</text><rect x="380" y="120" width="56" height="24" rx="6" fill="var(--coral)"/><text x="408" y="136" text-anchor="middle" style="fill:#fff">X</text><rect x="442" y="120" width="56" height="24" rx="6" fill="var(--warn)"/><text x="470" y="136" text-anchor="middle" style="fill:#fff">M</text><rect x="504" y="120" width="56" height="24" rx="6" fill="#7b43c9"/><text x="532" y="136" text-anchor="middle" style="fill:#fff">W</text><rect x="318" y="150" width="56" height="24" rx="6" fill="var(--accent)"/><text x="346" y="166" text-anchor="middle" style="fill:#fff">F</text><rect x="380" y="150" width="56" height="24" rx="6" fill="var(--good)"/><text x="408" y="166" text-anchor="middle" style="fill:#fff">D</text><rect x="442" y="150" width="56" height="24" rx="6" fill="var(--coral)"/><text x="470" y="166" text-anchor="middle" style="fill:#fff">X</text><rect x="504" y="150" width="56" height="24" rx="6" fill="var(--warn)"/><text x="532" y="166" text-anchor="middle" style="fill:#fff">M</text><rect x="566" y="150" width="56" height="24" rx="6" fill="#7b43c9"/><text x="594" y="166" text-anchor="middle" style="fill:#fff">W</text>
<rect x="316" y="24" width="60" height="156" rx="8" fill="none" stroke="var(--text)" stroke-width="2" stroke-dasharray="4 4" class="blink"/>
<text x="630" y="200" text-anchor="end" font-size="10.5">F fetch · D decode · X execute · M memory · W write back · columns = clock cycles</text>
</g></svg>
<figcaption>A 5-stage pipeline. In cycle 5 (dashed) all five instructions are in flight, each at a different stage, so one instruction finishes every cycle. Modern cores use ~15–20 stages, issue several instructions per cycle, and execute out of order.</figcaption>
</figure>

## Inside a modern CPU

- **Pipelining**: many instructions in flight at different stages.
- **Superscalar + out-of-order execution**: run independent instructions in parallel, retire in order.
- **Branch prediction** and **speculative execution**: guess the path, roll back if wrong (the root of Spectre).
- **Cache hierarchy** L1/L2/L3 and **prefetching**: memory is the bottleneck ("memory wall").
- **SIMD** units: AVX-512 on x86, NEON/SVE on ARM.

```viz bars log=1 title="Moore's law"
Intel 4004 (1971) | 2300
Intel 386 (1985) | 275000
Pentium (1993) | 3100000
Pentium 4 (2000) | 42000000
Core 2 Duo (2006) | 291000000
Apple M1 (2020) | 16000000000
Apple M3 Max (2023) | 92000000000
NVIDIA Blackwell B200 (2024) | 208000000000 | two dies in one package
> Transistors per chip, log scale. That's roughly 10⁸× in 50 years, Moore's law in one picture.
```

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
