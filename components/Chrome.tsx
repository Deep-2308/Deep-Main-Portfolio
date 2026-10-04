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
        className={`fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-medium text-background shadow-lg transition duration-500 hover:bg-[#1f9d55] hover:text-white ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <WhatsAppIcon className="h-5 w-5" />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </a>
    </>
  );
}
