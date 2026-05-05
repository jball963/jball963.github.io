"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, from = "left" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else if (entry.boundingClientRect.top > 0) {
          // Section exited the bottom of the viewport (we scrolled up
          // past it) — reset so the slide-in plays again on re-enter.
          // If it exited the top (top < 0, i.e. we scrolled DOWN past
          // it), leave it visible.
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${from} ${visible ? "reveal-visible" : ""}`}
    >
      {children}
    </div>
  );
}
