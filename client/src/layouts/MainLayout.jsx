import Sidebar from "../components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/MainLayout.css";

const MainLayout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;