import { useEffect, useState } from "react";
import "../../styles/Charts.css";
import { getCategorySummary, getWeeklySpending } from "../../api/dashboardApi";
import { useMonth } from "../../context/MonthContext";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const colors = [
  "#2563EB", // Blue
  "#10B981", // Green
  "#F59E0B", // Orange
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
  "#EC4899", // Pink
  "#64748B", // Slate Gray
  "#14B8A6"  // Teal (just in case you add more categories!)
];

const Charts = () => {
  const token = localStorage.getItem("token");
  const { selectedMonth } = useMonth();

  const [categories, setCategories] = useState([]);
  const [weekly, setWeekly] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, [selectedMonth]);

  useEffect(() => {
    fetchWeeklySpending();
  }, []);

  const fetchWeeklySpending = async () => {
    try {
      const data = await getWeeklySpending(token);
      
      const weekData = days.map((day) => ({ day, amount: 0 }));
      data.forEach((item) => {
        weekData[item._id - 1].amount = item.total;
      });
      
      setWeekly(weekData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategorySummary(
        token,
        selectedMonth.year,
        selectedMonth.month
      );
      
      const total = data.reduce((sum, item) => sum + item.total, 0);
      
      const formatted = data.map((item, index) => ({
        name: item._id,
        value: item.total,
        percentage: total ? Math.round((item.total / total) * 100) : 0,
        color: colors[index % colors.length],
      }));
      
      setCategories(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: "#1E293B", padding: "8px 12px", borderRadius: "8px", color: "#fff", fontSize: "14px", border: "1px solid #334155" }}>
          <p style={{ margin: 0, fontWeight: "600" }}>₹{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="charts-grid">
      
      {/* CATEGORIES PIE CHART */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>Expense Categories</h3>
          <span>This Month</span>
        </div>
        
        <div className="chart-body">
          
          {/* INCREASED: Container from 190px to 240px */}
          <div style={{ width: "240px", height: "240px", flexShrink: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categories}
                  /* INCREASED: Radii to make the pie physically larger */
                  innerRadius={75}
                  outerRadius={115}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: "#1E293B", border: "none", borderRadius: "8px", color: "#fff" }}
                  itemStyle={{ color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="category-list">
            {categories.map((item, index) => (
              <div className="category-item" key={index}>
                <div className="category-left">
                  <span className="color-dot" style={{ background: item.color }}></span>
                  <span style={{ fontSize: "16px" }}>{item.name}</span>
                </div>
                <strong style={{ fontSize: "16px" }}>{item.percentage}%</strong>
              </div>
            ))}
          </div>
          
        </div>
      </div>

      {/* WEEKLY SPENDING BAR CHART */}
      <div className="chart-card">
        <div className="chart-header">
          <h3>Weekly Spending</h3>
          <span>Last 7 Days</span>
        </div>
        <div style={{ width: "100%", height: "240px", marginTop: "10px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#64748B", fontSize: 13 }} 
                dy={10}
              />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(37, 99, 235, 0.05)" }} />
              <Bar 
                dataKey="amount" 
                fill="#2563EB" 
                radius={[6, 6, 0, 0]} 
                barSize={36} /* Slightly thickened the bars to match the new bold pie chart */
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
};

export default Charts;