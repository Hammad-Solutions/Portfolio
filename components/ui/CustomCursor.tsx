"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const handleResize = () => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsDesktop(window.innerWidth >= 768 && !isTouch);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let moveCursor: (e: MouseEvent) => void;

    if (isDesktop) {
      document.documentElement.style.cursor = "none";
      moveCursor = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };
      window.addEventListener("mousemove", moveCursor);
    } else {
      document.documentElement.style.cursor = "auto";
    }

    return () => {
      document.documentElement.style.cursor = "auto";
      window.removeEventListener("resize", handleResize);
      if (moveCursor) {
        window.removeEventListener("mousemove", moveCursor);
      }
    };
  }, [isDesktop, mouseX, mouseY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      // Removed z-[9999] from here
      className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
      style={{
        // 1. Force the absolute maximum z-index allowed by browsers
        zIndex: 999999,
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%"
      }}
    >
      <motion.div
        className="rounded-full bg-white"
        style={{
          width: 16,
          height: 16,
          mixBlendMode: "difference",
        }}
      />
    </motion.div>
  );
}