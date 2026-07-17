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
  metadataBase: new URL("https://hammad-solutions-portfolio.vercel.app"),
  title: "Muhammad Hammad | Full-Stack Developer & AI Engineer",
  description:
    "I turn complex problems into products users love — shipped fast, built to scale. Full-stack developer specializing in React.js, Next.js, Node.js, and AI-integrated applications.",
  keywords: [
    "Muhammad Hammad",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Engineer",
    "Node.js",
    "AI Engineer",
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
    url: "https://hammad-solutions-portfolio.vercel.app",
    title: "Muhammad Hammad | Full-Stack Developer & AI Engineer",
    description:
      "I turn complex problems into products users love — shipped fast, built to scale. 15+ shipped projects in React, Next.js, Node.js & AI.",
    siteName: "Muhammad Hammad Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Hammad — Full-Stack Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Hammad | Full-Stack Developer & AI Engineer",
    description:
      "Full-stack dev shipping React, Next.js & AI-powered apps. 15+ projects. Open to work.",
    images: ["/og-image.png"],
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
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
