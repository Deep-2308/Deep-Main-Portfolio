"use client";
import { useState } from "react";
import { WHATSAPP } from "@/lib/links";
import { WhatsAppIcon } from "./Icons";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";

/** Thin scroll progress bar + floating WhatsApp pill that appears after the hero. */
export default function Chrome() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only update state if it changes to prevent unnecessary re-renders
    const shouldShow = latest > 700;
    if (show !== shouldShow) {
      setShow(shouldShow);
    }
  });

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-40 h-[2px] w-full origin-left bg-accent"
        style={{ scaleX }}
      />
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Deep on WhatsApp"
        className={`fixed bottom-[5.5rem] right-5 md:bottom-[5.5rem] md:right-6 z-40 flex items-center gap-2 rounded-full bg-surface-elevated border border-border px-4 py-3 text-sm font-medium text-text-primary shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#1f9d55] hover:border-[#1f9d55] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#1f9d55] ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
          }`}
      >
        <WhatsAppIcon className="h-5 w-5" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>
    </>
  );
}
