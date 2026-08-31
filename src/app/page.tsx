import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollShowcase from "./components/ScrollShowcase";
import About from "./components/About";
import Skills from "./components/Skills";
import Gallery from "./components/Gallery";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import SplashCursorGate from "./components/SplashCursorGate";
import Background from "./components/Background";

export default function Home() {
  return (
    <>
      <Background />
      <SplashCursorGate />
      <Navbar />
      <main>
        <Hero />
        <ScrollShowcase />
        <About />
        <Skills />
        <Gallery />
        <Projects />
        <Certificates />
        <Contact />
      </main>
    </>
  );
}
