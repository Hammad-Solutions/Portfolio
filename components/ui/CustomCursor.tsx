"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<"default" | "hover">("default");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    
    if (isTouchDevice) return;
    
    document.body.classList.add("cursor-hidden");

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const tagName = target.tagName.toLowerCase();
      const isInteractive = 
        tagName === 'a' || 
        tagName === 'button' || 
        target.closest('a') || 
        target.closest('button') || 
        window.getComputedStyle(target).cursor === 'pointer';
        
      if (isInteractive) {
        setCursorState("hover");
      } else {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("cursor-hidden");
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center pointer-events-none"
      style={{ x: cursorX, y: cursorY }}
    >
      <motion.div
        animate={{
          width: cursorState === "hover" ? 54 : 8,
          height: cursorState === "hover" ? 54 : 8,
          x: cursorState === "hover" ? -27 : -4,
          y: cursorState === "hover" ? -27 : -4,
          backgroundColor: "rgba(255, 255, 255, 1)",
        }}
        style={{
          mixBlendMode: "difference",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
        className="absolute rounded-full origin-center"
      />
    </motion.div>
  );
}
