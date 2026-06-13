import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../../data/portfolio";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative z-10 border-t border-[var(--glass-border)]">
      <motion.span 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs font-mono tracking-widest text-[var(--accent-emerald)] uppercase block mb-3"
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

      {/* Bento Grid layout */}
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
        {portfolioData.projects.map((project, idx) => (
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
              index={idx + 1}
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              github={project.github}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
