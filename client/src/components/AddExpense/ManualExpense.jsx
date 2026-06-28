import { useState } from "react";
import { addExpense } from "../../api/expenseApi";
import { toast } from "react-toastify";
const ManualExpense = () => {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    paymentMethod: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    await addExpense(expense, token);

    toast.success("Expense Added Successfully!");

    setExpense({
      title: "",
      amount: "",
      category: "",
      paymentMethod: "",
      date: "",
      notes: "",
    });

  } catch (error) {
    console.error(error);

    toast.error("Failed to Add Expense");
  }
};

  return (
    <div className="expense-card">

      <form onSubmit={handleSubmit}>

        {/* Row 1 */}

        <div className="form-row">

          <div className="form-group">

            <label>Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter expense title"
              value={expense.title}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Amount</label>

            <input
              type="number"
              name="amount"
              placeholder="₹ Enter amount"
              value={expense.amount}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* Row 2 */}

        <div className="form-row">

          <div className="form-group">

            <label>Category</label>

            <select
              name="category"
              value={expense.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              <option>Food</option>
              <option>Transport</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Education</option>
              <option>Entertainment</option>
              <option>Health</option>
              <option>Others</option>
            </select>

          </div>

          <div className="form-group">

            <label>Payment Method</label>

            <select
              name="paymentMethod"
              value={expense.payment}
              onChange={handleChange}
            >
              <option value="">Select payment method</option>
              <option>Cash</option>
              <option>UPI</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>Net Banking</option>
            </select>

          </div>

        </div>

        {/* Row 3 */}

        <div className="form-row">

          <div className="form-group">

            <label>Date</label>

            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Notes (Optional)</label>

            <input
              type="text"
              name="notes"
              placeholder="Add notes"
              value={expense.notes}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* Buttons */}

        <div className="form-buttons">

          <button
            type="submit"
            className="save-btn"
          >
            Save Expense
          </button>

          <button
            type="button"
            className="cancel-btn"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>
  );
};

export default ManualExpense;