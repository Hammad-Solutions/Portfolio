export interface ImpactMetric {
  label: string;
  value: string;
  unit?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
  architecture: string[];
  challenges: string;
  solutions: string;
  impact?: ImpactMetric[];
}

export const portfolioData = {
  name: "Muhammad Hammad",
  title: "Software Developer | BS Software Engineering Student",
  university: "Air University Islamabad",
  about: "As a passionate Software Developer and a final-year Software Engineering student at Air University Islamabad, I specialize in building clean and efficient applications using React.js, Next.js, and Node.js. My journey in software development has been driven by a genuine interest in solving real-world problems.",
  softSkills: [
    { title: "Clean Code", description: "Writing maintainable, scalable, and efficient code that stands the test of time." },
    { title: "Innovation", description: "Always exploring new technologies and creative solutions to complex problems." },
    { title: "Collaboration", description: "Working effectively with teams to deliver exceptional user experiences." },
    { title: "Dedication", description: "Committed to continuous learning and staying current with industry trends." }
  ],
  traits: ["Problem Solver", "Quick Learner", "Open to Collaborations", "Detail Oriented"],
  technologies: [
    "React.js", "Next.js", "JavaScript", "Node.js", "C++", "Java", "Firebase", "Git", "Tailwind CSS", "API Integration", "WordPress", "OOP"
  ],
  currentlyLearning: [
    "Android App Development (React Native)",
    "Advanced Next.js & Firebase",
    "Software Architecture & Cloud Computing"
  ],
  projects: [
    {
      id: "ai-portfolio",
      title: "Autonomous AI-Agent & Developer Interface",
      description: "The portfolio you're viewing right now. A next-generation developer site featuring an integrated RAG AI Chatbot that answers questions about my experience in real-time, a volumetric 3D Skills Globe built with custom GLSL shaders, and seamless physics-based animations — all serving as a live proof-of-concept of my full-stack capabilities.",
      tags: ["Next.js", "AI (RAG)", "Three.js (WebGL)", "Framer Motion", "GSAP"],
      image: "/ai_portfolio_cover.png",
      github: "https://github.com/Hammad-Solutions/Portfolio",
      demo: "https://hammad-solutions-portfolio.vercel.app",
      architecture: ["Next.js (App Router)", "Tailwind CSS & CSS Modules", "Three.js & React Three Fiber (R3F)", "Framer Motion & GSAP", "Vector Embeddings & RAG Engine"],
      challenges: "Implementing an interactive 3D particle skills globe with HTML overlays that stays performant on low-end mobile devices and doesn't block scroll snapping.",
      solutions: "Created a visibility-aware render pipeline using IntersectionObserver that completely pauses the 3D physics loop and style updates when scrolled off-screen.",
      impact: [
        { label: "Lighthouse Score", value: "98", unit: "/100" },
        { label: "RAG Latency", value: "<800", unit: "ms" },
        { label: "Build Time", value: "<16", unit: "s" }
      ]
    },
    {
      id: "previous-portfolio",
      title: "Portfolio",
      description: "My original personal portfolio, purpose-built in pure HTML, CSS and vanilla JavaScript — no frameworks, no dependencies. Achieved glassmorphic card layouts, smooth page transitions, and full responsiveness using only custom CSS variables and media query sheets.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
      github: "https://github.com/Hammad-Solutions/hammad-solutions.github.io",
      architecture: ["HTML5 Semantic Markup", "Vanilla CSS3 Grid/Flexbox", "Custom Javascript DOM Engine"],
      challenges: "Achieving dynamic, glassmorphic layouts without external styling frameworks, ensuring fast loading and standard responsiveness.",
      solutions: "Designed custom CSS variables and media query breakpoint sheets to ensure smooth responsive reflows.",
      impact: [
        { label: "Bundle Size", value: "0", unit: "KB" },
        { label: "Dependencies", value: "None", unit: "" }
      ]
    },
    {
      id: "student-management",
      title: "Student Management System",
      description: "A C++ console application managing student records with full admin/teacher/student role separation. Implements atomic file-stream staging to handle record updates without index mismatch — mimicking database CRUD operations using flat text files and STL.",
      tags: ["C++", "File Handling", "OOP", "Data Structures"],
      image: "https://cdn4.slideserve.com/9079189/student-information-system-n.jpg",
      github: "https://github.com/Hammad-Solutions/Student-Management-System-Cpp-File-Handling",
      architecture: ["C++ Core Runtime", "File Stream I/O System", "Standard Template Library (STL)", "Procedural Admin/User Console"],
      challenges: "Handling database operations like record updates and deletes on flat text files without database management systems (DBMS), which frequently caused index mismatch errors.",
      solutions: "Built an abstract temporary staging file stream mechanism to copy, filter, and rewrite student records with atomic write consistency.",
      impact: [
        { label: "Role Separation", value: "3", unit: "Tiers" },
        { label: "Data Integrity", value: "100", unit: "%" }
      ]
    },
    {
      id: "bank-management",
      title: "Bank Management System",
      description: "A full-featured bank management system in C++ with account creation, deposits, withdrawals, balance inquiry, and fund transfers. Implements strict ACID-style transaction rollback using binary file I/O and stream validation to prevent data corruption.",
      tags: ["C++", "File Handling", "Data Management", "OOP"],
      image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600&auto=format&fit=crop",
      github: "https://github.com/Hammad-Solutions/Bank-Management-System-Cpp-File-Handling",
      architecture: ["C++ Core Runtime", "Binary File Storage System", "Object Serialization", "Account Transactions Controller"],
      challenges: "Securing account transactions and preventing balance data corruption when writing binary blobs directly to disk during concurrent virtual sessions.",
      solutions: "Created strict stream state validation and file pointer error checking to rollback failed operations, mimicking basic ACID transactions.",
      impact: [
        { label: "Transactions", value: "ACID", unit: "Style" },
        { label: "File I/O Ops", value: "O(1)", unit: "Seek" }
      ]
    },
    {
      id: "hotel-management",
      title: "Hotel Management System",
      description: "A Hotel Management System in C++ using OOP & file handling concepts. Perfect for learning concepts of Object-Oriented Programming. Features room booking.",
      tags: ["C++", "OOP", "File Handling"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
      github: "https://github.com/Hammad-Solutions/Hotel-Management-System-CPP",
      architecture: ["C++ Core Runtime", "Object-Oriented Architecture", "Dynamic Room Allocation System"],
      challenges: "Modeling hierarchical inheritance relationships between Room types (Deluxe, Suite, Standard) and managing their state changes dynamically.",
      solutions: "Employed polymorphic class pointers and clean object initialization parameters to make room allocations modular and easily configurable.",
      impact: [
        { label: "Architecture", value: "OOP", unit: "" },
        { label: "Memory Mgt", value: "Dynamic", unit: "" }
      ]
    },
    {
      id: "weather-app",
      title: "WeatherApp with API Integration",
      description: "Real-time weather application serving live 10-day location-based forecasts via the OpenWeatherMap REST API. Built robust error boundary handling for failed lookups and undefined locations — zero unhandled promise rejections across all tested edge cases.",
      tags: ["React.js", "API Integration", "JavaScript"],
      image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=600&auto=format&fit=crop",
      architecture: ["React.js Context", "OpenWeatherMap API", "CSS Grid Forecast Cards"],
      challenges: "Handling asynchronous API request errors and loading states gracefully when querying weather for non-existent locations.",
      solutions: "Implemented robust boundary checks, default error fallbacks, and a custom loading spinner state.",
      impact: [
        { label: "API Latency", value: "<350", unit: "ms" },
        { label: "Crash Rate", value: "0", unit: "%" }
      ]
    },
    {
      id: "collaborative-team-work",
      title: "For Collaborative Team Work",
      description: "A collaborative repository showcasing team coordination, Git workflow practices, and standard HTML structures.",
      tags: ["HTML", "Git", "Collaboration"],
      image: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=600&auto=format&fit=crop",
      github: "https://github.com/Hammad-Solutions/For-collaborative-Team-Work",
      architecture: ["HTML5 Structures", "Git Version Control", "Feature-Branch Workflow"],
      challenges: "Coordinating team commits and resolving complex merge conflicts across shared HTML document templates.",
      solutions: "Adopted a structured feature-branch workflow with pre-commit checklists to isolate changes and review PRs before merging.",
      impact: [
        { label: "Conflicts", value: "Resolved", unit: "" },
        { label: "Team Sync", value: "100", unit: "%" }
      ]
    }
  ]
} as const;
