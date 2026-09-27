---
title: A history of computing and the internet
blurb: From Babbage and Lovelace to transistors, ARPANET and LLMs.
section: The modern turn
---

```order
? Chronological order.
1. Babbage designs the Analytical Engine; Lovelace writes the first program
2. Turing's paper on computable numbers
3. Colossus and ENIAC (wartime electronic computers)
4. Transistor invented at Bell Labs
5. Integrated circuit
6. ARPANET's first message
7. Personal computers (Apple II, IBM PC)
8. World Wide Web (Tim Berners-Lee at CERN)
9. iPhone
10. Transformers paper ("Attention Is All You Need")
11. ChatGPT launches
> 1830s–40s → 1936 → 1943–45 → 1947 → 1958 → 1969 → 1977–81 → 1989–91 → 2007 → 2017 → 2022.
```

| name | contribution |
|---|---|
| **Ada Lovelace** | saw computers could manipulate symbols, not just numbers |
| **Alan Turing** | computability; codebreaking at Bletchley; the Turing test |
| **John von Neumann** | stored-program architecture; game theory; Monte Carlo |
| **Claude Shannon** | information theory (1948); Boolean logic in circuits |
| **Grace Hopper** | compilers; COBOL |
| **Shockley, Bardeen, Brattain** | the transistor (Nobel 1956) |
| **Vint Cerf & Bob Kahn** | TCP/IP |
| **Tim Berners-Lee** | the Web (HTTP, HTML, URLs) |
| **Hinton, LeCun, Bengio** | deep learning (Turing Award 2018) |

```viz timeline
1843 | Lovelace's notes | 1843 | the first published algorithm
1936 | Turing machines | 1936 |
1945 | ENIAC | 1945 | 18,000 vacuum tubes
1947 | Transistor | 1947 | Bell Labs
1949 | CSIRAC | 1949 | Australia's first computer; played music in 1951
1958 | Integrated circuit | 1958 | Kilby / Noyce
1969 | ARPANET, Unix, Moon | 1969 | a big year
1971 | Microprocessor | 1971 | Intel 4004
1981 | IBM PC | 1981 |
1991 | World Wide Web | 1991 | public release
2007 | iPhone | 2007 |
2012 | AlexNet | 2012 | deep learning takes off on GPUs
2017 | Transformer | 2017 | "Attention Is All You Need"
2022 | ChatGPT | Nov 2022 |
> Play the history of computing.
```

**Australian angle**: **CSIRAC** (1949) was one of the first stored-program computers and the first to play music; CSIRO's radio-astronomy work led to a key Wi-Fi patent.

```answer
? Who invented the World Wide Web? (full name)
= Tim Berners-Lee
= Tim Berners Lee
= Berners-Lee
```

```viz bars log=1 title="Moore's law"
Intel 4004 (1971) | 2300
Apple II (1977) CPU | 3500
Intel 386 (1985) | 275000
Pentium 4 (2000) | 42000000
Apple M1 (2020) | 16000000000
NVIDIA B200 (2024) | 208000000000
> Transistors per chip, log scale: about 10⁸× in half a century.
```

```choice
? What was von Neumann's key architectural idea?
- [x] Store the program in the same memory as data // Nearly every computer since.
- [ ] Use vacuum tubes
- [ ] Separate hardware for each program
```

```reflect
? Why did the internet succeed as an open network rather than a controlled one?
- end-to-end principle: dumb network, smart edges
- open standards (TCP/IP, HTTP) anyone could implement
- academic/government origins; no single owner
model: TCP/IP followed the end-to-end principle — the network just moves packets and all intelligence lives at the edges — so anyone could build new applications without permission. Open, freely implementable standards and origins in government and academia meant no single company controlled it, and the Web added an equally open publishing layer.
```

```cards
Ada Lovelace :: First published algorithm for a machine (1843).
Transistor :: Bell Labs, 1947.
ARPANET :: 1969; ancestor of the internet.
TCP/IP :: Cerf & Kahn's internetworking protocols.
CSIRAC :: Australia's first computer (1949).
Transformer :: 2017 architecture behind LLMs.
