import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    if (window.location.pathname !== '/') {
      navigate('/?section=' + id);
      return;
    }
    
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            thekeenest
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
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
              to="/Konstantin_Filipovich_CV.pdf" 
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

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/contact">
              <Button 
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              >
                Get in touch
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-white hover:bg-white/10"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden"
            >
              <div className="py-4 flex flex-col gap-4">
                <button 
                  onClick={() => {
                    scrollToSection('work');
                    setIsMenuOpen(false);
                  }}
                  className="text-white hover:text-primary transition-colors px-2 py-2"
                >
                  Work
                </button>
                <Link 
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-primary transition-colors px-2 py-2"
                >
                  About
                </Link>
                <Link 
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-primary transition-colors px-2 py-2"
                >
                  Contact
                </Link>
                <Link 
                  to="/resume"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-primary transition-colors px-2 py-2"
                >
                  Resume
                </Link>
                <Link 
                  to="/articles"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-primary transition-colors px-2 py-2"
                >
                  Articles
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;