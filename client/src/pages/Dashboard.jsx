import Topbar from "../components/Dashboard/Topbar";
import DashboardHero from "../components/Dashboard/DashboardHero";
import TimelineBar from "../components/Dashboard/TimelineBar";
import SummaryCards from "../components/Dashboard/SummaryCards";
import Charts from "../components/Dashboard/Charts";
import RecentExpenses from "../components/Dashboard/RecentExpenses";
import InsightCard from "../components/Dashboard/InsightCard";

import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Topbar />
      
      <DashboardHero />
      
      <TimelineBar />

      <SummaryCards />

      <div className="charts-section">
        <Charts />
      </div>

      <div className="bottom-grid">
        <RecentExpenses />
        <InsightCard />
      </div>
    </div>
  );
};

export default Dashboard;