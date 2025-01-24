import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      navigate('/?section=' + id);
      return;
    }
    
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          thekeenest
        </Link>
        <div className="flex gap-8 items-center">
          <button 
            onClick={() => scrollToSection('work')} 
            className="text-white hover:text-primary transition-colors"
          >
            Work
          </button>
          <Link 
            to="/about" 
            className="text-white hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-white hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <Link 
            to="/resume" 
            className="text-white hover:text-primary transition-colors"
          >
            Resume
          </Link>
          <Link 
            to="/articles" 
            className="text-white hover:text-primary transition-colors"
          >
            Articles
          </Link>
          <Link to="/contact">
            <Button 
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              Get in touch
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;