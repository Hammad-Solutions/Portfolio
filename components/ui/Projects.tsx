"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image as DreiImage, Text, Loader, RoundedBox, Html } from "@react-three/drei";
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

function WebGLProjectCard({
  project,
  idx,
  activeNode,
  totalNodes,
  onClick
}: {
  project: Project;
  idx: number;
  activeNode: number;
  totalNodes: number;
  onClick: () => void;
}) {
  const safeTags = project.tags || [];
  const safeDesc = project.description || "";
  const color = getGlowColor(safeTags);

  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const textRefs = useRef<any[]>([]);

  const cardWidth = 3.2;
  const cardHeight = 5.0;
  const imgHeight = 2.2;

  const isMultiLineTitle = project.title.length > 22;
  const descY = isMultiLineTitle ? -0.85 : -0.60;

  const isSelected = activeNode === idx;

  useFrame(() => {
    if (!groupRef.current) return;

    // Infinite looping offset math
    let offset = idx - activeNode;
    if (offset > totalNodes / 2) offset -= totalNodes;
    if (offset < -totalNodes / 2) offset += totalNodes;

    // Cover Flow Transformations
    const targetX = offset === 0 ? 0 : (offset > 0 ? offset * 1.8 + 0.8 : offset * 1.8 - 0.8);
    const targetZ = offset === 0 ? 1.5 : -Math.abs(offset) * 1.2;
    const targetRotY = offset === 0 ? 0 : (offset > 0 ? -Math.PI / 6 : Math.PI / 6);
    const targetScale = offset === 0 ? 0.8 : 0.65;

    // Smooth interpolations
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);

    const currentScale = groupRef.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08);
    groupRef.current.scale.set(newScale, newScale, newScale);

    // Dim inactive cards
    const targetOpacity = Math.abs(offset) > 3 ? 0 : 1;
    const isVisible = Math.abs(offset) <= 3;
    groupRef.current.visible = isVisible;

    if (materialRef.current) {
      materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, 0.08);
      // Brighten the center card slightly
      const targetColor = isSelected ? new THREE.Color("#161616") : new THREE.Color("#080808");
      materialRef.current.color.lerp(targetColor, 0.1);
    }

    textRefs.current.forEach(text => {
      if (text) {
        text.fillOpacity = THREE.MathUtils.lerp(text.fillOpacity || 0, targetOpacity, 0.08);
      }
    });
  });

  return (
    <group
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        // Prevent click trigger if the user was dragging the card (delta measures drag distance)
        if (e.delta > 5) return;
        onClick();
      }}
    >
      {/* Premium Solid Card Backing */}
      <RoundedBox args={[cardWidth, cardHeight, 0.1]} radius={0.12} smoothness={4}>
        <meshStandardMaterial
          ref={materialRef}
          color="#080808"
          roughness={0.4}
          metalness={0.6}
          transparent={true}
        />
      </RoundedBox>

      {/* Subtle Neon Edge Glow for Active Card */}
      {isSelected && (
        <RoundedBox args={[cardWidth + 0.06, cardHeight + 0.06, 0.05]} radius={0.14} position={[0, 0, -0.06]}>
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </RoundedBox>
      )}

      {/* Structured Content Layout */}
      <group position={[0, 0, 0.06]}>

        {/* 1. Image */}
        <group position={[0, 1.25, 0]}>
          <DreiImage
            url={project.image}
            transparent
            scale={[cardWidth - 0.3, imgHeight]}
            material-side={THREE.FrontSide}
          />
        </group>

        {/* Tags removed from card per request, moved to details modal */}

        {/* 3. Title */}
        <Text
          ref={(el) => { textRefs.current[3] = el; }}
          position={[-cardWidth / 2 + 0.25, -0.15, 0]}
          anchorX="left"
          anchorY="top"
          fontSize={0.21}
          fontWeight="bold"
          color="#FFFFFF"
          maxWidth={cardWidth - 0.5}
          lineHeight={1.15}
        >
          {project.title}
        </Text>

        {/* 4. Description */}
        <Text
          ref={(el) => { textRefs.current[4] = el; }}
          position={[-cardWidth / 2 + 0.25, descY, 0]}
          anchorX="left"
          anchorY="top"
          fontSize={0.13}
          color="#a3a3a3"
          maxWidth={cardWidth - 0.5}
          lineHeight={1.4}
        >
          {safeDesc.length > 180 ? safeDesc.slice(0, 180) + "..." : safeDesc}
        </Text>

        {/* 5. CTA Footer */}
        <Text
          ref={(el) => { textRefs.current[5] = el; }}
          position={[-cardWidth / 2 + 0.25, -2.15, 0]}
          anchorX="left"
          anchorY="center"
          fontSize={0.11}
          color={isSelected ? "#10B981" : "#555555"}
        >
          {isSelected ? "Click to view architectural case study →" : "Click or Drag to navigate"}
        </Text>
      </group>
    </group>
  );
}

function ProjectCarousel3D({
  projects,
  onSelectProject,
  activeNode,
  setActiveNode,
  setIsAutoPlaying
}: {
  projects: Project[];
  onSelectProject: (p: Project) => void;
  activeNode: number;
  setActiveNode: (n: number) => void;
  setIsAutoPlaying: (v: boolean) => void;
}) {
  return (
    <group>
      {projects.map((project, idx) => (
        <WebGLProjectCard
          key={project.id}
          project={project}
          idx={idx}
          activeNode={activeNode}
          totalNodes={projects.length}
          onClick={() => {
            setIsAutoPlaying(false);
            if (activeNode === idx) {
              onSelectProject(project);
            } else {
              setActiveNode(idx);
            }
          }}
        />
      ))}
    </group>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeNode, setActiveNode] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // High-performance drag tracking variables
  const dragStartX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 80;

  const projects = portfolioData.projects as unknown as Project[];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-Rotation Timer
  useEffect(() => {
    if (!isAutoPlaying || selectedProject || isMobile) return;

    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % projects.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, selectedProject, projects.length, isMobile]);

  // Global Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    setIsAutoPlaying(false);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;

    // Continuous swipe checking
    if (diff > SWIPE_THRESHOLD) {
      setActiveNode((prev) => (prev - 1 + projects.length) % projects.length);
      dragStartX.current = e.clientX; // Reset anchor to allow continuous sliding
    } else if (diff < -SWIPE_THRESHOLD) {
      setActiveNode((prev) => (prev + 1) % projects.length);
      dragStartX.current = e.clientX; // Reset anchor to allow continuous sliding
    }
  };

  const handlePointerUp = () => {
    dragStartX.current = null;
    setIsAutoPlaying(true);
  };

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

      {/* Wrapper Div handles global DOM swipe events so clicking empty space still drags */}
      <div
        className="relative w-full h-[650px] rounded-3xl border border-white/5 bg-transparent overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {!isMobile ? (
          <>
            {/* The Canvas itself ignores global pointer events to prevent conflict */}
            <Canvas camera={{ position: [0, 0, 8.5], fov: 45 }} className="w-full h-full pointer-events-none">
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1.2} />
              {/* Wrapping group restores pointer events specifically for the cards */}
              <group className="pointer-events-auto">
                <Suspense fallback={null}>
                  <ProjectCarousel3D
                    projects={projects}
                    onSelectProject={(p) => setSelectedProject(p)}
                    activeNode={activeNode}
                    setActiveNode={setActiveNode}
                    setIsAutoPlaying={setIsAutoPlaying}
                  />
                </Suspense>
              </group>
            </Canvas>
          </>
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-auto">
            {/* Mobile swipe indicator */}
            <div className="absolute top-6 flex items-center gap-2 text-[#10B981] text-[10px] font-mono tracking-[0.2em] font-bold animate-pulse z-20 pointer-events-none uppercase">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
              Swipe to explore
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>

            <div
              className="w-full h-full flex items-center overflow-x-auto snap-x snap-mandatory px-6 gap-6 hide-scrollbar pt-12 pb-6 touch-pan-x"
              onPointerDown={(e) => e.stopPropagation()} // Stop mobile native scroll from conflicting
            >
            {projects.map((project, idx) => {
              const safeTags = project.tags || [];
              const color = getGlowColor(safeTags);
              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="snap-center shrink-0 w-[260px] h-[440px] rounded-2xl border border-white/10 bg-[#070707]/90 p-4 flex flex-col justify-between"
                >
                  <div className="relative w-full h-[180px] rounded-lg overflow-hidden border border-white/5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="250px"
                      className="object-cover opacity-80"
                      priority={idx < 2}
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
                      <h3 className="text-sm font-bold text-white mt-1 leading-snug line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="text-[11px] text-[#a3a3a3] mt-2 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        )}
      </div>

      <div className="sr-only">
        {projects.map((project) => (
          <article key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul>
              {(project.tags || []).map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              key="project-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0A0A0A]/85 backdrop-blur-md z-[99999] flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-[#121212] border border-[#262626] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col gap-6 m-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-5 right-5 flex items-center gap-2 z-20">
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#262626] hover:border-[#10B981] text-[10px] uppercase tracking-wider font-bold text-[#EDEDED] bg-[#0A0A0A]/80 hover:bg-[#10b981]/10 backdrop-blur-md transition-all duration-300">
                    <GithubIcon /> Source
                  </a>
                )}
                {selectedProject.demo && (
                  <a href={selectedProject.demo} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10B981]/80 hover:bg-[#10B981] text-[10px] uppercase tracking-wider font-bold text-[#000000] backdrop-blur-md transition-all duration-300">
                    Demo ↗
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-[#a3a3a3] hover:text-[#ef4444] transition-colors p-1.5 border border-[#262626] rounded-full hover:border-[#ef4444]/20 bg-[#0A0A0A]/80 backdrop-blur-md cursor-pointer ml-1"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div>
                <span className="font-mono text-[10px] text-[#a3a3a3] tracking-widest block uppercase mb-1">PROJECT SPECIFICATIONS</span>
                <h3 className="text-2xl font-extrabold text-[#EDEDED] tracking-tight">{selectedProject.title}</h3>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {(selectedProject.tags || []).map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-[10px] font-mono text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 rounded-md uppercase tracking-widest font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden relative border border-[#262626]/60">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 95vw, 600px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] font-mono text-[#3B82F6] tracking-widest uppercase font-bold">// SUMMARY</h4>
                <p className="text-sm text-[#d4d4d4] leading-relaxed">{selectedProject.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] font-mono text-[#10B981] tracking-widest uppercase font-bold">// ARCHITECTURE & LAYERS</h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedProject.architecture || []).map((layer) => (
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


            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}