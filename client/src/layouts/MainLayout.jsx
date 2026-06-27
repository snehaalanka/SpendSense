import Sidebar from "../components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/MainLayout.css";

const MainLayout = () => {
  return (
    <div className="layout">

      <Sidebar />

      <main className="page-content">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;