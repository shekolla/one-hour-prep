import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://prepfast.in"),
  title: "InterviewPrep — Revise any tech topic in under 1 hour",
  description:
    "Free interview revision platform for mid-to-senior engineers. 13 topics, 367 concepts, depth-level filtering, knowledge trees, and a Last 1 Hour mode. Python, JavaScript, Node.js, Java, DSA, System Design, HLD, LLD, Kubernetes, Databases, React, AWS, SQL.",
  keywords: [
    "interview prep",
    "software engineer interview",
    "system design interview",
    "coding interview",
    "tech interview revision",
    "python interview",
    "javascript interview",
    "java interview",
    "dsa interview",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "InterviewPrep — Revise any tech topic in under 1 hour",
    description:
      "Free revision platform for mid-to-senior engineers. 13 topics, 367 concepts, depth levels, knowledge trees, and a compressed Last 1 Hour cheatsheet mode.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "InterviewPrep — Revise any tech topic in under 1 hour",
    description:
      "Free revision platform for mid-to-senior engineers. 13 topics, 367 concepts with depth levels and a Last 1 Hour cheatsheet.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-gray-100 min-h-screen overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
