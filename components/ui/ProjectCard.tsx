import React, { useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

interface ProjectCardProps {
  id: string;
  index: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  glowColor?: string;
  onOpenDetails: () => void;
  featured?: boolean;
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

export default function ProjectCard({ id, index, title, description, tags, image, github, glowColor = "#FFFFFF", onOpenDetails, featured = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation angles
    const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -5;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 5;

    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 1000,
      borderColor: "rgba(255, 255, 255, 0.08)",
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.25)",
      backgroundColor: "rgba(255, 255, 255, 0.018)",
      duration: 0.3,
      ease: "power2.out"
    });

    // Animate arrow
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        x: 3,
        y: -3,
        color: glowColor,
        borderColor: `${glowColor}44`,
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
      borderColor: "var(--glass-border)",
      boxShadow: "none",
      backgroundColor: "var(--glass-bg)",
      duration: 0.5,
      ease: "power2.out"
    });

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        x: 0,
        y: 0,
        color: "#EDEDED",
        borderColor: "var(--glass-border)",
        duration: 0.3
      });
    }
  };

  const shortCode = id.split("-")[0].toUpperCase();

  const handleClick = () => {
    onOpenDetails();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md rounded-2xl overflow-hidden select-none transition-all duration-300 shadow-sm group ${
        featured
          ? "flex flex-col md:flex-row cursor-pointer"
          : "flex flex-col justify-between p-6 h-[400px] cursor-pointer"
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {featured ? (
        /* Featured hero card: image left, content right (on md+) */
        <>
          <div className="relative md:w-1/2 h-[220px] md:h-auto overflow-hidden">
            <Image
              src={image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop"}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-90"
              loading="lazy"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0A0A]/80 hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent md:hidden" />
            {/* Featured badge */}
            <div
              className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider text-black"
              style={{ background: glowColor }}
            >
              Featured Project
            </div>
          </div>
          <div className="flex flex-col justify-between p-7 md:w-1/2" style={{ transform: "translateZ(30px)" }}>
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="mono-text text-[#a3a3a3] text-xs font-semibold">
                  {String(index).padStart(2, "0")} // {shortCode}
                </span>
                <div className="flex items-center gap-2">
                  {github && (
                    <div className="text-[#a3a3a3] group-hover:text-[#10B981] transition-colors duration-300 flex items-center justify-center p-1.5 border border-[var(--glass-border)] rounded-full hover:border-[#10B981]">
                      <GithubIcon />
                    </div>
                  )}
                  <div
                    ref={arrowRef}
                    className="w-8 h-8 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-xs font-semibold text-[#EDEDED] transition-colors group-hover:border-[#10B981] group-hover:text-[#10B981]"
                  >
                    ↗
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight text-[#EDEDED] leading-tight">
                {title}
              </h3>
              <p className="text-[#a3a3a3] text-sm leading-relaxed line-clamp-4 mb-4">
                {description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono text-[#EDEDED] bg-[#121212]/50 px-2 py-0.5 rounded-md border border-[var(--glass-border)] transition-all duration-300 hover:text-white hover:-translate-y-0.5 cursor-default select-none"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${glowColor}66`;
                    e.currentTarget.style.boxShadow = `0 0 10px ${glowColor}25`;
                    e.currentTarget.style.backgroundColor = `${glowColor}0a`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--glass-border)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.backgroundColor = "rgba(18, 18, 18, 0.5)";
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Standard card layout */
        <>
          <div className="flex flex-col flex-1" style={{ transform: "translateZ(30px)" }}>
            {/* Top Header */}
            <div className="flex justify-between items-center mb-4">
              <span className="mono-text text-[#a3a3a3] text-xs font-semibold">
                {String(index).padStart(2, "0")} // {shortCode}
              </span>
              <div className="flex items-center gap-2">
                {github && (
                  <div className="text-[#a3a3a3] group-hover:text-[#10B981] transition-colors duration-300 flex items-center justify-center p-1.5 border border-[var(--glass-border)] rounded-full hover:border-[#10B981]">
                    <GithubIcon />
                  </div>
                )}
                <div
                  ref={arrowRef}
                  className={`w-8 h-8 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-xs font-semibold text-[#EDEDED] transition-colors ${
                    github ? "group-hover:border-[#10B981] group-hover:text-[#10B981]" : ""
                  }`}
                >
                  ↗
                </div>
              </div>
            </div>

            {/* Project Visual Image */}
            <div className="w-full h-36 rounded-xl overflow-hidden mb-4 relative border border-[#262626]/50">
              <Image
                src={image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop"}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale contrast-110 opacity-60 group-hover:opacity-100 group-hover:grayscale-0"
                loading="lazy"
              />
            </div>

            {/* Project Info */}
            <h3 className="text-lg font-bold mb-2 tracking-tight text-[#EDEDED] leading-tight">
              <span className="soft-skill-title">{title}</span>
            </h3>
            <p className="text-[#a3a3a3] text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          <div
            className="flex flex-wrap gap-2 mt-4 relative z-10"
            style={{ transform: "translateZ(20px)" }}
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono text-[#EDEDED] bg-[#121212]/50 px-2 py-0.5 rounded-md border border-[var(--glass-border)] transition-all duration-300 hover:text-white hover:-translate-y-0.5 cursor-default select-none"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${glowColor}66`;
                  e.currentTarget.style.boxShadow = `0 0 10px ${glowColor}25`;
                  e.currentTarget.style.backgroundColor = `${glowColor}0a`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--glass-border)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.backgroundColor = "rgba(18, 18, 18, 0.5)";
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
