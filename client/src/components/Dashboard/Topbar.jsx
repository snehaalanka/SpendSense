import "../../styles/Topbar.css";
import MonthSelector from "./MonthSelector";
import { useEffect, useState } from "react";
import { Moon, Sun, Sparkles, Menu } from "lucide-react"; // Added Menu
import { useTheme } from "../../context/ThemeContext";
import { getDashboardInsight } from "../../api/aiApi";

const Topbar = () => {
  const [user, setUser] = useState(null);
  const [insight, setInsight] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    fetchInsight();
  }, []);

  const fetchInsight = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getDashboardInsight(token);
      setInsight(data);
    } catch (err) {
      console.log(err);
    }
  };

  const { theme, toggleTheme } = useTheme();
  const hour = new Date().getHours();
  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  // Dispatches a global event to toggle the mobile sidebar drawer
  const handleOpenMobileMenu = () => {
    window.dispatchEvent(new CustomEvent("toggle-mobile-menu"));
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        {/* Mobile Hamburger Button */}
        <button className="mobile-menu-btn" onClick={handleOpenMobileMenu}>
          <Menu size={24} />
        </button>

        <h1>
          {greeting},
          <span>{user?.name?.split(" ")[0]}</span>
        </h1>
        <div className="ai-tip">
          <Sparkles size={16} />
          {insight ? (
            <p>
              {insight.isOverBudgetPace ? (
                <>
                  AI predicts you'll exceed your budget by
                  <strong> ₹{insight.predictedSavings} </strong>
                  this month.
                </>
              ) : (
                <>
                  AI predicts you'll save
                  <strong> ₹{insight.predictedSavings} </strong>
                  this month.
                </>
              )}
            </p>
          ) : (
            <p>Loading your AI prediction...</p>
          )}
        </div>
      </div>

      <div className="topbar-right">
        <button className="top-icon" onClick={toggleTheme}>
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <MonthSelector />

        <div className="profile">
          <img src="https://i.pravatar.cc/150?img=32" alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;