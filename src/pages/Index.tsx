import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BentoGrid from "@/components/BentoGrid";
import Projects from "@/components/Projects";
import Terminal from "@/components/Terminal";

const Index = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      // Wait for the page to fully render
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          const navbarHeight = 80; // Approximate height of the navbar
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <Hero />
      <Services />
      <BentoGrid />
      <Projects />
      <Terminal />
    </div>
  );
};

export default Index;