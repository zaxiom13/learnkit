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

## Classes of attack (know the names)

| class | idea |
|---|---|
| **Memory corruption** | buffer overflow, use-after-free → run attacker code. Defences: ASLR, stack canaries, NX, memory-safe languages (Rust) |
| **Privilege escalation** | a bug in setuid binary or kernel → root |
| **Injection** | untrusted input run as code (shell, SQL) |
| **Supply chain** | a compromised dependency or build step (xz-utils backdoor, 2024) |
| **Side channels** | leak secrets via timing/cache (**Spectre, Meltdown**, 2018) |
| **Container escape** | break out of namespaces via kernel bug or over-privilege |

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

```cards
DAC :: Owner-controlled permissions (rwx, users, groups).
MAC :: Policy-controlled (SELinux, AppArmor); owner can't override.
Capabilities :: Root's powers split into pieces.
setuid :: Program runs as its file owner.
ASLR :: Randomise memory layout to foil exploits.
Spectre / Meltdown :: Speculative-execution side channels (2018).
