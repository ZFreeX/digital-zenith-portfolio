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
      const element = document.getElementById(section);
      if (element) {
        // Add a small delay to ensure the page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
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