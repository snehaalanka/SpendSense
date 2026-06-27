import {
  LayoutDashboard,
  Receipt,
  Bot,
  Target,
  MessageCircle,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import "../../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="sidebar-logo">

        <div className="logo-box">💰</div>

        <h2>SpendSense</h2>

      </div>

      {/* Navigation */}

      <nav className="sidebar-nav">

        <NavLink to="/dashboard">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/add-expense">
          <Receipt size={20} />
          <span>Add Expense</span>
        </NavLink>

        <NavLink to="/expenses">
          <Receipt size={20} />
          <span>Expense History</span>
        </NavLink>

        <NavLink to="/analysis">
          <Bot size={20} />
          <span>AI Analysis</span>
        </NavLink>

        <NavLink to="/goals">
          <Target size={20} />
          <span>Goals</span>
        </NavLink>

        <NavLink to="/ask-ai">
          <MessageCircle size={20} />
          <span>Ask AI</span>
        </NavLink>

        <NavLink to="/settings">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

      </nav>

      {/* Logout */}

      <button className="logout-btn">

        <LogOut size={20} />

        <span>Logout</span>

      </button>

    </aside>
  );
};

export default Sidebar;