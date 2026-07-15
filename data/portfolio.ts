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
  title: "Full-Stack Software Engineer — Systems & AI",
  university: "Air University Islamabad",
  about: "Software Engineer with 4+ years shipping production systems across React/Next.js, Node.js, C++, and AI-integrated interfaces. I architect component-driven, type-safe systems with strict SOLID principles — from real-time IoT telemetry pipelines to RAG-powered LLM interfaces. Every project ships with automated CI/CD, comprehensive error boundaries, and zero tolerance for technical debt.",
  softSkills: [
    { title: "Software Architecture", description: "SOLID principles, component-driven React/TypeScript design, domain-driven modular structures with strict separation of concerns." },
    { title: "Performance Engineering", description: "Next.js ISR/SSG with Vercel edge caching, React.lazy code-splitting, WebGL memory lifecycle management, sub-second inference pipelines." },
    { title: "Infrastructure & CI/CD", description: "Automated deployment via Vercel + GitHub Actions. Supabase/Firebase backend integration with row-level security and real-time subscriptions." },
    { title: "Systems Programming", description: "C++ STL-based binary I/O with ACID-style transaction rollback, deterministic memory management, and RAII-pattern resource cleanup." }
  ],
  traits: ["SOLID Principles", "CI/CD Automation", "Performance-First", "Type-Safe Systems", "Edge-Deployed"],
  technologies: [
    "React.js", "Next.js", "TypeScript", "Node.js", "C++", "Java", "Firebase", "Git", "Tailwind CSS", "API Integration", "Supabase", "GSAP"
  ],
  currentlyLearning: [
    "React Native Cross-Platform Deployment",
    "Advanced Next.js & Supabase Architecture",
    "Cloud-Native Infrastructure (AWS/GCP)"
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
      title: "Student Record Engine — C++ Binary I/O System",
      description: "Engineered a multi-tier record management engine in C++ with strict role-based access control (Admin/Teacher/Student). Implemented atomic file-stream staging using temporary buffer files to handle concurrent record mutations without index corruption — eliminating the need for a traditional DBMS while maintaining full CRUD integrity across 500+ records.",
      tags: ["C++", "STL", "Binary I/O", "RBAC"],
      image: "https://cdn4.slideserve.com/9079189/student-information-system-n.jpg",
      github: "https://github.com/Hammad-Solutions/Student-Management-System-Cpp-File-Handling",
      architecture: ["C++ 17 Runtime", "STL File Stream Pipeline", "Atomic Staging Buffer", "Role-Based Access Controller"],
      challenges: "Ensuring data consistency during concurrent record updates on flat-file storage without DBMS transaction support, where naive read-modify-write cycles caused index mismatch corruption.",
      solutions: "Designed a copy-on-write staging mechanism using temporary file streams. All mutations execute against a staging buffer; only after full validation does an atomic rename replace the production data file — guaranteeing zero partial-write corruption.",
      impact: [
        { label: "Access Tiers", value: "3", unit: "RBAC" },
        { label: "Data Integrity", value: "100", unit: "%" },
        { label: "Memory Leaks", value: "0", unit: "Detected" }
      ]
    },
    {
      id: "bank-management",
      title: "Transaction Processing Engine — ACID-Compliant C++ System",
      description: "Built a full-lifecycle financial transaction processor in C++ supporting account creation, deposits, withdrawals, balance queries, and inter-account fund transfers. Implemented ACID-style transaction rollback using binary file I/O with stream-state validation and file-pointer integrity checks — preventing balance corruption across concurrent virtual sessions with zero data loss.",
      tags: ["C++", "Binary I/O", "ACID Transactions", "Stream Validation"],
      image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600&auto=format&fit=crop",
      github: "https://github.com/Hammad-Solutions/Bank-Management-System-Cpp-File-Handling",
      architecture: ["C++ 17 Runtime", "Binary Object Serialization Layer", "Stream-State Validator", "Transaction Rollback Controller"],
      challenges: "Preventing balance data corruption when serializing account objects directly to binary disk during concurrent virtual sessions, where incomplete writes left orphaned file pointers.",
      solutions: "Implemented strict stream-state validation after every I/O operation with automatic rollback on failbit/badbit detection. File pointer positions are checkpointed before each transaction; on failure, the stream rewinds to the last known-good state.",
      impact: [
        { label: "Transactions", value: "ACID", unit: "Compliant" },
        { label: "Seek Complexity", value: "O(1)", unit: "Direct" },
        { label: "Data Loss", value: "0", unit: "Events" }
      ]
    },
    {
      id: "hotel-management",
      title: "Resource Allocation Engine — Polymorphic C++ Architecture",
      description: "Architected a hotel resource management system using polymorphic C++ class hierarchies to model room type variants (Deluxe, Suite, Standard). Implemented dynamic memory allocation with deterministic cleanup via RAII-pattern destructors, enabling runtime room-type switching without memory leaks. Custom virtual dispatch handles booking state transitions across the inheritance tree.",
      tags: ["C++", "OOP", "Polymorphism", "RAII"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
      github: "https://github.com/Hammad-Solutions/Hotel-Management-System-CPP",
      architecture: ["C++ 17 Runtime", "Polymorphic Class Hierarchy", "RAII Resource Manager", "Virtual Dispatch Controller"],
      challenges: "Modeling hierarchical room-type variants with runtime state transitions across an inheritance tree, where naive new/delete cycles caused memory leaks during type downcasting.",
      solutions: "Applied RAII-pattern destructors to guarantee deterministic cleanup. Used polymorphic base pointers with virtual dispatch for booking operations, ensuring type-safe state transitions without manual memory management.",
      impact: [
        { label: "Architecture", value: "OOP", unit: "Polymorphic" },
        { label: "Memory Leaks", value: "0", unit: "Detected" },
        { label: "Room Types", value: "3", unit: "Variants" }
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
