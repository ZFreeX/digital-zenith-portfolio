import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <Hero />
      <Services />
    </div>
  );
};

export default Index;