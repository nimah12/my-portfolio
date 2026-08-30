import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Gallery from "./components/Gallery";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import SplashCursorGate from "./components/SplashCursorGate";

export default function Home() {
  return (
    <>
      <SplashCursorGate />
      <Navbar />
      <main>
        <Hero />
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
