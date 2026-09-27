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

## Under the hood

- **B-tree** indexes: balanced trees; great for reads and ranges (Postgres, most SQL).
- **LSM-tree**: buffer writes in memory, flush sorted files, merge later; great for write-heavy loads (RocksDB, Cassandra).
- **Row vs column storage**: rows for "fetch one order", columns for "average price over a year".

## Transactions: ACID

**Atomic** (all or nothing), **Consistent** (rules hold), **Isolated** (concurrent transactions don't see each other's half-work), **Durable** (committed = survives a crash; that's the WAL + fsync from the Linux course).

Isolation levels trade safety for speed: *read committed* → *repeatable read* → *serializable*. Anomalies to name: **dirty read**, **non-repeatable read**, **phantom**, **write skew**.

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

```cards
OLTP vs OLAP :: Many small transactions vs big analytical queries.
B-tree :: Balanced sorted tree; the default index.
LSM-tree :: Write-optimised: memtable + sorted files + compaction.
ACID :: Atomic, Consistent, Isolated, Durable.
kdb+/q :: Columnar time-series DB + array language used across trading.
Write skew :: Two transactions each read, then write disjoint rows, jointly breaking a rule.
