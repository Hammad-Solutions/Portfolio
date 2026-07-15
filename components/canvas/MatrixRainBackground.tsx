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

    // Authentic Matrix character set - Binary only per request
    const chars = "01".split("");
    const isMobile = window.innerWidth < 768;
    const fontSize = isMobile ? 14 : 18;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(columns).fill(1);

    // Each column gets a random speed multiplier and "highlight" status
    let columnHighlight: boolean[] = Array(columns).fill(false).map(() => Math.random() > 0.95);

    const handleResize = () => {
      resizeCanvas();
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
      columnHighlight = Array(columns).fill(false).map(() => Math.random() > 0.95);
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      // Lower opacity = longer, smoother trails (increased fade for shorter trails)
      ctx.fillStyle = "rgba(5, 5, 5, 0.07)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Reduced opacity values to push the effect into the background
        if (Math.random() > 0.92) {
          ctx.fillStyle = "rgba(180, 255, 180, 0.20)"; // Dimmer white-green head (was 0.55)
        } else {
          ctx.fillStyle = columnHighlight[i]
            ? "rgba(0, 255, 65, 0.12)" // Dimmer highlight column (was 0.30)
            : "rgba(0, 200, 40, 0.06)"; // Dimmer standard column (was 0.18)
        }

        ctx.fillText(text, x, y);

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          columnHighlight[i] = Math.random() > 0.95; // re-roll highlight on reset
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
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      {/* Background static radial glow for central terminal feel */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          // Reduced the gradient opacity from 0.025 to 0.01
          background: "radial-gradient(circle at 50% 50%, rgba(0, 255, 65, 0.01) 0%, transparent 60%)"
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}