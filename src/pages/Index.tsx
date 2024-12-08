import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BentoGrid from "@/components/BentoGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <Hero />
      <Services />
      <BentoGrid />
    </div>
  );
};

export default Index;