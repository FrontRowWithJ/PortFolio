import React, { useEffect, useRef } from "react";
import "./Particle";
import drawParticle from "./Particle";
import { times } from "lodash";

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  let incRef = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { width, height } = setCanvasSize(canvas);
    const particles = genParticles(12000, width, height);
    window.addEventListener("resize", () => {
      const { width, height } = setCanvasSize(canvas);
      setCanvasBackground(ctx, width, height);
    });
    setInterval(() => {
      setCanvasBackground(ctx, canvas.width, canvas.height);
      incRef.current += 0.008;
      for (const p of particles)
        drawParticle(ctx, incRef.current, canvas.width, canvas.height, p);
    }, 10);
  }, []);
  return (
    <canvas
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 0,
      }}
      ref={canvasRef}
      width="100%"
      height="100%"
    ></canvas>
  );
};

const setCanvasSize = (canvas) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return { width: canvas.width, height: canvas.height };
};

const setCanvasBackground = (ctx, width, height) => {
  ctx.fillStyle = "rgba(0, 0, 0, .05)";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#FFFFFF";
};

const genParticles = (numOfParticles, width, height) => {
  return times(numOfParticles, () => {
    return { x: Math.random() * width, y: Math.random() * height };
  });
};

export default ParticleCanvas;
