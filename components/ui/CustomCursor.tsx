"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<"default" | "hover" | "text">("default");
  const [accentColor, setAccentColor] = useState("#10B981");
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for cursor outer ring
  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch
    const checkTouch = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    
    if (isTouchDevice) return; // Disable custom cursor on mobile, rely only on ripples
    
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
        
      const isText = 
        tagName === 'p' || 
        tagName === 'h1' || 
        tagName === 'h2' || 
        tagName === 'h3' || 
        tagName === 'span' || 
        window.getComputedStyle(target).cursor === 'text';

      if (isInteractive) {
        setCursorState("hover");
      } else if (isText) {
        setCursorState("text");
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

  // Section Color Tracking
  useEffect(() => {
    const sections = [
      { id: "home", color: "#10B981" },     // emerald
      { id: "about", color: "#A855F7" },    // amethyst
      { id: "skills", color: "#3B82F6" },   // blue
      { id: "projects", color: "#14B8A6" }, // teal
      { id: "contact", color: "#10B981" },  // emerald
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const match = sections.find(s => s.id === entry.target.id);
          if (match) setAccentColor(match.color);
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Ripple effect handler (works on both mobile & desktop)
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }
      
      const newRipple = { id: Date.now(), x: clientX, y: clientY };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 800); // Remove after animation
    };

    window.addEventListener("click", handleClick);
    // Use touchstart on mobile for immediate feedback
    if (isTouchDevice) {
      window.addEventListener("touchstart", handleClick, { passive: true });
    }
    
    return () => {
      window.removeEventListener("click", handleClick);
      if (isTouchDevice) {
        window.removeEventListener("touchstart", handleClick);
      }
    };
  }, [isTouchDevice]);

  return (
    <>
      {/* Desktop Morphing Cursor */}
      {!isTouchDevice && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
          style={{ x: cursorX, y: cursorY }}
        >
          {/* Outer Ring / Glass Sphere */}
          <motion.div
            animate={{
              width: cursorState === "hover" ? 64 : cursorState === "text" ? 2 : 12,
              height: cursorState === "hover" ? 64 : cursorState === "text" ? 24 : 12,
              borderRadius: cursorState === "text" ? 2 : 32,
              border: cursorState === "hover" ? `1px solid rgba(255,255,255,0.15)` : `0px solid transparent`,
              backgroundColor: cursorState === "hover" ? "rgba(255,255,255,0.01)" : accentColor,
              backdropFilter: cursorState === "hover" ? "invert(1) hue-rotate(180deg)" : "none",
              opacity: cursorState === "text" ? 0.7 : 1,
              x: cursorState === "hover" ? -32 : cursorState === "text" ? -1 : -6,
              y: cursorState === "hover" ? -32 : cursorState === "text" ? -12 : -6,
              boxShadow: cursorState === "hover" ? "0 0 20px rgba(255,255,255,0.1)" : "none"
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
            className="absolute origin-center"
          />
          
          {/* Inner Dot (Shrinks/Hides on hover) */}
          <motion.div
            animate={{
              width: cursorState === "hover" ? 0 : 0, // Keep hidden or very small
              height: cursorState === "hover" ? 0 : 0,
              backgroundColor: accentColor,
              x: 0,
              y: 0,
              opacity: 0
            }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="absolute rounded-full origin-center"
          />
        </motion.div>
      )}

      {/* Ripple Effects (All Devices) */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ 
              scale: 0, 
              opacity: 0.8, 
              x: ripple.x - 20, 
              y: ripple.y - 20 
            }}
            animate={{ 
              scale: 3, 
              opacity: 0,
              x: ripple.x - 20,
              y: ripple.y - 20
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 pointer-events-none z-[9998] w-10 h-10 rounded-full mix-blend-screen"
            style={{ 
              border: `2px solid ${accentColor}`,
              boxShadow: `0 0 10px ${accentColor}40` 
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
