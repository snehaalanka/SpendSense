import "../../styles/Topbar.css";
import MonthSelector from "./MonthSelector";
import { useEffect, useState } from "react";
import { Moon, Sun, Sparkles, Menu } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { getDashboardInsight } from "../../api/aiApi";

const Topbar = () => {
  const [insight, setInsight] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
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

  const handleOpenMobileMenu = () => {
    window.dispatchEvent(new CustomEvent("toggle-mobile-menu"));
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
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
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Topbar;