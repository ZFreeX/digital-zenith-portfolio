import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          thekeenest
        </div>
        <div className="flex gap-8 items-center">
          <Link to="/" className="text-white hover:text-primary transition-colors">Work</Link>
          <Link to="/about" className="text-white hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="text-white hover:text-primary transition-colors">Contact</Link>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            Resume
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;