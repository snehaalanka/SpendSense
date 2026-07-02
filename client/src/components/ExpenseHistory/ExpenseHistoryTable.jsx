import {
  Pizza,
  Car,
  Film,
  ShoppingBag,
  GraduationCap,
  Receipt,
  Pencil,
  Trash2,
} from "lucide-react";

const expenses = [
  {
    id: 1,
    title: "Pizza",
    category: "Food",
    amount: 350,
    payment: "UPI",
    date: "25 Jun 2026",
  },
  {
    id: 2,
    title: "Uber",
    category: "Transport",
    amount: 220,
    payment: "Cash",
    date: "24 Jun 2026",
  },
  {
    id: 3,
    title: "Netflix",
    category: "Entertainment",
    amount: 649,
    payment: "Card",
    date: "22 Jun 2026",
  },
];

const getCategoryClass = (category) => {
  switch (category) {
    case "Food":
      return "category-food";

    case "Transport":
      return "category-transport";

    case "Shopping":
      return "category-shopping";

    case "Entertainment":
      return "category-entertainment";

    case "Bills":
      return "category-bills";

    case "Education":
      return "category-education";

    default:
      return "";
  }
};

const getCategoryIcon = (category) => {
  switch (category) {
    case "Food":
      return <Pizza size={14} />;

    case "Transport":
      return <Car size={14} />;

    case "Shopping":
      return <ShoppingBag size={14} />;

    case "Entertainment":
      return <Film size={14} />;

    case "Education":
      return <GraduationCap size={14} />;

    default:
      return <Receipt size={14} />;
  }
};

const ExpenseHistoryTable = () => {
  return (
    <>
      <div className="history-top">

        <h2>Recent Expenses</h2>

        <span className="total-records">
          {expenses.length} Records
        </span>

      </div>

      <div className="table-card">

        <table>

          <thead>

            <tr>

              <th>Expense</th>

              <th>Category</th>

              <th>Amount</th>

              <th>Payment</th>

              <th>Date</th>

              <th style={{ textAlign: "center" }}>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {expenses.map((expense) => (

              <tr key={expense.id}>

                <td>

                  <strong>

                    {expense.title}

                  </strong>

                </td>

                <td>

                  <span
                    className={`category-badge ${getCategoryClass(
                      expense.category
                    )}`}
                  >

                    {getCategoryIcon(expense.category)}

                    {expense.category}

                  </span>

                </td>

                <td>

                  <span className="amount">

                    ₹{expense.amount}

                  </span>

                </td>

                <td>

                  <span className="payment-method">

                    {expense.payment}

                  </span>

                </td>

                <td>

                  {expense.date}

                </td>

                <td>

                  <div className="action-buttons">

                    <button
                      className="edit-btn"
                      title="Edit"
                    >

                      <Pencil size={16} />

                    </button>

                    <button
                      className="delete-btn"
                      title="Delete"
                    >

                      <Trash2 size={16} />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
};

export default ExpenseHistoryTable;