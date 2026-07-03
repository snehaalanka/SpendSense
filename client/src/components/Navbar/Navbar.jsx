import "./Navbar.css";
import Button from "../Common/Buttons";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="navbar-container">
        
        {/* Logo */}
        <Link to="/" className="logo">
          SpendSense
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#how">How it Works</a>
          <a href="#pricing">Pricing</a>
        </nav>

        {/* Right Side Actions */}
        <div className="nav-actions">
          <button 
            className="theme-btn" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <Link to="/login" className="login-link">
            Login
          </Link>
          
          <Link to="/register">
            <Button text="Get Started" />
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;