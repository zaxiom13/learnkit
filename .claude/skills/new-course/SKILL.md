---
name: new-course
description: Create a new LearnKit course (Khan-style follow-along lessons with quizzes, worked examples, flashcards and reflection) on any subject or for interview preparation.
---

1. Read AUTHORING.md and CLAUDE.md in this repository.
2. Ask (or infer) the subject, the learner's level and the goal (e.g. "pass a system design interview", "understand photosynthesis").
3. Write courses/<slug>/course.md and 4–8 lesson files following the teaching rhythm in AUTHORING.md.
4. Run `npm test` and `npm run build`; fix every failure.
5. Commit with a message naming the course, and push.
