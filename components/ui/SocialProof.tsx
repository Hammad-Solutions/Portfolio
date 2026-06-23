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

// Placeholder testimonial — replace with a real quote
const testimonial = {
  quote:
    "Hammad has an exceptional ability to translate complex technical requirements into elegant, working solutions. His attention to detail and understanding of modern web technologies is well above average for his experience level.",
  name: "Dr. / Sir [Name]",
  role: "Supervisor",
  org: "Air University Islamabad",
  initials: "AU",
  color: "#3B82F6",
};

export default function SocialProof() {
  return (
    <section
      id="social-proof"
      className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto relative z-10 border-t border-[var(--glass-border)]"
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

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 60, damping: 14 }}
            whileHover={{ y: -4 }}
            className="p-6 border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl rounded-2xl relative overflow-hidden group"
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(90deg, ${m.color}, transparent)` }}
            />
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">{m.icon}</span>
              <span
                className="text-4xl font-black leading-none"
                style={{ color: m.color }}
              >
                {m.value}
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#EDEDED] mb-1">{m.label}</h3>
            <p className="text-[12px] text-[#737373] leading-relaxed">{m.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="relative p-8 border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl rounded-2xl overflow-hidden"
      >
        {/* Background quote mark */}
        <span
          className="absolute top-3 left-5 text-[8rem] leading-none font-serif text-[#262626] select-none pointer-events-none"
          aria-hidden="true"
        >
          "
        </span>

        <div className="relative z-10">
          {/* Stars */}
          <div className="flex gap-1 mb-4" aria-label="5 star rating">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="text-amber-400 text-base"
              >
                ★
              </motion.span>
            ))}
          </div>

          <blockquote className="text-[#d4d4d4] text-sm md:text-base leading-relaxed italic mb-6 max-w-3xl">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>

          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: `${testimonial.color}30`, border: `1px solid ${testimonial.color}40` }}
            >
              {testimonial.initials}
            </div>
            <div>
              <p className="text-sm font-bold text-[#EDEDED]">{testimonial.name}</p>
              <p className="text-[11px] font-mono text-[#737373]">
                {testimonial.role} · {testimonial.org}
              </p>
            </div>
            <span className="ml-auto text-[10px] font-mono text-[#525252] px-2 py-1 border border-[#262626] rounded-full">
              PLACEHOLDER — REPLACE WITH REAL QUOTE
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
