import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      setStatus("error");
      setErrorMessage(error.message || "Failed to send the message.");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-4xl mx-auto relative z-10 border-t border-[var(--glass-border)]">
      <div className="text-center mb-12">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-mono tracking-widest text-[var(--accent-emerald)] uppercase block mb-3"
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
          Have a project in mind or want to collaborate? Drop me a message (or email directly at <strong className="text-[var(--text-primary)]">m6784104@gmail.com</strong>) and let's build something exceptional.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
        className="p-8 md:p-10 border border-[var(--glass-border)] bg-[var(--bg-surface)] rounded-2xl shadow-lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs font-semibold text-[var(--text-secondary)] tracking-wider uppercase block">Your Name</label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-[var(--bg-midnight)] border border-[var(--glass-border)] rounded-xl focus:outline-none focus:border-[var(--accent-emerald)] focus:ring-1 focus:ring-[var(--accent-emerald)] transition-all duration-300 text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-semibold text-[var(--text-secondary)] tracking-wider uppercase block">Email Address</label>
              <input
                id="email"
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
            <label htmlFor="message" className="text-xs font-semibold text-[var(--text-secondary)] tracking-wider uppercase block">Your Message</label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about your project or inquiry..."
              className="w-full px-4 py-3 bg-[var(--bg-midnight)] border border-[var(--glass-border)] rounded-xl focus:outline-none focus:border-[var(--accent-emerald)] focus:ring-1 focus:ring-[var(--accent-emerald)] transition-all duration-300 text-[var(--text-primary)] text-sm placeholder-[var(--text-muted)] resize-none"
            />
          </div>

          <div className="flex flex-col items-center pt-2">
            <motion.button
              type="submit"
              disabled={status === "sending" || status === "success"}
              whileHover={status === "idle" || status === "error" ? { y: -2, scale: 1.02, boxShadow: status === "error" ? "0 0 25px rgba(239, 68, 68, 0.3)" : "0 0 25px rgba(16, 185, 129, 0.3)" } : {}}
              whileTap={status === "idle" || status === "error" ? { scale: 0.98 } : {}}
              className={`px-10 py-4 font-bold text-sm rounded-full tracking-wide transition-all duration-300 shadow-md cursor-pointer w-full sm:w-auto ${
                status === "error"
                  ? "bg-red-500/20 text-red-500 border border-red-500/50 hover:bg-red-500/30"
                  : "bg-[var(--accent-emerald)] hover:bg-[#0ea5e9]/10 hover:text-[var(--accent-emerald)] disabled:bg-[var(--accent-emerald)]/40 text-[var(--bg-midnight)]"
              }`}
            >
              {status === "idle" && "Send Message"}
              {status === "sending" && "Processing..."}
              {status === "success" && "Message Sent!"}
              {status === "error" && "Try Again"}
            </motion.button>

            {errorMessage && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 font-mono text-[11px] text-center mt-4 bg-red-950/45 border border-red-500/25 py-2.5 px-5 rounded-xl max-w-md"
              >
                ⚠️ {errorMessage}
              </motion.p>
            )}
          </div>
        </form>
      </motion.div>
    </section>
  );
}
