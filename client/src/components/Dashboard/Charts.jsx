import { useEffect, useState } from "react";
import "../../styles/Charts.css";
import {
  getCategorySummary,
  getWeeklySpending,
} from "../../api/dashboardApi";;

const days = ["S", "M", "T", "W", "T", "F", "S"];

const colors = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

const Charts = () => {

  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState([]);
  const [weekly, setWeekly] = useState([]);

 useEffect(() => {

  fetchCategories();

  fetchWeeklySpending();

}, []);
const fetchWeeklySpending = async () => {

  try {

    const data = await getWeeklySpending(token);

    const weekData = [0, 0, 0, 0, 0, 0, 0];

    data.forEach(item => {

      weekData[item._id - 1] = item.total;

    });

    setWeekly(weekData);

  } catch (err) {

    console.log(err);

  }

};

  const fetchCategories = async () => {
    try {

      const data = await getCategorySummary(token);

console.log("Category Response:", data);

      console.log(data);

      const total = data.reduce(
        (sum, item) => sum + item.total,
        0
      );

      const formatted = data.map((item, index) => ({
        name: item._id,
        value: total ? Math.round((item.total / total) * 100) : 0,
        color: colors[index % colors.length],
      }));

      setCategories(formatted);

    } catch (err) {

      console.log(err);

    }
  };

  return (
    <div className="charts-grid">

      <div className="chart-card">

        <div className="chart-header">
          <h3>Expense Categories</h3>
          <span>This Month</span>
        </div>

        <div className="chart-body">

          <div className="pie-chart"></div>

          <div className="category-list">

            {categories.map((item, index) => (

              <div
                className="category-item"
                key={index}
              >

                <div className="category-left">

                  <span
                    className="color-dot"
                    style={{
                      background: item.color,
                    }}
                  ></span>

                  <span>{item.name}</span>

                </div>

                <strong>{item.value}%</strong>

              </div>

            ))}

          </div>

        </div>

      </div>

      <div className="chart-card">

        <div className="chart-header">

          <h3>Weekly Spending</h3>

          <span>Last 7 Days</span>

        </div>

        <div className="bars">

          {weekly.map((amount, index) => (

            <div
              className="bar-item"
              key={index}
            >

              <div
                className="bar"
                style={{
                  height: `${amount / 100}px`,
                }}
              ></div>

              <small>
                {days[index]}
              </small>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Charts;