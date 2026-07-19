"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, Bot, FileText, Mail, Zap, X, CornerDownLeft, LucideIcon } from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Actions" | "Quick Link";
  icon: LucideIcon;
  iconColor: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (sectionId: string) => void;
  onOpenChat: () => void;
  onDownloadCV: () => void;
  onCopyEmail: () => void;
  onOpenRecruiterView: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectSection,
  onOpenChat,
  onDownloadCV,
  onCopyEmail,
  onOpenRecruiterView,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    {
      id: "recruiter-view",
      title: "30-Sec Recruiter View",
      subtitle: "High-density executive summary & key impact metrics",
      category: "Actions",
      icon: Zap,
      iconColor: "#10B981",
      action: () => {
        onOpenRecruiterView();
        onClose();
      },
    },
    {
      id: "ai-concierge",
      title: "Ask Hammad AI Concierge",
      subtitle: "Query Hammad's RAG bot about architecture & availability",
      category: "Actions",
      icon: Bot,
      iconColor: "#3B82F6",
      action: () => {
        onOpenChat();
        onClose();
      },
    },
    {
      id: "download-cv",
      title: "Download Resume / CV",
      subtitle: "Get latest PDF/DOCX resume file",
      category: "Quick Link",
      icon: FileText,
      iconColor: "#A855F7",
      action: () => {
        onDownloadCV();
        onClose();
      },
    },
    {
      id: "copy-email",
      title: "Copy Email Address",
      subtitle: "hammadsolutions.support@gmail.com",
      category: "Quick Link",
      icon: Mail,
      iconColor: "#14B8A6",
      action: () => {
        onCopyEmail();
        onClose();
      },
    },
    {
      id: "nav-home",
      title: "Navigate to Home",
      subtitle: "Hero section, Bento grid & tech traits",
      category: "Navigation",
      icon: Compass,
      iconColor: "#64748B",
      action: () => {
        onSelectSection("home");
        onClose();
      },
    },
    {
      id: "nav-about",
      title: "Navigate to About & Experience",
      subtitle: "Software architecture, timeline & capabilities",
      category: "Navigation",
      icon: Compass,
      iconColor: "#64748B",
      action: () => {
        onSelectSection("about");
        onClose();
      },
    },
    {
      id: "nav-skills",
      title: "Navigate to Skills Globe",
      subtitle: "3D Volumetric skills sphere & tech stack",
      category: "Navigation",
      icon: Compass,
      iconColor: "#64748B",
      action: () => {
        onSelectSection("skills");
        onClose();
      },
    },
    {
      id: "nav-projects",
      title: "Navigate to Projects Carousel",
      subtitle: "3D Cover Flow case studies & repositories",
      category: "Navigation",
      icon: Compass,
      iconColor: "#64748B",
      action: () => {
        onSelectSection("projects");
        onClose();
      },
    },
    {
      id: "nav-contact",
      title: "Navigate to Contact Form",
      subtitle: "Direct message & booking inquiry",
      category: "Navigation",
      icon: Compass,
      iconColor: "#64748B",
      action: () => {
        onSelectSection("contact");
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-16 sm:pt-24 px-4 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="relative w-full max-w-xl rounded-2xl bg-[#0B0F17]/95 border border-[#1E293B] shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden z-10"
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-[#1E293B] bg-[#0F172A]/50">
              <Search className="w-5 h-5 text-[#64748B] mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands, projects, actions... (ESC to close)"
                className="w-full bg-transparent border-none text-slate-100 font-mono text-xs sm:text-sm focus:outline-none focus:ring-0 placeholder-slate-500"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-slate-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[360px] overflow-y-auto p-2 space-y-1 hide-scrollbar">
              {filteredCommands.length === 0 ? (
                <div className="py-10 text-center font-mono text-xs text-slate-500">
                  No matching commands found. Try searching for &quot;CV&quot; or &quot;Recruiter&quot;.
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;

                  return (
                    <div
                      key={cmd.id}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                        isSelected
                          ? "bg-[#1E293B]/80 text-white border border-[#38BDF8]/30"
                          : "text-slate-300 hover:bg-[#1E293B]/40 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-white/10"
                          style={{ backgroundColor: `${cmd.iconColor}15` }}
                        >
                          <Icon className="w-4 h-4" style={{ color: cmd.iconColor }} />
                        </div>
                        <div className="truncate">
                          <div className="font-mono text-xs font-semibold text-slate-100 flex items-center gap-2 truncate">
                            <span>{cmd.title}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                              {cmd.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate">{cmd.subtitle}</p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="flex items-center text-slate-400 gap-1 text-[10px] font-mono shrink-0 pl-2">
                          <span>Select</span>
                          <CornerDownLeft className="w-3.5 h-3.5 text-sky-400" />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div className="px-4 py-2.5 border-t border-[#1E293B] bg-[#070A10] flex items-center justify-between font-mono text-[10px] text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">↵</kbd>
                  Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">ESC</kbd>
                  Close
                </span>
              </div>
              <span className="text-emerald-400 font-semibold hidden sm:inline">Hammad Portfolio OS</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
