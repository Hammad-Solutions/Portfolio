"use client";

import React from "react";
import { motion } from "framer-motion";

const metrics = [
  {
    value: "4+",
    label: "Years of Active Development",
    desc: "Coding since high school, shipping since university",
    color: "#10B981",
    icon: "⚡",
  },
  {
    value: "15+",
    label: "Projects Shipped End-to-End",
    desc: "From IoT systems to AI-integrated web applications",
    color: "#3B82F6",
    icon: "🚀",
  },
  {
    value: "3",
    label: "Open-Source Repositories",
    desc: "Publicly available for the developer community",
    color: "#A855F7",
    icon: "📦",
  },
];

const testimonial = {
  quote:
    "Hammad has an exceptional ability to translate complex technical requirements into elegant, working solutions. His attention to detail and understanding of modern web technologies, specifically React and Next.js, is truly outstanding. He consistently delivered high-quality code and exceeded project expectations.",
  name: "Muhammad Abdullah",
  role: "Technical Advisor",
  org: "Air University",
  initials: "MA",
  color: "#10B981",
};

export default function SocialProof() {
  return (
    <section
      id="social-proof"
      className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto relative z-10"
    >
      {/* Section label */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[10px] font-mono tracking-[0.25em] text-[#A855F7] uppercase block mb-3 font-black"
      >
        02.5 // PROOF OF WORK
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-[var(--text-primary)]"
      >
        Numbers That Speak
      </motion.h2>

      {/* Metric cards — frameless floating stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 60, damping: 14 }}
            whileHover={{ y: -4 }}
            className="relative group"
          >
            {/* Top accent line — only decoration, no box */}
            <div
              className="h-[1px] w-16 mb-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: m.color }}
            />
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xl">{m.icon}</span>
              <span
                className="text-5xl font-black leading-none tracking-tighter"
                style={{ color: m.color }}
              >
                {m.value}
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#EDEDED] mb-1">{m.label}</h3>
            <p className="text-[12px] text-[#a3a3a3] leading-relaxed">{m.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Testimonial — frameless editorial quote, centered */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="relative flex flex-col items-center text-center py-10 px-4"
      >
        {/* Giant decorative quote mark — faint, centered behind */}
        <span
          className="absolute top-0 left-1/2 -translate-x-1/2 font-serif leading-none select-none pointer-events-none"
          aria-hidden="true"
          style={{
            fontSize: "clamp(200px, 30vw, 320px)",
            color: "#10B981",
            opacity: 0.04,
            lineHeight: 1,
            top: "-40px",
          }}
        >
          &ldquo;
        </span>

        {/* Stars */}
        <div className="flex gap-1.5 mb-8 relative z-10" aria-label="5 star rating">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="text-amber-400 text-lg"
            >
              ★
            </motion.span>
          ))}
        </div>

        {/* Quote text */}
        <blockquote className="relative z-10 text-[#d4d4d4] text-base md:text-xl leading-[1.9] italic max-w-3xl font-light tracking-wide mb-10">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Thin divider */}
        <div className="w-10 h-[1px] bg-[#10B981] opacity-50 mb-6" />

        {/* Attribution */}
        <div className="relative z-10 flex flex-col items-center gap-1">
          <p className="text-sm font-bold text-[#EDEDED] tracking-wide">{testimonial.name}</p>
          <p className="text-[11px] font-mono text-[#a3a3a3]">
            {testimonial.role} &middot; {testimonial.org}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
