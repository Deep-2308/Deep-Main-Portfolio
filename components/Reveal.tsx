"use client";
import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ 
        duration: 0.6, 
        delay: delay / 1000, 
        ease: [0.22, 1, 0.36, 1] // Custom ease-out curve for premium feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
