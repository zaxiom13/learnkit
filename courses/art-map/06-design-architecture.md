---
title: Architecture and design
blurb: From columns to brutalism to UI design — how built and designed things communicate.
section: Making
---

| style | features | examples |
|---|---|---|
| **Classical** | columns (Doric, Ionic, Corinthian), symmetry | Parthenon, Pantheon |
| **Gothic** | pointed arches, ribbed vaults, flying buttresses → huge windows | Chartres, Cologne |
| **Renaissance / Baroque** | domes, proportion; then drama and curves | St Peter's, Florence Duomo |
| **Modernism** | "form follows function" (Sullivan), "less is more" (Mies), steel, glass, no ornament | Le Corbusier, Mies van der Rohe, Bauhaus |
| **Brutalism** | raw concrete, monumental | Barbican (London) |
| **Postmodernism** | irony, colour, historical quotation | Venturi ("less is a bore"), Philip Johnson |
| **Deconstructivism / parametric** | fragmented, computer-designed curves | Gehry (Bilbao), Zaha Hadid |
| **Sustainable** | passive design, timber, green roofs | mass-timber towers |

**Sydney Opera House** (Jørn Utzon, opened 1973; UNESCO World Heritage 2007): its shells were only buildable once the team worked out they could all be cut from a single sphere — an early triumph of geometry and computing in architecture.

<figure class="diagram">
<svg viewBox="0 0 640 220">
<g transform="translate(20 20)" fill="none" stroke="var(--accent)" stroke-width="2.5">
<path d="M0 180 V70 A60 60 0 0 1 120 70 V180" class="draw"/><text x="60" y="200" text-anchor="middle" font-size="11" stroke="none" style="fill:var(--text)">Roman round arch</text>
</g>
<g transform="translate(180 20)" fill="none" stroke="var(--coral)" stroke-width="2.5">
<path d="M0 180 V80 Q0 10 60 0 Q120 10 120 80 V180" class="draw"/><path d="M130 180 L170 60 M150 120 L120 110" stroke="var(--coral)" class="draw"/><text x="75" y="200" text-anchor="middle" font-size="11" stroke="none" style="fill:var(--text)">Gothic pointed arch + flying buttress</text>
</g>
<g transform="translate(390 40)"><path d="M0 140 C40 20 100 -10 120 40 C140 -10 200 10 230 140Z" fill="color-mix(in srgb, var(--good) 20%, transparent)" stroke="var(--good)" stroke-width="2.5" class="draw"/><path d="M40 140 C80 50 120 30 140 70" fill="none" stroke="var(--good)" stroke-width="2"/><text x="115" y="180" text-anchor="middle" font-size="11">Utzon's shells: pieces of one sphere</text></g>
</svg>
<figcaption>Structure drives style. Pointed arches push thrust downward, buttresses carry it outside, and the walls can become glass. The Opera House's sails are all cut from a single sphere, so their panels could be mass-produced.</figcaption>
</figure>

## Design principles (graphic, product, UI)

- **Hierarchy**, **contrast**, **alignment**, **repetition**, **proximity** (the CRAP principles).
- **Typography**: serif vs sans-serif; Swiss/International style (Helvetica, grids).
- **Dieter Rams' "good design"**: innovative, useful, aesthetic, understandable, unobtrusive, honest, long-lasting, thorough, environmentally friendly, as little design as possible.
- **UX**: affordances (Don Norman), Fitts' law (bigger, closer targets are faster to hit), Hick's law (more choices, slower decisions).

```viz timeline
-447 | Parthenon | 447–432 BCE | Doric order, optical refinements
126 | Pantheon | ~126 CE | unreinforced concrete dome, still the largest of its kind
537 | Hagia Sophia | 537 | a dome that seems to float on light
1163 | Notre-Dame de Paris | 1163 → | Gothic ribs and buttresses
1436 | Florence Duomo | 1436 | Brunelleschi's double-shell dome
1889 | Eiffel Tower | 1889 | iron as architecture
1929 | Barcelona Pavilion | 1929 | Mies: "less is more"
1931 | Empire State Building | 1931 |
1973 | Sydney Opera House | 1973 | Utzon; UNESCO World Heritage 2007
1997 | Guggenheim Bilbao | 1997 | Gehry; computer-designed curves
2010 | Burj Khalifa | 2010 | 828 m
> Buildings that changed what buildings could be.
```

```choice
? How were the Sydney Opera House's shell geometries made buildable?
- [x] Every shell was derived from the surface of one common sphere, so panels could be standardised // The "spherical solution".
- [ ] They were 3D-printed
- [ ] They're inflatable
```

```answer
? Who said "less is more"? (surname)
= Mies van der Rohe
= Mies
= van der Rohe
```

```reflect
? Pick an app you use and critique its design with two principles from this lesson.
- names specific principles (hierarchy, Fitts, Hick, affordance…)
- concrete observation
- concrete improvement
model: In a banking app, the "Pay" button has strong hierarchy — large, high-contrast, bottom-right under the thumb (good Fitts' law). But the settings menu lists 25 options in one flat list, slowing decisions (Hick's law); grouping them into five sections would help.
```

```recall Design principles
? Three ideas that connect buildings, products and screens.
Form follows function. An affordance is what an object signals it can do. Fitts' law says the time to hit a target grows with distance and shrinks with size.
> Sullivan's motto, Norman's affordances and Fitts' law cover a surprising share of UI critique.
```

```cards
Form follows function :: Sullivan's modernist motto.
Flying buttress :: External support enabling Gothic windows.
Brutalism :: Raw concrete monumental style.
Fitts' law :: Time to hit a target grows with distance, shrinks with size.
Affordance :: What an object signals it can do.
Utzon :: Architect of the Sydney Opera House.
