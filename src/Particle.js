import { makeNoise3D } from "fast-simplex-noise";

const noise = makeNoise3D(Math.random);

const drawParticle = (ctx, incr, width, height, p) => {
  update(incr, p);
  wrap(width, height, p);
  display(ctx, width, height, p);
};

const update = (incr, p) => {
  const theta = noise(p.x * 0.006, p.y * 0.004, incr);
  p.x += 2 * Math.cos(theta);
  p.y += 2 * Math.sin(theta);
};

const display = (ctx, width, height, p) => {
  if (p.x > 0 && p.x < width && p.y > 0 && p.y < height)
    ctx.fillRect(p.x, p.y, 1, 1);
};

const wrap = (width, height, p) => {
  if (p.x < 0) p.x = width;
  if (p.x > width) p.x = 0;
  if (p.y < 0) p.y = height;
  if (p.y > height) p.y = 0;
};

export default drawParticle;
