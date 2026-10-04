"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
    });
    
    // @ts-expect-error - Attach to window for global access if needed
    window.lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Global scroll lock listeners for modals/overlays
    let lockCount = 0;
    const handleLockScroll = () => {
      lockCount++;
      if (lockCount === 1) {
        lenis.stop();
        document.body.style.overflow = 'hidden';
      }
    };
    
    const handleUnlockScroll = () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        lenis.start();
        document.body.style.overflow = '';
      }
    };

    window.addEventListener("lock-scroll", handleLockScroll);
    window.addEventListener("unlock-scroll", handleUnlockScroll);

    // Handle hash links cleanly for native-like anchor navigation
    const handleHashClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const hash = target.getAttribute("href");
      if (hash && hash.startsWith("#") && hash.length > 1) {
        e.preventDefault();
        const element = document.getElementById(hash.substring(1));
        if (element) {
          lenis.scrollTo(element, { offset: -80, duration: 1.2 });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleHashClick as EventListener);
    });

    return () => {
      window.removeEventListener("lock-scroll", handleLockScroll);
      window.removeEventListener("unlock-scroll", handleUnlockScroll);
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleHashClick as EventListener);
      });
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
