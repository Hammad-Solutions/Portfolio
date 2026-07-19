import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hammadsolutions.vercel.app"),
  title: "Muhammad Hammad | Full-Stack Software Engineer",
  description:
    "Full-Stack Software Engineer specializing in React.js, Next.js, Node.js, and C++ systems architecture. Building high-performance web applications and scalable software.",
  keywords: [
    "Muhammad Hammad",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Engineer",
    "Node.js",
    "C++ Developer",
    "Portfolio",
    "Pakistan",
    "Air University Islamabad",
    "Software Engineering",
  ],
  authors: [{ name: "Muhammad Hammad" }],
  creator: "Muhammad Hammad",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hammadsolutions.vercel.app",
    title: "Muhammad Hammad | Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer specializing in React.js, Next.js, Node.js, and C++ systems architecture.",
    siteName: "Muhammad Hammad Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Muhammad Hammad — Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Hammad | Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer specializing in React.js, Next.js, Node.js, and C++ systems architecture.",
    images: ["/opengraph-image"],
    creator: "@hammad_solutions",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Muhammad Hammad",
    "jobTitle": "Full-Stack Software Engineer — Systems & AI",
    "url": "https://hammad-solutions-portfolio.vercel.app",
    "sameAs": [
      "https://github.com/Hammad-Solutions",
      "https://linkedin.com/in/hammad-solution"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Air University Islamabad"
    },
    "knowsAbout": [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "C++",
      "Artificial Intelligence",
      "Retrieval-Augmented Generation (RAG)",
      "WebGL",
      "Software Architecture",
      "SOLID Principles"
    ],
    "email": "mailto:hammadsolutions.support@gmail.com"
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
