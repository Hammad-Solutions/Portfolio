import React, { useRef } from "react";
import gsap from "gsap";

interface ProjectCardProps {
  id: string;
  index: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
}

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function ProjectCard({ id, index, title, description, tags, image, github }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation angles
    const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -5; // max -5deg
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 5; // max 5deg

    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 1000,
      borderColor: "#EDEDED", // Alabaster
      boxShadow: "0 10px 30px -15px rgba(255, 255, 255, 0.08)",
      backgroundColor: "rgba(255, 255, 255, 0.04)", // var(--glass-hover)
      duration: 0.3,
      ease: "power2.out"
    });

    // Move the radial glow tracker (monochrome soft white glow)
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.06,
        left: x,
        top: y,
        duration: 0.2,
        ease: "power2.out"
      });
    }

    // Animate arrow
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        x: 3,
        y: -3,
        color: "#EDEDED",
        borderColor: "rgba(255, 255, 255, 0.2)",
        duration: 0.2
      });
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      borderColor: "#262626", // var(--glass-border)
      boxShadow: "none",
      backgroundColor: "rgba(255, 255, 255, 0.02)", // var(--glass-bg)
      duration: 0.5,
      ease: "power2.out"
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0,
        duration: 0.5
      });
    }

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        x: 0,
        y: 0,
        color: "#EDEDED", // var(--text-primary)
        borderColor: "#262626", // var(--glass-border)
        duration: 0.3
      });
    }
  };

  const shortCode = id.split("-")[0].toUpperCase();

  const handleClick = () => {
    if (github) {
      window.open(github, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative flex flex-col justify-between border border-[#262626] bg-[#121212]/30 p-6 rounded-2xl h-[400px] overflow-hidden select-none transition-all duration-300 shadow-sm group ${
        github ? "cursor-pointer" : "cursor-default"
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Dynamic Glow Background */}
      <div
        ref={glowRef}
        className="absolute w-[200px] h-[200px] rounded-full bg-white opacity-0 blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"
      />

      <div className="flex flex-col flex-1" style={{ transform: "translateZ(30px)" }}>
        {/* Top Header */}
        <div className="flex justify-between items-center mb-4">
          <span className="mono-text text-[#737373] text-xs font-semibold">
            {String(index).padStart(2, "0")} // {shortCode}
          </span>
          <div className="flex items-center gap-2">
            {github && (
              <div className="text-[#737373] group-hover:text-[#10B981] transition-colors duration-300 flex items-center justify-center p-1.5 border border-[#262626] rounded-full hover:border-[#10B981]">
                <GithubIcon />
              </div>
            )}
            <div 
              ref={arrowRef}
              className={`w-8 h-8 rounded-full border border-[#262626] flex items-center justify-center text-xs font-semibold text-[#EDEDED] transition-colors ${
                github ? "group-hover:border-[#10B981] group-hover:text-[#10B981]" : ""
              }`}
            >
              ↗
            </div>
          </div>
        </div>

        {/* Project Visual Image */}
        <div className="w-full h-36 rounded-xl overflow-hidden mb-4 relative border border-[#262626]/50">
          <img 
            src={image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop"} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale contrast-110 opacity-60 group-hover:opacity-100 group-hover:grayscale-0"
            loading="lazy"
          />
        </div>

        {/* Project Info */}
        <h3 className="text-lg font-bold mb-2 tracking-tight text-[#EDEDED] leading-tight">{title}</h3>
        <p className="text-[#737373] text-xs leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <div 
        className="flex flex-wrap gap-2 mt-4 relative z-10"
        style={{ transform: "translateZ(20px)" }}
      >
        {tags.map((tag) => (
          <span key={tag} className="text-[10px] font-mono text-[#EDEDED] bg-[#121212]/50 px-2 py-0.5 rounded-md border border-[#262626]">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
