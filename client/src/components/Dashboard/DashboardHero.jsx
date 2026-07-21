import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../api/dashboardApi";
import { getDashboardInsight } from "../../api/aiApi";
import { useMonth } from "../../context/MonthContext";
import "../../styles/DashboardHero.css";

const DashboardHero = () => {
  const token = localStorage.getItem("token");
  const { selectedMonth } = useMonth();
  
  const [summary, setSummary] = useState({ budget: 0, expenses: 0 });
  const [insight, setInsight] = useState(null);

  useEffect(() => {
    fetchSummary();
  }, [selectedMonth]);

  useEffect(() => {
    fetchInsight();
  }, []);

  const fetchSummary = async () => {
    try {
      const data = await getDashboardSummary(token, selectedMonth.year, selectedMonth.month);
      setSummary(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchInsight = async () => {
    try {
      const data = await getDashboardInsight(token);
      setInsight(data);
    } catch (err) {
      console.log(err);
    }
  };

  const budget = summary.budget || 1; // avoid div by 0
  const expenses = summary.expenses || 0;
  const percentage = Math.min(Math.round((expenses / budget) * 100), 100);

  // SVG parameters for circular progress
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="dashboard-hero">
      <div className="hero-left">
        <h1>Watch your <span className="text-primary">spending</span> stay in control</h1>
        <p>Real-time budget tracking across every category. From groceries to subscriptions, see exactly where it's going.</p>
        
        {insight && (
          <div className="hero-insight-pill">
            <span className="live-badge"></span> Live AI tracking enabled
          </div>
        )}
      </div>

      <div className="hero-right">
        {insight && (
          <div className="overspend-pill">
             {insight.isOverBudgetPace ? `Overspend predicted: ₹${insight.predictedSavings}` : `Predicted savings: ₹${insight.predictedSavings}`}
          </div>
        )}
        
        <div className="progress-ring-container">
          <svg className="progress-ring" width="200" height="200">
            {/* Background ring */}
            <circle
              className="progress-ring-bg"
              stroke="var(--border)"
              strokeWidth="12"
              fill="transparent"
              r={radius}
              cx="100"
              cy="100"
            />
            {/* Dashed outer markers simulation (using stroke-dasharray) */}
            <circle
              className="progress-ring-markers"
              stroke="var(--text-secondary)"
              strokeWidth="1"
              strokeDasharray="4 8"
              fill="transparent"
              r={radius + 18}
              cx="100"
              cy="100"
            />
            {/* Progress ring */}
            <circle
              className="progress-ring-fill"
              stroke="var(--primary)"
              strokeWidth="12"
              strokeLinecap="round"
              fill="transparent"
              r={radius}
              cx="100"
              cy="100"
              style={{ strokeDasharray: circumference, strokeDashoffset, transition: "stroke-dashoffset 1s ease-in-out" }}
            />
          </svg>
          <div className="progress-content">
            <h2>₹{expenses.toLocaleString()}</h2>
            <p>of ₹{budget.toLocaleString()}</p>
          </div>
          <div className="percentage-display">
            <h3>{percentage}%</h3>
            <span>BUDGET USED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
