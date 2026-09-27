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

## The teaching style (Khan-style follow-along)

1. **One idea per lesson**, 5–10 minutes. Title it with the idea.
2. **Explain → worked example → try it → feedback**, repeated. Never more than ~3 paragraphs without something to do.
3. **Worked examples before questions.** Use `steps` to show the full reasoning once, then ask a similar question with `answer`.
4. **Questions that teach.** Wrong options should be tempting mistakes, with a `//` note explaining why.
5. **Explain it back** at least once per lesson (`reflect`) — retrieval beats rereading.
6. **End with `cards`** for the 3–6 facts worth remembering.
7. For **interview prep**: include realistic prompts, a framework, and model answers spoken the way a strong candidate would.

Run `npm test` — it checks every course parses and every accepted answer is actually accepted.
