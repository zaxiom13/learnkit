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

<figure class="diagram">
<svg viewBox="0 0 640 220">
<rect x="10" y="10" width="620" height="200" rx="16" fill="var(--surface-2)" stroke="var(--line-strong)"/>
<text x="24" y="32" font-size="12" opacity="0.7">one Linux kernel, shared by everyone</text>
<g>
<rect x="30" y="48" width="280" height="148" rx="14" fill="color-mix(in srgb, var(--accent) 10%, transparent)" stroke="var(--accent)" stroke-width="2"/>
<text x="44" y="70" font-size="13" font-weight="700">container A</text>
<rect x="46" y="82" width="120" height="100" rx="10" fill="none" stroke="var(--good)" stroke-width="2" stroke-dasharray="6 4"/>
<text x="106" y="100" text-anchor="middle" font-size="11" style="fill:var(--good)">namespaces</text>
<text x="106" y="120" text-anchor="middle" font-size="10.5">own PIDs · own net</text><text x="106" y="136" text-anchor="middle" font-size="10.5">own mounts · hostname</text>
<text x="106" y="166" text-anchor="middle" font-size="18" class="pulse">👁</text>
<rect x="178" y="82" width="120" height="100" rx="10" fill="none" stroke="var(--coral)" stroke-width="2"/>
<text x="238" y="100" text-anchor="middle" font-size="11" style="fill:var(--coral)">cgroup</text>
<text x="238" y="120" text-anchor="middle" font-size="10.5">≤ 0.5 CPU</text><text x="238" y="136" text-anchor="middle" font-size="10.5">≤ 1 GB RAM</text>
<rect x="198" y="150" width="80" height="12" rx="6" fill="var(--surface-3)"/><rect x="198" y="150" width="40" height="12" rx="6" fill="var(--coral)" class="blink"/>
</g>
<g>
<rect x="330" y="48" width="280" height="148" rx="14" fill="color-mix(in srgb, var(--warn) 10%, transparent)" stroke="var(--warn)" stroke-width="2"/>
<text x="344" y="70" font-size="13" font-weight="700">container B</text>
<rect x="346" y="82" width="120" height="100" rx="10" fill="none" stroke="var(--good)" stroke-width="2" stroke-dasharray="6 4"/>
<text x="406" y="100" text-anchor="middle" font-size="11" style="fill:var(--good)">namespaces</text>
<text x="406" y="126" text-anchor="middle" font-size="10.5">sees only itself</text>
<text x="406" y="166" text-anchor="middle" font-size="18" class="pulse">👁</text>
<rect x="478" y="82" width="120" height="100" rx="10" fill="none" stroke="var(--coral)" stroke-width="2"/>
<text x="538" y="100" text-anchor="middle" font-size="11" style="fill:var(--coral)">cgroup</text>
<text x="538" y="120" text-anchor="middle" font-size="10.5">cores 2–5 only</text><text x="538" y="136" text-anchor="middle" font-size="10.5">pids.max 100</text>
</g>
</svg>
<figcaption>A container = namespaces (what it can <b>see</b>) + cgroups (what it can <b>use</b>) + an image, all on one shared kernel.</figcaption>
</figure>

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

```viz cgroup
> Set a quota below what the job wants and it runs in bursts, then waits. That's throttling. Start the leak and watch <code>memory.current</code> climb into <code>memory.max</code>.
```

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

```viz tree
. /sys/fs/cgroup | the root of the single v2 hierarchy
.. cgroup.subtree_control | "+cpu +memory +io" — controllers handed to children
.. system.slice | systemd's services
... sshd.service | each service is its own cgroup
... nginx.service | with cpu.max, memory.max …
.. user.slice | logged-in users' sessions
.. trading.slice | your own group (mkdir!)
... md-handler | cpuset.cpus = 2, no quota
... strategy | cpuset.cpus = 3
... logger | cpu.weight = 50, memory.max = 2G
.. kubepods.slice | Kubernetes pods live here
> It's a directory tree. systemd, Docker and Kubernetes all just make directories and write files in here.
```

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
