import "../../styles/Topbar.css";
import MonthSelector from "./MonthSelector";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const hour = new Date().getHours();
  let greeting = "GOOD EVENING";

  if (hour < 12) greeting = "GOOD MORNING";
  else if (hour < 18) greeting = "GOOD AFTERNOON";

  const handleOpenMobileMenu = () => {
    window.dispatchEvent(new CustomEvent("toggle-mobile-menu"));
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu-btn" onClick={handleOpenMobileMenu}>
          <Menu size={24} />
        </button>

        <div className="greeting-container">
          <span className="greeting-text">{greeting}</span>
          <h1>
            <span className="greeting-name">{user?.name?.split(" ")[0]}</span>, here's your money today
          </h1>
        </div>
      </div>

      <div className="topbar-right">
        <button className="top-icon" onClick={toggleTheme}>
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <MonthSelector />

        <div className="profile">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Topbar;