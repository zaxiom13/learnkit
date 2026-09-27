---
title: Linear algebra is everywhere
blurb: Eigenvalues, SVD, spectral theorems — the single most useful piece of maths across physics, ML and finance.
section: Workhorses
---

| idea | meaning | where |
|---|---|---|
| **Eigen-decomposition** | directions a map only stretches | normal modes, QM energy levels, PageRank, Markov chain stationary states |
| **Spectral theorem** | Hermitian/symmetric ⇒ real eigenvalues, orthogonal eigenvectors | observables in QM, covariance matrices |
| **SVD** A = UΣVᵀ | any matrix = rotate, scale, rotate | PCA, recommender systems, compression, low-rank LLM fine-tuning (LoRA) |
| **Least squares** | best fit when over-determined | regression, calibration |
| **Condition number** | how much errors amplify | numerical stability |
| **Tensor** | multilinear map | GR, stress, deep learning ("tensors" = n-d arrays there) |

```steps PCA on stock returns
You have daily returns of 500 stocks. Covariance matrix: 500 × 500, symmetric.
---
Diagonalise it. Eigenvectors = portfolios whose returns are uncorrelated.
---
The top eigenvector is usually "the market" — every stock moves together.
---
Next ones often look like sectors (tech vs energy) or styles.
---
Random matrix theory (Marchenko–Pastur) tells you which eigenvalues are just noise — a physics tool used in risk management.
```

```choice
? PageRank finds page importance as…
- [x] the dominant eigenvector of the web's link (Markov) matrix // The stationary distribution of a random surfer.
- [ ] the determinant of the link matrix
- [ ] the number of words on each page
```

```answer
? A 3×3 rotation matrix has determinant equal to what?
= 1
```

```reflect
? Explain what SVD does geometrically and one practical use.
- any linear map = rotation, axis-aligned scaling, rotation
- singular values rank importance
- truncation gives best low-rank approximation (Eckart–Young) → compression/PCA/denoising
model: SVD says every matrix acts as a rotation, then stretching along perpendicular axes by the singular values, then another rotation. Keeping only the largest singular values gives the best low-rank approximation, which is how PCA, image compression and recommender systems squeeze out the signal and drop noise.
```

```cards
Eigenvector :: Direction a linear map only scales.
SVD :: A = UΣVᵀ; works for any matrix.
PCA :: Eigenvectors of the covariance matrix.
Condition number :: Error amplification factor.
Marchenko–Pastur :: Eigenvalue distribution of pure-noise covariance matrices.
