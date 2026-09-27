---
title: cgroups and namespaces — how containers really work
blurb: Limit what a process can use (cgroups) and what it can see (namespaces). Together they are a "container".
section: Isolation & resources
---

A Docker/Kubernetes container is **not** a virtual machine. It's an ordinary Linux process with two kernel features applied:

| feature | controls | one-liner |
|---|---|---|
| **cgroups** (control groups) | how much it can **use** | CPU, memory, I/O, number of processes |
| **namespaces** | what it can **see** | its own PIDs, network, hostname, mounts, users |

## The cgroup "API" is a filesystem

Modern Linux uses **cgroup v2**, a single tree mounted at `/sys/fs/cgroup`. A cgroup is a **directory**. Settings are **files** in it. You operate it with `mkdir`, `echo` and `cat`.

| file | meaning |
|---|---|
| `cgroup.procs` | write a PID here to move that process into the group |
| `cgroup.subtree_control` | which controllers (`+cpu +memory +io +pids +cpuset`) children get |
| `cpu.max` | hard CPU cap: `"quota period"`, e.g. `50000 100000` = half a CPU; `max` = unlimited |
| `cpu.weight` | relative share when CPUs are contended (default 100) |
| `memory.max` | hard memory limit — exceed it and the OOM killer strikes |
| `memory.high` | soft limit — the kernel throttles and reclaims above it |
| `cpuset.cpus` | which CPU cores the group may run on |
| `io.max` | disk bandwidth/IOPS limits per device |
| `pids.max` | cap on processes (stops fork bombs) |
| `memory.current`, `cpu.stat`, `memory.events` | read-only stats |

```steps Put a job on half a CPU and 1 GB of RAM
Think in files, not tools.
---
Create a group: make a directory `/sys/fs/cgroup/batch`.
---
Set limits: write `50000 100000` to `cpu.max` and `1G` to `memory.max`.
---
Move the process in: write its PID to `cgroup.procs`.
---
That's the whole API. systemd (`systemd-run -p MemoryMax=1G …`), Docker (`--cpus`, `--memory`) and Kubernetes (`resources.limits`) all just write these files for you.
```

```answer
? In cgroup v2, which file do you write a PID into to move a process into a group?
= cgroup.procs
hint: cgroup.____
> Everything else is configuration; cgroup.procs is membership.
```

```answer
? cpu.max contains "25000 100000". What fraction of one CPU may the group use?
= 1/4
tolerance: 0.001
> quota ÷ period = 25,000 µs ÷ 100,000 µs = 0.25 of a CPU per period.
```

```choice
? A Kubernetes pod keeps getting "OOMKilled". Which cgroup setting is it hitting?
- [x] memory.max // The hard limit; crossing it invokes the OOM killer inside the group.
- [ ] cpu.max // CPU limits throttle; they never kill.
- [ ] pids.max // That makes fork() fail, not an OOM kill.
> CPU over-use → throttling (slow). Memory over-use → killed. A classic interview distinction.
```

## Why HFT people care

- **`cpuset.cpus`** pins the trading engine to dedicated cores and keeps everything else *off* them.
- **CPU throttling from `cpu.max` is poison for latency** — a thread can be paused for the rest of a 100 ms period. Latency-critical services usually get *no* CPU quota and dedicated cores instead.

## Namespaces — what a process can see

| namespace | isolates |
|---|---|
| **pid** | process IDs (the container sees itself as PID 1) |
| **net** | network interfaces, routes, ports |
| **mnt** | the filesystem tree |
| **uts** | hostname |
| **ipc** | shared memory / message queues |
| **user** | user IDs (root inside ≠ root outside) |
| **cgroup** | view of the cgroup tree |
| **time** | clock offsets |

The syscalls: **`clone`** (create a process in new namespaces), **`unshare`** (move yourself into new ones), **`setns`** (join existing ones — what `docker exec` / `nsenter` does).

```choice
? Inside a container, `ps` shows only a few processes and the app is PID 1. Which feature does that?
- [ ] cgroups
- [x] the PID namespace
- [ ] chroot
> Namespaces change what you *see*; cgroups change what you can *use*.
```

```reflect
? Explain to an interviewer what a container actually is, without saying "lightweight VM".
- an ordinary process sharing the host kernel
- namespaces for isolation of view
- cgroups for resource limits
- plus a filesystem image (and seccomp/capabilities for security)
model: A container is a normal Linux process that shares the host kernel. Namespaces give it its own view of PIDs, network, mounts and hostname; cgroups cap how much CPU, memory and I/O it can consume; and it runs from a packaged filesystem image, usually with seccomp and dropped capabilities to restrict syscalls.
```

```cards
cgroup v2 location :: /sys/fs/cgroup — a directory per group, files as settings.
cpu.max :: "quota period" hard CPU cap; over it → throttled.
memory.max :: Hard memory cap; over it → OOM kill.
cpuset.cpus :: Which cores a group may run on.
Namespaces :: pid, net, mnt, uts, ipc, user, cgroup, time — what a process can see.
setns / unshare / clone :: Join / create-for-self / create-for-child namespaces.
