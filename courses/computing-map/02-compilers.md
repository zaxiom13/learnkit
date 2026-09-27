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

```steps What "undefined behaviour" really means in C/C++
Code: `if (x + 1 < x) overflow();` with signed int x.
---
Signed overflow is **undefined behaviour** — the standard says it cannot happen.
---
So the optimiser reasons: "x + 1 < x is always false" and deletes the check.
---
Lesson: UB isn't "crashes sometimes", it's "the compiler may assume it never happens". Sanitisers (`-fsanitize=undefined,address`) catch it.
```

```cards
LLVM :: Shared compiler infrastructure behind Clang, Rust, Swift.
Inlining :: Replace a call with the function body.
SIMD :: One instruction, many data lanes.
PGO :: Recompile using a profile of real runs.
Undefined behaviour :: Compiler may assume it never happens.
WebAssembly :: Portable, sandboxed bytecode.
