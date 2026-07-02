import "../../styles/SummaryCards.css";

import {
  Wallet,
  ArrowDownCircle,
  PiggyBank,
  ReceiptText,
} from "lucide-react";

const cards = [
  {
    title: "Monthly Budget",
    value: "₹15,000",
    change: "+8.5%",
    icon: <Wallet size={22} />,
    color: "#2563EB",
  },
  {
    title: "Expenses",
    value: "₹8,450",
    change: "-3.1%",
    icon: <ArrowDownCircle size={22} />,
    color: "#EF4444",
  },
  {
    title: "Savings",
    value: "₹6,550",
    change: "+12.4%",
    icon: <PiggyBank size={22} />,
    color: "#10B981",
  },
  {
    title: "Transactions",
    value: "128",
    change: "+15",
    icon: <ReceiptText size={22} />,
    color: "#F59E0B",
  },
];

const SummaryCards = () => {
  return (
    <div className="summary-grid">
      {cards.map((card, index) => (
        <div className="summary-card" key={index}>

          <div
            className="summary-icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <div className="summary-info">

            <p>{card.title}</p>

            <h2>{card.value}</h2>

            <span>{card.change} this month</span>

          </div>

        </div>
      ))}
    </div>
  );
};

export default SummaryCards;