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

<figure class="diagram">
<svg viewBox="0 0 640 150">
<defs><linearGradient id="lg1" x1="0" x2="1"><stop offset="0" stop-color="var(--coral)"/><stop offset="1" stop-color="var(--accent)"/></linearGradient></defs>
<rect x="20" y="60" width="600" height="14" rx="7" fill="url(#lg1)"/>
<text x="20" y="48" font-size="12" font-weight="700">control, speed, predictability</text>
<text x="620" y="48" font-size="12" font-weight="700" text-anchor="end">convenience, safety, speed of writing</text>
<g font-size="12.5" font-family="var(--font-code)">
<g class="bob" style="animation-delay:0.0s"><circle cx="40" cy="67" r="9" fill="var(--surface)" stroke="var(--text)" stroke-width="2"/><text x="40" y="125" text-anchor="middle">asm</text></g><g class="bob" style="animation-delay:0.2s"><circle cx="90" cy="67" r="9" fill="var(--surface)" stroke="var(--text)" stroke-width="2"/><text x="90" y="100" text-anchor="middle">C</text></g><g class="bob" style="animation-delay:0.4s"><circle cx="150" cy="67" r="9" fill="var(--surface)" stroke="var(--text)" stroke-width="2"/><text x="150" y="125" text-anchor="middle">C++</text></g><g class="bob" style="animation-delay:0.6s"><circle cx="205" cy="67" r="9" fill="var(--surface)" stroke="var(--text)" stroke-width="2"/><text x="205" y="100" text-anchor="middle">Rust</text></g><g class="bob" style="animation-delay:0.8s"><circle cx="270" cy="67" r="9" fill="var(--surface)" stroke="var(--text)" stroke-width="2"/><text x="270" y="125" text-anchor="middle">Zig/Go</text></g><g class="bob" style="animation-delay:1.0s"><circle cx="330" cy="67" r="9" fill="var(--surface)" stroke="var(--text)" stroke-width="2"/><text x="330" y="100" text-anchor="middle">Java/C#</text></g><g class="bob" style="animation-delay:1.2s"><circle cx="400" cy="67" r="9" fill="var(--surface)" stroke="var(--text)" stroke-width="2"/><text x="400" y="125" text-anchor="middle">OCaml</text></g><g class="bob" style="animation-delay:1.4s"><circle cx="460" cy="67" r="9" fill="var(--surface)" stroke="var(--text)" stroke-width="2"/><text x="460" y="100" text-anchor="middle">TypeScript</text></g><g class="bob" style="animation-delay:1.6s"><circle cx="525" cy="67" r="9" fill="var(--surface)" stroke="var(--text)" stroke-width="2"/><text x="525" y="125" text-anchor="middle">Python</text></g><g class="bob" style="animation-delay:1.8s"><circle cx="590" cy="67" r="9" fill="var(--surface)" stroke="var(--text)" stroke-width="2"/><text x="590" y="100" text-anchor="middle">q / APL</text></g>
</g></svg>
<figcaption>A rough spectrum, not a ranking. Every language trades control against convenience somewhere along it. Rust's pitch is to sit on the left with some of the right's safety.</figcaption>
</figure>

## Lineages worth knowing

- **Fortran (1957)** → still king of numerical physics codes.
- **Lisp (1958)** → code-as-data, macros, GC; descendants Scheme, Clojure; inspired every dynamic language.
- **ALGOL → C → C++ / Java / C# / Go / Rust** — the "curly brace" mainstream.
- **ML → OCaml / Haskell / F#** — type inference, algebraic data types; Jane Street runs on OCaml.
- **APL → J / K / q** — array languages; **kdb+/q** is the time-series database of trading desks.
- **Smalltalk** → pure OO, the GUI and IDE ideas Apple borrowed.
- **Erlang/Elixir** — telecom-grade fault tolerance: "let it crash" with supervisors.

```viz tree
. Fortran (1957) | numerical computing; still in physics codes
. Lisp (1958) | code as data, GC, macros
.. Scheme | minimal Lisp; SICP
.. Clojure | Lisp on the JVM
. ALGOL (1958–60) | block structure; ancestor of most mainstream syntax
.. C (1972) | Unix's systems language
... C++ (1985) | objects, templates; HFT's lingua franca
... Objective-C | NeXT/Apple
... Go (2009) | Google; simple, fast builds, goroutines
... Rust (2015) | ownership; memory safety without GC
.. Pascal | teaching, Delphi
.. Simula (1967) | first OO language
... Smalltalk | pure OO; GUIs
.... Java (1995) | JVM; enterprise
..... C# (2000) | .NET
..... Kotlin | modern JVM
.... Python (1991) | readable, batteries included
.... Ruby | Smalltalk-ish scripting
. ML (1973) | type inference
.. OCaml | Jane Street's language
.. Haskell (1990) | pure, lazy, monads
.. F# | ML for .NET
. APL (1966) | array programming with symbols
.. J / K | terse array languages
... q / kdb+ | trading time-series
. Prolog (1972) | logic programming
. JavaScript (1995) | the browser's language, written in 10 days
.. TypeScript | JS with static types
> Tap to open the lineages. Knowing the family tells you what a new language will feel like.
```

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

```recall Typing and memory
? How languages check types and manage memory.
Static typing checks types before the program runs; dynamic typing checks them while it runs. Rust's ownership lets the compiler track who owns memory, so there is no garbage collector and no use-after-free.
```

```cards
Static vs dynamic typing :: Types checked before running vs while running.
Ownership (Rust) :: Compiler tracks who owns memory — no GC, no use-after-free.
JIT :: Compiles hot code to machine code at runtime (JVM, V8).
Array language :: Operates on whole arrays at once (APL, q, NumPy style).
Curry–Howard :: Types ≅ propositions, programs ≅ proofs.
