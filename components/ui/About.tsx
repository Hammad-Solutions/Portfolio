import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Lightbulb, Users, Target } from "lucide-react";

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

const softSkillsData = [
  { 
    title: "Clean Code", 
    desc: "Writing maintainable, scalable, and efficient code that stands the test of time.",
    Icon: Code2,
    gradient: "from-[#10B981] to-[#14B8A6]",
    glow: "rgba(16,185,129,0.35)"
  },
  { 
    title: "Innovation", 
    desc: "Always exploring new technologies and creative solutions to complex problems.",
    Icon: Lightbulb,
    gradient: "from-[#A855F7] to-[#6366F1]",
    glow: "rgba(168,85,247,0.35)"
  },
  { 
    title: "Collaboration", 
    desc: "Working effectively with teams to deliver exceptional user experiences.",
    Icon: Users,
    gradient: "from-[#3B82F6] to-[#14B8A6]",
    glow: "rgba(59,130,246,0.35)"
  },
  { 
    title: "Dedication", 
    desc: "Committed to continuous learning and staying current with industry trends.",
    Icon: Target,
    gradient: "from-[#14B8A6] to-[#10B981]",
    glow: "rgba(20,184,166,0.35)"
  }
];

const timelineData = [
  {
    title: "BS Software Engineering (Final Year)",
    sub: "Air University Islamabad // 2022 - 2026",
    desc: "Focusing on software architecture, object-oriented systems, data structures, and cloud computing. Maintaining high academic standing.",
    color: "#3B82F6"
  },
  {
    title: "Autonomous AI-Agent & RAG Interface",
    sub: "Web Engineering // 2026",
    desc: "Built a next-generation developer portfolio featuring an integrated NLP RAG AI chatbot, 3D skills globe, and layout snapped grids.",
    color: "#10B981"
  },
  {
    title: "IoT Smart Helmet Safety System",
    sub: "Embedded Systems // 2025",
    desc: "Created an IoT-based Smart Helmet for worker safety with sensor integration and real-time hazard mapping.",
    color: "#14B8A6"
  },
  {
    title: "C++ Structural Management Databases",
    sub: "Systems Programming // 2023 - 2024",
    desc: "Developed Student, Bank, and Hotel Management systems using C++ OOP and robust temporary file-stream staging.",
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
function SoftSkillCard({ skill }: { skill: typeof softSkillsData[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      className="p-6 border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-[12px] rounded-xl flex flex-col justify-between min-h-[180px] h-auto transition-all duration-300 relative overflow-hidden group select-none"
    >
      {/* Gradient top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${skill.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Icon */}
      <div className="mb-3 relative z-10">
        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${skill.gradient} bg-opacity-10 flex items-center justify-center mb-3 border border-white/10`}>
          <skill.Icon size={18} className="text-white opacity-90" strokeWidth={1.8} />
        </div>
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
          <span className="soft-skill-title">
            {skill.title}
          </span>
        </h3>
      </div>
      <p className="text-[13px] text-[#a3a3a3] leading-relaxed flex-grow relative z-10">{skill.desc}</p>
    </motion.div>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState<"story" | "timeline">("story");

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto relative z-10 border-t border-[var(--glass-border)] bg-transparent">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column: Text Content / Tabs */}
        <div className="lg:col-span-7">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.25em] text-[#10B981] uppercase block mb-3 font-black"
          >
            01 // PROFILE
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
          <div className="flex border-b border-[var(--glass-border)] mb-8 select-none w-full">
            <button
              onClick={() => setActiveTab("story")}
              className={`flex-1 sm:flex-initial px-3 sm:px-6 py-2.5 text-[10px] sm:text-xs font-mono font-bold tracking-wider relative transition-colors duration-300 cursor-pointer whitespace-nowrap ${
                activeTab === "story" ? "text-[#10B981]" : "text-[#737373] hover:text-[#EDEDED]"
              }`}
            >
              STORY & BACKGROUND
              {activeTab === "story" && (
                <motion.div
                  layoutId="aboutTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#10B981]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={`flex-1 sm:flex-initial px-3 sm:px-6 py-2.5 text-[10px] sm:text-xs font-mono font-bold tracking-wider relative transition-colors duration-300 cursor-pointer whitespace-nowrap ${
                activeTab === "timeline" ? "text-[#3B82F6]" : "text-[#737373] hover:text-[#EDEDED]"
              }`}
            >
              ACADEMIC & PROJECTS TIMELINE
              {activeTab === "timeline" && (
                <motion.div
                  layoutId="aboutTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3B82F6]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
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
                className="space-y-6 text-[#d4d4d4] text-base md:text-[1.075rem] !leading-[1.8]"
              >
                <p className="text-[var(--text-primary)] text-lg font-medium">
                  Passionate about creating digital experiences that matter
                </p>
                <div>
                  <ScrollRevealText 
                    text="As a passionate Software Developer and a final-year Software Engineering student at Air University Islamabad, I specialize in building clean and efficient applications using React.js, Next.js, and Node.js. My journey in software development has been driven by a genuine interest in solving real-world problems."
                  />
                </div>
                <div>
                  <ScrollRevealText 
                    text="My project portfolio demonstrates my ability to tackle complex challenges, from developing a real-time WeatherApp using API integration to creating an IoT-based Smart Helmet for worker safety. I'm proficient in both front-end and back-end development and have a strong understanding of modern software design principles."
                  />
                </div>
                <div>
                  <ScrollRevealText 
                    text="Currently, I'm expanding my skills in Android App Development with React Native and exploring Software Architecture & Cloud Computing."
                  />
                </div>

                {/* Quick traits tags */}
                <motion.div 
                  variants={tagContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex flex-wrap gap-2.5 pt-4"
                >
                  {["Problem Solver", "Quick Learner", "Open to Collaborations", "Detail Oriented"].map((trait) => (
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
                    <span className="font-mono text-[9px] text-[#737373] uppercase tracking-wider block mb-2 font-semibold">{item.sub}</span>
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
          {softSkillsData.map((skill) => (
            <SoftSkillCard key={skill.title} skill={skill} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
