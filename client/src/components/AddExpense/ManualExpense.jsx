import { useState } from "react";

import {
  IndianRupee,
  Calendar,
  Wallet,
  Tag,
  FileText,
  Upload,
} from "lucide-react";

const ManualExpense = () => {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    payment: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(expense);

    alert("Expense Saved Successfully!");
  };

  return (
    <div className="expense-card">

      <h2 className="details ">Expense Details</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">

          <input
            type="text"
            name="title"
            placeholder="Expense Title "
            value={expense.title}
            onChange={handleChange}
          />

        </div>

        <div className="form-row">

          <div className="form-group">

            <label>
              <IndianRupee size={16} />
              Amount
            </label>

            <input
              type="number"
              name="amount"
              placeholder="₹0"
              value={expense.amount}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>
              <Calendar size={16} />
              Date
            </label>

            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
            />

          </div>

        </div>

        <div className="form-row">

          <div className="form-group">

            <label>
              <Tag size={16} />
              Category
            </label>

            <select
  className={expense.category ? "selected" : ""}
  name="category"
  value={expense.category}
  onChange={handleChange}
>
  <option value="">Select</option>

  <option value="Food">Food</option>

  <option value="Transport">Transport</option>

  <option value="Shopping">Shopping</option>

  <option value="Bills">Bills</option>

  <option value="Education">Education</option>

  <option value="Entertainment">Entertainment</option>

  <option value="Health">Health</option>

  <option value="Others">Others</option>
</select>
          </div>

          <div className="form-group">

            <label>
              <Wallet size={16} />
              Payment Method
            </label>

            <select
              name="payment"
              value={expense.payment}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option>Cash</option>
              <option>UPI</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>Net Banking</option>
            </select>

          </div>

        </div>

        <div className="form-group">

          <label>
            <Upload size={16} />
            Upload Receipt
          </label>

          <input type="file" />

        </div>

        <div className="form-group">

          <label>
            <FileText size={14} />
            Notes
          </label>

          <textarea
            rows="5"
            name="notes"
            placeholder="Write something..."
            value={expense.notes}
            onChange={handleChange}
          />

        </div>

        <div className="form-buttons">

          <button
            type="button"
            className="cancel-btn"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-btn"
          >
            Save Expense
          </button>

        </div>

      </form>

    </div>
  );
};

export default ManualExpense;