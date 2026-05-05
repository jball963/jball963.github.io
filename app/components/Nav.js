"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <ul>
        <li><Link href="/#about">About</Link></li>
        <li><Link href="/#skills">Skills</Link></li>
        <li><Link href="/#experience">Experience</Link></li>
        <li><Link href="/#projects">Projects</Link></li>
        <li><Link href="/#contact">Contact</Link></li>
        <li><a href="/assets/JosephBall_Resume.pdf" target="_blank" rel="noopener">Resume</a></li>
      </ul>
    </nav>
  );
}
