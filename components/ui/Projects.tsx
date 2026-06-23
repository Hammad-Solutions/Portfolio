import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData, Project } from "../../data/portfolio";
import ProjectCard from "./ProjectCard";

// Map the first tag of each project to a glow color
function getGlowColor(tags: string[]): string {
  const firstTag = tags[0]?.toLowerCase() ?? "";

  if (firstTag.includes("next") || firstTag.includes("react") || firstTag.includes("javascript")) {
    return "#14B8A6"; // teal for React/Next.js
  }
  if (firstTag.includes("c++") || firstTag.includes("java") || firstTag.includes("html")) {
    return "#3B82F6"; // blue for C++/Java/HTML
  }
  if (firstTag.includes("ai") || firstTag.includes("three") || firstTag.includes("framer")) {
    return "#10B981"; // emerald for AI/3D
  }
  return "#A855F7"; // amethyst as fallback
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-[1440px] mx-auto relative z-10 border-t border-[var(--glass-border)]">
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[10px] font-mono tracking-[0.25em] text-[#14B8A6] uppercase block mb-3 font-black"
      >
        03 // PORTFOLIO
      </motion.span>
      
      {/* Header Grid Line */}
      <div className="flex items-center gap-6 mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight shrink-0 text-[var(--text-primary)]">
          Featured Projects
        </h2>
        <div className="h-[1px] flex-1 bg-[var(--glass-border)]" />
        <span className="mono-text text-[var(--text-secondary)] text-sm font-semibold tracking-wider shrink-0">
          ( {portfolioData.projects.length} )
        </span>
      </div>

      <p className="text-[var(--text-secondary)] text-sm md:text-base mb-12 max-w-xl">
        Here are some of my projects that demonstrate my ability to solve real-world problems through code.
      </p>

      {/* Featured Hero Project — first project spans full width */}
      {(portfolioData.projects as unknown as Project[]).slice(0, 1).map((project, idx) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 55, damping: 14 }}
          className="mb-6"
        >
          <ProjectCard
            id={project.id}
            index={idx + 1}
            title={project.title}
            description={project.description}
            tags={project.tags}
            image={project.image}
            github={project.github}
            glowColor={getGlowColor(project.tags)}
            onOpenDetails={() => setSelectedProject(project)}
            featured
          />
        </motion.div>
      ))}

      {/* Remaining Projects Grid */}
      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12
            }
          }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {(portfolioData.projects as unknown as Project[]).slice(1).map((project, idx) => (
          <motion.div
            key={project.id}
            variants={{
              hidden: { opacity: 0, y: 45, scale: 0.96 },
              visible: { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { 
                  type: "spring" as const,
                  stiffness: 60,
                  damping: 14
                } 
              }
            }}
          >
            <ProjectCard
              id={project.id}
              index={idx + 2}
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              github={project.github}
              glowColor={getGlowColor(project.tags)}
              onOpenDetails={() => setSelectedProject(project)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Expanded Project Details Modal */}
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
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 text-[#737373] hover:text-[#EDEDED] transition-colors p-1.5 border border-[#262626] rounded-full hover:border-[#EDEDED]/20 bg-[#0A0A0A]/50 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div>
                <span className="font-mono text-[10px] text-[#737373] tracking-widest block uppercase mb-1">
                  PROJECT SPECIFICATIONS
                </span>
                <h3 className="text-2xl font-extrabold text-[#EDEDED] tracking-tight">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Cover Image */}
              <div className="w-full h-48 sm:h-64 rounded-xl overflow-hidden relative border border-[#262626]/60">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono text-[#3B82F6] tracking-widest uppercase font-bold">// SUMMARY</h4>
                <p className="text-sm text-[#d4d4d4] leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Architecture Breakdown */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-mono text-[#10B981] tracking-widest uppercase font-bold">// ARCHITECTURE & LAYERS</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.architecture.map((layer) => (
                    <span
                      key={layer}
                      className="px-2.5 py-1 text-[11px] font-mono text-[#EDEDED] bg-[#0A0A0A] border border-[#262626] rounded-md"
                    >
                      {layer}
                    </span>
                  ))}
                </div>
              </div>

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
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#262626] hover:border-[#10B981] text-xs font-bold text-[#EDEDED] bg-[#0A0A0A] hover:bg-[#10b981]/5 transition-all duration-300 shadow-sm"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    Source Code
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#10b981]/90 text-xs font-bold text-[#000000] transition-all duration-300 shadow-md shadow-emerald-500/10"
                  >
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
