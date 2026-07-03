import "../../styles/RecentExpenses.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getExpenses } from "../../api/expenseApi";

import {
  ArrowRight,
  UtensilsCrossed,
  Coffee,
  CarTaxiFront,
  ShoppingBag,
  GraduationCap,
  Receipt,
} from "lucide-react";

const getIcon = (category) => {
  switch (category) {
    case "Food":
      return <UtensilsCrossed size={20} />;

    case "Transport":
      return <CarTaxiFront size={20} />;

    case "Shopping":
      return <ShoppingBag size={20} />;

    case "Education":
      return <GraduationCap size={20} />;

    case "Bills":
      return <Receipt size={20} />;

    case "Entertainment":
      return <Coffee size={20} />;

    default:
      return <Receipt size={20} />;
  }
};

const getDateLabel = (date) => {
  const expenseDate = new Date(date);

  const today = new Date();

  const diff =
    Math.floor(
      (today - expenseDate) /
        (1000 * 60 * 60 * 24)
    );

  if (diff === 0) return "Today";

  if (diff === 1) return "Yesterday";

  return `${diff} days ago`;
};

const RecentExpenses = () => {

  const [expenses, setExpenses] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {

      const data = await getExpenses(token);

      const latest = data
        .sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        )
        .slice(0, 4);

      setExpenses(latest);

    } catch (err) {

      console.log(err);

    }
  };

  return (
    <div className="recent-card">

      <div className="recent-header">

        <h3>Recent Expenses</h3>

        <button
          onClick={() =>
            navigate("/expense-history")
          }
        >
          View All

          <ArrowRight size={16} />

        </button>

      </div>

      <div className="recent-list">

        {expenses.length > 0 ? (

          expenses.map((expense) => (

            <div
              className="expense-row"
              key={expense._id}
            >

              <div className="expense-left">

                <div className="expense-icon">

                  {getIcon(expense.category)}

                </div>

                <div>

                  <h4>{expense.title}</h4>

                  <p>{expense.category}</p>

                </div>

              </div>

              <div className="expense-right">

                <h4>₹{expense.amount}</h4>

                <p>
                  {getDateLabel(expense.date)}
                </p>

              </div>

            </div>

          ))

        ) : (

          <p
            style={{
              textAlign: "center",
              padding: "20px",
            }}
          >
            No recent expenses
          </p>

        )}

      </div>

    </div>
  );
};

export default RecentExpenses;