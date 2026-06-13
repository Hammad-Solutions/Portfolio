import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: "spring" as const, stiffness: 60, damping: 15 } 
  }
};

const tagContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 15 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 80, damping: 15 } 
  }
};

export default function About() {
  const softSkills = [
    { title: "Clean Code", desc: "Writing maintainable, scalable, and efficient code that stands the test of time." },
    { title: "Innovation", desc: "Always exploring new technologies and creative solutions to complex problems." },
    { title: "Collaboration", desc: "Working effectively with teams to deliver exceptional user experiences." },
    { title: "Dedication", desc: "Committed to continuous learning and staying current with industry trends." }
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative z-10 border-t border-[var(--glass-border)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column: Text Content */}
        <div className="lg:col-span-7">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono tracking-widest text-[var(--accent-emerald)] uppercase block mb-3"
          >
            01 // PROFILE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight mb-8 text-[var(--text-primary)]"
          >
            About Me
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-[var(--text-secondary)] text-base leading-relaxed"
          >
            <p className="text-[var(--text-primary)] text-lg font-medium">
              Passionate about creating digital experiences that matter
            </p>
            <p>
              As a passionate Software Developer and a final-year Software Engineering student at Air University Islamabad, I specialize in building clean and efficient applications using React.js, Next.js, and Node.js. My journey in software development has been driven by a genuine interest in solving real-world problems.
            </p>
            <p>
              My project portfolio demonstrates my ability to tackle complex challenges, from developing a real-time WeatherApp using API integration to creating an IoT-based Smart Helmet for worker safety. I'm proficient in both front-end and back-end development and have a strong understanding of modern software design principles.
            </p>
            <p>
              Currently, I'm expanding my skills in Android App Development with React Native and exploring Software Architecture & Cloud Computing.
            </p>
          </motion.div>
 
          {/* Quick tags */}
          <motion.div 
            variants={tagContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap gap-2.5 mt-8"
          >
            {["Problem Solver", "Quick Learner", "Open to Collaborations", "Detail Oriented"].map((trait) => (
              <motion.span 
                key={trait} 
                variants={tagVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-3.5 py-1.5 rounded-full border border-[var(--glass-border)] text-xs text-[var(--text-primary)] bg-[var(--glass-bg)] font-medium cursor-default"
              >
                {trait}
              </motion.span>
            ))}
          </motion.div>
        </div>
 
        {/* Right column: Soft skills grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {softSkills.map((skill) => (
            <motion.div
              key={skill.title}
              variants={cardVariants}
              whileHover={{ y: -5, borderColor: "var(--accent-teal)", backgroundColor: "var(--glass-hover)" }}
              className="p-6 border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-xl flex flex-col justify-between min-h-[180px] h-auto transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{skill.title}</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed flex-grow">{skill.desc}</p>
            </motion.div>
          ))}
        </motion.div>
 
      </div>
    </section>
  );
}
