import {
  LayoutDashboard,
  Receipt,
  Bot,
  Target,
  MessageCircle,
  Settings,
  LogOut,
  User,
  X 
} from "lucide-react";

import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Sidebar.css";

const menuItems = [
  { path: "/dashboard", name: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { path: "/add-expense", name: "Add Expense", icon: <Receipt size={20} /> },
  { path: "/expenses", name: "Expense History", icon: <Receipt size={20} /> },
  { path: "/analysis", name: "AI Analysis", icon: <Bot size={20} /> },
  { path: "/goals", name: "Goals", icon: <Target size={20} /> },
  { path: "/ask-ai", name: "Ask AI", icon: <MessageCircle size={20} /> },
  { path: "/settings", name: "Settings", icon: <Settings size={20} /> },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsMobileOpen((prev) => !prev);
    const handleClose = () => setIsMobileOpen(false);

    window.addEventListener("toggle-mobile-menu", handleToggle);
    window.addEventListener("close-mobile-menu", handleClose);

    return () => {
      window.removeEventListener("toggle-mobile-menu", handleToggle);
      window.removeEventListener("close-mobile-menu", handleClose);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Safe close function to prevent click conflicts
  const handleCloseMenu = (e) => {
    if (e) e.stopPropagation();
    setIsMobileOpen(false);
  };

  return (
    <>
      {isMobileOpen && (
        <div className="sidebar-overlay" onClick={handleCloseMenu}></div>
      )}

      <aside className={`sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-logo">
          <div style={{ display: "flex", alignItems: "center", gap: "14px", paddingLeft: "8px" }}>
  <img src="logo.png" alt="SpendSense logo" style={{ width: 40, height: 40 }} />
  <div>
    <h2>SpendSense</h2>
    <p>AI Finance</p>
  </div>
</div>

          <button className="mobile-close-btn" onClick={handleCloseMenu}>
            <X size={22} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} onClick={handleCloseMenu}>
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-user">
          <div className="user-avatar">
            <User size={20} />
          </div>
          <div style={{ overflow: "hidden" }}>
            <h4>{user?.name || "Guest User"}</h4>
            <p>{user?.email || "Not logged in"}</p>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;