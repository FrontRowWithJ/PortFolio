import { makeNoise3D } from "fast-simplex-noise";
import { times } from "lodash";
import { pageState, CAROUSEL } from "./PageState";
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
const NUM_OF_PARTICLES = 1000;
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
  update(incr, p);
  wrap(width, height, p);
  display(ctx, width, height, p);
};

//* rainbow vomit
//* x: p.x + p.dx + 5 * (2 * cos(a)),
//* y: p.y + p.dy + 5 * (2 * sin(a)),
const update = (incr, p) => {
  const a = noise(p.x * 0.006, p.y * 0.004, incr);
  p.x = p.x + fac * (0.1 * cos(a) + p.sx * 0.001);
  p.y = p.y + fac * (0.1 * sin(a) + p.sy * 0.001);
};

const display = (ctx, width, height, p) => {
  if (p.x > 0 && p.x < width && p.y > 0 && p.y < height) {
    ctx.beginPath();
    ctx.fillStyle = scaleGray(
      ...hsv2rgb(((p.off + (p.x / width) * 360) | 0) % 360, 1, 1),
      fac / (END - START)
    );
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
  }
};

const wrap = (w, h, p) => {
  if (p.x < 0) p.x = w;
  if (p.x > w) p.x = 0;
  if (p.y < 0) p.y = h;
  if (p.y > h) p.y = 0;
};

// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
const hsv2rgb = (h, s, v) => {
  const f = (n, k = (n + h / 60) % 6) => v - v * s * max(min(k, 4 - k, 1), 0);
  return [f(5), f(3), f(1)];
};

const draw = (cvs, ctx, inc, pObj) => {
  if (pageState.state !== CAROUSEL) {
    setCanvasBackground(ctx, cvs.width, cvs.height);
    inc.val += 0.008;
    for (const i in pObj.particles)
      drawParticle(ctx, inc.val, cvs.width, cvs.height, pObj.particles[i]);
  }
  requestAnimationFrame(() => draw(cvs, ctx, inc, pObj));
};

const setCanvasSize = (canvas) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return [canvas.width, canvas.height];
};

const toHex = (n) => n.toString(16).padStart(2, "0");
const setCanvasBackground = (ctx, width, height) => {
  const [r, g, b] = [23, 20, 16].map((x) => toHex(floor(x * fac)));
  const a = toHex(floor(16));
  ctx.fillStyle = "#" + r + g + b + a;
  ctx.fillRect(0, 0, width, height);
};

const genParticles = (numOfParticles, w, h) => {
  return times(numOfParticles, () => {
    const [x, y, off] = [random() * w, random() * h, random() * 360];
    return { x: x, y: y, off: off, sx: x, sy: y };
  });
};

const setCanvasStyle = (canvas) => {
  const { style } = canvas;
  style.position = "absolute";
  style.left = style.top = style.zIndex = 0;
};

const init = () => {
  const inc = { val: 0 };
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  setCanvasStyle(canvas);
  const [w, h] = setCanvasSize(canvas);
  const particleObj = { particles: genParticles(NUM_OF_PARTICLES, w, h) };
  window.addEventListener("resize", () => {
    const [w, h] = setCanvasSize(canvas);
    inc.val = 0;
    particleObj.particles = genParticles(NUM_OF_PARTICLES, w, h);
  });
  requestAnimationFrame(() => draw(canvas, ctx, inc, particleObj));
};

const lerp = (v0, v1, t) => v0 + t * (v1 - v0);
const scaleGray = (r, g, b, x) => {
  const _r = lerp(0.299 * r, r, x);
  const _g = lerp(0.587 * g, g, x);
  const _b = lerp(0.114 * b, b, x);
  return `rgba(${[
    _r + _g * (1 - x) + _b * (1 - x),
    _r * (1 - x) + _g + _b * (1 - x),
    _r * (1 - x) + _g * (1 - x) + _b,
  ]
    .map((n) => floor(n * 255))
    .join(", ")}, ${opacity * fac})`;
};

export default init;
