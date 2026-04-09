import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InterviewPrep — Revise any tech topic in under 1 hour",
  description:
    "Free interview revision platform for mid-to-senior engineers. 10 topics, 200+ concepts, depth-level filtering, knowledge trees, and a Last 1 Hour mode. Python, JavaScript, Node.js, Java, DSA, System Design, HLD, LLD, Kubernetes, Databases.",
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
  openGraph: {
    title: "InterviewPrep — Revise any tech topic in under 1 hour",
    description:
      "Free revision platform for mid-to-senior engineers. 10 topics, 200+ concepts, depth levels, knowledge trees, and a compressed Last 1 Hour cheatsheet mode.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InterviewPrep — Revise any tech topic in under 1 hour",
    description:
      "Free revision platform for mid-to-senior engineers. 10 topics, 200+ concepts with depth levels and a Last 1 Hour cheatsheet.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-gray-100 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
