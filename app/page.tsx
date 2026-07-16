"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const MatrixRainBackground = dynamic(() => import("../components/canvas/MatrixRainBackground"), { ssr: false });
const Projects = dynamic(() => import("../components/ui/Projects"), {
  ssr: false,
  loading: () => (
    <div className="py-20 text-center font-mono text-xs text-neutral-500">
      Loading Projects Engine...
    </div>
  ),
});
const CustomCursor = dynamic(() => import("../components/ui/CustomCursor"), { ssr: false });

import About from "../components/ui/About";
import Skills from "../components/ui/Skills";
import Contact from "../components/ui/Contact";
import FloatingCTA from "../components/ui/FloatingCTA";
import MagneticButton from "../components/ui/MagneticButton";
import MorphingBlob from "../components/ui/MorphingBlob";
import RadialStat from "../components/ui/RadialStat";
import SocialProof from "../components/ui/SocialProof";
import { getBotResponse } from "../lib/rag";
import styles from "./page.module.css";
import PageLoader, { usePageLoader } from "../components/ui/PageLoader";

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

const StarIcon = () => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="#10B981" className="shrink-0">
    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
  </svg>
);

const FiveStars = () => (
  <div className="flex gap-0.5 items-center">
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarIcon />
    <StarIcon />
  </div>
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
  { text: "Software Architect", color: "#10B981" },
  { text: "Full-Stack Engineer", color: "#14B8A6" },
  { text: "Systems Designer", color: "#3B82F6" },
  { text: "AI Integration Specialist", color: "#A855F7" },
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
          initial={{ opacity: 0, y: 10, filter: "blur(6px)", transform: "translate3d(0px, 10px, 0px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", transform: "translate3d(0px, 0px, 0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(6px)", transform: "translate3d(0px, -10px, 0px)" }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{ color: role.color, willChange: "transform, filter, opacity" }}
          className="font-bold"
        >
          {role.text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function HeroAvatar() {
  const [imgSrc, setImgSrc] = useState("/p6.png");
  const [useFallback, setUseFallback] = useState(false);

  const handleError = () => {
    setUseFallback(true);
  };

  return (
    <div
      className={styles.profilePhotoCard}
      style={{
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        padding: '0px',
        margin: '0px',
        // Must be hidden so the bottom of the suit doesn't spill out
        overflow: 'hidden',
        position: 'absolute',
        display: 'block',
        width: '100%',
        height: '100%'
      }}
    >
      {!useFallback ? (
        <img
          src={imgSrc}
          alt="Muhammad Hammad"
          onError={handleError}
          className={styles.profilePhotoImg}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',

            // 1. LOCK TO TOP: This forces the flat cut-off line of your hair to perfectly align with the top border of the card.
            objectPosition: 'top center',
            background: 'transparent',
            border: 'none',

            // 2. SCALE ONLY: Since it's locked to the top, if the suit doesn't reach the bottom, just increase this to 1.1, 1.15, etc.
            transform: 'scale(1.35)',

            // 3. ZOOM DIRECTION: Forces the zoom to push downwards, keeping the head perfectly glued to the top.
            transformOrigin: 'top center'
          }}
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
  style?: React.CSSProperties | any;
}

function BentoCard({ children, className = "", variants, innerClassName = "flex flex-col justify-between h-full w-full relative z-10 min-w-0", style }: BentoCardProps) {
  return (
    <motion.div
      variants={variants}
      className={`${styles.bentoCard} bento-card-hover-trigger ${className} overflow-hidden`}
      style={style}
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

  // Fluid Parallax offsets for Bento Grid
  const bentoY1 = useTransform(scrollYProgress, [0, 0.2], [0, -10]);
  const bentoY2 = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const bentoY3 = useTransform(scrollYProgress, [0, 0.2], [0, -20]);
  const bentoY4 = useTransform(scrollYProgress, [0, 0.2], [0, -40]);
  const bentoY5 = useTransform(scrollYProgress, [0, 0.2], [0, -15]);

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
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // Session-Aware Proactive Lead Capture 45-second Timer Hook
  useEffect(() => {
    if (hasInteractedRef.current) return;

    if (isChatOpen) {
      hasInteractedRef.current = true;
      return;
    }

    const timer = setTimeout(() => {
      setIsChatOpen(true);
      hasInteractedRef.current = true;
      setChatHistory((prev) => {
        const alreadyHasProactive = prev.some(msg => msg.text.includes("noticed you're exploring my portfolio"));
        if (alreadyHasProactive) return prev;

        return [
          ...prev,
          {
            id: `proactive-${Date.now()}`,
            sender: "bot",
            text: "I noticed you're exploring my portfolio and getting interested in my work. If you'd like to collaborate or arrange a meeting, I would be more than happy to connect."
          }
        ];
      });
    }, 40000);

    return () => clearTimeout(timer);
  }, [isChatOpen]);

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

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const target = document.getElementById(id);
    if (!target) return;

    const needsModeSwitch = mode !== "visual";
    if (needsModeSwitch) {
      setMode("visual");
    }

    setTimeout(() => {
      // Find sticky navbar height dynamically
      const navbar = document.querySelector(`.${styles.navbar}`);
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 70;

      // Calculate target element position with offset
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 16;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }, needsModeSwitch ? 150 : 0);
  };

  if (!mounted) return null;

  return (
    <PageLoader>
      <CustomCursor />
      <div className={`${styles.container} w-full max-w-full`}>
        {/* Glowing Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#10B981] via-[#14B8A6] to-[#3B82F6] origin-[0%] z-[9999]"
          style={{ scaleX }}
        />

        {/* 1. Tactical CSS Film Grain Overlay */}
        <div className={styles.noiseOverlay} />

        {/* Removed ScrollParticles to keep only the Matrix Rain */}

        {/* 3. Hacker Style Binary Rain Background */}
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
                    className={`${styles.navLink} transition-all duration-300 ${activeSection === link
                      ? "text-white font-medium"
                      : "text-neutral-400 hover:text-white"
                      }`}
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
                  className={`relative px-4 py-1.5 text-[10px] font-mono font-bold tracking-wider transition-colors duration-300 z-10 rounded-full ${mode === "visual" ? "text-white font-medium" : "text-neutral-400 hover:text-white"
                    }`}
                >
                  VISUAL
                  {mode === "visual" && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-neutral-800 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      style={{ boxShadow: "0 0 12px rgba(16, 185, 129, 0.4)" }}
                    />
                  )}
                </button>

                <button
                  onClick={() => {
                    setMode("terminal");
                    setIsChatOpen(true);
                  }}
                  className={`relative px-4 py-1.5 text-[10px] font-mono font-bold tracking-wider transition-colors duration-300 z-10 rounded-full ${mode === "terminal" ? "text-white font-medium" : "text-neutral-400 hover:text-white"
                    }`}
                >
                  <span className="hidden sm:inline">SUPPORT BOT</span>
                  <span className="inline sm:hidden">BOT</span>
                  {mode === "terminal" && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-neutral-800 rounded-full -z-10"
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
          <div className="w-full max-w-full overflow-x-hidden pt-20">
            {/* Hero Section — Bento Grid */}
            <section id="home" className="pt-8 pb-16 w-full max-w-[1440px] mx-auto relative z-10">
              {/* Floating Social Proof Badge */}


              {/* Ambient hero layers */}
              <MorphingBlob />
              {/* Removed HeroParticles to keep only the Matrix Rain */}
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
                  style={{ y: bentoY1 }}
                >
                  {/* Pulsing Status Badge */}
                  <a
                    href="#contact"
                    title="Currently accepting 1-2 new client projects"
                    className="mb-6 mx-auto self-center flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] text-emerald-400 font-mono tracking-widest font-semibold uppercase relative overflow-hidden select-none hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group"
                    style={{ backdropFilter: "blur(4px)" }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Accepting Select Engagements
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">↗</span>
                  </a>

                  {/* Main Title */}
                  <h1 className={styles.heading}>
                    <span className={`${styles.gradientText} bento-title-highlight`} style={{ "--accent-color": "#10B981" } as React.CSSProperties}>
                      Muhammad Hammad
                    </span>
                  </h1>

                  {/* Role Row — animated typewriter cycling */}
                  <div className="text-[clamp(1.1rem,2.3vw,1.65rem)] font-medium tracking-wide mb-6">
                    <TypewriterRoles />
                  </div>

                  {/* Bio text — outcome-driven */}
                  <p className="text-[#d4d4d4] text-base md:text-[1.05rem] !leading-[1.8] max-w-2xl">
                    I architect production systems that scale — from AI-augmented interfaces to real-time IoT telemetry. 4+ years shipping React, Next.js, Node.js &amp; C++ across enterprise web, embedded, and LLM-integrated platforms.
                  </p>
                  <div className="text-xs font-mono text-[#a3a3a3] mt-4 flex items-center gap-1.5 justify-start">
                    <span>Don&apos;t want to read?</span>
                    <button
                      onClick={() => {
                        setIsChatOpen(true);
                        setMode("terminal");
                      }}
                      className="text-[#3B82F6] hover:text-[#60A5FA] underline font-bold cursor-pointer transition-colors"
                    >
                      Ask my AI agent to summarize my experience.
                    </button>
                  </div>
                </BentoCard>

                {/* Card 2: Interactive Avatar Card */}
                <BentoCard
                  variants={itemVariants}
                  className={styles.avatarCard}
                  innerClassName="flex items-center justify-center h-full w-full relative z-10 min-w-0"
                  style={{ y: bentoY2 }}
                >
                  <HeroAvatar />
                </BentoCard>

                {/* Card 3: Metrics & Stats */}
                <BentoCard
                  variants={itemVariants}
                  className={styles.statsCard}
                  style={{ y: bentoY3 }}
                >
                  <h4 className="text-[10px] font-mono font-bold text-[#10B981] tracking-widest uppercase mb-4">
                    <span className="bento-title-highlight" style={{ "--accent-color": "#10B981" } as React.CSSProperties}>
                      {"//"} METRICS
                    </span>
                  </h4>
                  <div className="flex flex-col justify-between h-full gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-emerald-400/80 block uppercase tracking-wider">EDUCATION</span>
                      <h5 className="text-sm font-bold text-[#EDEDED] leading-tight">BS Software Engineering</h5>
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold">Air University Islamabad</span>
                    </div>
                    {/* Radial stats */}
                    <div className="flex items-end justify-around gap-2 pt-2">
                      <RadialStat
                        value={80}
                        displayValue="04+"
                        label="Years"
                        sublabel="Coding"
                        color="#10B981"
                        delay={0}
                      />
                      <RadialStat
                        value={75}
                        displayValue="15+"
                        label="Projects"
                        sublabel="Shipped"
                        color="#3B82F6"
                        delay={0.15}
                      />
                      <RadialStat
                        value={60}
                        displayValue="3+"
                        label="Stacks"
                        sublabel="Active"
                        color="#A855F7"
                        delay={0.3}
                      />
                    </div>
                  </div>
                </BentoCard>

                {/* Card 4: Actions & Socials */}
                <BentoCard
                  variants={itemVariants}
                  className={styles.actionsCard}
                  style={{ y: bentoY4 }}
                >
                  <div className="flex flex-col h-full w-full">
                    <h4 className="text-[10px] font-mono font-bold text-[#3B82F6] tracking-widest uppercase mb-4 shrink-0">
                      <span className="bento-title-highlight" style={{ "--accent-color": "#3B82F6" } as React.CSSProperties}>
                        {"//"} CONNECT
                      </span>
                    </h4>
                    <div className="flex flex-col justify-center items-center flex-1 gap-6 w-full pb-4">
                      <div className="flex flex-col gap-3 w-full px-2 sm:px-6">
                        <a href="#contact" className="w-full">
                          <MagneticButton className="w-full">
                            <motion.button
                              whileHover={{ borderColor: "#10B981", boxShadow: "0 0 20px rgba(16,185,129,0.25)" }}
                              whileTap={{ scale: 0.98 }}
                              className={`${styles.btnSecondary} w-full text-center py-2.5 font-bold text-[11px]`}
                            >
                              Get In Touch
                            </motion.button>
                          </MagneticButton>
                        </a>
                        <a href="/Muhammad Hammad.docx" download="Muhammad Hammad.docx" className="w-full">
                          <MagneticButton className="w-full">
                            <motion.button
                              whileHover={{
                                borderColor: "#3B82F6",
                                boxShadow: "0 0 20px rgba(59,130,246,0.25)",
                                backgroundColor: "rgba(59,130,246,0.05)"
                              }}
                              whileTap={{ scale: 0.98 }}
                              className={`${styles.btnSecondary} w-full flex items-center justify-center gap-2 py-2.5 font-bold text-[11px]`}
                            >
                              <DownloadIcon />
                              Download CV
                            </motion.button>
                          </MagneticButton>
                        </a>
                      </div>
                      <div className="flex gap-3 justify-center">
                        <motion.a
                          href="https://github.com/Hammad-Solutions"
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ borderColor: "#10B981", color: "#10B981", boxShadow: "0 0 10px rgba(16,185,129,0.2)" }}
                          className={styles.socialIcon}
                          style={{ width: "2.5rem", height: "2.5rem" }}
                        >
                          <GithubIcon />
                        </motion.a>

                        <motion.a
                          href="https://linkedin.com/in/hammad-solution"
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ borderColor: "#C084FC", color: "#C084FC", boxShadow: "0 0 10px rgba(192,132,252,0.2)" }}
                          className={styles.socialIcon}
                          style={{ width: "2.5rem", height: "2.5rem" }}
                        >
                          <LinkedinIcon />
                        </motion.a>

                        <motion.a
                          href="mailto:m6784104@gmail.com"
                          whileHover={{ borderColor: "#10B981", color: "#10B981", boxShadow: "0 0 10px rgba(16,185,129,0.2)" }}
                          className={styles.socialIcon}
                          style={{ width: "2.5rem", height: "2.5rem" }}
                        >
                          <MailIcon />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </BentoCard>

                {/* Card 5: Tech Spotlight */}
                <BentoCard
                  variants={itemVariants}
                  className={styles.techCard}
                  style={{ y: bentoY5 }}
                >
                  <div className="flex flex-col h-full w-full">
                    <h4 className="text-[10px] font-mono font-bold text-[#14B8A6] tracking-widest uppercase mb-5 shrink-0">
                      <span className="bento-title-highlight" style={{ "--accent-color": "#14B8A6" } as React.CSSProperties}>
                        {"//"} ARCHITECTURE
                      </span>
                    </h4>
                    <div className="flex flex-col flex-1 justify-center gap-5 w-full">

                      {/* Tier 1: Client */}
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse shadow-[0_0_8px_#14B8A6]"></span>
                          <span className="text-[9px] font-mono text-blue-400/80 uppercase tracking-widest">Client</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {[{ name: "Next.js", color: "#EDEDED", border: "#14B8A6" }, { name: "React", color: "#3B82F6", border: "#3B82F6" }, { name: "Framer", color: "#ec4899", border: "#ec4899" }].map(t => (
                            <span
                              key={t.name}
                              className="px-2.5 py-1 text-[10px] font-mono text-[#a3a3a3] bg-[#0A0A0A] rounded-md border border-[#262626] transition-colors duration-300 select-none cursor-default"
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = `${t.border}66`;
                                e.currentTarget.style.color = t.border;
                                e.currentTarget.style.backgroundColor = `${t.border}0a`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "#262626";
                                e.currentTarget.style.color = "#a3a3a3";
                                e.currentTarget.style.backgroundColor = "#0A0A0A";
                              }}
                            >
                              {t.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tier 2: Server */}
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                          <span className="text-[9px] font-mono text-emerald-400/80 uppercase tracking-widest">Server</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {[{ name: "Node.js", color: "#10B981", border: "#10B981" }, { name: "Express", color: "#EDEDED", border: "#a3a3a3" }, { name: "MongoDB", color: "#10B981", border: "#10B981" }].map(t => (
                            <span
                              key={t.name}
                              className="px-2.5 py-1 text-[10px] font-mono text-[#a3a3a3] bg-[#0A0A0A] rounded-md border border-[#262626] transition-colors duration-300 select-none cursor-default"
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = `${t.border}66`;
                                e.currentTarget.style.color = t.border;
                                e.currentTarget.style.backgroundColor = `${t.border}0a`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "#262626";
                                e.currentTarget.style.color = "#a3a3a3";
                                e.currentTarget.style.backgroundColor = "#0A0A0A";
                              }}
                            >
                              {t.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tier 3: Systems */}
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]"></span>
                          <span className="text-[9px] font-mono text-purple-400/80 uppercase tracking-widest">Systems</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {[{ name: "C++", color: "#A855F7", border: "#A855F7" }, { name: "Python", color: "#eab308", border: "#eab308" }, { name: "Java", color: "#ef4444", border: "#ef4444" }].map(t => (
                            <span
                              key={t.name}
                              className="px-2.5 py-1 text-[10px] font-mono text-[#a3a3a3] bg-[#0A0A0A] rounded-md border border-[#262626] transition-colors duration-300 select-none cursor-default"
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = `${t.border}66`;
                                e.currentTarget.style.color = t.border;
                                e.currentTarget.style.backgroundColor = `${t.border}0a`;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "#262626";
                                e.currentTarget.style.color = "#a3a3a3";
                                e.currentTarget.style.backgroundColor = "#0A0A0A";
                              }}
                            >
                              {t.name}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </BentoCard>
              </motion.div>
            </section>



            {/* Floating CTA */}
            <FloatingCTA />

            {/* Rest of the Portfolio page sections */}
            <About />
            <Skills />
            <SocialProof />
            <Projects />
            <Contact />
          </div>



          {/* Enhanced 3-Column Footer */}
          <footer className={styles.footer}>
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              {/* Top gradient border */}
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent mb-10" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Left: Brand */}
                <div>
                  <span className="font-mono text-xs font-black tracking-[0.2em] text-[#EDEDED] uppercase block mb-2">
                    Muhammad Hammad
                  </span>
                  <p className="text-[11px] text-[#525252] leading-relaxed max-w-xs">
                    Full-stack developer specializing in React, Next.js &amp; AI-integrated applications. Open to freelance &amp; full-time roles.
                  </p>
                  <div className="flex gap-3 mt-4">
                    {[
                      { href: "https://github.com/Hammad-Solutions", label: "GitHub", color: "#10B981" },
                      { href: "https://linkedin.com/in/hammad-solution", label: "LinkedIn", color: "#A855F7" },
                      { href: "mailto:m6784104@gmail.com", label: "Email", color: "#3B82F6" },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target={s.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        aria-label={s.label}
                        className="text-[10px] font-mono text-[#525252] hover:text-[#EDEDED] transition-colors duration-300 underline underline-offset-2"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
                {/* Center: Nav */}
                <div className="md:flex md:justify-center">
                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-[#525252] uppercase block mb-3">Navigate</span>
                    <nav className="flex flex-col gap-2">
                      {["home", "about", "skills", "projects", "contact"].map((link) => (
                        <a
                          key={link}
                          href={`#${link}`}
                          className="text-[11px] font-mono text-[#a3a3a3] hover:text-[#10B981] transition-colors duration-300 capitalize tracking-wide"
                        >
                          {link}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
                {/* Right: CTA */}
                <div className="md:flex md:justify-end">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-[10px] font-mono text-[#10B981] font-semibold uppercase tracking-widest">Accepting Engagements</span>
                    </div>
                    <p className="text-[11px] text-[#525252] mb-3 max-w-[200px]">
                      Currently accepting selective client engagements and consulting.
                    </p>
                    <a
                      href="mailto:m6784104@gmail.com"
                      className="text-[11px] font-mono text-[#EDEDED] hover:text-[#10B981] transition-colors duration-300 underline underline-offset-2"
                    >
                      m6784104@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              {/* Bottom bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6 border-t border-[var(--glass-border)]">
                <span className={styles.footerLogo}>DESIGNED &amp; CODED BY MUHAMMAD HAMMAD</span>
                <span className="text-[9px] font-mono text-[#525252]">BUILT WITH NEXT.JS · THREE.JS · FRAMER MOTION</span>
                <span className={styles.footerCopy}>© {new Date().getFullYear()} ALL RIGHTS RESERVED.</span>
              </div>
            </div>
          </footer>

          {/* Premium Centered Chatbot Modal */}
          <AnimatePresence>
            {isChatOpen && (
              <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full max-w-4xl h-[80vh] max-h-[800px] bg-[#0A0A0A]/95 border border-white/10 rounded-xl shadow-2xl flex flex-col overflow-hidden"
                >
                  {/* Header System bar */}
                  <div className="bg-[#121212]/50 border-b border-[#262626] px-5 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ef4444] opacity-80" />
                      <div className="w-3 h-3 rounded-full bg-[#f59e0b] opacity-80" />
                      <div className="w-3 h-3 rounded-full bg-[#10b981] opacity-80" />
                    </div>
                    <span className="font-mono text-[10px] text-[#a3a3a3] tracking-widest uppercase">agent_support_chat</span>
                    <button
                      onClick={() => {
                        setIsChatOpen(false);
                        setMode("visual");
                        sessionStorage.setItem("hasInteracted", "true");
                      }}
                      className="text-[#a3a3a3] hover:text-[#EDEDED] transition-colors bg-transparent border-none cursor-pointer p-0"
                      aria-label="Close Chat"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>

                  {/* Chat History scroll panel */}
                  <div className="flex-1 p-6 overflow-y-auto space-y-5 font-mono text-xs text-[#EDEDED] leading-relaxed hide-scrollbar bg-[#0A0A0A]/50">
                    {chatHistory.map((msg) => (
                      <div key={msg.id} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold uppercase tracking-wider ${msg.sender === "bot" ? "text-[#3B82F6]" : "text-[#a3a3a3]"}`}>
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
                        <div className="flex items-center pl-4 border-l border-[#262626] gap-1 text-[#a3a3a3]">
                          <span>Thinking</span>
                          <span className="w-1.5 h-3.5 bg-[#3B82F6] animate-pulse inline-block" />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Suggestion Pills */}
                  <div className="px-6 py-3 bg-[#0A0A0A]/40 border-t border-[#262626]/40 flex flex-wrap gap-2">
                    {SUGGESTED_PILLS.map((pill) => (
                      <button
                        key={pill.label}
                        onClick={() => sendMessage(pill.prompt)}
                        className="px-3 py-1 rounded-full border border-[#262626] hover:border-[#3B82F6]/50 bg-[#121212]/50 hover:bg-[#3B82F6]/5 text-[10px] font-mono text-[#a3a3a3] hover:text-[#EDEDED] transition-all duration-300 cursor-pointer select-none"
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
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Floating Toggle Agent Action Button Container */}
          <div className="fixed right-4 bottom-24 md:right-6 md:bottom-6 z-[100] flex items-center justify-end pointer-events-none">
            {/* Floating Toggle Button */}
            <motion.button
              onClick={() => {
                setIsChatOpen(!isChatOpen);
                if (isChatOpen) {
                  setMode("visual");
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
              className="w-20 h-20 flex items-center justify-center cursor-pointer group relative bg-transparent border-none outline-none select-none pointer-events-auto"
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
            </motion.button>
          </div>
        </div>
      </div>
    </PageLoader>
  );
}