/******************
Code by Vamoss
Original code link:
NOTE: This code has been modified to work with the html canvas but it is conceptually the same.
https://www.openprocessing.org/sketch/751983

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/

//Inspired by Felix Auer
//http://www.felixauer.com/javascript/difeqrk.html
import { times } from "lodash";
import { pageState, CAROUSEL } from "./PageState";
const COLORS = [
  [0.34509803921568627, 0.09411764705882353, 0.27058823529411763],
  [0.5647058823529412, 0.047058823529411764, 0.24705882352941178],
  [0.7803921568627451, 0, 0.2235294117647059],
  [1, 0.3411764705882353, 0.2],
  [1, 0.7647058823529411, 0.058823529411764705],
];
const NUM_OF_PARTICLES = 3000;
const IS_AT_END = window.location.href.includes("404");
const START = 0,
  END = 1;
let fac = IS_AT_END ? START : END;
let iid = undefined;
const TICK = 25;
const TOTAL_MS = 500;
const NUM_OF_TICS = TOTAL_MS / TICK;
let tally = IS_AT_END ? NUM_OF_TICS : 0;
const opacity = 1;
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

const setCanvasStyle = ({ style }) => {
  style.position = "absolute";
  style.left = style.top = style.zIndex = 0;
};

const setCanvasSize = (canvas) => {
  const { innerWidth, innerHeight } = window;
  return [(canvas.width = innerWidth), (canvas.height = innerHeight)];
};

const random = (...args) => {
  if (args.length === 0) return Math.random();
  if (args.length === 1) return Math.random() * args[0];
  else return args[0] + Math.random() * args[1];
};

const getXPos = (x, xScale, centerX) => (x - centerX) / xScale;
const getYPos = (y, yScale, centerY) => (y - centerY) / yScale;
const getXPrint = (x, xScale, centerX) => xScale * x + centerX;
const getYPrint = (y, yScale, centerY) => yScale * y + centerY;

const genBlobs = (w, h) => {
  const [xs, ys, cx, cy] = [w / 20, (h / 20) * (w / h), w / 2, h / 2];
  return times(NUM_OF_PARTICLES, () => {
    const [x, y] = [w, h].map((n) => Math.random() * n);
    return {
      x: getXPos(x, xs, cx),
      y: getYPos(y, ys, cy),
      size: random(1, 5),
      lastX: x,
      lastY: y,
      color: Math.floor(random(COLORS.length)),
      direction: random(0.1, 1) * (random() > 0.5 ? 1 : -1),
    };
  });
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
    .map((n) => Math.floor(n * 255))
    .join(", ")}, ${opacity * fac})`;
};

const draw = (canvas, ctx, start, obj) => {
  const { blobs } = obj;
  const deltaTime = +new Date() - start;
  const newStart = +new Date();
  if (pageState.state !== CAROUSEL) {
    const [w, h] = [canvas.width, canvas.height];
    const [xs, ys, cx, cy] = [w / 20, (h / 20) * (w / h), w / 2, h / 2];
    ctx.fillStyle = "#1A06330A";
    ctx.fillRect(0, 0, w, h);
    const stepsize = deltaTime * 0.001;
    blobs.forEach((blob) => {
      let x = Math.sin(blob.y * 0.1) * 3;
      let y = -Math.sin(blob.x * 0.1) * 3;
      blob.x += blob.direction * x * stepsize * fac;
      blob.y += blob.direction * y * stepsize * fac;
      x = getXPrint(blob.x, xs, cx);
      y = getYPrint(blob.y, ys, cy);
      ctx.beginPath();
      ctx.fillStyle = scaleGray(...COLORS[blob.color], fac / (END - START));
      ctx.arc(x, y, blob.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
      blob.lastX = x;
      blob.lastY = y;
    });
  }
  requestAnimationFrame(() => draw(canvas, ctx, newStart, obj));
};

const init = () => {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  setCanvasStyle(canvas);
  const obj = { blobs: genBlobs(...setCanvasSize(canvas)) };
  window.addEventListener("resize", () => {
    obj.blobs = genBlobs(...setCanvasSize(canvas));
  });
  requestAnimationFrame(() => draw(canvas, ctx, +new Date(), obj));
};

export default init;
