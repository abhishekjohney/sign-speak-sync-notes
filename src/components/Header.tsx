
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Monitor, 
  FileText, 
  Headphones,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-ocean-blue to-purple rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="font-bold text-xl hidden md:block">SignSpeakSync</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/sign-translator" className="flex items-center space-x-2 text-gray-700 hover:text-ocean-blue transition-colors">
            <Monitor className="w-5 h-5" />
            <span>Sign Translator</span>
          </Link>
          <Link to="/video-captioning" className="flex items-center space-x-2 text-gray-700 hover:text-ocean-blue transition-colors">
            <Headphones className="w-5 h-5" />
            <span>Video Captioning</span>
          </Link>
          <Link to="/notes" className="flex items-center space-x-2 text-gray-700 hover:text-ocean-blue transition-colors">
            <FileText className="w-5 h-5" />
            <span>Notes</span>
          </Link>
          <Button className="bg-ocean-blue hover:bg-blue-600 text-white">
            Sign In
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md mt-4 py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/sign-translator" 
              className="flex items-center space-x-2 text-gray-700 hover:text-ocean-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Monitor className="w-5 h-5" />
              <span>Sign Translator</span>
            </Link>
            <Link 
              to="/video-captioning" 
              className="flex items-center space-x-2 text-gray-700 hover:text-ocean-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Headphones className="w-5 h-5" />
              <span>Video Captioning</span>
            </Link>
            <Link 
              to="/notes" 
              className="flex items-center space-x-2 text-gray-700 hover:text-ocean-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText className="w-5 h-5" />
              <span>Notes</span>
            </Link>
            <Button 
              className="bg-ocean-blue hover:bg-blue-600 text-white w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
