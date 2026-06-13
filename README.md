# 🌌 Agent OS: Next-Gen Developer Portfolio & AI Interface

An immersive, high-class interactive developer portfolio built for **Muhammad Hammad**—Software Developer & Software Engineering Student. This project showcases projects, skills, and professional experience through a hybrid visual-terminal interface powered by advanced WebGL canvas animations and an embedded NLP RAG AI Assistant.

---

## ✨ Key Features

- **🎮 Dual-Interface System**:
  - **Visual Mode**: A premium, sleek glassmorphic modern UI with smooth GSAP animations, fluid transitions, and responsive grid layouts.
  - **Hacker Terminal Mode**: A fully interactive, retro-futuristic command-line interface (CLI). Execute commands like `help`, `about`, `projects`, `clear`, and interact directly with the file structure.
- **🤖 Embedded RAG AI Assistant ("Agent OS")**:
  - Powered by **Groq Cloud (Llama-3.1-8b-instant)**.
  - Uses localized Retrieval-Augmented Generation (RAG) constraints to answer questions strictly about Hammad's skills, qualifications, project repository links, and availability.
  - Hardened with system-instruction injection guards to prevent prompt-injection and general-purpose LLM overrides.
- **✨ Dynamic Volumetric 3D Skills Globe**:
  - An interactive, touch-responsive, auto-rotating 3D Tag Sphere presenting key technical competencies using standard WebGL Canvas.
- **🌌 Immersive Canvas Backgrounds**:
  - Select and switch between several premium dynamic backgrounds in real-time, including:
    - *Matrix Rain*: Classic terminal digital rain effect.
    - *Constellations*: Node-based interactive mouse-tracking network.
    - *Developer Graph*: Animated node networking modeling system dependencies.
    - *Stardust & Dust Background*: Deep space ambient particle effects.
    - *Obsidian Core*: Volumetric energy particle storm.
- **✉️ Direct SMTP Contact Channel**:
  - Integrated contact form utilizing Next.js Server Actions and NodeMailer for automated email notifications directly to the developer.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS, CSS Modules, Vanilla CSS |
| **Animations** | GSAP, Framer Motion, HTML5 Canvas API, WebGL |
| **AI / NLP** | Groq SDK, Llama 3.1 LLM, Custom System Directives |
| **Backend / SMTP** | Next.js API Routes, NodeMailer |
| **Package Manager** | npm |

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v18.x or higher recommended)
- **npm** (v9.x or higher)

### ⚙️ Environment Configuration

1. Duplicate the `.env.example` file and rename it to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and supply your API credentials:
   ```env
   # Groq AI Keys
   GROQ_API_KEY=your_groq_api_key_here

   # Nodemailer SMTP Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=your_sender_email@gmail.com
   SMTP_PASSWORD=your_16_character_app_password
   CONTACT_RECEIVER_EMAIL=your_destination_email@gmail.com
   ```

### 📦 Installation

Install all required node packages and dependencies:
```bash
npm install
```

### 💻 Running Locally

Start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to experience the application.

### 🏗️ Production Build

Generate the optimized production bundle:
```bash
npm run build
```
Start the production server:
```bash
npm run start
```

---

## 📂 Project Directory Structure

```
├── app/                  # Next.js App Router (pages & API endpoints)
│   ├── api/              # API Routes (Contact, AI Assistant)
│   ├── layout.tsx        # Global Layout config
│   ├── page.tsx          # Main Entry point (Hybrid Portfolio Interface)
│   └── globals.css       # Core design system tokens and styles
├── components/           # Reusable React components
│   ├── canvas/           # High-performance Canvas & WebGL Backgrounds
│   │   ├── Constellation.tsx
│   │   ├── SkillsGlobe.tsx
│   │   ├── MatrixRainBackground.tsx
│   │   └── ...
│   └── ui/               # Modular page sections (About, Projects, Contact, CLI Terminal)
├── data/                 # Static data configurations (portfolio info, projects details)
│   └── portfolio.ts
├── lib/                  # Helper utilities and server functions
│   └── rag.ts            # AI Agent OS processing and Groq logic
├── public/               # Static assets, logos, and icons
├── tsconfig.json         # TypeScript configuration
└── next.config.ts        # Next.js bundler settings
```

---

## 🔒 Security & Optimization

- **AI Safety**: The system instructions explicitly constrain `Agent OS` from executing untrusted user prompt overrides, protecting it from being utilized for unauthorized general-purpose computing/chat tasks.
- **Static Assets**: Large images are optimized utilizing the native Next.js `<Image />` component for automatic format converting (WebP) and lazy-loading.
- **Modular Bundling**: Dynamic canvas libraries are lazy-loaded when appropriate to improve initial page load performance metrics.

---

## 📄 License

This project is personal intellectual property. Feel free to explore the code for reference and learning.
