---
title: The security model
blurb: Users, permissions, capabilities, seccomp, SELinux — and the classes of attack they defend against.
section: Operating it
---

## Layers of "who may do what"

| mechanism | granularity | idea |
|---|---|---|
| **Users & groups, rwx bits** | per file | classic Unix DAC (discretionary access control) |
| **setuid** | per program | run as the file's owner (e.g. `passwd` runs as root) — powerful and dangerous |
| **Capabilities** | per privilege | root split into ~40 pieces: `CAP_NET_ADMIN`, `CAP_SYS_NICE`, `CAP_NET_BIND_SERVICE`… |
| **seccomp** | per syscall | a filter listing which syscalls a process may call |
| **SELinux / AppArmor** | per label/path | mandatory access control: policy the owner can't override |
| **Namespaces + cgroups** | per container | isolation (lesson 3) |
| **sudo** | per command | controlled elevation, logged |

Trading boxes often grant a process just `CAP_SYS_NICE` (real-time priority) and `CAP_IPC_LOCK` (mlock) instead of running as root — **least privilege**.

```choice
? A service needs to listen on port 443 but shouldn't run as root. Cleanest fix?
- [x] Grant it CAP_NET_BIND_SERVICE // Exactly the one privilege it needs.
- [ ] chmod 777 the binary
- [ ] Run it as root and hope
> Capabilities slice root's powers so you can hand out only one.
```

```viz stack packet=exploit
Memory-safe language / careful code | stop the bug existing (Rust, bounds checks, sanitisers)
ASLR, stack canaries, NX | make exploitation unreliable
Unprivileged user | a compromise doesn't give root
Capabilities | only CAP_SYS_NICE + CAP_IPC_LOCK, not all of root
seccomp filter | even with code execution, dangerous syscalls fail
SELinux / AppArmor | policy says which files and ports it may touch
Namespaces + cgroups | it can't see or starve anything else
> Defence in depth: an attacker has to punch through every layer. Send one in and see how far it gets.
```

## Classes of attack (know the names)

| class | idea |
|---|---|
| **Memory corruption** | buffer overflow, use-after-free → run attacker code. Defences: ASLR, stack canaries, NX, memory-safe languages (Rust) |
| **Privilege escalation** | a bug in setuid binary or kernel → root |
| **Injection** | untrusted input run as code (shell, SQL) |
| **Supply chain** | a compromised dependency or build step (xz-utils backdoor, 2024) |
| **Side channels** | leak secrets via timing/cache (**Spectre, Meltdown**, 2018) |
| **Container escape** | break out of namespaces via kernel bug or over-privilege |

```viz timeline
1988 | Morris worm | 1988 | first internet worm; a buffer overflow in fingerd
1996 | "Smashing the Stack for Fun and Profit" | 1996 | the classic buffer-overflow tutorial
2014 | Heartbleed | 2014 | OpenSSL read past a buffer and leaked server memory
2014.5 | Shellshock | 2014 | bash executed code hidden in environment variables
2018 | Spectre & Meltdown | 2018 | speculative execution leaks secrets across boundaries
2021 | Log4Shell | Dec 2021 | a logging library fetched and ran remote code
2024 | xz-utils backdoor | 2024 | years-long supply-chain infiltration, caught by a latency anomaly
> Famous security failures. Each one is a class of attack from the table.
```

```answer
? Which Linux feature filters which system calls a process is allowed to make?
= seccomp
> Docker applies a default seccomp profile blocking ~40+ risky syscalls.
```

```reflect
? Explain "least privilege" with a Linux example.
- give only needed permissions
- concrete mechanism (capability, seccomp, non-root user)
- why: limits blast radius if compromised
model: Least privilege means a component gets only the rights it needs. For example, a market-data process runs as an unprivileged user with just CAP_SYS_NICE and CAP_IPC_LOCK, plus a seccomp filter — so if it's compromised, the attacker can't read other users' files or load kernel modules.
```

```recall Who may do what
? The layers of Linux access control.
Discretionary access control lets the owner set permissions. Mandatory access control, like SELinux, enforces a policy the owner can't override. Capabilities split root's powers into pieces. ASLR randomises memory layout to foil exploits.
```

```cards
DAC :: Owner-controlled permissions (rwx, users, groups).
MAC :: Policy-controlled (SELinux, AppArmor); owner can't override.
Capabilities :: Root's powers split into pieces.
setuid :: Program runs as its file owner.
ASLR :: Randomise memory layout to foil exploits.
Spectre / Meltdown :: Speculative-execution side channels (2018).
