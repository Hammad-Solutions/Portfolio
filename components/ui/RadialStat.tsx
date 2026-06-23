"use client";

import { motion } from "framer-motion";

interface RadialStatProps {
  value: number;       // 0-100 for progress ring
  displayValue: string; // e.g. "04+"
  label: string;
  sublabel?: string;
  color: string;
  size?: number;
  delay?: number;
}

export default function RadialStat({
  value,
  displayValue,
  label,
  sublabel,
  color,
  size = 90,
  delay = 0,
}: RadialStatProps) {
  const radius = 34;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * Math.min(value, 100)) / 100;

  return (
    <div className="flex flex-col items-center gap-2 group">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          className="rotate-[-90deg]"
        >
          {/* Track */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          {/* Animated progress arc */}
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: "easeOut", delay }}
            style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-[1.05rem] font-extrabold leading-none"
            style={{ color }}
          >
            {displayValue}
          </span>
        </div>
      </div>
      <div className="text-center">
        <span className="block text-[10px] font-mono font-bold text-[#EDEDED] uppercase tracking-wider">
          {label}
        </span>
        {sublabel && (
          <span className="block text-[9px] font-mono text-[#525252] uppercase tracking-wide mt-0.5">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
