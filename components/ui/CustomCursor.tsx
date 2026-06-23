"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Dot follows immediately
  const dotSpringConfig = { damping: 50, stiffness: 600, mass: 0.3 };
  const dotX = useSpring(cursorX, dotSpringConfig);
  const dotY = useSpring(cursorY, dotSpringConfig);

  // Ring lags behind with softer spring
  const ringSpringConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const ringX = useSpring(cursorX, ringSpringConfig);
  const ringY = useSpring(cursorY, ringSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer") ||
        target.closest("[data-cursor-hover]")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    // Hide the native cursor on desktop
    document.body.style.cursor = "none";

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="hidden md:block">
      {/* Outer ring — lags behind with spring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 44 : clicked ? 20 : 32,
          height: hovered ? 44 : clicked ? 20 : 32,
          borderColor: hovered
            ? "rgba(16,185,129,0.85)"
            : "rgba(237,237,237,0.3)",
          opacity: hovered ? 1 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />

      {/* Inner glowing dot — snappy follow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: clicked ? 10 : 6,
          height: clicked ? 10 : 6,
          backgroundColor: hovered ? "#10B981" : "#EDEDED",
          boxShadow: hovered
            ? "0 0 10px rgba(16,185,129,0.9), 0 0 22px rgba(16,185,129,0.45)"
            : "0 0 6px rgba(237,237,237,0.6)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
}
