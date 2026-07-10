import Sidebar from "../components/Dashboard/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import "../styles/MainLayout.css";

const MainLayout = () => {
  const location = useLocation();
  
  // Check if we are on the dashboard
  const isDashboard = location.pathname === "/dashboard";

  // Dispatch event to open the sidebar on mobile
  const handleOpenMobileMenu = () => {
    window.dispatchEvent(new CustomEvent("toggle-mobile-menu"));
  };

  return (
    <div className="layout">
      <Sidebar />
      
      <div className="main-content">
        
        {/* Only show this mobile menu button if we are NOT on the Dashboard */}
        {!isDashboard && (
          <div className="standalone-mobile-header">
            <button className="mobile-menu-btn" onClick={handleOpenMobileMenu}>
              <Menu size={24} />
            </button>
          </div>
        )}

        <main className="page-content">
          <Outlet />
        </main>
      </div>
      
    </div>
  );
};

export default MainLayout;