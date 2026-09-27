---
title: Where it all came from
blurb: Bell Labs, C, BSD, GNU, Linux, the licence wars and the philosophy that shaped modern computing.
section: Foundations
---

```order
? Put these in chronological order.
1. Multics project (MIT, GE, Bell Labs)
2. Thompson & Ritchie write Unix at Bell Labs
3. Unix rewritten in C
4. Berkeley's BSD adds TCP/IP networking
5. Richard Stallman launches GNU and the free software movement
6. Linus Torvalds releases the Linux kernel
7. Android ships on the Linux kernel
> Roughly 1964 → 1969 → 1973 → early 1980s → 1983 → 1991 → 2008.
```

## The people and ideas

| who / what | contribution |
|---|---|
| **Ken Thompson & Dennis Ritchie** | Unix (1969), C language, Turing Award 1983 |
| **Doug McIlroy** | invented **pipes**; articulated the Unix philosophy |
| **Bill Joy (BSD)** | vi, the C shell, BSD networking; co-founded Sun |
| **Richard Stallman** | GNU, GCC, Emacs, the GPL ("copyleft") |
| **Linus Torvalds** | Linux kernel (1991), later **git** (2005) |
| **POSIX** | the standard that says what "Unix-like" means |

Today: macOS is certified UNIX (BSD heritage via Darwin); Linux runs essentially all top supercomputers, most cloud servers, Android, and nearly every exchange matching engine.

## Philosophy

**Free software** (Stallman): freedom to run, study, change and share — enforced by copyleft (derivatives stay free). **Open source** (1998, Raymond/Perens): the same code, argued on practical grounds. The GPL vs permissive (MIT/BSD/Apache) split still shapes which companies use what.

```choice
? What does "copyleft" (GPL) require?
- [x] If you distribute a modified version, you must release it under the same licence // Freedom propagates.
- [ ] You may not sell the software
- [ ] You must credit the author on every screen
> Copyleft uses copyright law to keep derivatives free. Permissive licences (MIT, BSD) don't require that.
```

```answer
? In what year did Linus Torvalds first release Linux?
= 1991
```

```reflect
? Why did Unix ideas win so broadly?
- portability via C
- small composable tools / simple abstractions (files, pipes)
- spread through universities (BSD) and then free software (GNU/Linux)
model: Unix was small, written in a portable language, and built on a few powerful abstractions — files, processes, pipes. Universities got the source cheaply, trained generations on it, and BSD and GNU/Linux turned it into something anyone could use and extend for free.
```

```cards
Unix :: 1969, Bell Labs, Thompson & Ritchie.
C :: Ritchie's language (1972) — made Unix portable.
GNU :: Stallman's free Unix-like userland (1983).
Linux :: Torvalds' kernel (1991); GNU + Linux = most "Linux" systems.
POSIX :: Standard interface for Unix-like systems.
GPL :: Copyleft licence; derivatives must stay free.
