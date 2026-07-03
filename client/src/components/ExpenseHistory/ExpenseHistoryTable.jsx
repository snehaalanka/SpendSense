import { useEffect, useState } from "react";
import {
  getExpenses,
  deleteExpense,
  updateExpense,
} from "../../api/expenseApi";

import { toast } from "react-toastify";

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

const ExpenseHistoryTable = ({
  search,
  category,
  selectedDate,
}) => {
  const [expenses, setExpenses] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

const [editingExpense, setEditingExpense] = useState(null);

  const [editData, setEditData] = useState({
  title: "",
  amount: "",
  category: "",
  paymentMethod: "",
  date: "",
  notes: "",
});

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses(token);

      setExpenses(data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteExpense(selectedExpense._id, token);

      toast.success("Expense deleted successfully!");

      setShowDeleteModal(false);

      setSelectedExpense(null);

      fetchExpenses();

    } catch (error) {
      console.log(error);

      toast.error("Failed to delete expense.");
    }
  };
  const handleEditClick = (expense) => {

  setEditingExpense(expense);

  setEditData({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    paymentMethod: expense.paymentMethod,
    date: expense.date.split("T")[0],
    notes: expense.notes || "",
  });

  setShowEditModal(true);

};

const handleEditChange = (e) => {

  setEditData({
    ...editData,
    [e.target.name]: e.target.value,
  });

};

const handleUpdateExpense = async () => {

  try {

    await updateExpense(
      editingExpense._id,
      editData,
      token
    );

    toast.success("Expense updated successfully!");

    setShowEditModal(false);
    setEditingExpense(null);

    fetchExpenses();

  } catch (err) {

    toast.error("Failed to update expense.");

  }

};
const filteredExpenses = expenses.filter((expense) => {

  const matchesSearch =
    expense.title
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesCategory =
    category === "all" ||
    expense.category === category;

  const matchesDate =
    !selectedDate ||

    new Date(expense.date)
      .toDateString() ===
    selectedDate.toDateString();

  return (
    matchesSearch &&
    matchesCategory &&
    matchesDate
  );

});
return (
  <>
    <div className="history-top">
      <h2>Recent Expenses</h2>

      <span className="total-records">
        {filteredExpenses.length} Records
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
          {filteredExpenses.length > 0 ? (

            filteredExpenses.map((expense) => (

              <tr key={expense._id}>

                <td>
                  <strong>{expense.title}</strong>
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
                    {expense.paymentMethod}
                  </span>
                </td>

                <td>
                  {new Date(expense.date).toLocaleDateString("en-IN")}
                </td>

                <td>
                  <div className="action-buttons">

                    <button
  className="edit-btn"
  title="Edit"
  onClick={() => handleEditClick(expense)}
>
  <Pencil size={16} />
</button>

                    <button
                      className="delete-btn"
                      title="Delete"
                      onClick={() =>
                        handleDeleteClick(expense)
                      }
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>
                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "30px",
                  color: "#64748b",
                }}
              >
                No expenses found.
              </td>

            </tr>

          )}
        </tbody>
      </table>
    </div>
    
    {showEditModal && (
  <div className="modal-overlay">
    <div className="edit-modal">

      <h2>Edit Expense</h2>

      <div className="edit-form">

        <input
          type="text"
          name="title"
          placeholder="Expense Title"
          value={editData.title}
          onChange={handleEditChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={editData.amount}
          onChange={handleEditChange}
        />

        <select
          name="category"
          value={editData.category}
          onChange={handleEditChange}
        >
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Bills</option>
          <option>Education</option>
        </select>

        <select
          name="paymentMethod"
          value={editData.paymentMethod}
          onChange={handleEditChange}
        >
          <option>Cash</option>
          <option>UPI</option>
          <option>Card</option>
          <option>Net Banking</option>
        </select>

        <input
          type="date"
          name="date"
          value={editData.date}
          onChange={handleEditChange}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={editData.notes}
          onChange={handleEditChange}
        />

      </div>

      <div className="modal-buttons">

        <button
          className="cancel-modal-btn"
          onClick={() => setShowEditModal(false)}
        >
          Cancel
        </button>

        <button
          className="save-modal-btn"
          onClick={handleUpdateExpense}
        >
          Save Changes
        </button>

      </div>

    </div>
  </div>
)}

    {showDeleteModal && (
      <div className="modal-overlay">

        <div className="delete-modal">

          <div className="delete-icon">
            <Trash2 size={34} />
          </div>

          <h2>Delete Expense?</h2>

          <p>
            Are you sure you want to delete
            <strong> "{selectedExpense?.title}"</strong>?
          </p>

          <span>
            This action cannot be undone.
          </span>

          <div className="modal-buttons">

            <button
              className="cancel-modal-btn"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedExpense(null);
              }}
            >
              Cancel
            </button>

            <button
              className="delete-modal-btn"
              onClick={confirmDelete}
            >
              Delete
            </button>

          </div>

        </div>

      </div>
    )}
  </>
);
};

export default ExpenseHistoryTable;