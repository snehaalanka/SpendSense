import "../../styles/RecentExpenses.css";

import {
  ArrowRight,
  UtensilsCrossed,
  Coffee,
  CarTaxiFront,
  ShoppingBag,
} from "lucide-react";

const expenses = [
  {
    title: "Notebook",
    category: "Education",
    amount: "₹120",
    date: "Today",
    icon: <ShoppingBag size={20} />,
  },
  {
    title: "Coffee",
    category: "Food",
    amount: "₹80",
    date: "Today",
    icon: <Coffee size={20} />,
  },
  {
    title: "Burger King",
    category: "Food",
    amount: "₹250",
    date: "Yesterday",
    icon: <UtensilsCrossed size={20} />,
  },
  {
    title: "Mehfil Biryani",
    category: "Food",
    amount: "₹350",
    date: "3 days ago",
    icon: <UtensilsCrossed size={20} />,
  },
  
];

const RecentExpenses = () => {
  return (
    <div className="recent-card">

      <div className="recent-header">

        <h3>Recent Expenses</h3>

        <button>

          View All

          <ArrowRight size={16} />

        </button>

      </div>

      <div className="recent-list">

        {expenses.map((expense, index) => (

          <div
            className="expense-row"
            key={index}
          >

            <div className="expense-left">

              <div className="expense-icon">

                {expense.icon}

              </div>

              <div>

                <h4>{expense.title}</h4>

                <p>{expense.category}</p>

              </div>

            </div>

            <div className="expense-right">

              <h4>{expense.amount}</h4>

              <p>{expense.date}</p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentExpenses;