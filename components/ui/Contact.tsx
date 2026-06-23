import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Inline SVG icons to avoid any extra imports
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

// Particle component for success burst
interface ParticleProps {
  x: number;
  y: number;
  color: string;
  delay: number;
}

function SuccessParticle({ x, y, color, delay }: ParticleProps) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{ backgroundColor: color, left: "50%", top: "50%" }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x, y, opacity: 0, scale: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    />
  );
}

const PARTICLES = [
  { x: 60,  y: -60,  color: "#10B981", delay: 0 },
  { x: -55, y: -55,  color: "#14B8A6", delay: 0.04 },
  { x: 70,  y: 20,   color: "#10B981", delay: 0.08 },
  { x: -70, y: 25,   color: "#A855F7", delay: 0.02 },
  { x: 20,  y: -75,  color: "#3B82F6", delay: 0.06 },
  { x: -25, y: -70,  color: "#10B981", delay: 0.1 },
  { x: 45,  y: 65,   color: "#14B8A6", delay: 0.05 },
  { x: -50, y: 60,   color: "#3B82F6", delay: 0.03 },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showParticles, setShowParticles] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setShowParticles(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => {
        setStatus("idle");
        setShowParticles(false);
      }, 3500);
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : "Failed to send the message.";
      console.error("Error submitting contact form:", error);
      setStatus("error");
      setErrorMessage(errorMsg);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-5xl mx-auto relative z-10 border-t border-[var(--glass-border)]">
      <div className="text-center mb-12">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] font-mono tracking-[0.25em] text-[#A855F7] uppercase block mb-3 font-black"
        >
          04 // ACQUISITION
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold tracking-tight mb-4 text-[var(--text-primary)]"
        >
          Get In Touch
        </motion.h2>
        <p className="text-[var(--text-secondary)] text-sm md:text-base max-w-md mx-auto">
          Have a project in mind or want to collaborate? Drop me a message and let's build something exceptional.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
        className="p-8 md:p-10 border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl rounded-2xl shadow-lg"
      >
        {/* Trust Signals */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { icon: "⚡", text: "Response within 24 hours" },
            { icon: "🔒", text: "NDA available on request" },
            { icon: "📍", text: "Pakistan · Available Globally (Remote)" },
          ].map((item, i) => (
            <motion.span
              key={item.text}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono text-[#a3a3a3] border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-full backdrop-blur-sm"
            >
              <span>{item.icon}</span>
              {item.text}
            </motion.span>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-xs font-semibold text-[var(--text-secondary)] tracking-wider uppercase block">Your Name</label>
              <input
                id="contact-name"
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-[var(--bg-midnight)] border border-[var(--glass-border)] rounded-xl focus:outline-none focus:border-[var(--accent-emerald)] focus:ring-1 focus:ring-[var(--accent-emerald)] transition-all duration-300 text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-xs font-semibold text-[var(--text-secondary)] tracking-wider uppercase block">Email Address</label>
              <input
                id="contact-email"
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-[var(--bg-midnight)] border border-[var(--glass-border)] rounded-xl focus:outline-none focus:border-[var(--accent-emerald)] focus:ring-1 focus:ring-[var(--accent-emerald)] transition-all duration-300 text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-message" className="text-xs font-semibold text-[var(--text-secondary)] tracking-wider uppercase block">Your Message</label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about your project or inquiry..."
              className="w-full px-4 py-3 bg-[var(--bg-midnight)] border border-[var(--glass-border)] rounded-xl focus:outline-none focus:border-[var(--accent-emerald)] focus:ring-1 focus:ring-[var(--accent-emerald)] transition-all duration-300 text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)] resize-none"
            />
          </div>

          <div className="flex flex-col items-center pt-2 gap-4">
            {/* Submit button with particle burst origin */}
            <div className="relative w-full sm:w-auto">
              <motion.button
                type="submit"
                id="contact-submit-btn"
                disabled={status === "sending" || status === "success"}
                whileHover={status === "idle" || status === "error" ? { 
                  y: -2, 
                  scale: 1.02, 
                  boxShadow: status === "error" 
                    ? "0 0 25px rgba(239,68,68,0.3)" 
                    : "0 0 30px rgba(16,185,129,0.4)" 
                } : {}}
                whileTap={status === "idle" || status === "error" ? { scale: 0.98 } : {}}
                className={`px-10 py-4 font-bold text-sm rounded-full tracking-wide transition-all duration-300 shadow-md w-full sm:w-auto ${
                  status === "error"
                    ? "bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30 cursor-pointer"
                    : status === "success"
                    ? "bg-[var(--accent-emerald)]/80 text-[var(--bg-midnight)] cursor-default"
                    : "bg-[var(--accent-emerald)] hover:bg-[#0ea5e9]/10 hover:text-[var(--accent-emerald)] disabled:bg-[var(--accent-emerald)]/40 text-[var(--bg-midnight)] cursor-pointer"
                }`}
              >
                {status === "idle" && "Send Message"}
                {status === "sending" && "Processing..."}
                {status === "success" && "✓ Message Sent!"}
                {status === "error" && "Try Again"}
              </motion.button>

              {/* Particle burst on success */}
              <AnimatePresence>
                {showParticles && PARTICLES.map((p, i) => (
                  <SuccessParticle key={i} x={p.x} y={p.y} color={p.color} delay={p.delay} />
                ))}
              </AnimatePresence>
            </div>

            {errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 font-mono text-[11px] text-center bg-red-950/45 border border-red-500/25 py-2.5 px-5 rounded-xl max-w-md"
              >
                ⚠ {errorMessage}
              </motion.p>
            )}
          </div>
        </form>
      </motion.div>

      {/* Social Links Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 flex flex-col items-center gap-4"
      >
        <p className="text-xs font-mono text-[var(--text-secondary)] tracking-widest uppercase">
          Or reach me directly
        </p>
        <div className="flex items-center gap-4">
          <motion.a
            href="https://github.com/Hammad-Solutions"
            target="_blank"
            rel="noreferrer"
            whileHover={{ 
              borderColor: "#10B981", 
              color: "#10B981",
              boxShadow: "0 0 16px rgba(16,185,129,0.3)"
            }}
            className="w-11 h-11 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-secondary)] transition-all duration-300"
            aria-label="GitHub"
          >
            <GithubIcon />
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/hammad-solution"
            target="_blank"
            rel="noreferrer"
            whileHover={{ 
              borderColor: "#C084FC", 
              color: "#C084FC",
              boxShadow: "0 0 16px rgba(192,132,252,0.3)"
            }}
            className="w-11 h-11 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-secondary)] transition-all duration-300"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </motion.a>

          <motion.a
            href="mailto:m6784104@gmail.com"
            whileHover={{ 
              borderColor: "#10B981", 
              color: "#10B981",
              boxShadow: "0 0 16px rgba(16,185,129,0.3)"
            }}
            className="w-11 h-11 rounded-full border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-secondary)] transition-all duration-300"
            aria-label="Email"
          >
            <MailIcon />
          </motion.a>

          {/* Email text */}
          <span className="text-xs font-mono text-[var(--text-muted)] hidden sm:inline">
            m6784104@gmail.com
          </span>
        </div>
      </motion.div>
    </section>
  );
}
