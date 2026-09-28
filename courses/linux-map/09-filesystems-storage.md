---
title: Filesystems and storage
blurb: Inodes, the VFS, journaling, copy-on-write, and why fsync is the most misunderstood call in computing.
section: Operating it
---

## The layers

| layer | job | names |
|---|---|---|
| **VFS** (virtual filesystem) | one API (`open/read/write`) over every filesystem | the kernel's abstraction |
| **Filesystem** | turns blocks into files and directories | **ext4**, **XFS**, **Btrfs**, **ZFS**, tmpfs |
| **Block layer & I/O scheduler** | queues and merges requests | `mq-deadline`, `none` (for NVMe), `bfq` |
| **Device** | stores bits | HDD (spinning, ~ms seeks), SATA SSD, **NVMe** (µs, deep queues) |
| **Volume management** | pool/partition/RAID disks | LVM, mdadm RAID, ZFS pools |

```viz stack packet=write
Application | <code>write(fd, buf, n)</code>
VFS | one API for every filesystem
Filesystem (ext4 / XFS / ZFS) | files → blocks, journaling or copy-on-write
Page cache | RAM copy of file data; writes land here first
Block layer | queues, merges, schedules I/O
NVMe driver | many parallel submission queues
SSD / disk | flash translation layer, finally stable storage
> Tap the layers, then send a write down.
```

## Inodes

A file's **name** lives in a directory; the file's **metadata and block map** live in an **inode**. A directory is just a table: *name → inode number*. So:
- A **hard link** = a second name for the same inode.
- A **symlink** = a tiny file containing a path.
- Deleting a file removes a name; the data is freed when the last name *and* last open descriptor are gone. (That's why `df` stays full after deleting a log a process still holds open.)

<figure class="diagram">
<svg viewBox="0 0 640 190">
<g font-size="12">
<rect x="20" y="20" width="180" height="150" rx="12" fill="var(--surface-2)"/><text x="110" y="40" text-anchor="middle" font-weight="700">directory</text>
<text x="40" y="70" font-family="var(--font-code)">report.txt → 42</text>
<text x="40" y="100" font-family="var(--font-code)">backup.txt → 42</text>
<text x="40" y="130" font-family="var(--font-code)">link.txt → 57</text>
<rect x="290" y="40" width="130" height="70" rx="12" fill="var(--accent)"/><text x="355" y="68" text-anchor="middle" style="fill:#fff" font-weight="700">inode 42</text><text x="355" y="88" text-anchor="middle" style="fill:#fff" font-size="10.5">size, owner, links=2</text>
<rect x="290" y="125" width="130" height="50" rx="12" fill="var(--warn)"/><text x="355" y="148" text-anchor="middle" style="fill:#fff" font-weight="700">inode 57</text><text x="355" y="164" text-anchor="middle" style="fill:#fff" font-size="10">contents: "report.txt"</text>
<path d="M175 66 C230 66 240 70 290 70" stroke="var(--accent)" stroke-width="2" fill="none" class="flow"/>
<path d="M175 96 C230 96 240 80 290 80" stroke="var(--accent)" stroke-width="2" fill="none" class="flow"/>
<path d="M160 126 C230 126 240 150 290 150" stroke="var(--warn)" stroke-width="2" fill="none" class="flow"/>
<rect x="480" y="40" width="38" height="32" rx="5" fill="var(--good)"/><rect x="525" y="40" width="38" height="32" rx="5" fill="var(--good)"/><rect x="570" y="40" width="38" height="32" rx="5" fill="var(--good)"/><rect x="480" y="80" width="38" height="32" rx="5" fill="var(--good)"/><rect x="525" y="80" width="38" height="32" rx="5" fill="var(--good)"/><rect x="570" y="80" width="38" height="32" rx="5" fill="var(--good)"/>
<text x="547" y="30" text-anchor="middle">data blocks</text>
<path d="M420 75 H480" stroke="var(--good)" stroke-width="2" class="flow"/>
<path d="M420 150 C450 150 440 60 380 60" stroke="var(--warn)" stroke-width="1.5" fill="none" stroke-dasharray="3 4"/>
</g></svg>
<figcaption>Two names (hard links) point at inode 42. A symlink is its own tiny inode containing a <i>path</i>. Delete <code>report.txt</code> and <code>backup.txt</code> still works, but <code>link.txt</code> dangles.</figcaption>
</figure>

```choice
? You delete a 50 GB log file but disk usage doesn't drop. Most likely reason?
- [x] A running process still has the file open; the inode lives until it closes // Classic: restart or truncate via the process.
- [ ] Linux needs a reboot to free space
- [ ] The file was a hard link to /dev/null
> `lsof | grep deleted` finds these. The name is gone; the inode isn't.
```

## Durability: the fsync story

`write()` usually only copies data into the **page cache** (RAM). It reaches the disk later. If power fails first, it's gone. **`fsync(fd)`** forces the file's data to stable storage. Databases live and die by this — and so does crash-consistency research (e.g. the 2018 "fsyncgate" discovery that PostgreSQL mishandled fsync errors on Linux).

| strategy | idea | used by |
|---|---|---|
| **Journaling** | write intent to a log first, then apply | ext4, XFS |
| **Copy-on-write** | never overwrite; write new blocks, flip a pointer | Btrfs, ZFS (cheap snapshots, checksums) |
| **Write-ahead log (WAL)** | same idea inside an application | PostgreSQL, SQLite, Kafka |

```viz pagecache
> Write a few blocks, pull the plug, and see what survives. Then try it again with fsync.
```

```steps Why "write then rename" is the safe way to update a config file
Goal: never leave a half-written file after a crash.
---
Write the new content to `config.tmp`.
---
`fsync` the temp file so its data is durable.
---
`rename("config.tmp", "config")` — rename is **atomic** within a filesystem: readers see old or new, never half.
---
`fsync` the directory so the rename itself is durable.
```

```viz lsm
> The copy-on-write and log-structured ideas show up again in databases. Here's an LSM tree taking writes.
```

```answer
? What is the name of the on-disk structure holding a file's metadata and block locations (but not its name)?
= inode
= an inode
> Names live in directories; everything else in the inode.
```

```recall Durability
? Inodes, links and how data really reaches the disk.
An inode holds a file's metadata and block map; names point to it. A hard link is a second name for an inode; a symlink is a file holding a path. Writes land in the page cache first, and fsync forces them to stable storage.
```

```cards
Inode :: A file's metadata + block map; names point to it.
Hard link vs symlink :: Second name for an inode vs a file holding a path.
fsync :: Force data from page cache to stable storage.
Journaling :: Log intent first, then apply — crash safe.
Copy-on-write FS :: Never overwrite in place; snapshots are nearly free.
NVMe :: SSD protocol over PCIe with many deep parallel queues.
