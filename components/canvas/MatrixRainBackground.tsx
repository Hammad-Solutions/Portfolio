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
      // Lower opacity = longer trails = more visible rain effect
      ctx.fillStyle = "rgba(10, 10, 10, 0.062)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      // Theme-matched colors with boosted opacity for visibility
      const colors = [
        "rgba(16, 185, 129, 0.55)",  // Emerald (primary)
        "rgba(20, 184, 166, 0.50)",  // Teal
        "rgba(59, 130, 246, 0.45)",  // Blue
        "rgba(16, 185, 129, 0.40)",  // Emerald dim
        "rgba(20, 184, 166, 0.35)",  // Teal dim
      ];

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // 10% chance: bright glowing white "stream head" character
        if (Math.random() > 0.90) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
        } else {
          ctx.fillStyle = colors[i % colors.length];
        }

        ctx.fillText(text, x, y);

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    let lastTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      frameId = requestAnimationFrame(tick);
      const elapsed = now - lastTime;
      // Target ~30 FPS (~33.3ms interval)
      if (elapsed >= 33) {
        lastTime = now - (elapsed % 33);
        draw();
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
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
