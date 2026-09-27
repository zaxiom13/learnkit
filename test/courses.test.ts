import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import { buildCourses, checkAnswer } from "../src/lib/parse";

const root = join(__dirname, "..", "courses");
const files: Record<string, string> = {};
for (const c of readdirSync(root)) for (const f of readdirSync(join(root, c))) if (f.endsWith(".md")) files[`courses/${c}/${f}`] = readFileSync(join(root, c, f), "utf8");

describe("courses", () => {
  const courses = buildCourses(files);
  test("at least one course", () => expect(courses.length).toBeGreaterThan(0));
  for (const c of courses) {
    test(`${c.id} has a title and lessons`, () => {
      expect(c.title).not.toBe(c.id);
      expect(c.lessons.length).toBeGreaterThan(0);
    });
    for (const l of c.lessons) {
      test(`${c.id}/${l.id} is interactive`, () => {
        expect(l.blocks.filter((b) => b.kind !== "html").length).toBeGreaterThan(1);
      });
      for (const b of l.blocks) {
        if (b.kind === "answer") {
          test(`${b.id}: every accepted answer is accepted`, () => {
            for (const a of b.accept) if (typeof a === "string") expect(checkAnswer(b, a)).toBe(true);
            expect(checkAnswer(b, "definitely not this")).toBe(false);
          });
        }
      }
    }
  }
});

test("answer matching", () => {
  const b = { kind: "answer" as const, id: "x", prompt: "", accept: ["1/2"], numeric: null, explain: "", hint: "", placeholder: "" };
  for (const g of ["1/2", "0.5", "50%", " 2/4 "]) expect(checkAnswer(b, g)).toBe(true);
  expect(checkAnswer(b, "0.6")).toBe(false);
});
