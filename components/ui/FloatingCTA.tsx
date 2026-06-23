"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [inContact, setInContact] = useState(false);

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

  const handleClick = () => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const navbar = document.querySelector("nav");
    const navH = navbar ? navbar.getBoundingClientRect().height : 70;
    const top = contact.getBoundingClientRect().top + window.pageYOffset - navH - 16;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const show = visible && !inContact;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          onClick={handleClick}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] cursor-pointer select-none"
          style={{ willChange: "transform" }}
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(16,185,129,0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-emerald-500/90 backdrop-blur-md text-black text-xs font-bold tracking-wide shadow-xl shadow-emerald-500/30 border border-emerald-400/50"
          >
            {/* Pulsing dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black/70" />
            </span>
            <span>Open to Work · Let&apos;s Build Something</span>
            {/* Arrow icon */}
            <motion.span
              whileHover={{ x: 3 }}
              className="text-black/80 text-sm leading-none"
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
