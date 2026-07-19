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
  title: "Full-Stack Software Engineer — Web & Systems",
  university: "Air University Islamabad",
  about: "Full-Stack Software Engineer with 4+ years of experience building modern web applications and systems using React, Next.js, Node.js, and C++. I focus on writing clean, maintainable code, responsive user interfaces, and reliable API integrations.",
  softSkills: [
    { title: "Software Architecture", description: "Modular React and TypeScript component design built on SOLID principles, clean code structure, and maintainable state management." },
    { title: "Performance Engineering", description: "Next.js server rendering, fast page loads, code splitting, optimized asset loading, and smooth 60fps animations." },
    { title: "Infrastructure & CI/CD", description: "Automated website deployments with Vercel and GitHub Actions. Seamless integration with Supabase and Firebase backends." },
    { title: "Systems Programming", description: "Clean C++ application development, file stream handling, data structures, and efficient memory management." }
  ],
  traits: ["SOLID Principles", "Clean Architecture", "Performance-First", "Type-Safe Systems", "Responsive Design"],
  technologies: [
    "React.js", "Next.js", "TypeScript", "Node.js", "C++", "Java", "Firebase", "Git", "Tailwind CSS", "API Integration", "Supabase", "GSAP"
  ],
  currentlyLearning: [
    "React Native Mobile Apps",
    "Advanced Next.js Architecture",
    "Cloud Computing (AWS/GCP)"
  ],
  projects: [
    {
      id: "ai-portfolio",
      title: "Interactive AI-Powered Portfolio",
      description: "Built an interactive web portfolio using Next.js, TypeScript, and Three.js. Integrated an embedded AI assistant to instantly answer client and recruiter queries about my technical stack and projects.",
      tags: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS", "AI Integration"],
      image: "/ai_portfolio_cover.png",
      github: "https://github.com/Hammad-Solutions/Portfolio",
      demo: "https://hammadsolutions.vercel.app",
      architecture: ["Next.js App Router", "TypeScript", "Tailwind CSS & CSS Modules", "Three.js & React Three Fiber", "RAG AI Knowledge Engine"],
      challenges: "Rendering interactive 3D elements while maintaining fast page load speeds and smooth scrolling on mobile devices.",
      solutions: "Optimized 3D rendering with lazy loading and paused physics loops when off-screen to keep mobile performance smooth.",
      impact: [
        { label: "Lighthouse Score", value: "98", unit: "/100" },
        { label: "AI Response", value: "<800", unit: "ms" },
        { label: "Build Time", value: "<16", unit: "s" }
      ]
    },
    {
      id: "previous-portfolio",
      title: "Personal Portfolio Site",
      description: "Created a lightweight, responsive portfolio with HTML5, CSS3, and JavaScript. Focused on semantic markup, fast load times, and cross-browser compatibility without external heavy frameworks.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
      github: "https://github.com/Hammad-Solutions/hammad-solutions.github.io",
      architecture: ["HTML5 Semantic Markup", "Vanilla CSS3 Flexbox/Grid", "JavaScript DOM Interactions"],
      challenges: "Designing glassmorphic UI elements and responsive layouts using pure CSS without third-party frameworks.",
      solutions: "Built custom CSS variables and responsive media query breakpoints for smooth mobile reflows.",
      impact: [
        { label: "Bundle Size", value: "0", unit: "KB" },
        { label: "Dependencies", value: "None", unit: "" }
      ]
    },
    {
      id: "student-management",
      title: "Student Management System",
      description: "Built a C++ record management system for student data. Used structured file handling and input validation checks to manage records efficiently without data corruption.",
      tags: ["C++", "File Handling", "Data Structures", "CLI"],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
      github: "https://github.com/Hammad-Solutions/Student-Management-System-Cpp-File-Handling",
      architecture: ["C++17 Console Application", "File Stream Pipeline", "Record Buffer Manager"],
      challenges: "Preventing file record corruption during updates on flat text storage files.",
      solutions: "Created temporary buffer files during modifications to validate data before saving updates permanently.",
      impact: [
        { label: "Access Control", value: "Role-Based", unit: "" },
        { label: "Data Safety", value: "100", unit: "%" }
      ]
    },
    {
      id: "bank-management",
      title: "Bank Management System",
      description: "Developed a C++ banking application for secure account operations. Implemented error checking and file stream validation to handle account deposits, withdrawals, and balance updates.",
      tags: ["C++", "Binary I/O", "File Handling", "Validation"],
      image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600&auto=format&fit=crop",
      github: "https://github.com/Hammad-Solutions/Bank-Management-System-Cpp-File-Handling",
      architecture: ["C++17 Engine", "Binary Object Serialization", "Transaction Validator"],
      challenges: "Ensuring balance accuracy during binary file serialization of user accounts.",
      solutions: "Added error detection checks after every file read/write operation to ensure safe transaction logging.",
      impact: [
        { label: "Transaction Safety", value: "Verified", unit: "" },
        { label: "Data Integrity", value: "100", unit: "%" }
      ]
    },
    {
      id: "hotel-management",
      title: "Hotel Management System",
      description: "Created an object-oriented C++ hotel reservation system to handle room bookings, customer records, and dynamic billing calculations using clean OOP architecture.",
      tags: ["C++", "OOP", "Polymorphism", "Data Management"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
      github: "https://github.com/Hammad-Solutions/Hotel-Management-System-CPP",
      architecture: ["C++ OOP Hierarchy", "Dynamic Room Allocation", "Billing Engine"],
      challenges: "Managing room availability states and customer booking histories across different room tiers.",
      solutions: "Used C++ class inheritance and virtual methods for flexible room booking and price calculations.",
      impact: [
        { label: "Architecture", value: "OOP", unit: "Clean" },
        { label: "Room Tiers", value: "Multiple", unit: "Supported" }
      ]
    },
    {
      id: "weather-app",
      title: "Weather App with API Integration",
      description: "Built a dynamic React weather dashboard that connects to OpenWeatherMap API. Implemented real-time city search, 5-day forecasts, and error handling for invalid locations.",
      tags: ["React.js", "API Integration", "JavaScript", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=600&auto=format&fit=crop",
      architecture: ["React.js", "OpenWeatherMap REST API", "CSS Forecast Grid"],
      challenges: "Gracefully handling slow API responses and unexpected search queries.",
      solutions: "Added responsive loading state spinners and fallback error cards for non-existent city names.",
      impact: [
        { label: "API Latency", value: "<350", unit: "ms" },
        { label: "Uptime", value: "100", unit: "%" }
      ]
    },
    {
      id: "collaborative-team-work",
      title: "Collaborative Team Workflows",
      description: "Structured Git feature-branch workflows and repository guidelines for team projects, ensuring clean version control and preventing code integration conflicts.",
      tags: ["HTML", "Git", "GitHub", "Team Collaboration"],
      image: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=600&auto=format&fit=crop",
      github: "https://github.com/Hammad-Solutions/For-collaborative-Team-Work",
      architecture: ["HTML5 Structure", "Git Version Control", "Feature Branching"],
      challenges: "Resolving merge conflicts and coordinating code submissions across multiple team contributors.",
      solutions: "Implemented pull request checklists and branch protection rules to keep the main branch stable.",
      impact: [
        { label: "Merge Conflicts", value: "Minimized", unit: "" },
        { label: "Workflow", value: "Structured", unit: "" }
      ]
    }
  ]
} as const;
