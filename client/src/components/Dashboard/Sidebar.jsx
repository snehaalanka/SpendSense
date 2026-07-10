import {
  LayoutDashboard,
  Receipt,
  Bot,
  Target,
  MessageCircle,
  Settings,
  LogOut,
  User,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Ensure this path points to your AuthContext.jsx
import "../../styles/Sidebar.css";

const menuItems = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    path: "/add-expense",
    name: "Add Expense",
    icon: <Receipt size={20} />,
  },
  {
    path: "/expenses",
    name: "Expense History",
    icon: <Receipt size={20} />,
  },
  {
    path: "/analysis",
    name: "AI Analysis",
    icon: <Bot size={20} />,
  },
  {
    path: "/goals",
    name: "Goals",
    icon: <Target size={20} />,
  },
  {
    path: "/ask-ai",
    name: "Ask AI",
    icon: <MessageCircle size={20} />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <Settings size={20} />,
  },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
  <div className="logo-icon">
    <img src="/sidebar-icon.png" alt="SpendSense logo" style={{ width: 32, height: 32 }} />
  </div>
  <div>
    <h2>SpendSense</h2>
    <p>AI Finance</p>
  </div>
</div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="sidebar-user">
        <div className="user-avatar">
          <User size={20} />
        </div>
        <div style={{ overflow: "hidden" }}>
          {/* Using optional chaining to prevent crashes if user data isn't loaded yet */}
          <h4>{user?.name || "Guest User"}</h4>
          <p>{user?.email || "Not logged in"}</p>
        </div>
      </div>

      {/* Logout */}
      <button className="logout-btn" onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;