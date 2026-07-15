"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image as DreiImage, Text, Loader } from "@react-three/drei";
import * as THREE from "three";
import { portfolioData, Project } from "../../data/portfolio";
import Image from "next/image";
import dynamic from "next/dynamic";

const ArchitectureDiagram = dynamic(() => import("./ArchitectureDiagram"), { ssr: false });

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

// Camera zoom and positioning script
function CameraController({
  activeNode,
  projectsCount
}: {
  activeNode: number | null;
  projectsCount: number;
}) {
  const { camera } = useThree();

  useFrame(() => {
    let targetX = 0;
    let targetY = 0.2;
    let targetZ = 9.0; // Pushed camera back to Z=9.0 for perfect readability

    if (activeNode !== null) {
      const angle = (activeNode / projectsCount) * Math.PI * 2;
      const radius = 5.0;
      // Focus camera closely on the selected node
      targetX = Math.sin(angle) * (radius - 2.8);
      targetZ = Math.cos(angle) * (radius - 2.8);
      targetY = 0.05;
    }

    camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.08);
  });

  return null;
}

// Interactive holographic WebGL card component
function WebGLProjectCard({
  project,
  idx,
  activeNode,
  hoveredNode,
  setHoveredNode,
  onClick
}: {
  project: Project;
  idx: number;
  activeNode: number | null;
  hoveredNode: number | null;
  setHoveredNode: (n: number | null) => void;
  onClick: () => void;
}) {
  const color = getGlowColor(project.tags);
  const isSelected = activeNode === idx;
  const isHovered = hoveredNode === idx;

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredNode(idx);
      }}
      onPointerOut={() => setHoveredNode(null)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {/* 1. Fully Transparent Background Card Backing */}
      <mesh>
        <planeGeometry args={[2.2, 3.2]} />
        <meshBasicMaterial transparent opacity={0} material-side={THREE.FrontSide} />
      </mesh>

      {/* 2. Floating Thumbnail Image */}
      <group position={[0, 0.65, 0.01]}>
        <DreiImage
          url={project.image}
          transparent
          opacity={isHovered || isSelected ? 0.95 : 0.45}
          scale={[2.0, 1.25]}
          material-side={THREE.FrontSide}
        />
      </group>

      {/* 3. Category Monospace Subheading */}
      <Text
        position={[-1.0, -0.2, 0.02]}
        anchorX="left"
        fontSize={0.08}
        color={color}
        material-side={THREE.FrontSide}
      >
        {`// 0${idx + 1}`}
      </Text>

      {/* 4. Project Title Text */}
      <Text
        position={[-1.0, -0.42, 0.02]}
        anchorX="left"
        fontSize={0.13}
        fontWeight="bold"
        color="#FFFFFF"
        maxWidth={2.0}
        material-side={THREE.FrontSide}
      >
        {project.title}
      </Text>

      {/* 5. Outcome-focused Description */}
      <Text
        position={[-1.0, -0.85, 0.02]}
        anchorX="left"
        fontSize={0.085}
        color="#a3a3a3"
        maxWidth={2.0}
        lineHeight={1.4}
        material-side={THREE.FrontSide}
      >
        {project.description}
      </Text>

      {/* 6. Tags (Render first two tags) */}
      <Text
        position={[-1.0, -1.35, 0.02]}
        anchorX="left"
        fontSize={0.075}
        color={color}
        maxWidth={2.0}
        material-side={THREE.FrontSide}
      >
        {project.tags.slice(0, 2).join(" · ")}
      </Text>

      {/* 7. Case Study Action Indicator */}
      <Text
        position={[-1.0, -1.52, 0.02]}
        anchorX="left"
        fontSize={0.07}
        color="#EDEDED"
        material-side={THREE.FrontSide}
      >
        {isSelected ? "Active Case Study" : "Click to view case study →"}
      </Text>
    </group>
  );
}

// 3D Carousel component containing project card meshes
function ProjectCarousel3D({
  projects,
  onSelectProject,
  activeNode,
  setActiveNode
}: {
  projects: Project[];
  onSelectProject: (p: Project) => void;
  activeNode: number | null;
  setActiveNode: (n: number | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useFrame((state) => {
    if (groupRef.current && activeNode === null && hoveredNode === null) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }
  });

  const radius = 5.0; // Scaled down carousel radius for perfect visual framing

  return (
    <group ref={groupRef}>
      {projects.map((project, idx) => {
        const angle = (idx / projects.length) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <group
            key={project.id}
            position={[x, 0, z]}
            rotation={[0, -angle, 0]}
          >
            <WebGLProjectCard
              project={project}
              idx={idx}
              activeNode={activeNode}
              hoveredNode={hoveredNode}
              setHoveredNode={setHoveredNode}
              onClick={() => {
                setActiveNode(idx);
                onSelectProject(project);
              }}
            />
          </group>
        );
      })}
    </group>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const projects = portfolioData.projects as unknown as Project[];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          Spatial Showcase
        </h2>
        <span className="font-mono text-[var(--text-secondary)] text-sm font-semibold tracking-wider shrink-0">
          ({projects.length})
        </span>
      </div>

      {/* R3F WebGL Spatial Canvas for Desktop / CSS Scroll-Snap for Mobile */}
      <div className="relative w-full h-[550px] rounded-3xl border border-white/10 bg-[#070707] overflow-hidden flex items-center justify-center">
        {!isMobile ? (
          <Suspense fallback={
            <div className="text-xs font-mono text-neutral-400 flex flex-col items-center gap-3">
              <span className="w-6 h-6 border-2 border-[#10B981] border-t-transparent rounded-full animate-spin"></span>
              Initializing spatial coordinate grid...
            </div>
          }>
            <Canvas camera={{ position: [0, 0.2, 9], fov: 45 }} className="w-full h-full">
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <ProjectCarousel3D
                projects={projects}
                onSelectProject={(p) => setSelectedProject(p)}
                activeNode={activeNode}
                setActiveNode={setActiveNode}
              />
              <CameraController activeNode={activeNode} projectsCount={projects.length} />
            </Canvas>
            <Loader />
          </Suspense>
        ) : (
          /* Gracefully degraded Mobile CSS Scroll-Snap Container */
          <div className="w-full h-full flex items-center overflow-x-auto snap-x snap-mandatory px-6 gap-6 hide-scrollbar py-6">
            {projects.map((project, idx) => {
              const color = getGlowColor(project.tags);
              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="snap-center shrink-0 w-[280px] h-[420px] rounded-2xl border border-white/10 bg-black/90 p-5 flex flex-col justify-between"
                >
                  <div className="relative w-full h-[180px] rounded-lg overflow-hidden border border-white/5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="250px"
                      className="object-cover opacity-80"
                    />
                    <div
                      className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-mono font-bold tracking-widest text-black"
                      style={{ background: color }}
                    >
                      0{idx + 1}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between mt-4">
                    <div>
                      <h4 className="text-[9px] font-mono text-[#a3a3a3] uppercase tracking-widest">
                        // {project.id.split("-")[0].toUpperCase()}
                      </h4>
                      <h3 className="text-sm font-bold text-white mt-1 leading-snug line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-[11px] text-[#a3a3a3] mt-2 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-4">
                      {project.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/10 text-[#a3a3a3]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SEO & Screen Reader Accessibility Layer */}
      <div className="sr-only">
        {projects.map((project) => (
          <article key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* ── Project Detail Case Study Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0A0A0A]/85 backdrop-blur-md z-[999] flex items-center justify-center p-4 sm:p-6"
            onClick={() => {
              setSelectedProject(null);
              setActiveNode(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-[#121212] border border-[var(--glass-border)] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setActiveNode(null);
                }}
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

              <div className="space-y-2">
                <h4 className="text-[10px] font-mono text-[#3B82F6] tracking-widest uppercase font-bold">// SUMMARY</h4>
                <p className="text-sm text-[#d4d4d4] leading-relaxed">{selectedProject.description}</p>
              </div>

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

              {selectedProject.id === "ai-portfolio" && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono text-[#3B82F6] tracking-widest uppercase font-bold">// SYSTEM ARCHITECTURE DIAGRAM</h4>
                  <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#262626]">
                    <ArchitectureDiagram />
                  </div>
                </div>
              )}

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
