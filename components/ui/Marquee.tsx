import React from "react";

export default function Marquee() {
  const items = [
    "REACT.JS", "NEXT.JS", "NODE.JS", "C++", "JAVA", 
    "FIREBASE", "API INTEGRATION", "DEVELOPMENT", 
    "CLEAN CODE", "UI/UX DESIGN", "TAILWIND CSS"
  ];

  // Repeat items to fill space and guarantee seamless loop
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden py-6 bg-[var(--glass-bg)] border-y border-[var(--glass-border)] relative z-10 select-none">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-xs md:text-sm font-mono tracking-widest text-[var(--text-secondary)]/60">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-12 font-bold hover:text-[var(--accent-emerald)] transition-colors duration-200">
            <span>{item}</span>
            <span className="text-[var(--accent-emerald)] font-black">//</span>
          </div>
        ))}
      </div>
    </div>
  );
}
