"use client";

import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import gsap from "gsap";
import MatrixRainBackground from "../components/canvas/MatrixRainBackground";
import About from "../components/ui/About";
import Skills from "../components/ui/Skills";
import Projects from "../components/ui/Projects";
import Contact from "../components/ui/Contact";
import Marquee from "../components/ui/Marquee";
import { getBotResponse } from "../lib/rag";
import styles from "./page.module.css";

// Custom Inline SVG Icons
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const BotFloatingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    {/* Sleek helmet frame */}
    <path d="M4 15a8 8 0 0 1 16 0v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2z"></path>
    {/* Visor shield */}
    <rect x="6" y="12" width="12" height="4" rx="1" fill="currentColor" opacity="0.15"></rect>
    {/* Horizontal visor line (glowing strip) */}
    <line x1="8" y1="14" x2="16" y2="14" strokeWidth="3"></line>
    {/* Antenna top node */}
    <path d="M12 2v5"></path>
    <circle cx="12" cy="2" r="1.5" fill="currentColor"></circle>
  </svg>
);

const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

// Custom spring-based reveal animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 20
    }
  }
};

// Roles that cycle automatically
const ROLES = [
  { text: "Software Developer", color: "#10B981" },
  { text: "Next.js Engineer",   color: "#14B8A6" },
  { text: "Full-Stack Builder", color: "#3B82F6" },
  { text: "UI/UX Enthusiast",   color: "#A855F7" },
];

function TypewriterRoles() {
  const [roleIndex, setRoleIndex] = React.useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const role = ROLES[roleIndex];

  return (
    <div className="flex flex-wrap items-center justify-start gap-2">
      <span className="text-[var(--text-primary)]">I&apos;m a</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={roleIndex}
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{ color: role.color }}
          className="font-bold"
        >
          {role.text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function HeroAvatar() {
  const [imgSrc, setImgSrc] = useState("/profile.jpg");
  const [useFallback, setUseFallback] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleError = () => {
    if (imgSrc === "/profile.jpg") {
      setImgSrc("/profile.png");
    } else if (imgSrc === "/profile.png") {
      setImgSrc("/profile.jpeg");
    } else {
      setUseFallback(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = ((y - rect.height / 2) / (rect.height / 2)) * -12;
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 12;

    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 800,
      borderColor: "rgba(59, 130, 246, 0.45)",
      boxShadow: "0 20px 40px -10px rgba(59, 130, 246, 0.25)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      borderColor: "var(--glass-border)",
      boxShadow: "0 15px 35px -15px rgba(0, 0, 0, 0.8)",
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={styles.profilePhotoCard}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className={styles.scanline} />
      {!useFallback ? (
        <img
          src={imgSrc}
          alt="Muhammad Hammad"
          onError={handleError}
          className={styles.profilePhotoImg}
        />
      ) : (
        <div className={styles.profilePhotoFallback}>
          MH
        </div>
      )}
    </div>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  variants?: any;
  innerClassName?: string;
}

function BentoCard({ children, className = "", variants, innerClassName = "flex flex-col justify-between h-full w-full relative z-10" }: BentoCardProps) {
  return (
    <motion.div
      variants={variants}
      className={`${styles.bentoCard} bento-card-hover-trigger ${className}`}
    >
      <div className={innerClassName}>
        {children}
      </div>
    </motion.div>
  );
}

const SUGGESTED_PILLS = [
  { label: "Capabilities 💻", prompt: "What are your core technical capabilities and programming languages?" },
  { label: "Smart Helmet IoT 🪖", prompt: "Tell me about the Smart Helmet project you built." },
  { label: "C++ Projects ⚙️", prompt: "Explain your experience with C++ systems and file handling." },
  { label: "Get In Touch ✉️", prompt: "How can I contact Muhammad Hammad for jobs or projects?" }
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"visual" | "terminal">("visual");
  const [activeSection, setActiveSection] = useState("home");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      id: "init",
      sender: "bot",
      text: "Hammad's AI Assistant. Ask me anything about his experience, stack, or availability."
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // IntersectionObserver for active section highlighting on scroll
  useEffect(() => {
    if (!mounted) return;
    const sections = ["home", "about", "skills", "projects", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mounted]);

  // Smooth scroll helper for Support Bot history
  useEffect(() => {
    if (mode === "terminal" || isChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isTyping, mode, isChatOpen]);

  const sendMessage = async (query: string) => {
    if (!query.trim()) return;

    setChatHistory(prev => [...prev, {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query
    }]);

    setIsTyping(true);

    try {
      const response = await getBotResponse(query);
      setChatHistory(prev => [...prev, {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response
      }]);
    } catch (error) {
      console.error("Failed to fetch bot response:", error);
      setChatHistory(prev => [...prev, {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "I experienced a connection issue. Please make sure your internet is working or try again shortly."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const query = inputValue;
      setInputValue("");
      sendMessage(query);
    }
  };

  // Helper to format messages with bold tags as emerald-400 spans
  const formatMessage = (text: string) => {
    // This splits the text by the ** symbols
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={index} className="text-emerald-400 font-medium tracking-wide">
            {part.slice(2, -2)}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      {/* Glowing Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#10B981] via-[#14B8A6] to-[#3B82F6] origin-[0%] z-[9999]"
        style={{ scaleX }}
      />

      {/* 1. Tactical CSS Film Grain Overlay */}
      <div className={styles.noiseOverlay} />

      {/* 2. Hacker Style Binary Rain Background */}
      <div className={styles.canvasContainer}>
        <MatrixRainBackground />
      </div>

      {/* 3. Foreground UI Overlay */}
      <div className={styles.uiOverlay}>

        {/* Top Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.navbar}
        >
          <span className={styles.logo}>
            <span className="hidden sm:inline">MUHAMMAD HAMMAD</span>
            <span className="inline sm:hidden">M. HAMMAD</span>
          </span>

          <div className="flex items-center gap-3 sm:gap-8">
            <div className={styles.navLinks}>
              {["home", "about", "skills", "projects", "contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  className={`${styles.navLink} ${activeSection === link ? styles.navLinkActive : ""}`}
                  onClick={(e) => {
                    if (mode !== "visual") {
                      e.preventDefault();
                      setMode("visual");
                      setTimeout(() => {
                        const target = document.getElementById(link);
                        target?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Mode Switch [ VISUAL | SUPPORT BOT ] */}
            <div className="flex bg-[#262626] rounded-full p-1 relative select-none items-center">
              <button
                onClick={() => setMode("visual")}
                className={`relative px-4 py-1.5 text-[10px] font-mono font-bold tracking-wider transition-colors duration-300 z-10 rounded-full ${mode === "visual" ? "text-[#000000]" : "text-[#737373] hover:text-[#EDEDED]"
                  }`}
              >
                VISUAL
                {mode === "visual" && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-[#FFFFFF] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    style={{ boxShadow: "0 0 12px rgba(16, 185, 129, 0.4)" }}
                  />
                )}
              </button>

              <button
                onClick={() => setMode("terminal")}
                className={`relative px-4 py-1.5 text-[10px] font-mono font-bold tracking-wider transition-colors duration-300 z-10 rounded-full ${mode === "terminal" ? "text-[#000000]" : "text-[#737373] hover:text-[#EDEDED]"
                  }`}
              >
                <span className="hidden sm:inline">SUPPORT BOT</span>
                <span className="inline sm:hidden">BOT</span>
                {mode === "terminal" && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-[#FFFFFF] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    style={{ boxShadow: "0 0 12px rgba(59, 130, 246, 0.4)" }}
                  />
                )}
              </button>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={styles.hamburger}
              aria-label="Toggle Navigation Menu"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </motion.nav>

        {/* Mobile Navigation Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={styles.mobileMenu}
            >
              {["home", "about", "skills", "projects", "contact"].map((link, idx) => (
                <motion.a
                  key={link}
                  href={`#${link}`}
                  className={styles.mobileNavLink}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    if (mode !== "visual") {
                      e.preventDefault();
                      setMode("visual");
                      setTimeout(() => {
                        const target = document.getElementById(link);
                        target?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }}
                >
                  {link}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Panel Canvas Content */}
        <AnimatePresence mode="wait">
          {mode === "visual" ? (
            <motion.div
              key="visual-layout"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Section — Bento Grid */}
              <section id="home" className="py-24 px-6 md:px-12 w-full max-w-[1440px] mx-auto relative z-10">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={styles.bentoContainer}
                >
                  {/* Card 1: Main Profile Info */}
                  <BentoCard 
                    variants={itemVariants}
                    className={styles.profileCard}
                  >
                    {/* Pulsing Status Badge */}
                    <div
                      className="mb-6 mx-auto self-center flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] text-emerald-400 font-mono tracking-widest font-semibold uppercase relative overflow-hidden select-none"
                      style={{ backdropFilter: "blur(4px)" }}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Available for Work
                    </div>

                    {/* Main Title */}
                    <h1 className={styles.heading}>
                      <span className={`${styles.gradientText} bento-title-highlight`} style={{ "--accent-color": "#10B981" } as any}>
                        Muhammad Hammad
                      </span>
                    </h1>

                    {/* Role Row — animated typewriter cycling */}
                    <div className="text-[clamp(1.1rem,2.3vw,1.65rem)] font-medium tracking-wide mb-6">
                      <TypewriterRoles />
                    </div>

                    {/* Bio text */}
                    <p className="text-[#d4d4d4] text-base md:text-[1.1rem] !leading-[1.8] max-w-2xl">
                      Passionate about building clean, scalable, and efficient applications using React.js, Next.js, and Node.js. Specializing in creating seamless web experiences and solving real-world problems through code.
                    </p>
                  </BentoCard>

                  {/* Card 2: Interactive Avatar Card */}
                  <BentoCard 
                    variants={itemVariants}
                    className={styles.avatarCard}
                    innerClassName="flex items-center justify-center h-full w-full relative z-10"
                  >
                    <HeroAvatar />
                  </BentoCard>

                  {/* Card 3: Metrics & Stats */}
                  <BentoCard 
                    variants={itemVariants}
                    className={styles.statsCard}
                  >
                    <h4 className="text-[10px] font-mono font-bold text-[#10B981] tracking-widest uppercase mb-4">
                      <span className="bento-title-highlight" style={{ "--accent-color": "#10B981" } as any}>
                        // METRICS
                      </span>
                    </h4>
                    <div className="flex flex-col justify-between h-full gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-[#737373] block uppercase tracking-wider">EDUCATION</span>
                        <h5 className="text-sm font-bold text-[#EDEDED] leading-tight">BS Software Engineering</h5>
                        <span className="text-[10px] font-mono text-[#10B981] font-semibold">Air University Islamabad</span>
                      </div>
                      <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                          <span className={styles.statNumber}>04+</span>
                          <span className={styles.statLabel}>Years Coding</span>
                        </div>
                        <div className={styles.statItem}>
                          <span className={styles.statNumber}>15+</span>
                          <span className={styles.statLabel}>Projects</span>
                        </div>
                      </div>
                    </div>
                  </BentoCard>

                  {/* Card 4: Actions & Socials */}
                  <BentoCard 
                    variants={itemVariants}
                    className={styles.actionsCard}
                  >
                    <h4 className="text-[10px] font-mono font-bold text-[#3B82F6] tracking-widest uppercase mb-4">
                      <span className="bento-title-highlight" style={{ "--accent-color": "#3B82F6" } as any}>
                        // CONNECT
                      </span>
                    </h4>
                    <div className="flex flex-col justify-between h-full gap-4 w-full">
                      <div className="flex flex-col gap-2.5 w-full">
                        <a href="#contact" className="w-full">
                          <motion.button
                            whileHover={{ borderColor: "#10B981", boxShadow: "0 0 20px rgba(16,185,129,0.25)" }}
                            whileTap={{ scale: 0.98 }}
                            className={`${styles.btnSecondary} w-full text-center py-2 font-bold text-[11px]`}
                          >
                            Get In Touch
                          </motion.button>
                        </a>
                        <a href="/resume.pdf" download="Muhammad_Hammad_Resume.pdf" className="w-full">
                          <motion.button
                            whileHover={{ 
                              borderColor: "#3B82F6", 
                              boxShadow: "0 0 20px rgba(59,130,246,0.25)",
                              backgroundColor: "rgba(59,130,246,0.05)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            className={`${styles.btnSecondary} w-full flex items-center justify-center gap-2 py-2 font-bold text-[11px]`}
                          >
                            <DownloadIcon />
                            Download CV
                          </motion.button>
                        </a>
                      </div>
                      <div className="flex gap-2 justify-center mt-2">
                        <motion.a
                          href="https://github.com/Hammad-Solutions"
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ borderColor: "#10B981", color: "#10B981", boxShadow: "0 0 10px rgba(16,185,129,0.2)" }}
                          className={styles.socialIcon}
                          style={{ width: "2.3rem", height: "2.3rem" }}
                        >
                          <GithubIcon />
                        </motion.a>

                        <motion.a
                          href="https://linkedin.com/in/hammad-solution"
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ borderColor: "#C084FC", color: "#C084FC", boxShadow: "0 0 10px rgba(192,132,252,0.2)" }}
                          className={styles.socialIcon}
                          style={{ width: "2.3rem", height: "2.3rem" }}
                        >
                          <LinkedinIcon />
                        </motion.a>

                        <motion.a
                          href="mailto:m6784104@gmail.com"
                          whileHover={{ borderColor: "#10B981", color: "#10B981", boxShadow: "0 0 10px rgba(16,185,129,0.2)" }}
                          className={styles.socialIcon}
                          style={{ width: "2.3rem", height: "2.3rem" }}
                        >
                          <MailIcon />
                        </motion.a>
                      </div>
                    </div>
                  </BentoCard>

                  {/* Card 5: Tech Spotlight */}
                  <BentoCard 
                    variants={itemVariants}
                    className={styles.techCard}
                  >
                    <h4 className="text-[10px] font-mono font-bold text-[#14B8A6] tracking-widest uppercase mb-4">
                      <span className="bento-title-highlight" style={{ "--accent-color": "#14B8A6" } as any}>
                        // STACK
                      </span>
                    </h4>
                    <div className="flex flex-col justify-between h-full gap-4">
                      <span className="text-[11px] font-mono text-[#737373] block uppercase tracking-wider leading-relaxed">
                        Client interfaces, state machines, and cloud runtimes.
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { name: "Next.js", color: "#14B8A6" },
                          { name: "React",   color: "#3B82F6" },
                          { name: "Node.js", color: "#10B981" },
                          { name: "C++",     color: "#A855F7" }
                        ].map((tech) => (
                          <span 
                            key={tech.name}
                            className="px-2 py-0.5 text-[9px] font-mono text-[#EDEDED] bg-[#121212]/50 rounded-md border border-[#262626] transition-all duration-300 cursor-default hover:text-white"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = `${tech.color}66`;
                              e.currentTarget.style.boxShadow = `0 0 10px ${tech.color}25`;
                              e.currentTarget.style.backgroundColor = `${tech.color}0a`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "#262626";
                              e.currentTarget.style.boxShadow = "none";
                              e.currentTarget.style.backgroundColor = "rgba(18, 18, 18, 0.5)";
                            }}
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </BentoCard>
                </motion.div>
              </section>

              {/* Infinite Running Marquee Text Banner */}
              <Marquee />

              {/* Rest of the Portfolio page sections */}
              <About />
              <Skills />
              <Projects />
              <Contact />
            </motion.div>
          ) : (
            <motion.div
              key="terminal-layout"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto w-full px-6 flex items-center justify-center min-h-[80vh] py-12"
            >
              {/* Custom Support Bot Terminal Box */}
              <div className="w-full h-[60vh] border border-[#262626] bg-[#0A0A0A]/75 backdrop-blur-md rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl relative">
                {/* Header System bar */}
                <div className="bg-[#121212]/50 border-b border-[#262626] px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ef4444] opacity-80" />
                    <div className="w-3 h-3 rounded-full bg-[#f59e0b] opacity-80" />
                    <div className="w-3 h-3 rounded-full bg-[#10b981] opacity-80" />
                  </div>
                  <span className="font-mono text-[10px] text-[#737373] tracking-widest uppercase">agent_support_chat // v1.0</span>
                  <div className="w-10" />
                </div>

                {/* Chat History scroll panel */}
                <div className="flex-1 p-6 overflow-y-auto space-y-5 font-mono text-xs text-[#EDEDED] leading-relaxed hide-scrollbar">
                  {chatHistory.map((msg) => (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold uppercase tracking-wider ${msg.sender === "bot" ? "text-[#3B82F6]" : "text-[#737373]"}`}>
                          {msg.sender === "bot" ? "[AGENT OS]" : "[USER]"}
                        </span>
                      </div>
                      <p className="whitespace-pre-line pl-4 border-l border-[#262626] text-[#EDEDED] opacity-90">
                        {formatMessage(msg.text)}
                      </p>
                    </div>
                  ))}

                  {/* Pulsing Electric Blue Loading state cursor */}
                  {isTyping && (
                    <div className="space-y-1">
                      <span className="font-bold text-[#3B82F6] uppercase tracking-wider">[AGENT OS]</span>
                      <div className="flex items-center pl-4 border-l border-[#262626] gap-1 text-[#737373]">
                        <span>Thinking</span>
                        <span className="w-1.5 h-3.5 bg-[#3B82F6] animate-pulse inline-block" />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Suggestion Pills */}
                <div className="px-6 py-2 bg-[#0A0A0A]/40 border-t border-[#262626]/40 flex flex-wrap gap-2">
                  {SUGGESTED_PILLS.map((pill) => (
                    <button
                      key={pill.label}
                      onClick={() => sendMessage(pill.prompt)}
                      className="px-3 py-1 rounded-full border border-[#262626] hover:border-[#3B82F6]/50 bg-[#121212]/50 hover:bg-[#3B82F6]/5 text-[10px] font-mono text-[#737373] hover:text-[#EDEDED] transition-all duration-300 cursor-pointer select-none"
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>

                {/* Keyboard Text Entry Input */}
                <div className="p-4 bg-[#121212]/45 border-t border-[#262626] flex items-center">
                  <span className="text-[#3B82F6] font-mono text-xs mr-3 font-bold select-none">{">"}</span>
                  <input
                    type="text"
                    required
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleSendMessage}
                    placeholder="Ask me something about Hammad's tech stack or availability... (Press Enter)"
                    className="flex-1 bg-transparent border-none text-[#EDEDED] font-mono text-xs focus:outline-none focus:ring-0 placeholder-[#737373]/80"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimal Copyright Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <span className={styles.footerLogo}>
              DESIGNED & CODED BY MUHAMMAD HAMMAD
            </span>
            <span className={styles.footerCopy}>
              © {new Date().getFullYear()} ALL RIGHTS RESERVED.
            </span>
          </div>
        </footer>

        {/* In-place Chatbot Popover */}
        <AnimatePresence>
          {isChatOpen && mode === "visual" && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={styles.chatPopover}
            >
              {/* Popover Header */}
              <div className={styles.popoverHeader}>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#ef4444] opacity-80" />
                  <div className="w-2 h-2 rounded-full bg-[#f59e0b] opacity-80" />
                  <div className="w-2 h-2 rounded-full bg-[#10b981] opacity-80" />
                </div>
                <span className="font-mono text-[9px] text-[#737373] tracking-widest uppercase">agent_support_chat // v1.0</span>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-[#737373] hover:text-[#EDEDED] transition-colors bg-transparent border-none cursor-pointer p-0"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Chat History scroll panel */}
              <div className={styles.popoverBody}>
                {chatHistory.map((msg) => (
                  <div key={msg.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold uppercase tracking-wider text-[9px] ${msg.sender === "bot" ? "text-[#3B82F6]" : "text-[#737373]"}`}>
                        {msg.sender === "bot" ? "[AGENT OS]" : "[USER]"}
                      </span>
                    </div>
                    <p className="whitespace-pre-line pl-3 border-l border-[#262626] text-[#EDEDED] opacity-90 text-[11px] font-mono leading-relaxed">
                      {formatMessage(msg.text)}
                    </p>
                  </div>
                ))}

                {isTyping && (
                  <div className="space-y-1">
                    <span className="font-bold text-[#3B82F6] uppercase tracking-wider text-[9px]">[AGENT OS]</span>
                    <div className="flex items-center pl-3 border-l border-[#262626] gap-1 text-[#737373] text-[11px] font-mono">
                      <span>Thinking</span>
                      <span className="w-1.5 h-3 bg-[#3B82F6] animate-pulse inline-block" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Suggestion Pills */}
              <div className="px-4 py-2 bg-[#0A0A0A]/40 border-t border-[#262626]/40 flex flex-wrap gap-1.5 select-none">
                {SUGGESTED_PILLS.map((pill) => (
                  <button
                    key={pill.label}
                    onClick={() => sendMessage(pill.prompt)}
                    className="px-2.5 py-0.5 rounded-full border border-[#262626] hover:border-[#3B82F6]/55 bg-[#121212]/50 hover:bg-[#3B82F6]/5 text-[9px] font-mono text-[#737373] hover:text-[#EDEDED] transition-all duration-300 cursor-pointer"
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              {/* Keyboard Entry Input */}
              <div className={styles.popoverFooter}>
                <span className="text-[#3B82F6] font-mono text-xs mr-2 font-bold select-none">{">"}</span>
                <input
                  type="text"
                  required
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleSendMessage}
                  placeholder="Ask me anything... (Press Enter)"
                  className="flex-1 bg-transparent border-none text-[#EDEDED] font-mono text-[11px] focus:outline-none focus:ring-0 placeholder-[#737373]/80"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle Agent Action Button Container */}
        <div className="fixed bottom-6 right-6 z-[100] flex items-center justify-end">
          {/* Animated Speech Bubble */}
          <AnimatePresence>
            {mode === "visual" && !isChatOpen && (
              <motion.div
                onClick={() => setIsChatOpen(true)}
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ delay: 1, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="mr-2 px-4 py-2.5 bg-[#0A0A0A]/95 border border-[#3B82F6]/30 backdrop-blur-md text-[11px] font-mono font-semibold rounded-2xl rounded-br-none text-[#EDEDED] shadow-[0_0_25px_rgba(59,130,246,0.25)] flex items-center gap-2 cursor-pointer select-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
                Ask me!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Toggle Button */}
          <motion.button
            onClick={() => {
              if (mode === "terminal") {
                setMode("visual");
              } else {
                setIsChatOpen(!isChatOpen);
              }
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -6, 0]
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              },
              default: { duration: 0.4 }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 flex items-center justify-center cursor-pointer group relative bg-transparent border-none outline-none select-none"
            aria-label="Toggle Agent Chat"
          >
            <img
              src="/pic.png"
              alt="AI Assistant"
              className={`w-full h-full object-contain scale-110 group-hover:scale-120 transition-all duration-300 ${styles.robotImage} filter ${mode === "terminal" || isChatOpen
                ? "drop-shadow-[0_0_15px_rgba(16,185,129,0.65)]"
                : "drop-shadow-[0_0_15px_rgba(59,130,246,0.65)]"
                }`}
            />

            {/* Custom Tooltip */}

          </motion.button>
        </div>
      </div>
    </div>
  );
}