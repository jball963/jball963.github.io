"use client";

import { useEffect, useRef, useState } from "react";

const MAX_OFFSET = 80;

// Active slide range, expressed as fractions of viewport height (rect.top / vh).
// - At/above SLIDE_START: section stays fully off-side (factor 1).
// - At/below SLIDE_END: section is fully in place (factor 0).
// Tighter range = wait longer, then snap into place faster.
const SLIDE_START = 0.7;
const SLIDE_END = 0.2;
const SLIDE_RANGE = SLIDE_START - SLIDE_END;

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

      // Natural factor: how much the section should be slid based on its
      // vertical position in the viewport. 1 = fully off-side, 0 = in place.
      const t = rect.top / vh;
      const naturalFactor = Math.max(
        0,
        Math.min(1, (t - SLIDE_END) / SLIDE_RANGE)
      );

      // Bottom-of-page guard: at certain viewport sizes, the last sections
      // can't scroll high enough for rect.top to reach SLIDE_END * vh, so
      // they'd hang partially translated forever. As the user approaches the
      // bottom of the document (within one viewport height), blend the
      // natural factor toward 0 so every section settles cleanly into view.
      const docHeight = document.documentElement.scrollHeight;
      const maxScroll = Math.max(0, docHeight - vh);
      const distFromBottom = maxScroll - window.scrollY;
      const bottomFactor = Math.max(0, Math.min(1, distFromBottom / vh));

      const factor = naturalFactor * bottomFactor;
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
