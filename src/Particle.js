import { makeNoise3D } from "fast-simplex-noise";

const noise = makeNoise3D(Math.random);

const drawParticle = (ctx, incr, width, height, particle) => {
  update(incr, particle);
  wrap(width, height, particle);
  display(ctx, width, height, particle);
};

const update = (incr, particle) => {
  const theta = noise(particle.x * 0.006, particle.y * 0.004, incr);
  particle.x += 2 * Math.cos(theta);
  particle.y += 2 * Math.sin(theta);
};

const display = (ctx, width, height, particle) => {
  if (
    particle.x > 0 &&
    particle.x < width &&
    particle.y > 0 &&
    particle.y < height
  )
    ctx.fillRect(particle.x, particle.y, 1, 1);
};

const wrap = (width, height, particle) => {
  if (particle.x < 0) particle.x = width;
  if (particle.x > width) particle.x = 0;
  if (particle.y < 0) particle.y = height;
  if (particle.y > height) particle.y = 0;
};

export default drawParticle;
