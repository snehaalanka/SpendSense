const expenses = [
  {
    id: 1,
    title: "Pizza",
    category: "Food",
    amount: "₹350",
    payment: "UPI",
    date: "25 Jun 2026",
  },
  {
    id: 2,
    title: "Uber",
    category: "Transport",
    amount: "₹220",
    payment: "Cash",
    date: "24 Jun 2026",
  },
  {
    id: 3,
    title: "Netflix",
    category: "Entertainment",
    amount: "₹649",
    payment: "Card",
    date: "22 Jun 2026",
  },
];

const ExpenseHistoryTable = () => {
  return (
    <div className="table-card">

      <table>

        <thead>

          <tr>
            <th>Expense</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {expenses.map((expense) => (
            <tr key={expense.id}>

              <td>{expense.title}</td>

              <td>
                <span className="category-badge">
                  {expense.category}
                </span>
              </td>

              <td className="amount">
                {expense.amount}
              </td>

              <td>{expense.payment}</td>

              <td>{expense.date}</td>

              <td>

                <button className="edit-btn">
                  Edit
                </button>

                <button className="delete-btn">
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ExpenseHistoryTable;