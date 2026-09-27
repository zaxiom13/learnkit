// Helpers shared by the visualisations in src/ui/viz/.

export interface VizProps {
  opts: Record<string, string>;
  lines: string[];
}

/** Svelte action: call step(dt, t) every animation frame while the node is on screen. */
export function loop(node: Element, step: (dt: number, t: number) => void) {
  let raf = 0, last = 0, t = 0, visible = false;
  let fn = step;
  const frame = (now: number) => {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    t += dt;
    fn(dt, t);
    raf = requestAnimationFrame(frame);
  };
  const start = () => { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); });
  io.observe(node);
  return {
    update(s: typeof step) { fn = s; },
    destroy() { stop(); io.disconnect(); },
  };
}

/** Deterministic PRNG so pictures are stable between renders. */
export function rng(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Standard normal via Box–Muller. */
export function gauss(r: () => number) {
  return Math.sqrt(-2 * Math.log(r() || 1e-12)) * Math.cos(2 * Math.PI * r());
}

/** Abramowitz–Stegun normal CDF. */
export function ncdf(x: number) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
}

/** "a | b | c" data lines → cells. */
export const cells = (l: string) => l.split("|").map((c) => c.trim());

export const PALETTE = ["var(--accent)", "var(--coral)", "var(--good)", "var(--warn)", "#7b43c9", "#1c8f7a", "#b1308a", "#2f7fd1"];

export const path = (pts: [number, number][]) => pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join("");
