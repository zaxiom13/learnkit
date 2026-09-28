---
title: Compilers and runtimes
blurb: Source → tokens → tree → IR → optimised machine code. What happens, and why it matters for performance.
section: Building software
---

```order
? Order the classic compiler pipeline.
1. Lexing (characters → tokens)
2. Parsing (tokens → syntax tree)
3. Semantic analysis (types, names)
4. Lower to intermediate representation (IR)
5. Optimisation passes
6. Code generation (machine code)
7. Linking (combine object files and libraries)
> Front end (1–3) understands the language; middle (4–5) is language-independent; back end (6–7) targets the CPU.
```

```viz stack packet=line
Source code | <code>total += price * qty</code>
Lexer | tokens: IDENT(total) PLUSEQ IDENT(price) STAR IDENT(qty)
Parser | syntax tree: Assign(total, Add(total, Mul(price, qty)))
Semantic analysis | types resolved: double, double, int→double
IR (e.g. LLVM, SSA) | <code>%3 = fmul double %1, %2 ; %4 = fadd double %0, %3</code>
Optimiser | inline, constant-fold, vectorise, hoist out of loops
Code generation | <code>vfmadd231sd xmm0, xmm1, xmm2</code> (one fused multiply-add)
Linker | stitch objects + libraries into one executable
> Send one line of code through the compiler.
```

## Names to know

| thing | what it is |
|---|---|
| **LLVM** | reusable middle/back end — powers Clang (C/C++), Rust, Swift, Julia |
| **GCC** | GNU's compiler collection |
| **SSA form** | IR where every variable is assigned once — makes optimisations easy |
| **Inlining** | paste a function body at the call site — enables most other optimisations |
| **Vectorisation (SIMD)** | process 4–16 numbers per instruction (AVX2/AVX-512, NEON) |
| **PGO** | profile-guided optimisation: compile, run on real data, recompile knowing hot paths |
| **LTO** | link-time optimisation across files |
| **JIT** | compile at runtime using live type info (V8, HotSpot, LuaJIT, PyPy) |
| **WebAssembly** | portable bytecode target, runs in browsers and servers |

```choice
? Why can a JIT sometimes beat an ahead-of-time compiler?
- [x] It sees the actual types and hot paths at runtime and specialises for them // e.g. "this call always gets integers".
- [ ] It runs on a faster CPU
- [ ] It skips optimisation
> AOT compilers must be correct for every possible input; a JIT can speculate and de-optimise if wrong.
```

```answer
? In SSA form, how many times is each variable assigned?
= 1
= once
= one
```

<figure class="diagram">
<svg viewBox="0 0 640 170">
<g font-family="var(--font-code)" font-size="12">
<rect x="10" y="20" width="200" height="130" rx="10" fill="var(--surface-2)"/>
<text x="20" y="42">int sq(int x){</text><text x="34" y="60">return x*x;</text><text x="20" y="78">}</text>
<text x="20" y="104">for(i..n)</text><text x="34" y="122" style="fill:var(--coral)">s += sq(a[i]);</text>
<path d="M215 85 H280" stroke="var(--accent)" stroke-width="3" class="flow"/><text x="247" y="75" text-anchor="middle" font-size="10" font-family="var(--font-ui)">inline</text>
<rect x="285" y="45" width="150" height="80" rx="10" fill="var(--surface-2)"/>
<text x="295" y="72">for(i..n)</text><text x="309" y="92" style="fill:var(--coral)">s += a[i]*a[i];</text>
<path d="M440 85 H505" stroke="var(--accent)" stroke-width="3" class="flow"/><text x="472" y="75" text-anchor="middle" font-size="10" font-family="var(--font-ui)">vectorise</text>
<rect x="510" y="20" width="120" height="130" rx="10" fill="var(--accent)"/>
<text x="570" y="45" text-anchor="middle" style="fill:#fff" font-size="10.5">8 lanes at once</text>
<rect x="522" y="60" width="10" height="30" rx="2" fill="#fff" class="pulse" style="animation-delay:0.0s"/><rect x="535" y="60" width="10" height="50" rx="2" fill="#fff" class="pulse" style="animation-delay:0.1s"/><rect x="548" y="60" width="10" height="70" rx="2" fill="#fff" class="pulse" style="animation-delay:0.2s"/><rect x="561" y="60" width="10" height="40" rx="2" fill="#fff" class="pulse" style="animation-delay:0.3s"/><rect x="574" y="60" width="10" height="60" rx="2" fill="#fff" class="pulse" style="animation-delay:0.4s"/><rect x="587" y="60" width="10" height="30" rx="2" fill="#fff" class="pulse" style="animation-delay:0.5s"/><rect x="600" y="60" width="10" height="50" rx="2" fill="#fff" class="pulse" style="animation-delay:0.6s"/><rect x="613" y="60" width="10" height="70" rx="2" fill="#fff" class="pulse" style="animation-delay:0.7s"/>
<text x="570" y="140" text-anchor="middle" style="fill:#fff" font-size="10.5">AVX2 vpmulld</text>
</g></svg>
<figcaption>Inlining exposes the loop body, and the vectoriser then squares and sums 8 integers per instruction. Most speed comes from the optimiser, not from clever source code.</figcaption>
</figure>

```steps What "undefined behaviour" really means in C/C++
Code: `if (x + 1 < x) overflow();` with signed int x.
---
Signed overflow is **undefined behaviour** — the standard says it cannot happen.
---
So the optimiser reasons: "x + 1 < x is always false" and deletes the check.
---
Lesson: UB isn't "crashes sometimes", it's "the compiler may assume it never happens". Sanitisers (`-fsanitize=undefined,address`) catch it.
```

```recall What compilers do
? Four optimisations and ideas worth naming.
Inlining replaces a call with the function body. SIMD runs one instruction on many data lanes. Profile-guided optimisation recompiles using a profile of real runs. The compiler may assume undefined behaviour never happens.
> That last sentence is why undefined behaviour bugs can look like the compiler deleted your code.
```

```cards
LLVM :: Shared compiler infrastructure behind Clang, Rust, Swift.
Inlining :: Replace a call with the function body.
SIMD :: One instruction, many data lanes.
PGO :: Recompile using a profile of real runs.
Undefined behaviour :: Compiler may assume it never happens.
WebAssembly :: Portable, sandboxed bytecode.
