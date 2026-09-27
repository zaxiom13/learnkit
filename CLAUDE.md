# LearnKit

Static Svelte 5 + Vite app. Courses live in `courses/<slug>/` as Markdown — the app finds them automatically.

## When asked to create a course (any subject, or interview prep)

1. Read `AUTHORING.md` — the block syntax and the teaching style are both required.
2. Create `courses/<slug>/course.md` (title, blurb, emoji icon, hex colour) and 4–8 lessons `NN-name.md`.
3. Follow the rhythm: short explanation → a visual (`viz` block or animated SVG `diagram`) → `steps` worked example → `answer`/`choice`/`order` practice → one `reflect` → `cards` at the end. Aim for 2+ visuals per lesson.
4. Run `npm test` and fix anything it reports. Then `npm run build` to be sure it bundles.
5. Commit, and push if a remote is configured. Netlify redeploys on push when connected.

Keep content accurate — double-check every number in `answer` blocks.
