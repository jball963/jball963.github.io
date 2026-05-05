"use client";

import { useEffect, useRef, useState } from "react";

const MAX_OFFSET = 80;

export default function Reveal({ children, from = "left" }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(MAX_OFFSET);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOffset(0);
      return;
    }

    const compute = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      // factor = 1 when the section's top is at/below the viewport bottom
      //          (section is fully below the fold → fully off-screen side).
      // factor = 0 when the section's top is at/above the viewport top
      //          (section has reached or scrolled past the top → fully in place).
      // Linear interpolation between.
      const factor = Math.max(0, Math.min(1, rect.top / vh));
      setOffset(MAX_OFFSET * factor);
    };

    compute();

    let rafId = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        compute();
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const sign = from === "left" ? -1 : 1;
  const opacity = 1 - offset / MAX_OFFSET;

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        transform: `translateX(${sign * offset}px)`,
        opacity,
      }}
    >
      {children}
    </div>
  );
}
