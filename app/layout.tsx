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
  title: {
    default: "Muhammad Hammad | AI Integration Specialist & Full-Stack Next.js Developer",
    template: "%s | Muhammad Hammad",
  },
  description:
    "Full-Stack Software Engineer & AI Integration Specialist in Islamabad, Pakistan. Specializing in Next.js, React, Agentic AI, Node.js, C++, Supabase, and real-time systems architecture.",
  keywords: [
    "Muhammad Hammad",
    "AI Integration Specialist",
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Agentic AI",
    "Node.js",
    "C++",
    "Supabase",
    "Tailwind CSS",
    "Islamabad",
    "Pakistan",
    "Air University Islamabad",
    "Software Engineering",
  ],
  authors: [{ name: "Muhammad Hammad" }],
  creator: "Muhammad Hammad",
  alternates: {
    canonical: "https://hammadsolutions.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hammadsolutions.vercel.app",
    title: "Muhammad Hammad | AI Integration Specialist & Full-Stack Next.js Developer",
    description:
      "Full-Stack Software Engineer & AI Integration Specialist specializing in Next.js, React, Agentic AI, Node.js, C++, Supabase, and real-time systems.",
    siteName: "Muhammad Hammad Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Muhammad Hammad — AI Integration Specialist & Full-Stack Next.js Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Hammad | AI Integration Specialist & Full-Stack Next.js Developer",
    description:
      "Full-Stack Software Engineer & AI Integration Specialist specializing in Next.js, React, Agentic AI, Node.js, C++, Supabase, and real-time systems.",
    images: ["/opengraph-image"],
    creator: "@hammad_solutions",
  },
  verification: {
    google: "googlec6785102920bcca9.html",
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
    "jobTitle": "AI Integration Specialist & Full-Stack Next.js Developer",
    "url": "https://hammadsolutions.vercel.app",
    "sameAs": [
      "https://github.com/Hammad-Solutions",
      "https://linkedin.com/in/hammad-solution"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Islamabad",
      "addressCountry": "Pakistan"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Air University Islamabad"
    },
    "knowsAbout": [
      "Next.js",
      "React",
      "Agentic AI",
      "Node.js",
      "C++",
      "Supabase",
      "Tailwind CSS",
      "Systems Architecture"
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
