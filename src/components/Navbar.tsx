import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          thekeenest
        </div>
        <div className="flex gap-8 items-center">
          <button onClick={() => scrollToSection('work')} className="text-white hover:text-primary transition-colors">Work</button>
          <Link to="/about" className="text-white hover:text-primary transition-colors">About</Link>
          <button onClick={() => scrollToSection('contact')} className="text-white hover:text-primary transition-colors">Contact</button>
          <Link to="/resume" className="text-white hover:text-primary transition-colors">Resume</Link>
          <Button 
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            onClick={() => scrollToSection('contact')}
          >
            Get in touch
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;