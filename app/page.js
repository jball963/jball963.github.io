import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Reveal from "./components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <Reveal from="left"><About /></Reveal>
        <Reveal from="right"><Skills /></Reveal>
        <Reveal from="left"><Experience /></Reveal>
        <Reveal from="right"><Projects /></Reveal>
        <Contact />
      </main>
    </>
  );
}
