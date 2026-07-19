import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Gauge, GitBranch, Cpu } from "lucide-react";
import SystemArchitectureVisualizer from "./SystemArchitectureVisualizer";
import EngineeringTelemetry from "./EngineeringTelemetry";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: "spring" as const, stiffness: 60, damping: 15 } 
  }
};

const tagContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 15 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 80, damping: 15 } 
  }
};

const engineeringCapabilities = [
  { 
    title: "Software Architecture", 
    desc: "Component-driven design with SOLID principles. Modular React/TypeScript systems with strict separation of concerns and domain-driven structures.",
    Icon: Layers,
    gradient: "from-[#10B981] to-[#14B8A6]",
    glow: "rgba(16,185,129,0.35)"
  },
  { 
    title: "Performance Engineering", 
    desc: "Next.js ISR/SSG with Vercel edge caching, React.lazy code-splitting, WebGL memory lifecycle management, and sub-800ms RAG inference.",
    Icon: Gauge,
    gradient: "from-[#A855F7] to-[#6366F1]",
    glow: "rgba(168,85,247,0.35)"
  },
  { 
    title: "Infrastructure & CI/CD", 
    desc: "Automated deployment via Vercel + GitHub Actions. Supabase/Firebase backends with row-level security and real-time subscription handlers.",
    Icon: GitBranch,
    gradient: "from-[#3B82F6] to-[#14B8A6]",
    glow: "rgba(59,130,246,0.35)"
  },
  { 
    title: "Systems & Low-Level", 
    desc: "C++ STL binary I/O with ACID-style transaction rollback. Manual memory lifecycle management, object serialization, and deterministic resource cleanup.",
    Icon: Cpu,
    gradient: "from-[#14B8A6] to-[#10B981]",
    glow: "rgba(20,184,166,0.35)"
  }
];

const timelineData = [
  {
    title: "BS Software Engineering (3rd Year)",
    sub: "Air University Islamabad // 2022 - Present",
    desc: "Studying software architecture, distributed systems, data structures, and cloud computing. Maintaining high academic standing while shipping production code.",
    color: "#3B82F6"
  },
  {
    title: "Autonomous AI-Agent & RAG Interface",
    sub: "Web Engineering // 2025",
    desc: "Architected a developer portfolio with integrated RAG AI chatbot, volumetric 3D skills globe via custom GLSL shaders, and physics-based animation pipelines.",
    color: "#10B981"
  },
  {
    title: "IoT Smart Helmet Safety System",
    sub: "Embedded Systems // 2025",
    desc: "Engineered an IoT-based Smart Helmet with ESP32 sensor fusion, real-time hazard telemetry, and hardware-software integration for industrial worker safety.",
    color: "#14B8A6"
  },
  {
    title: "C++ Systems Engineering Suite",
    sub: "Systems Programming // 2023 - 2024",
    desc: "Built Student, Bank, and Hotel management engines using C++ 17 with atomic file staging, ACID-style transaction rollback, and polymorphic RAII architectures.",
    color: "#A855F7"
  }
];

// Modern scroll reveal text component for scrollytelling
function ScrollRevealText({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="flex flex-wrap gap-x-1.5 gap-y-1">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.22, y: 3 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.22, delay: Math.min(i * 0.007, 0.3) }}
          className="inline-block text-[#d4d4d4]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Standalone soft skill card with clean text highlight line
function CapabilityCard({ skill }: { skill: typeof engineeringCapabilities[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      whileTap={{ y: -3 }}
      className="p-8 md:p-9 border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-[12px] rounded-xl flex flex-col justify-between min-h-[200px] h-auto transition-all duration-300 relative overflow-hidden group select-none"
    >
      {/* Gradient top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${skill.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Icon */}
      <div className="mb-4 relative z-10">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.gradient} bg-opacity-10 flex items-center justify-center mb-3.5 border border-white/10`}>
          <skill.Icon size={19} className="text-white opacity-90" strokeWidth={1.8} />
        </div>
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1.5">
          <span className="soft-skill-title">
            {skill.title}
          </span>
        </h3>
      </div>
      <p className="text-[13px] text-[#a3a3a3] leading-relaxed md:leading-loose flex-grow relative z-10">{skill.desc}</p>
    </motion.div>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState<"story" | "timeline">("story");

  return (
    <section id="about" className="py-12 px-6 md:px-12 max-w-[1440px] mx-auto relative z-10 bg-transparent">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column: Text Content / Tabs */}
        <div className="lg:col-span-7">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.25em] text-[#10B981] uppercase block mb-3 font-black"
          >
            01 // ABOUT ME
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight mb-6 text-[var(--text-primary)]"
          >
            About Me
          </motion.h2>

          {/* Interactive Navigation Tab switch */}
          <div className="flex gap-2 mb-8 select-none w-full">
            <button
              onClick={() => setActiveTab("story")}
              className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 text-[10px] sm:text-xs font-mono font-bold tracking-wider relative transition-all duration-300 cursor-pointer whitespace-nowrap rounded-full border ${
                activeTab === "story"
                  ? "text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                  : "text-[#b0b0b0] bg-transparent border-[var(--glass-border)] hover:text-[#EDEDED] hover:border-[#EDEDED]/20"
              }`}
            >
              STORY & BACKGROUND
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2.5 text-[10px] sm:text-xs font-mono font-bold tracking-wider relative transition-all duration-300 cursor-pointer whitespace-nowrap rounded-full border ${
                activeTab === "timeline"
                  ? "text-[#60A5FA] bg-[#60A5FA]/10 border-[#60A5FA]/30 shadow-[0_0_12px_rgba(96,165,250,0.15)]"
                  : "text-[#b0b0b0] bg-transparent border-[var(--glass-border)] hover:text-[#EDEDED] hover:border-[#EDEDED]/20"
              }`}
            >
              ACADEMIC & PROJECTS
            </button>
          </div>
          
          <AnimatePresence mode="wait">
            {activeTab === "story" ? (
              <motion.div 
                key="story"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 text-[#d4d4d4] text-sm md:text-[0.95rem] !leading-[1.7]"
              >
                <p className="text-[var(--text-primary)] text-lg font-medium">
                  Engineering systems that scale — from embedded to enterprise
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="text-[#10B981] mt-1 font-bold">▹</span>
                    <div>
                      <ScrollRevealText 
                        text="Software Engineer with 4+ years shipping production systems — from real-time IoT telemetry to AI-augmented web interfaces. BS Software Engineering (3rd Year), Air University."
                      />
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#3B82F6] mt-1 font-bold">▹</span>
                    <div>
                      <ScrollRevealText 
                        text="Designed and deployed end-to-end systems across the full stack: Next.js SSR/ISR frontends, Node.js services, C++ embedded controllers, and RAG-powered LLM interfaces."
                      />
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#A855F7] mt-1 font-bold">▹</span>
                    <div>
                      <ScrollRevealText 
                        text="Enforce SOLID architecture principles, strict TypeScript contracts, and automated CI/CD pipelines on every project. Zero tolerance for technical debt in deliverables."
                      />
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#14B8A6] mt-1 font-bold">▹</span>
                    <div>
                      <ScrollRevealText 
                        text="Currently deepening expertise in distributed systems, React Native cross-platform deployment, and cloud-native infrastructure (AWS/GCP)."
                      />
                    </div>
                  </li>
                </ul>

                {/* Quick traits tags */}
                <motion.div 
                  variants={tagContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex flex-wrap gap-2.5 pt-4"
                >
                  {["SOLID Principles", "CI/CD Automation", "Performance-First", "Type-Safe Systems", "Edge-Deployed"].map((trait) => (
                    <motion.span 
                      key={trait} 
                      variants={tagVariants}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3.5 py-1.5 rounded-full border border-[var(--glass-border)] text-xs text-[var(--text-primary)] bg-[var(--glass-bg)] font-medium cursor-default"
                    >
                      {trait}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="relative border-l border-[#262626] ml-4 pl-8 py-2 space-y-8 select-none"
              >
                {timelineData.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="relative"
                  >
                    {/* Glowing Timeline Marker */}
                    <span 
                      className="absolute -left-[38px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0A0A0A] border-2" 
                      style={{ borderColor: item.color }}
                    >
                      <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full opacity-75" style={{ backgroundColor: item.color }} />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: item.color }} />
                    </span>

                    <h4 className="text-base font-bold text-[#EDEDED] leading-tight mb-1">{item.title}</h4>
                    <span className="font-mono text-[9px] text-[#a3a3a3] uppercase tracking-wider block mb-2 font-semibold">{item.sub}</span>
                    <p className="text-[13px] text-[#a3a3a3] leading-relaxed max-w-xl">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right column: Soft skills grid with cursor spotlight and gradient top-border */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {engineeringCapabilities.map((skill) => (
            <CapabilityCard key={skill.title} skill={skill} />
          ))}
        </motion.div>

      </div>

      {/* Interactive System Architecture Explorer */}
      <div className="mt-10">
        <SystemArchitectureVisualizer />
      </div>
    </section>
  );
}
