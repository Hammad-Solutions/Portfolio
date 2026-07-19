"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X, Download, Mail, Bot, CheckCircle2, Award, ExternalLink } from "lucide-react";

interface RecruiterModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadCV: () => void;
  onCopyEmail: () => void;
  onOpenChat: () => void;
}

export default function RecruiterModeModal({
  isOpen,
  onClose,
  onDownloadCV,
  onCopyEmail,
  onOpenChat,
}: RecruiterModeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-2xl rounded-2xl bg-[#0B0F19] border border-emerald-500/30 shadow-[0_0_80px_rgba(16,185,129,0.2)] overflow-hidden z-10 p-6 sm:p-8"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500" />

            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                    Executive Recruiter Summary
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-normal">
                      30-Sec Overview
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans">Muhammad Hammad — Air University Islamabad</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Summary Body */}
            <div className="py-6 space-y-6">
              {/* Profile Hook */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Software Engineer with 4+ years of shipping production systems across <span className="text-emerald-400 font-semibold">React/Next.js, Node.js, C++</span>, and AI-integrated applications. Specializes in SOLID component architecture, sub-second RAG LLM pipelines, and zero-leak resource safety.
              </p>

              {/* Key Impact Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Lighthouse Score", val: "98/100", color: "#10B981" },
                  { label: "RAG LLM Latency", val: "<800ms", color: "#3B82F6" },
                  { label: "Memory Leaks", val: "0 Bytes", color: "#A855F7" },
                  { label: "Shipped Stacks", val: "15+ Repos", color: "#14B8A6" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center"
                  >
                    <div className="font-mono text-lg font-bold" style={{ color: m.color }}>
                      {m.val}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Core Strengths Bullet List */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  Engineering Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-sans">
                  {[
                    "Next.js App Router (ISR/SSG + Edge Caching)",
                    "C++ 17 File Engines (ACID & RAII Pattern)",
                    "Autonomous RAG AI Bot (Groq LLM + Embeddings)",
                    "IoT ESP32 Telemetry & Real-Time Dashboards",
                  ].map((h) => (
                    <div key={h} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fast-Track Action Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onDownloadCV}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <Download className="w-4 h-4" />
                Download CV (DOCX)
              </button>

              <button
                onClick={onCopyEmail}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs font-semibold transition-all"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                Copy Email
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenChat();
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 font-mono text-xs font-semibold transition-all"
              >
                <Bot className="w-4 h-4" />
                AI Concierge
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
