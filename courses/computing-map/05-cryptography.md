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

<figure class="diagram">
<svg viewBox="0 0 640 220">
<g font-size="12">
<text x="100" y="18" text-anchor="middle" font-weight="700">Alice</text><text x="540" y="18" text-anchor="middle" font-weight="700">Bob</text>
<circle cx="100" cy="50" r="22" fill="#f2c94c"/><text x="100" y="86" text-anchor="middle" font-size="10.5">public colour (everyone sees)</text>
<circle cx="540" cy="50" r="22" fill="#f2c94c"/>
<circle cx="60" cy="120" r="18" fill="#e0442f"/><text x="60" y="150" text-anchor="middle" font-size="10.5">secret a</text>
<circle cx="580" cy="120" r="18" fill="#3f4cf5"/><text x="580" y="150" text-anchor="middle" font-size="10.5">secret b</text>
<circle cx="190" cy="120" r="20" fill="#f07b3a"/><text x="190" y="152" text-anchor="middle" font-size="10.5">mix → send</text>
<circle cx="450" cy="120" r="20" fill="#8fb36b"/><text x="450" y="152" text-anchor="middle" font-size="10.5">mix → send</text>
<path d="M210 112 C300 70 350 70 430 112" stroke="#f07b3a" stroke-width="3" fill="none" class="flow"/>
<path d="M430 128 C350 170 300 170 210 128" stroke="#8fb36b" stroke-width="3" fill="none" class="flow"/>
<text x="320" y="92" text-anchor="middle" font-size="10.5" opacity="0.8">eavesdropper sees both mixes…</text>
<circle cx="190" cy="195" r="18" fill="#8a6a4a" class="pulse"/><circle cx="450" cy="195" r="18" fill="#8a6a4a" class="pulse"/>
<text x="320" y="200" text-anchor="middle" font-size="11.5" font-weight="700">…but only Alice and Bob can make the shared colour</text>
</g></svg>
<figcaption>Diffie–Hellman as paint. Mixing is easy, un-mixing is hard. With numbers, "mixing" is modular exponentiation and "un-mixing" is the discrete-log problem.</figcaption>
</figure>

## TLS in one breath

Client and server do an **ECDH key exchange**; the server **signs** it with the key in its **certificate** (vouched for by a certificate authority), proving identity; both derive symmetric keys and talk with **AES-GCM or ChaCha20**. Public-key crypto for setup, symmetric for bulk.

```viz avalanche
> A good hash is a one-way blender. Edit either message by a single character and about 128 of the 256 output bits flip.
```

## Quantum

**Shor's algorithm** would break RSA and elliptic curves on a large fault-tolerant quantum computer. **Grover's** only halves effective symmetric key length (AES-256 stays fine). NIST standardised **post-quantum** schemes in 2024: **ML-KEM (Kyber)** and **ML-DSA (Dilithium)**, lattice-based. "Harvest now, decrypt later" is why migration is already happening.

```viz timeline
-50 | Caesar cipher | ~50 BCE | shift each letter by 3
1553 | Vigenère cipher | 1553 | "le chiffre indéchiffrable", broken in the 1800s
1943 | Colossus vs Lorenz; Bombe vs Enigma | 1940s | Bletchley Park; Turing
1949 | Shannon: secrecy theory | 1949 | one-time pad proven perfect
1976 | Diffie–Hellman | 1976 | public-key exchange
1977 | RSA | 1977 | Rivest, Shamir, Adleman
1994 | Shor's algorithm | 1994 | quantum factoring on paper
2001 | AES | 2001 | Rijndael (Belgian) becomes the standard
2008 | Bitcoin whitepaper | 2008 | hashes + signatures + consensus
2018 | TLS 1.3 | 2018 | faster, forward-secret handshakes only
2024 | NIST post-quantum standards | 2024 | ML-KEM, ML-DSA
> Two thousand years of hiding messages.
```

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

```recall The toolbox
? What each core cryptographic tool gives you.
AES encrypts with a shared secret key. Diffie-Hellman agrees a shared secret over a public channel. A digital signature proves who signed and that the data wasn't changed. A certificate binds a public key to an identity, signed by a certificate authority.
```

```cards
AES :: The standard symmetric block cipher.
Diffie–Hellman :: Agree a shared secret over a public channel.
Digital signature :: Proves who signed and that data wasn't changed.
Certificate :: Public key + identity, signed by a CA.
Shor's algorithm :: Quantum factoring — breaks RSA/ECC.
ML-KEM (Kyber) :: NIST post-quantum key encapsulation (lattices).
