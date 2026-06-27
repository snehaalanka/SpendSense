import Topbar from "../components/Dashboard/Topbar";
import SummaryCards from "../components/Dashboard/SummaryCards";
import Charts from "../components/Dashboard/Charts";
import RecentExpenses from "../components/Dashboard/RecentExpenses";
import InsightCard from "../components/Dashboard/InsightCard";

import "../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">

      <Topbar />

      <SummaryCards />

      <div className="dashboard-middle">
        <Charts />
      </div>

      <div className="dashboard-bottom">
        <RecentExpenses />
        <InsightCard />
      </div>

    </div>
  );
};

export default Dashboard;