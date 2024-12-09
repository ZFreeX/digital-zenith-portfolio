import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BentoGrid from "@/components/BentoGrid";
import Projects from "@/components/Projects";
import Terminal from "@/components/Terminal";

const Index = () => {
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