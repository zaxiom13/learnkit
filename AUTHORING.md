# Authoring LearnKit courses

A course is a folder in `courses/`. Each lesson is one Markdown file. Interactive pieces are fenced code blocks.

```
courses/
  my-course/
    course.md            ← front matter: title, blurb, icon (an emoji), color (hex)
    01-first-lesson.md   ← lessons run in file-name order
    02-next-lesson.md
```

## Lesson file

```markdown
---
title: Short, concrete title
blurb: One sentence promise — what you'll be able to do.
section: Optional group name shown in the course outline
minutes: 6          (optional; estimated automatically)
---

Plain Markdown prose: headings (##), lists, tables, **bold**, `code`, > callouts.
```

## The blocks

### `choice` — multiple choice (one or several correct)

````markdown
```choice
? The question (Markdown allowed)
- [ ] A wrong option // optional note shown after checking
- [x] The right option // why it's right
- [ ] Another wrong option
> Explanation shown when they get it right.
```
````

Mark several `[x]` for "choose all that apply".

### `answer` — typed answer

````markdown
```answer
? What is 7 × 8?
= 56
hint: Shown after a wrong attempt.
tolerance: 0.5           (optional, for numbers)
placeholder: e.g. 42     (optional)
> Explanation.
```
````

- Several `=` lines are all accepted. Case, extra spaces and a trailing full stop are ignored.
- Numbers match by value, so `= 1/2` also accepts `0.5` and `50%`.
- `= /regex/i` accepts anything the regular expression matches.

### `steps` — worked example, revealed one step at a time

````markdown
```steps Optional title
The problem.
---
Step one.
---
Step two — the answer.
```
````

### `cards` — flashcards (missed cards come back until known)

````markdown
```cards
Front :: Back
Term :: Definition
```
````

### `order` — put things in order (write them in the correct order; they're shuffled)

````markdown
```order
? Put these in order.
1. First
2. Second
3. Third
> Explanation.
```
````

### `reflect` — explain it back, then self-check

````markdown
```reflect
? Explain X in your own words.
- rubric point one
- rubric point two
model: A model answer they can compare against.
```
````

### `reveal` — hidden content behind a button

````markdown
```reveal Show the answer
Anything in Markdown.
```
````

### `viz` — an interactive visualisation

````markdown
```viz name key=value title="Optional title"
data lines (for data-driven visualisations)
> Caption shown under it (Markdown allowed).
```
````

The widgets live in `src/ui/viz/` (one Svelte file each; the list of valid names is `VIZ` in `src/lib/parse.ts`).

- **Data-driven** (reusable anywhere):
  - `timeline`: lines `value | label | shown date | detail`. `log=1` means values are "years ago", on a log scale. Has play and quiz modes.
  - `bars`: lines `label | value | note`, with options `log=1`, `unit=`, `sort=1`.
  - `stack`: lines `layer | what it does`, top to bottom. `packet="read()"` animates a request down and back up.
  - `tree`: lines `. Name | note`; the number of leading dots is the depth.
  - `pipes`: lines `command | sample;output;lines`.
  - `softmax`: lines `label | score`, with option `t=`.
- **Simulations**: `syscall cgroup jitter ringbuffer latency numa falsesharing pagecache lsm quorum hashring avalanche sort bigo gradient attention pathintegral bell ising waves spacetime lightcone orbit bands spectrum lorenz logistic brownian bayes matrix diagonal montecarlo fourier orderbook option kelly backtest compound evolution neuron codon population boids harmonics colorwheel perspective tiling condorcet gametheory`.

### Hand-drawn diagrams

Inline SVG works in lesson Markdown. Wrap it in a figure with **no blank lines inside**:

```html
<figure class="diagram">
<svg viewBox="0 0 640 200"> … </svg>
<figcaption>What to notice.</figcaption>
</figure>
```

Use theme colours (`var(--accent)`, `var(--coral)`, `var(--good)`, `var(--warn)`, `var(--text)`, `var(--surface-2)`, `var(--line-strong)`) so diagrams work in light and dark mode. Animation classes: `flow` (marching dashes along a path), `pulse`, `spin`, `bob`, `blink`, `draw` (the line draws itself). SMIL (`<animateMotion>`) also works. All motion stops for people who prefer reduced motion.

## The teaching style (Khan-style follow-along)

1. **One idea per lesson**, 5–10 minutes. Title it with the idea.
2. **Explain → worked example → try it → feedback**, repeated. Never more than ~3 paragraphs without something to do.
3. **Worked examples before questions.** Use `steps` to show the full reasoning once, then ask a similar question with `answer`.
4. **Questions that teach.** Wrong options should be tempting mistakes, with a `//` note explaining why.
5. **Explain it back** at least once per lesson (`reflect`) — retrieval beats rereading.
6. **Show, don't just tell.** Aim for at least two visuals per lesson: a `viz` to play with, plus a diagram or data chart.
7. **End with `cards`** for the 3–6 facts worth remembering.
8. For **interview prep**: include realistic prompts, a framework, and model answers spoken the way a strong candidate would.

Run `npm test` — it checks every course parses and every accepted answer is actually accepted.
