<script lang="ts">
  import { tick } from "svelte";
  import { buildCourses, type Course, type Lesson } from "../lib/parse";
  import { progress } from "../lib/progress.svelte";
  import Choice from "./Choice.svelte";
  import Answer from "./Answer.svelte";
  import Cards from "./Cards.svelte";
  import Steps from "./Steps.svelte";
  import Reflect from "./Reflect.svelte";
  import Order from "./Order.svelte";
  import Recall from "./Recall.svelte";
  import Viz from "./viz/Viz.svelte";

  const files = import.meta.glob("../../courses/*/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
  const courses: Course[] = buildCourses(files);

  let hash = $state(location.hash);
  window.addEventListener("hashchange", () => (hash = location.hash));
  const parts = $derived(hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent));
  const course = $derived(parts[0] === "c" ? courses.find((c) => c.id === parts[1]) : undefined);
  const lesson = $derived<Lesson | undefined>(course?.lessons.find((l) => l.id === parts[2]));
  const go = (p: string) => (location.hash = "#/" + p);

  let theme = $state((() => { try { return localStorage.getItem("learnkit:theme") ?? "system"; } catch { return "system"; } })());
  $effect(() => {
    const el = document.documentElement;
    if (theme === "system") el.removeAttribute("data-theme");
    else el.setAttribute("data-theme", theme);
    try { localStorage.setItem("learnkit:theme", theme); } catch { /* ignore */ }
  });

  const key = (l: Lesson) => `${l.course}/${l.id}`;
  const gradable = (l: Lesson) => l.blocks.filter((b) => b.kind === "choice" || b.kind === "answer" || b.kind === "order" || b.kind === "recall");
  const lessonPct = $derived.by(() => {
    if (!lesson) return 0;
    const g = gradable(lesson);
    if (!g.length) return 100;
    return (100 * g.filter((b) => progress.done((b as { id: string }).id)).length) / g.length;
  });
  const courseDone = (c: Course) => c.lessons.filter((l) => progress.lessonDone(key(l))).length;
  const nextLesson = (c: Course) => c.lessons.find((l) => !progress.lessonDone(key(l))) ?? c.lessons[0];
  const idx = $derived(lesson && course ? course.lessons.indexOf(lesson) : -1);

  let main: HTMLElement;
  $effect(() => {
    void lesson;
    tick().then(() => main?.scrollTo({ top: 0 }));
  });

  function finish() {
    if (!lesson || !course) return;
    progress.finishLesson(key(lesson));
    const next = course.lessons[idx + 1];
    go(next ? `c/${course.id}/${next.id}` : `c/${course.id}`);
  }
</script>

<div class="shell">
  <header class="top">
    <button class="logo" onclick={() => go("")}><span class="mark">◆</span> LearnKit</button>
    {#if lesson}
      <div class="lp" title="Lesson progress"><span style:width="{lessonPct}%"></span></div>
    {/if}
    <div class="stats">
      <span title="Points">⚡ {progress.s.points}</span>
      <span title="Day streak">🔥 {progress.streak}</span>
      <button class="btn ghost sm icon" title="Theme" onclick={() => (theme = theme === "dark" ? "light" : theme === "light" ? "system" : "dark")}>
        {theme === "dark" ? "☾" : theme === "light" ? "☀" : "◐"}
      </button>
    </div>
  </header>

  <main bind:this={main} class="scroll">
    {#if lesson && course}
      <article class="lesson">
        <button class="crumb" onclick={() => go(`c/${course.id}`)}>← {course.title}</button>
        <p class="kicker" style:color={course.color}>{lesson.section || `Lesson ${lesson.n}`} · {lesson.minutes} min</p>
        <h1>{lesson.title}</h1>
        {#if lesson.blurb}<p class="blurb">{lesson.blurb}</p>{/if}
        {#each lesson.blocks as b, i (key(lesson) + i)}
          {#if b.kind === "html"}<div class="prose">{@html b.html}</div>
          {:else if b.kind === "choice"}<Choice {b} />
          {:else if b.kind === "answer"}<Answer {b} />
          {:else if b.kind === "cards"}<Cards {b} />
          {:else if b.kind === "steps"}<Steps {b} />
          {:else if b.kind === "reflect"}<Reflect {b} />
          {:else if b.kind === "order"}<Order {b} />
          {:else if b.kind === "recall"}<Recall {b} />
          {:else if b.kind === "viz"}<Viz {b} />
          {:else if b.kind === "reveal"}
            <details class="card reveal"><summary>{b.label}</summary><div class="prose">{@html b.html}</div></details>
          {/if}
        {/each}
        <footer>
          {#if idx > 0}<button class="btn" onclick={() => go(`c/${course.id}/${course.lessons[idx - 1].id}`)}>← Back</button>{:else}<span></span>{/if}
          <button class="btn primary big" onclick={finish}>
            {progress.lessonDone(key(lesson)) ? "Next" : "Finish lesson"} →
          </button>
        </footer>
      </article>
    {:else if course}
      <section class="course">
        <button class="crumb" onclick={() => go("")}>← All courses</button>
        <div class="chead">
          <span class="icon" style:background={course.color}>{course.icon}</span>
          <div>
            <h1>{course.title}</h1>
            <p class="blurb">{course.blurb}</p>
          </div>
        </div>
        <div class="meter"><span style:width="{(100 * courseDone(course)) / course.lessons.length}%" style:background={course.color}></span></div>
        <button class="btn primary big" onclick={() => go(`c/${course.id}/${nextLesson(course).id}`)}>
          {courseDone(course) ? "Continue" : "Start"}: {nextLesson(course).title} →
        </button>
        <ol class="outline">
          {#each course.lessons as l (l.id)}
            {#if l.section && l.section !== course.lessons[l.n - 2]?.section}<li class="sec">{l.section}</li>{/if}
            <li>
              <button onclick={() => go(`c/${course.id}/${l.id}`)} class:done={progress.lessonDone(key(l))}>
                <span class="dot">{progress.lessonDone(key(l)) ? "✓" : l.n}</span>
                <span class="t">{l.title}<small>{l.blurb}</small></span>
                <span class="min">{l.minutes} min</span>
              </button>
            </li>
          {/each}
        </ol>
      </section>
    {:else}
      <section class="home">
        <h1>Learn anything, <em>one step at a time.</em></h1>
        <p class="blurb">Short lessons, worked examples, instant feedback. Everything stays on your device.</p>
        <div class="grid">
          {#each courses as c (c.id)}
            <button class="course-card" onclick={() => go(`c/${c.id}`)} style:--c={c.color}>
              <span class="icon" style:background={c.color}>{c.icon}</span>
              <strong>{c.title}</strong>
              <span class="cb">{c.blurb}</span>
              <span class="cm"><span class="bar"><span style:width="{(100 * courseDone(c)) / c.lessons.length}%"></span></span>{courseDone(c)}/{c.lessons.length}</span>
            </button>
          {/each}
        </div>
      </section>
    {/if}
  </main>
</div>

<style>
  .shell {
    height: 100dvh;
    display: flex;
    flex-direction: column;
  }
  .top {
    height: 54px;
    flex: none;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 14px;
    border-bottom: 1px solid var(--line);
    background: var(--surface);
  }
  .logo {
    border: none;
    background: none;
    font-weight: 750;
    font-size: 17px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 7px;
    color: var(--text);
  }
  .mark {
    color: var(--accent);
  }
  .lp {
    flex: 1;
    max-width: 420px;
    height: 10px;
    border-radius: 999px;
    background: var(--surface-3);
    overflow: hidden;
  }
  .lp span {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, var(--good), #7ee0b3);
    border-radius: 999px;
    transition: width 500ms var(--ease-spring);
  }
  .stats {
    margin-left: auto;
    display: flex;
    gap: 14px;
    align-items: center;
    font-weight: 650;
    font-size: 14px;
  }
  main {
    flex: 1;
    min-height: 0;
  }
  .lesson,
  .course,
  .home {
    max-width: 720px;
    margin: 0 auto;
    padding: 32px 22px 90px;
  }
  .home {
    max-width: 1000px;
  }
  .crumb {
    border: none;
    background: none;
    color: var(--text-2);
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    margin-bottom: 12px;
  }
  .kicker {
    font-size: 12.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    margin: 0 0 4px;
  }
  h1 {
    font-size: clamp(30px, 5vw, 44px);
    letter-spacing: -0.025em;
    line-height: 1.08;
    margin: 0 0 8px;
  }
  h1 em {
    font-style: normal;
    color: var(--accent);
  }
  .blurb {
    color: var(--text-2);
    font-size: 17.5px;
    line-height: 1.5;
    margin: 0 0 22px;
  }
  .prose :global(p),
  .prose :global(li) {
    font-size: 17px;
    line-height: 1.7;
  }
  .prose :global(h2) {
    font-size: 24px;
    margin: 34px 0 8px;
    letter-spacing: -0.015em;
  }
  .prose :global(blockquote) {
    margin: 16px 0;
    padding: 10px 16px;
    border-left: 3px solid var(--accent);
    background: var(--surface-2);
    border-radius: 10px;
  }
  .prose :global(table) {
    border-collapse: collapse;
    width: 100%;
    font-size: 15px;
  }
  .prose :global(th),
  .prose :global(td) {
    padding: 7px 10px;
    border-bottom: 1px solid var(--line);
    text-align: left;
  }
  .prose :global(code) {
    background: var(--surface-2);
    padding: 1px 5px;
    border-radius: 5px;
  }
  :global(.card) {
    margin: 22px 0;
    padding: 18px;
    border-radius: 18px;
    border: 1px solid var(--line);
    background: var(--surface);
    box-shadow: var(--shadow);
  }
  :global(.card .prompt p) {
    font-size: 17px;
    font-weight: 550;
    margin: 0 0 4px;
    line-height: 1.5;
  }
  :global(.card .bar) {
    display: flex;
    gap: 8px;
  }
  .reveal summary {
    cursor: pointer;
    font-weight: 650;
    color: var(--accent);
  }
  footer {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid var(--line);
  }
  .btn.big {
    height: 46px;
    padding: 0 22px;
    font-size: 15.5px;
    border-radius: 13px;
  }
  .chead {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  .icon {
    flex: none;
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }
  .meter {
    height: 6px;
    border-radius: 6px;
    background: var(--surface-3);
    overflow: hidden;
    margin: 6px 0 18px;
  }
  .meter span {
    display: block;
    height: 100%;
  }
  .outline {
    list-style: none;
    padding: 0;
    margin: 28px 0 0;
  }
  .outline .sec {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-3);
    margin: 20px 0 6px;
  }
  .outline button {
    width: 100%;
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 10px 8px;
    border: none;
    background: none;
    text-align: left;
    border-radius: 12px;
    cursor: pointer;
  }
  .outline button:hover {
    background: var(--surface-2);
  }
  .dot {
    flex: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--surface-2);
    border: 1px solid var(--line);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 13px;
  }
  .done .dot {
    background: var(--good);
    color: #fff;
    border-color: transparent;
  }
  .t {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-weight: 600;
  }
  .t small {
    font-weight: 400;
    color: var(--text-2);
  }
  .min {
    font-size: 12.5px;
    color: var(--text-3);
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
    margin-top: 12px;
  }
  .course-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: left;
    padding: 18px;
    border-radius: 18px;
    border: 1px solid var(--line);
    background: var(--surface);
    cursor: pointer;
    transition: transform 160ms var(--ease), box-shadow 160ms;
  }
  .course-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow);
  }
  .course-card strong {
    font-size: 18px;
  }
  .cb {
    color: var(--text-2);
    font-size: 14px;
    line-height: 1.45;
    flex: 1;
  }
  .cm {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12.5px;
    color: var(--text-3);
  }
  .cm .bar {
    flex: 1;
    height: 5px;
    border-radius: 5px;
    background: var(--surface-3);
    overflow: hidden;
  }
  .cm .bar span {
    display: block;
    height: 100%;
    background: var(--c);
  }
  @media (max-width: 640px) {
    .lesson,
    .course,
    .home {
      padding: 20px 16px 70px;
    }
    .lp {
      max-width: none;
    }
  }
</style>
