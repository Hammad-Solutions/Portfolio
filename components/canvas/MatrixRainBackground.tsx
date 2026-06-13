"use client";

import React, { useEffect, useRef } from "react";

export default function MatrixRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const chars = "05".split("");
    const fontSize = 13;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(columns).fill(1);

    const handleResize = () => {
      resizeCanvas();
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      // Draw semi-transparent background to create trail effect
      ctx.fillStyle = "rgba(10, 10, 10, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Muted steel gray with slight blue undertone at low opacity to blend with background
      ctx.fillStyle = "rgba(201, 190, 33, 0.09)";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30 FPS

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block pointer-events-none"
    />
  );
}
