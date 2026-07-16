"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device is desktop by screen width and touch capability
    const handleResize = () => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsDesktop(window.innerWidth >= 768 && !isTouch);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    if (isDesktop) {
      document.documentElement.style.cursor = "none";
      const moveCursor = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };
      window.addEventListener("mousemove", moveCursor);

      return () => {
        document.documentElement.style.cursor = "auto";
        window.removeEventListener("mousemove", moveCursor);
      };
    }
  }, [isDesktop, mouseX, mouseY]);

  // If mobile/tablet, do not render anything
  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%"
      }}
    >
      <motion.div
        className="rounded-full bg-white"
        style={{
          width: 16, // Adjusted to your preferred size
          height: 16,
          mixBlendMode: "difference",
        }}
      />
    </motion.div>
  );
}