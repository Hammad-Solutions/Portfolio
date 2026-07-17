"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [inContact, setInContact] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 420);

      // Hide when user reaches the contact section
      const contact = document.getElementById("contact");
      if (contact) {
        const rect = contact.getBoundingClientRect();
        setInContact(rect.top < window.innerHeight * 0.6);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const show = visible && !inContact;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          onKeyDown={(e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); } }}
          role="button"
          tabIndex={0}
          // Changed to a perfectly centered floating pill on ALL devices (removed w-full bottom docking)
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] cursor-pointer select-none"
          style={{ willChange: "transform" }}
        >
          <a
            href="mailto:hammadsolutions.support@gmail.com?subject=Project%20Inquiry%20-%20Muhammad%20Hammad"
            className="block"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <motion.div
              layout
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(16,185,129,0.5)" }}
              whileTap={{ scale: 0.97 }}
              // Switched to strict pill padding (px-6 py-3.5)
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-500/90 text-black text-xs md:text-sm font-bold tracking-wide shadow-xl shadow-emerald-500/30 border border-emerald-400/50 backdrop-blur-md whitespace-nowrap"
            >
              {/* Pulsing dot */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black/70" />
              </span>

              {/* High-CTA Short Text for Mobile */}
              <span className="md:hidden">Email Me →</span>

              {/* Standard Long Text for Desktop */}
              <span className="hidden md:inline-block">
                {hovered ? "Email Me Directly →" : "Accepting Select Engagements"}
              </span>
            </motion.div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}