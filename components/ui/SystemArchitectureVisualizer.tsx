"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Server, ShieldCheck, Database, Zap, Layers, ArrowRight, CheckCircle } from "lucide-react";

interface NodeStep {
  id: string;
  name: string;
  sub: string;
  details: string;
  pattern: string;
  color: string;
}

interface Pipeline {
  id: string;
  title: string;
  badge: string;
  description: string;
  steps: NodeStep[];
}

const PIPELINES: Pipeline[] = [
  {
    id: "rag-ai",
    title: "Autonomous RAG AI Pipeline",
    badge: "Groq LLM + Vector Context",
    description: "Sub-800ms natural language processing pipeline with strict prompt injection protection.",
    steps: [
      {
        id: "input",
        name: "1. User Query Input",
        sub: "Frontend Interface",
        details: "Captures natural language query via Next.js client component with debounce and rate limiting.",
        pattern: "Component Event Driven",
        color: "#3B82F6",
      },
      {
        id: "guard",
        name: "2. Injection Security Guard",
        sub: "Server-Side Middleware",
        details: "Filters malicious prompt-injection vectors and enforces persona bounds before passing payload.",
        pattern: "Guard & Validation Pattern",
        color: "#EF4444",
      },
      {
        id: "context",
        name: "3. RAG Context Lookup",
        sub: "Vector Embeddings",
        details: "Matches intent against Hammad's structured engineering profile and repository metadata.",
        pattern: "Domain-Driven Retrieval",
        color: "#A855F7",
      },
      {
        id: "inference",
        name: "4. Groq Edge Inference",
        sub: "Llama-3.1-8b Engine",
        details: "Executes ultra-low latency inference via Vercel Edge functions with fallback recovery.",
        pattern: "Edge Compute Dispatch",
        color: "#10B981",
      },
    ],
  },
  {
    id: "cpp-engine",
    title: "C++ Copy-on-Write File Engine",
    badge: "ACID & RAII Pattern",
    description: "Zero-data-loss transaction engine for high-concurrency binary file mutations.",
    steps: [
      {
        id: "request",
        name: "1. Mutation Request",
        sub: "Client API Layer",
        details: "Receives atomic CRUD mutation request targeting flat-file records.",
        pattern: "Command Pattern",
        color: "#3B82F6",
      },
      {
        id: "buffer",
        name: "2. Staging Buffer Write",
        sub: "Copy-on-Write Stream",
        details: "Mutations execute exclusively against temporary `.tmp` file stream without touching production data.",
        pattern: "RAII Resource Cleanup",
        color: "#14B8A6",
      },
      {
        id: "audit",
        name: "3. ACID Checksum Audit",
        sub: "Stream-State Validator",
        details: "Validates stream failbit/badbit flags and checkpoints file seek pointers for rollback capability.",
        pattern: "Atomic Validation",
        color: "#F59E0B",
      },
      {
        id: "commit",
        name: "4. Atomic Disk Rename",
        sub: "Production Swap",
        details: "Replaces target production file atomically only after 100% data integrity verification.",
        pattern: "Zero-Corruption Commit",
        color: "#10B981",
      },
    ],
  },
  {
    id: "iot-helmet",
    title: "IoT Smart Helmet Sensor Telemetry",
    badge: "Hardware-Software Integration",
    description: "Real-time industrial worker safety monitoring system with hardware sensor fusion.",
    steps: [
      {
        id: "sensor",
        name: "1. ESP32 Sensor Fusion",
        sub: "Hardware Layer",
        details: "Gathers impact, gas detection, and temperature metrics from integrated ESP32 hardware sensors.",
        pattern: "Hardware Polling",
        color: "#14B8A6",
      },
      {
        id: "telemetry",
        name: "2. Telemetry Dispatch",
        sub: "MQTT/HTTP Pipeline",
        details: "Transmits compressed JSON hazard payloads over cellular/Wi-Fi to central gateway.",
        pattern: "Publisher Pattern",
        color: "#3B82F6",
      },
      {
        id: "server",
        name: "3. Real-Time Risk Engine",
        sub: "Backend Processing",
        details: "Evaluates hazard thresholds and logs spatial telemetry into time-series database.",
        pattern: "Event Stream Processor",
        color: "#A855F7",
      },
      {
        id: "dashboard",
        name: "4. Incident Alert UI",
        sub: "React Dashboard",
        details: "Renders immediate visual/audio emergency alerts for facility safety managers.",
        pattern: "Observer Pattern",
        color: "#EF4444",
      },
    ],
  },
];

export default function SystemArchitectureVisualizer() {
  const [activePipelineId, setActivePipelineId] = useState("rag-ai");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("input");

  const currentPipeline = PIPELINES.find((p) => p.id === activePipelineId) || PIPELINES[0];
  const activeNode = currentPipeline.steps.find((s) => s.id === selectedNodeId) || currentPipeline.steps[0];

  return (
    <div className="w-full rounded-2xl bg-[#121212]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl select-none">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h3 className="font-mono text-base sm:text-lg font-bold text-[#EDEDED] flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            System Architecture Explorer
          </h3>
          <p className="text-xs text-[#a3a3a3] font-sans mt-0.5">
            Interactive pipeline blueprints showcasing SOLID architecture & software patterns.
          </p>
        </div>

        {/* Pipeline Selector Tabs */}
        <div className="flex items-center gap-1.5 bg-[#0A0A0A]/90 p-1.5 rounded-xl border border-white/10 overflow-x-auto hide-scrollbar">
          {PIPELINES.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePipelineId(p.id);
                setSelectedNodeId(p.steps[0].id);
              }}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-[11px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activePipelineId === p.id
                  ? "bg-emerald-500 text-[#0A0A0A] shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                  : "text-[#a3a3a3] hover:text-[#EDEDED]"
              }`}
            >
              {p.title.split(" ")[0]} {p.title.split(" ")[1]}
            </button>
          ))}
        </div>
      </div>

      {/* Description & Badge */}
      <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10">
        <p className="text-xs text-[#a3a3a3] font-sans">{currentPipeline.description}</p>
        <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 w-fit">
          {currentPipeline.badge}
        </span>
      </div>

      {/* Diagram Node Flow */}
      <div className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
          {currentPipeline.steps.map((step, idx) => {
            const isSelected = step.id === activeNode.id;

            return (
              <motion.div
                key={step.id}
                onClick={() => setSelectedNodeId(step.id)}
                whileHover={{ y: -3 }}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 relative ${
                  isSelected
                    ? "bg-[#181818] border-emerald-500/80 shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                    : "bg-[#181818]/60 border-white/10 hover:border-white/20 hover:bg-[#202020] opacity-90"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: step.color }}
                  />
                  <span className="text-[9px] font-mono text-[#737373] uppercase">Step 0{idx + 1}</span>
                </div>

                <h4 className="font-mono text-xs font-bold text-[#EDEDED] mb-1">{step.name}</h4>
                <p className="text-[11px] text-[#a3a3a3]">{step.sub}</p>

                {isSelected && (
                  <motion.div
                    layoutId="activeBorder"
                    className="absolute inset-0 rounded-xl border-2 border-emerald-500 pointer-events-none"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-4 sm:p-5 rounded-xl bg-[#0A0A0A]/90 border border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400">{activeNode.name}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {activeNode.pattern}
              </span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">{activeNode.details}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-mono text-slate-400">Architecture Verified</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
