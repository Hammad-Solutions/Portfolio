import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Sprout } from "lucide-react";
import SkillsGlobe from "../canvas/SkillsGlobe";

const tagContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 70, damping: 14 } 
  }
};

export default function Skills() {
  const learning = [
    "Android App Development (React Native)",
    "Advanced Next.js & Firebase",
    "Software Architecture & Cloud Computing"
  ];

  const [cameraZ, setCameraZ] = useState(5.8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCameraZ(7.2);
      } else {
        setCameraZ(5.8);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto relative z-10 border-t border-[var(--glass-border)] bg-transparent">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[10px] font-mono tracking-[0.25em] text-[#3B82F6] uppercase block mb-3 font-black"
      >
        02 // CAPABILITIES
      </motion.span>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight mb-4 text-[#EDEDED]"
          >
            Skills & Technologies
          </motion.h2>
          <p className="text-[#a3a3a3] text-base md:text-[1.05rem] leading-relaxed max-w-xl">
            A dynamic, volumetric 3D representation of my technical capabilities. Hover over any node to inspect details.
          </p>
        </div>
      </div>

      {/* 3D Skills Globe Canvas Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-[380px] sm:h-[450px] md:h-[550px] overflow-hidden relative mb-12 flex items-center justify-center"
        style={{ touchAction: "pan-y" }}
      >
        {/* Subtle radial backdrop gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.035)_0%,transparent_70%)] pointer-events-none" />

        <Canvas 
          camera={{ position: [0, 0, cameraZ], fov: 45 }}
          style={{ touchAction: "pan-y" }}
        >
          <SkillsGlobe />
        </Canvas>
      </motion.div>

      {/* Currently Learning Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-8 bg-transparent flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            {/* SVG icon replacing the emoji */}
            <Sprout size={16} className="text-[#3B82F6]" strokeWidth={2} />
            <span className="text-xs font-mono font-bold text-[#3B82F6] tracking-widest uppercase">CURRENTLY FOCUSING ON</span>
          </div>
          <h4 className="text-lg font-bold text-[#EDEDED]">Expanding My Technical Horizon</h4>
        </div>

        <motion.div 
          variants={tagContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center md:justify-end"
        >
          {learning.map((topic) => (
            <motion.span
              key={topic}
              variants={tagVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                borderColor: "rgba(59,130,246,0.6)",
                boxShadow: "0 0 14px rgba(59,130,246,0.2)"
              }}
              className="px-4 py-2 border border-white/10 rounded-xl text-xs font-mono text-[#EDEDED] bg-transparent hover:bg-white/5 transition-all duration-300 cursor-default"
            >
              {topic}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}