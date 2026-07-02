import "../../styles/Charts.css";

const categories = [
  { name: "Food", value: 36, color: "#2563EB" },
  { name: "Travel", value: 22, color: "#10B981" },
  { name: "Shopping", value: 18, color: "#F59E0B" },
  { name: "Bills", value: 14, color: "#EF4444" },
  { name: "Others", value: 10, color: "#8B5CF6" },
];

const weekly = [55, 92, 70, 48, 65, 100, 82];

const Charts = () => {
  return (
    <div className="charts-grid">

      {/* Expense Categories */}

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

      {/* Weekly Spending */}

      <div className="chart-card">

        <div className="chart-header">

          <h3>Weekly Spending</h3>

          <span>Last 7 Days</span>

        </div>

        <div className="bars">

          {weekly.map((height, index) => (

            <div
              className="bar-item"
              key={index}
            >

              <div
                className="bar"
                style={{
                  height: `${height * 2}px`,
                }}
              ></div>

              <small>
                {["M", "T", "W", "T", "F", "S", "S"][index]}
              </small>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Charts;