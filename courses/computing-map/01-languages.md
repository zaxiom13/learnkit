---
title: The family tree of languages
blurb: Paradigms, type systems and memory models — so you can pick (or ask for) the right tool.
section: Building software
---

Every language is a bundle of choices. Learn the axes and any language becomes "X-ish with Y".

| axis | options | examples |
|---|---|---|
| **Paradigm** | imperative, object-oriented, functional, logic, array | C; Java; Haskell; Prolog; APL/q |
| **Typing** | static vs dynamic; strong vs weak | Rust/Go (static), Python/JS (dynamic) |
| **Memory** | manual, garbage-collected, ownership | C/C++; Java/Go/Python; Rust |
| **Execution** | compiled to machine code, bytecode + VM/JIT, interpreted | C/Rust; JVM/.NET/V8; CPython |
| **Concurrency model** | threads+locks, async/await, actors, CSP channels | Java; JS/Python; Erlang; Go |

## Lineages worth knowing

- **Fortran (1957)** → still king of numerical physics codes.
- **Lisp (1958)** → code-as-data, macros, GC; descendants Scheme, Clojure; inspired every dynamic language.
- **ALGOL → C → C++ / Java / C# / Go / Rust** — the "curly brace" mainstream.
- **ML → OCaml / Haskell / F#** — type inference, algebraic data types; Jane Street runs on OCaml.
- **APL → J / K / q** — array languages; **kdb+/q** is the time-series database of trading desks.
- **Smalltalk** → pure OO, the GUI and IDE ideas Apple borrowed.
- **Erlang/Elixir** — telecom-grade fault tolerance: "let it crash" with supervisors.

```choice
? A trading firm wants the lowest-latency code with no garbage-collector pauses and strong memory safety. Best fit?
- [ ] Python // Interpreted and GC'd.
- [ ] Java // Possible with heroic tuning, but GC pauses are the classic worry.
- [x] Rust (or carefully written C++) // No GC; Rust adds compile-time memory safety.
- [ ] JavaScript
> C++ dominates HFT for history and control; Rust is rising because the compiler rules out whole bug classes.
```

```choice
? What does a garbage collector trade away for convenience?
- [x] Predictable latency (pauses) and some memory overhead // Modern GCs (ZGC, Go's) keep pauses short but not zero.
- [ ] Type safety
- [ ] The ability to use threads
> GC frees memory automatically, but it must occasionally stop or slow your program to find garbage.
```

## Type systems, the deep end

Static types are **proofs about programs** (the **Curry–Howard correspondence**: types ↔ propositions, programs ↔ proofs). That's why dependently-typed languages like **Lean**, **Coq/Rocq** and **Agda** double as theorem provers — Lean's `mathlib` formalises large parts of modern mathematics.

```answer
? Which correspondence says "types are propositions and programs are proofs"? (two surnames, hyphenated)
= Curry-Howard
= Curry–Howard
= Curry Howard
= /curry.?howard/i
```

```reflect
? Describe a language you'd ask an AI to use for (a) a quick data-cleaning script and (b) a latency-critical service — and why.
- script: dynamic, batteries-included (Python), speed of writing matters
- service: compiled, no GC or low-pause GC (Rust/C++/Go)
- mentions a trade-off
model: For a quick script I'd ask for Python — huge libraries, fast to write, speed doesn't matter. For a latency-critical service I'd ask for Rust or C++: compiled to native code, no garbage-collector pauses, and control over memory layout. The trade-off is development speed versus runtime predictability.
```

```cards
Static vs dynamic typing :: Types checked before running vs while running.
Ownership (Rust) :: Compiler tracks who owns memory — no GC, no use-after-free.
JIT :: Compiles hot code to machine code at runtime (JVM, V8).
Array language :: Operates on whole arrays at once (APL, q, NumPy style).
Curry–Howard :: Types ≅ propositions, programs ≅ proofs.
