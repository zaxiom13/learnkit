---
title: Cryptography
blurb: Hashes, symmetric and public-key crypto, signatures, TLS, and what quantum computers change.
section: Security
---

## The toolbox

| primitive | does | names |
|---|---|---|
| **Hash** | fingerprint; one-way | SHA-256, SHA-3, BLAKE3 |
| **Symmetric cipher** | encrypt with a shared key; fast | **AES**, ChaCha20 |
| **AEAD** | encrypt + tamper-proof in one | AES-GCM, ChaCha20-Poly1305 |
| **Key exchange** | agree a secret over an open channel | Diffie–Hellman, ECDH (X25519) |
| **Public-key encryption / signatures** | anyone can verify; only key-holder signs | RSA, ECDSA, Ed25519 |
| **MAC** | tamper-check with a shared key | HMAC |
| **Password hashing** | deliberately slow | Argon2, bcrypt, scrypt |
| **KDF** | stretch/derive keys | HKDF |

Hard problems underneath: **factoring** (RSA), **discrete logarithm** (DH, elliptic curves), **lattice problems** (post-quantum).

## TLS in one breath

Client and server do an **ECDH key exchange**; the server **signs** it with the key in its **certificate** (vouched for by a certificate authority), proving identity; both derive symmetric keys and talk with **AES-GCM or ChaCha20**. Public-key crypto for setup, symmetric for bulk.

## Quantum

**Shor's algorithm** would break RSA and elliptic curves on a large fault-tolerant quantum computer. **Grover's** only halves effective symmetric key length (AES-256 stays fine). NIST standardised **post-quantum** schemes in 2024: **ML-KEM (Kyber)** and **ML-DSA (Dilithium)**, lattice-based. "Harvest now, decrypt later" is why migration is already happening.

```choice
? Why doesn't TLS just use RSA to encrypt all the data?
- [x] Public-key crypto is far slower; it's used to set up a shared key for fast symmetric encryption // Hybrid design.
- [ ] RSA isn't secure
- [ ] Browsers don't support RSA
> Asymmetric for the handshake, symmetric for the stream.
```

```choice
? Which is threatened most by a large quantum computer?
- [x] RSA and elliptic-curve crypto (via Shor) // Exponential speed-up on factoring/discrete log.
- [ ] AES-256 // Grover gives only a square-root speed-up.
- [ ] SHA-256 hashing
> That's why post-quantum migration targets key exchange and signatures first.
```

```answer
? Grover's algorithm gives a square-root speed-up. AES-128 then offers roughly how many bits of security?
= 64
```

```reflect
? Explain the difference between encryption and hashing, and why passwords are hashed (slowly).
- encryption is reversible with a key; hashing is one-way
- stored password hashes shouldn't reveal passwords if leaked
- slow + salted hashes make brute force expensive
model: Encryption is reversible if you have the key; hashing is one-way. Servers store salted password hashes so a database leak doesn't reveal passwords. They use deliberately slow, memory-hard hashes like Argon2 so attackers can't try billions of guesses per second.
```

```cards
AES :: The standard symmetric block cipher.
Diffie–Hellman :: Agree a shared secret over a public channel.
Digital signature :: Proves who signed and that data wasn't changed.
Certificate :: Public key + identity, signed by a CA.
Shor's algorithm :: Quantum factoring — breaks RSA/ECC.
ML-KEM (Kyber) :: NIST post-quantum key encapsulation (lattices).
