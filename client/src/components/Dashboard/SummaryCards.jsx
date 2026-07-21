import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../api/dashboardApi";
import { useMonth } from "../../context/MonthContext";

import "../../styles/SummaryCards.css";

const SummaryCards = () => {
  const token = localStorage.getItem("token");
  const { selectedMonth } = useMonth();

  const [summary, setSummary] = useState({
    budget: 0,
    expenses: 0,
    savings: 0,
    transactions: 0,
  });

  useEffect(() => {
    fetchSummary();
  }, [selectedMonth]);

  const fetchSummary = async () => {
    try {
      const data = await getDashboardSummary(
        token,
        selectedMonth.year,
        selectedMonth.month
      );
      setSummary(data);
    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    { title: "Monthly budget", value: `₹${summary.budget.toLocaleString()}` },
    { title: "Expenses", value: `₹${summary.expenses.toLocaleString()}` },
    { title: "Savings", value: `₹${summary.savings.toLocaleString()}` },
    { title: "Transactions", value: summary.transactions },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card, index) => (
        <div className="summary-card" key={index}>
          <div className="summary-info">
            <p>{card.title}</p>
            <h2>{card.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;