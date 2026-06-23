import React from "react";

// Accent-colored items (every 4th item gets a color)
const PRIMARY_ITEMS = [
  { text: "REACT.JS", accent: true },
  { text: "NEXT.JS", accent: false },
  { text: "NODE.JS", accent: false },
  { text: "C++", accent: false },
  { text: "FIREBASE", accent: true },
  { text: "API INTEGRATION", accent: false },
  { text: "DEVELOPMENT", accent: false },
  { text: "CLEAN CODE", accent: false },
  { text: "UI/UX DESIGN", accent: true },
  { text: "TAILWIND CSS", accent: false },
  { text: "JAVASCRIPT", accent: false },
  { text: "TYPESCRIPT", accent: false },
];

const SECONDARY_ITEMS = [
  { text: "AI PORTFOLIO", accent: true },
  { text: "THREE.JS", accent: false },
  { text: "FRAMER MOTION", accent: false },
  { text: "GSAP", accent: false },
  { text: "PROBLEM SOLVER", accent: true },
  { text: "OPEN SOURCE", accent: false },
  { text: "COLLABORATIONS", accent: false },
  { text: "CLOUD COMPUTING", accent: false },
  { text: "REACT NATIVE", accent: true },
  { text: "GIT", accent: false },
  { text: "OOP", accent: false },
  { text: "QUICK LEARNER", accent: false },
];

// Duplicate to ensure seamless infinite loop
const makeRow = (items: typeof PRIMARY_ITEMS) => [...items, ...items, ...items];

export default function Marquee() {
  const row1 = makeRow(PRIMARY_ITEMS);
  const row2 = makeRow(SECONDARY_ITEMS);

  return (
    <div className="w-full overflow-hidden py-4 bg-[var(--glass-bg)] border-y border-[var(--glass-border)] relative z-10 select-none space-y-1">
      {/* Row 1 — left to right */}
      <div className="animate-marquee whitespace-nowrap flex items-center gap-10 text-xs md:text-sm font-mono tracking-widest">
        {row1.map((item, idx) => (
          <div key={`r1-${idx}`} className="flex items-center gap-10">
            <span
              className={`transition-colors duration-200 hover:opacity-100 ${
                item.accent
                  ? "text-[var(--accent-emerald)] font-black"
                  : "text-[var(--text-secondary)]/55 font-bold"
              }`}
            >
              {item.text}
            </span>
            <span className="text-[var(--accent-emerald)] font-black opacity-50">//</span>
          </div>
        ))}
      </div>

      {/* Row 2 — right to left (reverse direction) */}
      <div className="animate-marquee-reverse whitespace-nowrap flex items-center gap-10 text-xs md:text-sm font-mono tracking-widest">
        {row2.map((item, idx) => (
          <div key={`r2-${idx}`} className="flex items-center gap-10">
            <span
              className={`transition-colors duration-200 hover:opacity-100 ${
                item.accent
                  ? "text-[#3B82F6] font-black"
                  : "text-[var(--text-secondary)]/40 font-bold"
              }`}
            >
              {item.text}
            </span>
            <span className="text-[#3B82F6] font-black opacity-40">//</span>
          </div>
        ))}
      </div>
    </div>
  );
}
