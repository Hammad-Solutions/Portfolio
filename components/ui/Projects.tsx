import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData, Project } from "../../data/portfolio";
import Image from "next/image";
import dynamic from "next/dynamic";

const ArchitectureDiagram = dynamic(() => import("./ArchitectureDiagram"), { ssr: false });

// Map the first tag of each project to a glow color
function getGlowColor(tags: readonly string[]): string {
  const firstTag = tags[0]?.toLowerCase() ?? "";
  if (firstTag.includes("next") || firstTag.includes("react") || firstTag.includes("javascript")) return "#14B8A6";
  if (firstTag.includes("c++") || firstTag.includes("java") || firstTag.includes("html")) return "#3B82F6";
  if (firstTag.includes("ai") || firstTag.includes("three") || firstTag.includes("framer")) return "#10B981";
  return "#A855F7";
}

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projects = portfolioData.projects as unknown as Project[];
  const featured = projects[0];
  const rest = projects.slice(1);
  const featuredColor = getGlowColor(featured.tags);

  return (
    <section id="projects" className="py-16 px-6 md:px-12 max-w-[1440px] mx-auto relative z-10">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[10px] font-mono tracking-[0.25em] text-[#14B8A6] uppercase block mb-3 font-black"
      >
        03 // PORTFOLIO
      </motion.span>

      <div className="flex items-center gap-6 mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight shrink-0 text-[var(--text-primary)]">
          Featured Projects
        </h2>
        <span className="font-mono text-[var(--text-secondary)] text-sm font-semibold tracking-wider shrink-0">
          ({portfolioData.projects.length})
        </span>
      </div>

      {/* ── Featured Project — compact 2-col editorial layout ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 55, damping: 14 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-14 group cursor-pointer overflow-hidden rounded-2xl border border-[var(--glass-border)]"
        onClick={() => setSelectedProject(featured)}
        style={{ borderColor: `${featuredColor}22` }}
      >
        {/* Left: Image */}
        <div className="relative h-[240px] md:h-[320px] overflow-hidden">
          <Image
            src={featured.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop"}
            alt={featured.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-85"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0A0A]/90 hidden md:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent md:hidden" />
          {/* Featured pill */}
          <div
            className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest text-black"
            style={{ background: featuredColor }}
          >
            <span>★</span> FEATURED
          </div>
        </div>

        {/* Right: Meta */}
        <div
          className="flex flex-col justify-between p-7 md:p-8"
          style={{ background: "rgba(10,10,10,0.55)" }}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[#a3a3a3] text-[10px] font-semibold tracking-widest">
                01 // {featured.id.split("-")[0].toUpperCase()}
              </span>
              <div className="flex items-center gap-2">
                {featured.github && (
                  <a
                    href={featured.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="text-[#a3a3a3] hover:text-[#10B981] transition-colors p-1.5 border border-[var(--glass-border)] rounded-full hover:border-[#10B981]"
                  >
                    <GithubIcon />
                  </a>
                )}
                {featured.demo && (
                  <a
                    href={featured.demo}
                    target="_blank"
                    rel="noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="text-[10px] font-mono font-bold px-3 py-1 rounded-full border transition-all duration-300"
                    style={{ borderColor: `${featuredColor}44`, color: featuredColor }}
                  >
                    Live ↗
                  </a>
                )}
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#EDEDED] leading-snug mb-3">
              {featured.title}
            </h3>
            <p className="text-[#a3a3a3] text-sm leading-relaxed line-clamp-3 mb-5">
              {featured.description}
            </p>
          </div>

          {/* Tags + CTA */}
          <div>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-mono px-2 py-0.5 rounded-md border"
                  style={{ borderColor: `${featuredColor}30`, color: featuredColor, background: `${featuredColor}0a` }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              className="text-[10px] font-mono font-bold text-[#a3a3a3] hover:text-[#EDEDED] transition-colors flex items-center gap-1.5 group/btn"
              onClick={() => setSelectedProject(featured)}
            >
              <span>View Case Study</span>
              <span className="transition-transform group-hover/btn:translate-x-0.5">→</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Remaining Projects — compact 3-col grid ── */}
      <motion.div
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {rest.map((project, idx) => {
          const color = getGlowColor(project.tags);
          return (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 70, damping: 14 } }
              }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedProject(project)}
              className="relative border border-[var(--glass-border)] rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300"
              style={{ background: "rgba(10,10,10,0.5)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}35`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--glass-border)"; }}
            >
              {/* Image strip */}
              <div className="relative h-[180px] overflow-hidden">
                <Image
                  src={project.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop"}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover grayscale contrast-110 opacity-50 group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Colour accent at top */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-[#a3a3a3] tracking-widest uppercase">
                    {String(idx + 2).padStart(2, "0")} // {project.id.split("-")[0].toUpperCase()}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-[#a3a3a3] hover:text-[#10B981] transition-colors p-1 border border-[#262626] rounded-full hover:border-[#10B981]"
                      >
                        <GithubIcon />
                      </a>
                    )}
                    <span className="text-[#a3a3a3] text-sm group-hover:text-[#EDEDED] transition-colors">↗</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#EDEDED] mb-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-[13px] text-[#a3a3a3] leading-relaxed line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md border"
                      style={{ borderColor: `${color}30`, color: `${color}cc`, background: `${color}0a` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Project Detail Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0A0A0A]/85 backdrop-blur-md z-[999] flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-[#121212] border border-[var(--glass-border)] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 text-[#a3a3a3] hover:text-[#EDEDED] transition-colors p-1.5 border border-[#262626] rounded-full hover:border-[#EDEDED]/20 bg-[#0A0A0A]/50 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div>
                <span className="font-mono text-[10px] text-[#a3a3a3] tracking-widest block uppercase mb-1">PROJECT SPECIFICATIONS</span>
                <h3 className="text-2xl font-extrabold text-[#EDEDED] tracking-tight">{selectedProject.title}</h3>
              </div>

              {/* Cover Image */}
              <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden relative border border-[#262626]/60">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 95vw, 600px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono text-[#3B82F6] tracking-widest uppercase font-bold">// SUMMARY</h4>
                <p className="text-sm text-[#d4d4d4] leading-relaxed">{selectedProject.description}</p>
              </div>

              {/* Architecture */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono text-[#10B981] tracking-widest uppercase font-bold">// ARCHITECTURE & LAYERS</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.architecture.map((layer) => (
                    <span key={layer} className="px-2.5 py-1 text-[11px] font-mono text-[#EDEDED] bg-[#0A0A0A] border border-[#262626] rounded-md">
                      {layer}
                    </span>
                  ))}
                </div>
              </div>

              {/* RAG Architecture Diagram — only for ai-portfolio */}
              {selectedProject.id === "ai-portfolio" && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono text-[#3B82F6] tracking-widest uppercase font-bold">// SYSTEM ARCHITECTURE DIAGRAM</h4>
                  <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#262626]">
                    <ArchitectureDiagram />
                  </div>
                </div>
              )}

              {/* Impact Metrics */}
              {selectedProject.impact && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono text-[#3B82F6] tracking-widest uppercase font-bold">// OUTCOME & IMPACT</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedProject.impact.map((metric, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#0A0A0A] border border-[#262626] flex flex-col justify-center">
                        <p className="text-[10px] font-mono text-[#a3a3a3] uppercase mb-1">{metric.label}</p>
                        <p className="text-xl font-bold text-[#EDEDED]">
                          <span className="text-[#10B981]">{metric.value}</span>
                          {metric.unit && <span className="text-sm text-[#a3a3a3] ml-0.5">{metric.unit}</span>}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges & Solutions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#ef4444]/5 border border-[#ef4444]/15 space-y-2">
                  <h5 className="text-[11px] font-mono text-red-400 font-bold uppercase tracking-wider">CHALLENGE</h5>
                  <p className="text-xs text-[#a3a3a3] leading-relaxed">{selectedProject.challenges}</p>
                </div>
                <div className="p-4 rounded-xl bg-[#10b981]/5 border border-[#10b981]/15 space-y-2">
                  <h5 className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">SOLUTION</h5>
                  <p className="text-xs text-[#a3a3a3] leading-relaxed">{selectedProject.solutions}</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#262626]/50">
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#262626] hover:border-[#10B981] text-xs font-bold text-[#EDEDED] bg-[#0A0A0A] hover:bg-[#10b981]/5 transition-all duration-300">
                    <GithubIcon /> Source Code
                  </a>
                )}
                {selectedProject.demo && (
                  <a href={selectedProject.demo} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#10b981]/90 text-xs font-bold text-[#000000] transition-all duration-300">
                    Live Demo ↗
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
