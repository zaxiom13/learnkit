---
title: Databases
blurb: Relational vs the rest, indexes, transactions, isolation levels — and the time-series world of finance.
section: Data
---

## The families

| family | shape | examples | good for |
|---|---|---|---|
| **Relational (SQL)** | tables, joins, transactions | PostgreSQL, MySQL, SQLite, Oracle | most business data |
| **Key-value** | key → blob | Redis, DynamoDB, RocksDB | caching, sessions, huge scale lookups |
| **Document** | JSON-like docs | MongoDB | flexible schemas |
| **Wide-column** | rows with sparse columns | Cassandra, Bigtable | massive write throughput |
| **Graph** | nodes and edges | Neo4j | relationships, fraud rings |
| **Columnar / analytics** | store by column | ClickHouse, DuckDB, Snowflake, BigQuery | aggregations over billions of rows |
| **Time-series** | append-only by time | **kdb+/q**, TimescaleDB, InfluxDB | tick data, metrics |
| **Vector** | embeddings | pgvector, FAISS, Pinecone | semantic search for AI |

<figure class="diagram">
<svg viewBox="0 0 640 200">
<g font-size="12" font-family="var(--font-code)">
<rect x="270" y="10" width="100" height="32" rx="8" fill="var(--accent)"/><text x="320" y="31" text-anchor="middle" style="fill:#fff">40 | 80</text>
<path d="M285 42 L110 80 M320 42 L320 80 M355 42 L530 80" stroke="var(--line-strong)" stroke-width="2"/>
<rect x="50" y="80" width="120" height="32" rx="8" fill="var(--good)"/><text x="110" y="101" text-anchor="middle" style="fill:#fff">10 | 25</text>
<rect x="260" y="80" width="120" height="32" rx="8" fill="var(--good)"/><text x="320" y="101" text-anchor="middle" style="fill:#fff">52 | 67</text>
<rect x="470" y="80" width="120" height="32" rx="8" fill="var(--good)"/><text x="530" y="101" text-anchor="middle" style="fill:#fff">91 | 120</text>
<rect x="12" y="150" width="62" height="28" rx="6" fill="var(--surface-3)"/><text x="43" y="169" text-anchor="middle" font-size="11">3,7</text><rect x="82" y="150" width="62" height="28" rx="6" fill="var(--surface-3)"/><text x="113" y="169" text-anchor="middle" font-size="11">12,19</text><rect x="152" y="150" width="62" height="28" rx="6" fill="var(--surface-3)"/><text x="183" y="169" text-anchor="middle" font-size="11">30,33</text><rect x="222" y="150" width="62" height="28" rx="6" fill="var(--surface-3)"/><text x="253" y="169" text-anchor="middle" font-size="11">45,50</text><rect x="292" y="150" width="62" height="28" rx="6" fill="var(--surface-3)"/><text x="323" y="169" text-anchor="middle" font-size="11">55,60</text><rect x="362" y="150" width="62" height="28" rx="6" fill="var(--surface-3)"/><text x="393" y="169" text-anchor="middle" font-size="11">70,77</text><rect x="432" y="150" width="62" height="28" rx="6" fill="var(--surface-3)"/><text x="463" y="169" text-anchor="middle" font-size="11">85,88</text><rect x="502" y="150" width="62" height="28" rx="6" fill="var(--surface-3)"/><text x="533" y="169" text-anchor="middle" font-size="11">95,99</text><rect x="572" y="150" width="62" height="28" rx="6" fill="var(--surface-3)"/><text x="603" y="169" text-anchor="middle" font-size="11">130</text>
<path d="M320 42 L320 80 M335 112 L373 150" stroke="var(--coral)" stroke-width="3" class="flow" fill="none"/>
<circle r="6" fill="var(--coral)"><animateMotion dur="2.2s" repeatCount="indefinite" path="M320 26 L320 96 L390 164"/></circle>
<text x="620" y="130" text-anchor="end" font-family="var(--font-ui)" font-size="11">find 60: 3 hops, not a scan</text>
</g></svg>
<figcaption>A B-tree index: each node splits the key range, so finding one row in a billion takes a handful of page reads.</figcaption>
</figure>

## Under the hood

- **B-tree** indexes: balanced trees; great for reads and ranges (Postgres, most SQL).
- **LSM-tree**: buffer writes in memory, flush sorted files, merge later; great for write-heavy loads (RocksDB, Cassandra).
- **Row vs column storage**: rows for "fetch one order", columns for "average price over a year".

```viz lsm
> The other design: an LSM tree buffers writes in RAM and flushes sorted files, trading read work for blazing sequential writes.
```

## Transactions: ACID

**Atomic** (all or nothing), **Consistent** (rules hold), **Isolated** (concurrent transactions don't see each other's half-work), **Durable** (committed = survives a crash; that's the WAL + fsync from the Linux course).

Isolation levels trade safety for speed: *read committed* → *repeatable read* → *serializable*. Anomalies to name: **dirty read**, **non-repeatable read**, **phantom**, **write skew**.

```viz bars unit=% log=1 title="Why analytics loves columns"
Row store: read every column of every row | 100 | 1 billion ticks × 10 columns × 8 bytes ≈ 80 GB touched
Column store: read 2 columns | 20 | only time + price ≈ 16 GB
Column store + compression | 4 | similar prices compress ~4–5× ≈ 3–4 GB
Column store + compression + time partition pruning | 0.4 | skip years you didn't ask for
> Illustrative: relative data read (as % of the row-store cost) for "average price per day over 10 years".
```

```choice
? You need the average trade price per stock per day over 10 years of ticks. Which storage layout wins?
- [ ] Row-oriented OLTP database
- [x] Column-oriented store (kdb+, ClickHouse, DuckDB) // Reads only the price and time columns, compressed.
- [ ] Graph database
> Analytics touches few columns across many rows — column stores read only what's needed and compress well.
```

```choice
? Which data structure is better for very write-heavy workloads?
- [ ] B-tree
- [x] LSM-tree // Sequential writes, merge later.
> LSM turns random writes into sequential ones; the cost is background compaction and slightly slower reads.
```

```answer
? In ACID, what does the D stand for?
= Durability
= durable
```

```reflect
? Explain why an index speeds up reads but slows down writes.
- index is a separate sorted structure
- lookups become logarithmic instead of scanning
- every insert/update must also update each index
model: An index is an extra sorted structure (usually a B-tree) pointing into the table, so finding a row takes a few steps instead of scanning everything. But every insert, update or delete must also update each index, so more indexes means slower writes and more storage.
```

```recall ACID
? The four guarantees of a database transaction.
Atomic: all or nothing. Consistent: rules hold before and after. Isolated: concurrent transactions don't see each other's half-finished work. Durable: once committed, it survives a crash.
> Write skew is the classic way weaker isolation levels break the I in ACID.
```

```cards
OLTP vs OLAP :: Many small transactions vs big analytical queries.
B-tree :: Balanced sorted tree; the default index.
LSM-tree :: Write-optimised: memtable + sorted files + compaction.
ACID :: Atomic, Consistent, Isolated, Durable.
kdb+/q :: Columnar time-series DB + array language used across trading.
Write skew :: Two transactions each read, then write disjoint rows, jointly breaking a rule.
