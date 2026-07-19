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
    default: "Next.js & React Developer | Agentic AI Specialist | Muhammad Hammad",
    template: "%s | Muhammad Hammad",
  },
  description:
    "Portfolio of a Full-Stack Web Developer and Software Engineer based in Islamabad. Specializing in high-performance Next.js architectures, React.js interfaces, Agentic AI integrations, and C++ backend logic.",
  keywords: [
    "Next.js App Router",
    "React.js",
    "Agentic AI Specialist",
    "Full-Stack Web Developer",
    "Software Engineer",
    "TypeScript",
    "Tailwind CSS",
    "C++ Data Structures",
    "Supabase",
    "Node.js",
    "Islamabad",
    "Pakistan",
    "Air University Aerospace and Aviation Campus Kamra",
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
    title: "Next.js & React Developer | Agentic AI Specialist | Muhammad Hammad",
    description:
      "Portfolio of a Full-Stack Web Developer and Software Engineer based in Islamabad. Specializing in high-performance Next.js architectures, React.js interfaces, Agentic AI integrations, and C++ backend logic.",
    siteName: "Muhammad Hammad Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Muhammad Hammad — Next.js & React Developer | Agentic AI Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js & React Developer | Agentic AI Specialist | Muhammad Hammad",
    description:
      "Portfolio of a Full-Stack Web Developer and Software Engineer based in Islamabad. Specializing in high-performance Next.js architectures, React.js interfaces, Agentic AI integrations, and C++ backend logic.",
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
    "jobTitle": "Software Engineer & Web Developer",
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
      "name": "Air University Aerospace and Aviation Campus Kamra"
    },
    "knowsAbout": [
      "Next.js App Router",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Agentic AI",
      "C++ Data Structures",
      "Supabase",
      "Node.js"
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
