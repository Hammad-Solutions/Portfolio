"use client";

import { motion } from "framer-motion";

export default function MorphingBlob() {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{
        top: "5%",
        left: "-8%",
        width: "clamp(280px, 45vw, 620px)",
        height: "clamp(280px, 45vw, 620px)",
        background:
          "radial-gradient(circle at 40% 40%, rgba(16,185,129,0.07) 0%, rgba(59,130,246,0.04) 50%, transparent 70%)",
        filter: "blur(60px)",
        zIndex: 2,
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
      }}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 16,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}
