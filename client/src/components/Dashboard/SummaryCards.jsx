import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../api/dashboardApi";
import { useMonth } from "../../context/MonthContext";

import "../../styles/SummaryCards.css";

import {
  Wallet,
  ArrowDownCircle,
  PiggyBank,
  ReceiptText,
} from "lucide-react";

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
    { title: "Monthly Budget", value: `₹${summary.budget}`, icon: <Wallet size={22} />, color: "#2563EB" },
    { title: "Expenses", value: `₹${summary.expenses}`, icon: <ArrowDownCircle size={22} />, color: "#EF4444" },
    { title: "Savings", value: `₹${summary.savings}`, icon: <PiggyBank size={22} />, color: "#10B981" },
    { title: "Transactions", value: summary.transactions, icon: <ReceiptText size={22} />, color: "#F59E0B" },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card, index) => (
        <div className="summary-card" key={index}>
          <div className="summary-icon" style={{ background: card.color }}>
            {card.icon}
          </div>
          <div className="summary-info">
            <p>{card.title}</p>
            <h2>{card.value}</h2>
            <span>Updated from your expenses</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;