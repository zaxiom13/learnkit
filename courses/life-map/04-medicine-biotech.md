---
title: Medicine and biotech
blurb: Germ theory to mRNA vaccines, CRISPR, clinical trials and the evidence hierarchy.
section: Applied
---

```order
? Chronological order.
1. Jenner's smallpox vaccination
2. Germ theory (Pasteur, Koch)
3. Penicillin discovered (Fleming)
4. DNA double helix (Watson, Crick, Franklin, Wilkins)
5. Smallpox eradicated
6. Human Genome Project completed
7. CRISPR gene editing demonstrated
8. mRNA COVID-19 vaccines approved
> 1796 → 1860s–80s → 1928 → 1953 → 1980 → 2003 → 2012 → 2020.
```

| technology | what it does |
|---|---|
| **Vaccines** | train the immune system; **mRNA** vaccines deliver instructions to make an antigen (Karikó & Weissman, Nobel 2023) |
| **Antibiotics** | kill bacteria; **resistance** is evolution in action |
| **Monoclonal antibodies** | engineered targeting proteins (cancer, autoimmune) |
| **CRISPR-Cas9** | programmable DNA cutting (Doudna & Charpentier, Nobel 2020); first approved CRISPR therapy for sickle-cell (2023) |
| **Sequencing** | human genome cost fell from ~$3 billion to a few hundred dollars — faster than Moore's law |
| **Imaging** | X-ray, CT, **MRI** (nuclear magnetic resonance — pure physics), PET |
| **GLP-1 drugs** | semaglutide etc. — diabetes and obesity |

```viz bars log=1 unit=" $" title="Sequencing got cheap"
Human Genome Project (2003) | 2700000000 | ~$2.7 billion for the first genome
2007 | 10000000
2010 | 50000
2015 | 1500
2020 | 700
2024 | 300 | a few hundred dollars now
> Cost to sequence a human genome (US$, log scale). It fell faster than Moore's law after 2008.
```

## How we know a treatment works

The **evidence hierarchy**: anecdote → case series → observational studies (confounding!) → **randomised controlled trials** (blinded, placebo) → **systematic reviews / meta-analyses**. Watch for: confounding, p-hacking, publication bias, relative vs absolute risk, surrogate endpoints.

**Australian angle**: Howard Florey (Australian) led development of penicillin into a drug (Nobel 1945); Barry Marshall & Robin Warren showed *H. pylori* causes ulcers (Marshall drank it; Nobel 2005); Ian Frazer co-developed the HPV vaccine; the bionic ear (cochlear implant) — Graeme Clark.

```viz bayes
> Why screening tests confuse doctors and patients: base rates. The same maths as the number needed to treat.
```

```choice
? A drug cuts heart-attack risk from 2% to 1%. Which statement is accurate?
- [x] 50% relative reduction, 1 percentage-point absolute reduction; treat ~100 people to prevent one // Number needed to treat = 100.
- [ ] It prevents 50% of all heart attacks in everyone
- [ ] Absolute and relative risk are the same thing here
```

<figure class="diagram">
<svg viewBox="0 0 640 170">
<g font-size="12">
<rect x="20" y="40" width="130" height="70" rx="12" fill="var(--accent)"/><text x="85" y="72" text-anchor="middle" style="fill:#fff" font-weight="700">guide RNA</text><text x="85" y="90" text-anchor="middle" style="fill:#fff" font-size="10.5">"find GAGGAG…"</text>
<path d="M150 75 H220" stroke="var(--accent)" stroke-width="3" class="flow"/>
<rect x="220" y="55" width="400" height="40" rx="6" fill="var(--surface-2)"/>
<text x="235" y="81" font-family="var(--font-code)" style="fill:var(--text)">A</text><text x="251" y="81" font-family="var(--font-code)" style="fill:var(--text)">T</text><text x="267" y="81" font-family="var(--font-code)" style="fill:var(--text)">G</text><text x="283" y="81" font-family="var(--font-code)" style="fill:var(--text)">G</text><text x="299" y="81" font-family="var(--font-code)" style="fill:var(--text)">T</text><text x="315" y="81" font-family="var(--font-code)" style="fill:var(--text)">G</text><text x="331" y="81" font-family="var(--font-code)" style="fill:var(--text)">C</text><text x="347" y="81" font-family="var(--font-code)" style="fill:var(--text)">A</text><text x="363" y="81" font-family="var(--font-code)" style="fill:var(--coral)">G</text><text x="379" y="81" font-family="var(--font-code)" style="fill:var(--coral)">A</text><text x="395" y="81" font-family="var(--font-code)" style="fill:var(--coral)">G</text><text x="411" y="81" font-family="var(--font-code)" style="fill:var(--coral)">G</text><text x="427" y="81" font-family="var(--font-code)" style="fill:var(--coral)">A</text><text x="443" y="81" font-family="var(--font-code)" style="fill:var(--coral)">G</text><text x="459" y="81" font-family="var(--font-code)" style="fill:var(--text)">A</text><text x="475" y="81" font-family="var(--font-code)" style="fill:var(--text)">A</text><text x="491" y="81" font-family="var(--font-code)" style="fill:var(--text)">G</text><text x="507" y="81" font-family="var(--font-code)" style="fill:var(--text)">T</text><text x="523" y="81" font-family="var(--font-code)" style="fill:var(--text)">C</text><text x="539" y="81" font-family="var(--font-code)" style="fill:var(--text)">T</text><text x="555" y="81" font-family="var(--font-code)" style="fill:var(--text)">G</text><text x="571" y="81" font-family="var(--font-code)" style="fill:var(--text)">C</text><text x="587" y="81" font-family="var(--font-code)" style="fill:var(--text)">C</text><text x="603" y="81" font-family="var(--font-code)" style="fill:var(--text)">G</text><text x="619" y="81" font-family="var(--font-code)" style="fill:var(--text)">T</text><text x="635" y="81" font-family="var(--font-code)" style="fill:var(--text)">T</text><text x="651" y="81" font-family="var(--font-code)" style="fill:var(--text)">A</text><text x="667" y="81" font-family="var(--font-code)" style="fill:var(--text)">C</text>
<g class="bob"><path d="M372 40 L380 110 M388 40 L380 110" stroke="var(--bad)" stroke-width="3"/><text x="380" y="130" text-anchor="middle" font-size="11" style="fill:var(--bad)">Cas9 cuts</text></g>
<text x="320" y="160" text-anchor="middle" font-size="11.5">the cell repairs the cut → knock a gene out, or paste in a corrected template</text>
</g></svg>
<figcaption>CRISPR-Cas9: a programmable search-and-cut tool. The guide RNA is the search query and Cas9 is the scissors.</figcaption>
</figure>

```answer
? Number needed to treat = 1 / absolute risk reduction. If risk falls from 10% to 6%, what is the NNT?
= 25
```

```reflect
? Why are randomised controlled trials so much stronger than observational studies?
- randomisation balances confounders, known and unknown
- blinding removes placebo/observer bias
- causal rather than correlational conclusions
model: In observational data, people who take a treatment differ from those who don't in countless ways — age, health, wealth — that also affect outcomes. Randomisation balances all of these on average, even unknown ones, and blinding removes expectation effects, so a difference in outcomes can be attributed to the treatment itself.
```

```cards
mRNA vaccine :: Delivers instructions to make an antigen.
CRISPR-Cas9 :: Programmable gene editing.
RCT :: Randomised controlled trial — gold standard.
Confounding :: Hidden variable causing both exposure and outcome.
NNT :: Number needed to treat = 1/ARR.
Florey :: Australian who turned penicillin into a medicine.
