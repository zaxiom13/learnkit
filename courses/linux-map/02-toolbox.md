---
title: The toolbox, by class
blurb: You don't memorise commands — you know which class of tool solves which problem.
section: Foundations
---

Tools come in families. Know the family and one or two names; let the AI (or `man`) supply the flags.

| class | the problem | names to know |
|---|---|---|
| **Text processing** | slice, filter, transform text/logs | `grep`, `sed`, `awk`, `cut`, `sort`, `uniq`, `jq` (JSON) |
| **Process inspection** | what's running, what's it doing | `ps`, `top`/`htop`, `pgrep`, `kill`, `lsof` |
| **Syscall tracing** | what is this program asking the kernel? | `strace`, `ltrace` (library calls) |
| **Performance** | where is the time going? | `perf`, `bpftrace`/eBPF, `ftrace` |
| **Networking** | sockets, routes, packets | `ss`, `ip`, `tcpdump`, `ethtool`, `curl` |
| **Files & disks** | space, search, I/O | `find`, `du`, `df`, `iostat`, `rsync` |
| **Services** | start/stop/log daemons | `systemctl`, `journalctl` (systemd) |
| **Remote & sessions** | work on servers | `ssh`, `scp`, `tmux` |

And the glue: **pipes** (`|`) connect small tools into a pipeline; **redirects** (`>`, `2>`) send output to files; **exit codes** (0 = success) let scripts decide.

```choice
? A program hangs on startup and you want to see which file or network call it's stuck on. Which class of tool?
- [ ] Text processing // That's for data, not live programs.
- [x] Syscall tracing (strace) // Shows each syscall and where it blocks.
- [ ] Services (systemctl)
- [ ] Files & disks (du)
> strace prints every syscall a process makes — a stuck `connect(` or `open(` jumps out immediately.
```

```choice
? "Which process has port 8080 open?" Choose all tools that can answer this.
- [x] ss // `ss -ltnp` lists listening TCP sockets with owning process.
- [x] lsof // Lists open files — and sockets are files.
- [ ] awk // Text processing only.
- [ ] df // Disk space.
> Sockets are file descriptors, so both socket tools and open-file tools can answer.
```

```steps Directing an AI with the right words
Goal: "Find the 10 IPs hitting our server most in today's nginx log."
---
Class: text processing pipeline.
---
Words to use: "grep today's lines, extract the IP column, sort, count unique, sort by count, top 10".
---
The AI writes something like `awk '{print $1}' access.log | sort | uniq -c | sort -rn | head`. You didn't need the syntax — you needed the *shape*.
```

```answer
? Which systemd tool shows the logs of a service?
= journalctl
hint: systemd's journal.
> `systemctl` controls services; `journalctl` reads their logs.
```

```reflect
? Describe the "Unix philosophy" in two sentences and why it makes AI-assisted work easier.
- small tools that do one thing well
- composed with pipes / text as the interface
- you can describe a pipeline in words and get it built
model: Build small tools that each do one thing well, and connect them with text streams. Because the pieces are standard and composable, I can describe the pipeline in plain words and an AI can assemble it reliably.
```

```cards
strace :: Traces a process's system calls — "what is it asking the kernel?"
perf :: Linux's profiler: CPU samples, cache misses, hardware counters.
ss :: Modern socket inspector (replaces netstat).
jq :: grep/sed for JSON.
journalctl :: Reads systemd service logs.
Exit code 0 :: Success; anything else is failure.
