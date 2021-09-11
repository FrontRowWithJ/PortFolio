import { makeNoise3D } from "fast-simplex-noise";
import { times } from "lodash";
const { max, min, floor, cos, sin, random } = Math;
const isAtEnd = window.location.href.includes("404");
const noise = makeNoise3D(random);
const START = 0,
  END = 0.9;
let fac = isAtEnd ? START : END;
let iid = undefined;
const TICK = 25;
const TOTAL_MS = 500;
const NUM_OF_TICS = TOTAL_MS / TICK;
let tally = isAtEnd ? NUM_OF_TICS : 0;
const radius = 7;
const opacity = 1;
const NUM_OF_PARTICLES = 3000;
export const FORWARD = 1,
  BACKWARD = -1;

export const setFactor = (sign) => {
  if (iid !== undefined) clearInterval(iid);
  iid = setInterval(() => {
    tally += sign;
    if (tally % NUM_OF_TICS === 0) {
      fac = sign === BACKWARD ? START : END;
      clearInterval(iid);
      iid = undefined;
    } else fac = fac + ((END - START) / NUM_OF_TICS) * sign;
  });
};

const drawParticle = (ctx, incr, width, height, p) => {
  const p1 = update(incr, p);
  const p2 = wrap(width, height, p1);
  display(ctx, width, height, p2);
  return p2;
};

const update = (incr, p) => {
  const a = noise(p.x * 0.006, p.y * 0.004, incr);
  return { x: p.x + fac * 2 * cos(a), y: p.y + fac * 2 * sin(a), off: p.off };
};

const display = (ctx, width, height, p) => {
  if (p.x > 0 && p.x < width && p.y > 0 && p.y < height) {
    ctx.beginPath();
    ctx.fillStyle = scaleGray(
      ...hsv2rgb((p.off + (p.x / width) * 360) | 0, 1, 1),
      fac / (END - START)
    );
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
  }
};

const wrap = (w, h, p) => {
  const res = { x: p.x, y: p.y, off: p.off };
  if (p.x < 0) res.x = w;
  if (p.x > w) res.x = 0;
  if (p.y < 0) res.y = h;
  if (p.y > h) res.y = 0;
  return res;
};

// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
const hsv2rgb = (h, s, v) => {
  const f = (n, k = (n + h / 60) % 6) => v - v * s * max(min(k, 4 - k, 1), 0);
  return [f(5), f(3), f(1)];
};

const draw = (cvs, ctx, inc, pObj) => {
  setCanvasBackground(ctx, cvs.width, cvs.height);
  inc.val += 0.008;
  for (const i in pObj.particles)
    pObj.particles[i] = drawParticle(
      ctx,
      inc.val,
      cvs.width,
      cvs.height,
      pObj.particles[i]
    );
  requestAnimationFrame(() => draw(cvs, ctx, inc, pObj));
};

const setCanvasSize = (canvas) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return [canvas.width, canvas.height];
};

const toHex = (n) => {
  return n.toString(16).padStart(2, "0");
};

const setCanvasBackground = (ctx, width, height) => {
  const r = toHex(floor(23 * fac));
  const g = toHex(floor(20 * fac));
  const b = toHex(floor(16 * fac));
  const alpha = toHex(floor(16));
  ctx.fillStyle = "#" + r + g + b + alpha;
  ctx.fillRect(0, 0, width, height);
};

const genParticles = (numOfParticles, w, h) => {
  return times(numOfParticles, () => {
    return { x: random() * w, y: random() * h, off: random() * 360 };
  });
};

const setCanvasStyle = (canvas) => {
  const { style } = canvas;
  style.position = "absolute";
  style.left = style.top = style.zIndex = 0;
};

const init = () => {
  const inc = { val: 0 };
  const canvas = document.getElementById("test");
  const ctx = canvas.getContext("2d");
  setCanvasStyle(canvas);
  const [w, h] = setCanvasSize(canvas);
  const particleObj = { particles: genParticles(NUM_OF_PARTICLES, w, h) };
  window.addEventListener("resize", () => {
    const [w, h] = setCanvasSize(canvas);
    ctx.clearRect(0, 0, w, h);
    inc.val = 0;
    particleObj.particles = genParticles(NUM_OF_PARTICLES, w, h);
  });

  requestAnimationFrame(() => draw(canvas, ctx, inc, particleObj));
};

const scaleGray = (r, g, b, x) => {
  const lerp = (v0, v1, t) => v0 + t * (v1 - v0);
  const _r = lerp(0.299 * r, r, x);
  const _g = lerp(0.587 * g, g, x);
  const _b = lerp(0.114 * b, b, x);
  return `rgba(${[
    _r + _g * (1 - x) + _b * (1 - x),
    _r * (1 - x) + _g + _b * (1 - x),
    _r * (1 - x) + _g * (1 - x) + _b,
  ]
    .map((n) => floor(n * 255))
    .join(", ")}, ${opacity})`;
};

export default init;
