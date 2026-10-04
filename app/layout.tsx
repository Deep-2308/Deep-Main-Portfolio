import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { EngineerModeProvider } from "@/components/EngineerModeProvider";
import { CommandPalette } from "@/components/CommandPalette";
import AiAssistant from "@/components/AiAssistant";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://deepkabariya.com'),
  title: "Deep Kabariya | AI & Automation Engineer",
  description:
    "Deep Kabariya builds AI tools and automation that save small businesses real hours. Computer engineering student in Gujarat, India. Open to freelance projects.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Deep Kabariya | AI & Automation Engineer",
    description: "I build AI tools and automation that save small businesses real hours.",
    type: "website",
    url: "/",
    siteName: "Deep Kabariya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Kabariya | AI & Automation Engineer",
    description: "I build AI tools and automation that save small businesses real hours.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="bg-background text-text-primary antialiased selection:bg-accent selection:text-background" suppressHydrationWarning>
        <EngineerModeProvider>
          <CommandPalette />
          <AiAssistant />
          <SmoothScroll>{children}</SmoothScroll>
        </EngineerModeProvider>
      </body>
    </html>
  );
}
