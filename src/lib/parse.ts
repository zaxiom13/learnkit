// LearnKit course format. See AUTHORING.md for the full spec.
//
// courses/<slug>/course.md      front matter: title, blurb, icon, color
// courses/<slug>/NN-name.md     one lesson each: front matter (title, blurb, section) + Markdown + blocks
//
// Interactive blocks are fenced code blocks:
//   ```choice      multiple choice (one or many correct)
//   ```answer      typed answer, checked against accepted answers
//   ```cards       flashcards: "front :: back" per line
//   ```steps       a worked example revealed one step at a time (steps separated by ---)
//   ```reveal Label   hidden content behind a button
//   ```reflect     "explain it back": free text + a self-check rubric
//   ```order       put the lines in the right order
//   ```recall Title   type a passage from memory, with first-letter scaffolding
//   ```viz name key=value ...   an interactive visualisation (see VIZ below); body lines are data, "> " lines a caption
import { marked, type Token, type Tokens } from "marked";

export type Block =
  | { kind: "html"; html: string }
  | { kind: "choice"; id: string; prompt: string; options: { text: string; correct: boolean; why?: string }[]; explain: string; multi: boolean }
  | { kind: "answer"; id: string; prompt: string; accept: (string | RegExp)[]; numeric: { value: number; tol: number } | null; explain: string; hint: string; placeholder: string }
  | { kind: "cards"; id: string; cards: { front: string; back: string }[] }
  | { kind: "steps"; id: string; title: string; steps: string[] }
  | { kind: "reveal"; id: string; label: string; html: string }
  | { kind: "reflect"; id: string; prompt: string; rubric: string[]; model: string }
  | { kind: "order"; id: string; prompt: string; items: string[]; explain: string }
  | { kind: "recall"; id: string; title: string; prompt: string; text: string; explain: string }
  | { kind: "viz"; id: string; name: string; opts: Record<string, string>; lines: string[]; caption: string };

/** Every visualisation the app knows how to draw (src/ui/viz/). */
export const VIZ = [
  "timeline", "bars", "stack", "syscall", "cgroup", "jitter", "ringbuffer", "latency", "bigo", "softmax",
  "attention", "pathintegral", "bell", "ising", "lorenz", "brownian", "bayes", "orderbook", "option", "kelly",
  "matrix", "harmonics", "colorwheel", "perspective", "evolution", "neuron", "codon", "quorum", "avalanche",
  "condorcet", "diagonal", "montecarlo", "gradient", "pipes", "pagecache", "numa", "falsesharing", "spacetime",
  "orbit", "bands", "logistic", "tree", "lightcone", "waves", "boids", "sort", "hashring", "lsm", "backtest",
  "compound", "population", "gametheory", "fourier", "tiling", "spectrum",
] as const;

export interface Lesson {
  id: string;
  course: string;
  n: number;
  title: string;
  blurb: string;
  section: string;
  minutes: number;
  blocks: Block[];
}

export interface Course {
  id: string;
  title: string;
  blurb: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

export class FormatError extends Error {}

export function frontMatter(src: string): [Record<string, string>, string] {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(src);
  if (!m) return [{}, src];
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return [meta, src.slice(m[0].length)];
}

const md = (s: string) => marked.parse(s.trim(), { async: false }) as string;
const mdInline = (s: string) => marked.parseInline(s.trim(), { async: false }) as string;

/** Split a block body into "? prompt" lines, "> explanation" lines, and the rest. */
function sections(body: string) {
  const prompt: string[] = [], explain: string[] = [], rest: string[] = [];
  const meta: Record<string, string[]> = {};
  for (const line of body.split("\n")) {
    if (line.startsWith("? ")) prompt.push(line.slice(2));
    else if (line.startsWith("> ")) explain.push(line.slice(2));
    else if (line === ">") explain.push("");
    else {
      const m = /^(\w+):\s?(.*)$/.exec(line);
      if (m && ["hint", "placeholder", "tolerance", "model", "rubric"].includes(m[1])) (meta[m[1]] ??= []).push(m[2]);
      else rest.push(line);
    }
  }
  return { prompt: prompt.join("\n"), explain: explain.join("\n"), rest, meta };
}

function parseBlock(lang: string, body: string, id: string, where: string): Block {
  const [kind, ...args] = lang.trim().split(/\s+/);
  const s = sections(body);
  switch (kind) {
    case "choice": {
      const options = s.rest
        .map((l) => /^-\s*\[( |x|X)\]\s*(.*)$/.exec(l))
        .filter((m): m is RegExpExecArray => !!m)
        .map((m) => {
          const [text, why] = m[2].split(/\s+\/\/\s+/);
          return { text: mdInline(text), correct: m[1] !== " ", why: why ? mdInline(why) : undefined };
        });
      if (options.length < 2) throw new FormatError(`${where}: a choice block needs at least two "- [ ]" options.`);
      const nCorrect = options.filter((o) => o.correct).length;
      if (!nCorrect) throw new FormatError(`${where}: mark the right option(s) with "- [x]".`);
      return { kind, id, prompt: md(s.prompt), options, explain: md(s.explain), multi: nCorrect > 1 };
    }
    case "answer": {
      const accept: (string | RegExp)[] = [];
      let numeric: { value: number; tol: number } | null = null;
      for (const l of s.rest) {
        const m = /^=\s*(.*)$/.exec(l);
        if (!m) continue;
        const a = m[1].trim();
        const re = /^\/(.*)\/([a-z]*)$/.exec(a);
        if (re) accept.push(new RegExp(re[1], re[2] || "i"));
        else if (/^-?\d+(\.\d+)?$/.test(a) && !numeric) {
          numeric = { value: Number(a), tol: Number(s.meta.tolerance?.[0] ?? 0) };
          accept.push(a);
        } else accept.push(a);
      }
      if (!accept.length) throw new FormatError(`${where}: an answer block needs at least one "= accepted answer" line.`);
      return { kind, id, prompt: md(s.prompt), accept, numeric, explain: md(s.explain), hint: s.meta.hint?.join(" ") ?? "", placeholder: s.meta.placeholder?.[0] ?? "Your answer" };
    }
    case "cards": {
      const cards = s.rest.filter((l) => l.includes("::")).map((l) => {
        const [f, b] = l.split("::");
        return { front: mdInline(f), back: mdInline(b) };
      });
      if (!cards.length) throw new FormatError(`${where}: a cards block needs "front :: back" lines.`);
      return { kind, id, cards };
    }
    case "steps": {
      const steps = body.split(/^---\s*$/m).map((x) => md(x)).filter((x) => x.trim());
      if (steps.length < 2) throw new FormatError(`${where}: a steps block needs at least two steps separated by ---.`);
      return { kind, id, title: args.join(" "), steps };
    }
    case "reveal":
      return { kind, id, label: args.join(" ") || "Show", html: md(body) };
    case "reflect": {
      const rubric = s.rest.filter((l) => /^-\s+/.test(l)).map((l) => mdInline(l.replace(/^-\s+/, "")));
      return { kind, id, prompt: md(s.prompt), rubric, model: md(s.meta.model?.join("\n") ?? s.explain) };
    }
    case "order": {
      const items = s.rest.filter((l) => /^\d+\.\s+/.test(l)).map((l) => mdInline(l.replace(/^\d+\.\s+/, "")));
      if (items.length < 3) throw new FormatError(`${where}: an order block needs at least three numbered lines, in the correct order.`);
      return { kind, id, prompt: md(s.prompt), items, explain: md(s.explain) };
    }
    case "recall": {
      // Everything that isn't a "? prompt" or "> explanation" line is the text to recall, verbatim.
      const text = body
        .split("\n")
        .filter((l) => !l.startsWith("? ") && !l.startsWith("> ") && l !== ">")
        .map((l) => l.replace(/\s+$/, ""))
        .join("\n")
        .trim()
        .replace(/\n{3,}/g, "\n\n");
      if (!text) throw new FormatError(`${where}: a recall block needs the text to recall.`);
      if (text.length > 1200) throw new FormatError(`${where}: keep recall text under 1200 characters (split it into several blocks).`);
      return { kind, id, title: args.join(" "), prompt: md(s.prompt), text, explain: md(s.explain) };
    }
    case "viz": {
      const name = args[0] ?? "";
      if (!(VIZ as readonly string[]).includes(name)) throw new FormatError(`${where}: unknown visualisation "${name}".`);
      const opts: Record<string, string> = {};
      for (const m of args.slice(1).join(" ").matchAll(/(\w+)=(?:"([^"]*)"|(\S+))/g)) opts[m[1]] = m[2] ?? m[3];
      const lines = s.rest.map((l) => l.trim()).filter(Boolean);
      return { kind, id, name, opts, lines, caption: md(s.explain) };
    }
  }
  throw new FormatError(`${where}: unknown block type "${kind}".`);
}

const BLOCKS = new Set(["choice", "answer", "cards", "steps", "reveal", "reflect", "order", "recall", "viz"]);

export function parseLesson(course: string, file: string, src: string, n: number): Lesson {
  const [meta, body] = frontMatter(src.replace(/\r/g, ""));
  const id = file.replace(/^.*\//, "").replace(/\.md$/, "").replace(/^\d+-/, "");
  const where = `${course}/${file.replace(/^.*\//, "")}`;
  const tokens = marked.lexer(body);
  const blocks: Block[] = [];
  let pending: Token[] = [];
  let k = 0;
  const flush = () => {
    if (!pending.length) return;
    const list = pending as Token[] & { links?: object };
    list.links = (tokens as unknown as { links: object }).links;
    blocks.push({ kind: "html", html: marked.parser(list as never) });
    pending = [];
  };
  for (const t of tokens) {
    const lang = (t as Tokens.Code).lang ?? "";
    if (t.type === "code" && BLOCKS.has(lang.split(/\s+/)[0])) {
      flush();
      blocks.push(parseBlock(lang, (t as Tokens.Code).text, `${course}/${id}#${k++}`, where));
    } else pending.push(t);
  }
  flush();
  const words = body.split(/\s+/).length;
  return {
    id, course, n,
    title: meta.title ?? id,
    blurb: meta.blurb ?? "",
    section: meta.section ?? "",
    minutes: Number(meta.minutes) || Math.max(3, Math.round(words / 180 + blocks.filter((b) => b.kind !== "html").length * 0.7)),
    blocks,
  };
}

export function buildCourses(files: Record<string, string>): Course[] {
  const byCourse = new Map<string, string[]>();
  for (const path of Object.keys(files)) {
    const m = /courses\/([^/]+)\/([^/]+\.md)$/.exec(path);
    if (!m) continue;
    (byCourse.get(m[1]) ?? byCourse.set(m[1], []).get(m[1])!).push(path);
  }
  const courses: Course[] = [];
  for (const [slug, paths] of [...byCourse.entries()].sort()) {
    const coursePath = paths.find((p) => p.endsWith("/course.md"));
    const [meta, intro] = coursePath ? frontMatter(files[coursePath]) : [{}, ""];
    const lessons = paths
      .filter((p) => !p.endsWith("/course.md"))
      .sort()
      .map((p, i) => parseLesson(slug, p, files[p], i + 1));
    courses.push({
      id: slug,
      title: meta.title ?? slug,
      blurb: meta.blurb ?? intro.trim().split("\n")[0] ?? "",
      icon: meta.icon ?? "📘",
      color: meta.color ?? "#5b6cff",
      lessons,
    });
  }
  return courses;
}

/** Normalise a typed answer for comparison. */
export function norm(s: string) {
  return s.trim().toLowerCase().replace(/[\s,]+/g, " ").replace(/[.!]$/, "");
}

/** "3/4", "0.75", "75%", "1,200" → a number (or NaN). */
export function toNumber(s: string): number {
  const t = s.trim().replace(/,/g, "").replace(/^[£$€]/, "");
  let m = /^(-?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/.exec(t);
  if (m) return Number(m[1]) / Number(m[2]);
  m = /^(-?\d+(?:\.\d+)?)\s*%$/.exec(t);
  if (m) return Number(m[1]) / 100;
  m = /^-?\d*\.?\d+(?:e[+-]?\d+)?$/i.exec(t);
  return m ? Number(t) : NaN;
}

export function checkAnswer(b: Extract<Block, { kind: "answer" }>, given: string): boolean {
  const g = norm(given);
  if (!g) return false;
  const x = toNumber(given);
  if (Number.isFinite(x)) {
    const tol = b.numeric?.tol ?? 0;
    for (const a of b.accept) {
      if (a instanceof RegExp) continue;
      const v = toNumber(a);
      if (Number.isFinite(v) && Math.abs(x - v) <= Math.max(tol, 1e-9 * Math.abs(v))) return true;
    }
  }
  return b.accept.some((a) => (a instanceof RegExp ? a.test(given.trim()) : norm(a) === g));
}
