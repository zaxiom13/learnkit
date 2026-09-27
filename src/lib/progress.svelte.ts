// Progress lives in localStorage — nothing leaves the device.
const KEY = "learnkit:progress:v1";

interface Saved {
  blocks: Record<string, { ok: boolean; tries: number; at: number }>;
  lessons: Record<string, number>;
  points: number;
  days: string[];
}

function load(): Saved {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "");
    return { blocks: v.blocks ?? {}, lessons: v.lessons ?? {}, points: v.points ?? 0, days: v.days ?? [] };
  } catch {
    return { blocks: {}, lessons: {}, points: 0, days: [] };
  }
}

class Progress {
  s = $state<Saved>(load());

  save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(this.s));
    } catch {
      /* private mode */
    }
  }

  /** Record an attempt. Returns points earned. */
  attempt(id: string, ok: boolean): number {
    const prev = this.s.blocks[id];
    const tries = (prev?.tries ?? 0) + 1;
    let earned = 0;
    if (ok && !prev?.ok) earned = tries === 1 ? 10 : tries === 2 ? 6 : 3;
    this.s.blocks[id] = { ok: ok || !!prev?.ok, tries, at: Date.now() };
    this.s.points += earned;
    const today = new Date().toISOString().slice(0, 10);
    if (!this.s.days.includes(today)) this.s.days.push(today);
    this.save();
    return earned;
  }

  done(id: string) {
    return !!this.s.blocks[id]?.ok;
  }

  finishLesson(key: string) {
    if (!this.s.lessons[key]) {
      this.s.lessons[key] = Date.now();
      this.s.points += 25;
      this.save();
    }
  }

  lessonDone(key: string) {
    return !!this.s.lessons[key];
  }

  get streak(): number {
    const set = new Set(this.s.days);
    let n = 0;
    const d = new Date();
    for (;;) {
      const k = d.toISOString().slice(0, 10);
      if (!set.has(k)) break;
      n++;
      d.setDate(d.getDate() - 1);
    }
    return n;
  }

  reset() {
    this.s = { blocks: {}, lessons: {}, points: 0, days: [] };
    this.save();
  }
}

export const progress = new Progress();
