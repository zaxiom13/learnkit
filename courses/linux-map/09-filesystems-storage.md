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

## Inodes

A file's **name** lives in a directory; the file's **metadata and block map** live in an **inode**. A directory is just a table: *name → inode number*. So:
- A **hard link** = a second name for the same inode.
- A **symlink** = a tiny file containing a path.
- Deleting a file removes a name; the data is freed when the last name *and* last open descriptor are gone. (That's why `df` stays full after deleting a log a process still holds open.)

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

```answer
? What is the name of the on-disk structure holding a file's metadata and block locations (but not its name)?
= inode
= an inode
> Names live in directories; everything else in the inode.
```

```cards
Inode :: A file's metadata + block map; names point to it.
Hard link vs symlink :: Second name for an inode vs a file holding a path.
fsync :: Force data from page cache to stable storage.
Journaling :: Log intent first, then apply — crash safe.
Copy-on-write FS :: Never overwrite in place; snapshots are nearly free.
NVMe :: SSD protocol over PCIe with many deep parallel queues.
