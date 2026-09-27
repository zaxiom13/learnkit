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

```viz matrix
> A matrix is a machine that moves space. Drag the entries and watch the circle become an ellipse, with eigenvectors in red. Try the presets.
```

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

<figure class="diagram">
<svg viewBox="0 0 640 220"><circle cx="317" cy="103" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="280" cy="117" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="385" cy="82" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="451" cy="83" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="335" cy="117" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="263" cy="132" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="331" cy="99" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="329" cy="69" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="408" cy="109" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="344" cy="113" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="263" cy="106" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="329" cy="140" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="348" cy="106" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="243" cy="151" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="272" cy="126" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="286" cy="120" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="471" cy="75" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="262" cy="133" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="413" cy="92" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="447" cy="91" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="242" cy="136" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="262" cy="139" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="345" cy="90" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="332" cy="111" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="417" cy="72" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="286" cy="100" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="249" cy="130" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="371" cy="94" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="271" cy="120" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="287" cy="131" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="224" cy="119" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="262" cy="109" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="353" cy="104" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="367" cy="90" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="349" cy="124" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="313" cy="97" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="344" cy="85" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="428" cy="68" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="492" cy="80" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="336" cy="148" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="381" cy="89" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="454" cy="73" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="148" cy="144" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="234" cy="159" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="298" cy="106" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="279" cy="120" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="153" cy="135" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="313" cy="110" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="363" cy="93" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="348" cy="117" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="305" cy="107" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="401" cy="86" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="322" cy="103" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="361" cy="93" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="308" cy="123" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="402" cy="78" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="275" cy="66" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="376" cy="77" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="345" cy="119" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="408" cy="83" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="310" cy="96" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="395" cy="82" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="293" cy="83" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="378" cy="109" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="375" cy="89" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="313" cy="101" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="311" cy="79" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="332" cy="102" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="416" cy="88" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="398" cy="86" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="422" cy="91" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="374" cy="120" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="286" cy="121" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="331" cy="73" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="479" cy="81" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="245" cy="113" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="372" cy="116" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="372" cy="112" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="271" cy="147" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="270" cy="88" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="350" cy="102" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="518" cy="54" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="312" cy="117" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="356" cy="103" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="435" cy="78" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="360" cy="93" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="268" cy="144" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="347" cy="140" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="320" cy="109" r="3.5" fill="var(--accent)" opacity="0.6"/><circle cx="332" cy="107" r="3.5" fill="var(--accent)" opacity="0.6"/><line x1="130" y1="219" x2="510" y2="1" stroke="var(--coral)" stroke-width="3" class="draw"/><line x1="290" y1="60" x2="350" y2="160" stroke="var(--good)" stroke-width="3" class="draw"/><text x="515" y="18" font-size="12" style="fill:var(--coral)">PC1: "the market" (most variance)</text><text x="355" y="175" font-size="12" style="fill:var(--good)">PC2</text><text x="10" y="210" font-size="11" opacity="0.7">each dot = one day: (stock A return, stock B return)</text></svg>
<figcaption>PCA finds the axes of the data cloud: the eigenvectors of its covariance matrix. Project onto PC1 and you keep most of the information in one number.</figcaption>
</figure>

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
