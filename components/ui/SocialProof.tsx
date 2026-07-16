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
    </section>
  );
}
