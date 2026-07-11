import "./Navbar.css";
import Button from "../Common/Buttons";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// ... (imports remain the same)

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="navbar-container">
        
        {/* Logo */}
        <Link to="/" className="logo">
          <img src="logo.png" alt="SpendSense logo" style={{ width: 40, height: 40, marginRight: 5 }} />
          <h4>SpendSense</h4>
        </Link>

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
          
          {/* ADDED CLASS HERE */}
          <Link to="/register" className="nav-register-link">
            <Button text="Get Started" />
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;