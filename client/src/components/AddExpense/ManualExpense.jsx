import { useState } from "react";
import { addExpense } from "../../api/expenseApi";
import { toast } from "react-toastify";
import Select from "react-select";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { useTheme } from "../../context/ThemeContext";

import {
  Wallet,
  Tag,
  Calendar,
  CreditCard,
  StickyNote,
  CircleCheckBig,
} from "lucide-react";

const categoryOptions = [
  { value: "Food", label: "Food" },
  { value: "Transport", label: "Transport" },
  { value: "Shopping", label: "Shopping" },
  { value: "Bills", label: "Bills" },
  { value: "Education", label: "Education" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Health", label: "Health" },
  { value: "Others", label: "Others" },
];

const paymentOptions = [
  { value: "Cash", label: "Cash" },
  { value: "UPI", label: "UPI" },
  { value: "Credit Card", label: "Credit Card" },
  { value: "Debit Card", label: "Debit Card" },
  { value: "Net Banking", label: "Net Banking" },
];

const ManualExpense = () => {

  const { theme } = useTheme();

  const selectStyles = {

    control: (provided, state) => ({
      ...provided,

      backgroundColor:
        theme === "dark"
          ? "#111827"
          : "#ffffff",

      color:
        theme === "dark"
          ? "#ffffff"
          : "#111827",

      border: `1px solid ${
        state.isFocused
          ? "#2563EB"
          : theme === "dark"
          ? "#374151"
          : "#D1D5DB"
      }`,

      minHeight: 52,

      borderRadius: 12,

      boxShadow: "none",

      "&:hover": {
        borderColor: "#2563EB",
      },
    }),

    menu: (provided) => ({
      ...provided,

      background:
        theme === "dark"
          ? "#1E293B"
          : "#ffffff",

      borderRadius: 12,

      border: `1px solid ${
        theme === "dark"
          ? "#374151"
          : "#E5E7EB"
      }`,

      overflow: "hidden",

      zIndex: 9999,
    }),

    option: (provided, state) => ({
      ...provided,

      background:
        state.isFocused
          ? "#2563EB"
          : theme === "dark"
          ? "#1E293B"
          : "#ffffff",

      color:
        state.isFocused
          ? "#ffffff"
          : theme === "dark"
          ? "#ffffff"
          : "#111827",

      cursor: "pointer",
    }),

    singleValue: (provided) => ({
      ...provided,
      color:
        theme === "dark"
          ? "#ffffff"
          : "#111827",
    }),

    placeholder: (provided) => ({
      ...provided,
      color:
        theme === "dark"
          ? "#94A3B8"
          : "#6B7280",
    }),

    input: (provided) => ({
      ...provided,
      color:
        theme === "dark"
          ? "#ffffff"
          : "#111827",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#2563EB",
    }),

  };

  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    paymentMethod: "",
    date: "",
    notes: "",
  });

  const requiredFields = [
    expense.title,
    expense.amount,
    expense.category,
    expense.paymentMethod,
    expense.date,
  ];

  const completedFields = requiredFields.filter(
    field => field !== ""
  ).length;

  const progress =
    (completedFields / requiredFields.length) * 100;

  const isReady =
    completedFields === requiredFields.length;

  const handleChange = (e) => {

    setExpense({

      ...expense,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await addExpense(expense, token);

      toast.success(
        "Expense Added Successfully!"
      );

      setExpense({

        title: "",
        amount: "",
        category: "",
        paymentMethod: "",
        date: "",
        notes: "",

      });

    }

    catch {

      toast.error(
        "Failed to Add Expense"
      );

    }

  };

  return (
    <>
  {/* =====================================
      Expense Form
  ====================================== */}

  <div className="expense-card">

    <form onSubmit={handleSubmit}>

      {/* ================= Row 1 ================= */}

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

      {/* ================= Row 2 ================= */}

      <div className="form-row">

        <div className="form-group">

          <label>Category</label>

          <Select

            options={categoryOptions}

            styles={selectStyles}

            placeholder="Select Category"

            value={
              categoryOptions.find(
                item => item.value === expense.category
              ) || null
            }

            onChange={(selected)=>{

              setExpense({

                ...expense,

                category:selected.value,

              });

            }}

            isSearchable={false}

          />

        </div>

        <div className="form-group">

          <label>Payment Method</label>

          <Select

            options={paymentOptions}

            styles={selectStyles}

            placeholder="Select Payment Method"

            value={
              paymentOptions.find(
                item => item.value === expense.paymentMethod
              ) || null
            }

            onChange={(selected)=>{

              setExpense({

                ...expense,

                paymentMethod:selected.value,

              });

            }}

            isSearchable={false}

          />

        </div>

      </div>

      {/* ================= Row 3 ================= */}

      <div className="form-row">

        <div className="form-group">

          <label>Date</label>

          <DatePicker

            selected={
              expense.date
                ? new Date(expense.date)
                : null
            }

            onChange={(date)=>{

              setExpense({

                ...expense,

                date:date
                  ? date.toISOString().split("T")[0]
                  : "",

              });

            }}

            placeholderText="Select Date"

            dateFormat="dd MMM yyyy"

            className="react-datepicker-input"

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

      {/* ================= Buttons ================= */}

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

          onClick={()=>{

            setExpense({

              title:"",
              amount:"",
              category:"",
              paymentMethod:"",
              date:"",
              notes:"",

            });

          }}

        >

          Cancel

        </button>

      </div>

    </form>

  </div>

  {/* =====================================
      Expense Preview Card
  ====================================== */}

  <div className="expense-preview-card">      <div className="preview-top">

        <div>

          <h3>Expense Preview</h3>

          <p>Live updates while filling the form</p>

        </div>

        <span
          className={
            isReady
              ? "status-ready"
              : "status-pending"
          }
        >
          {isReady ? "Ready" : "Incomplete"}
        </span>

      </div>

      {/* Progress Bar */}

      <div className="preview-progress">

        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
          }}
        ></div>

      </div>

      <div className="progress-label">

        {completedFields} of {requiredFields.length} fields completed

      </div>

      {/* Preview Grid */}

      <div className="preview-grid">

        {/* Amount */}

        <div className="preview-box">

          <Wallet className="preview-icon"/>

          <div>

            <span>Amount</span>

            <h4>

              {expense.amount
                ? `₹${expense.amount}`
                : "₹0"}

            </h4>

          </div>

        </div>

        {/* Category */}

        <div className="preview-box">

          <Tag className="preview-icon"/>

          <div>

            <span>Category</span>

            <h4>

              {expense.category || "--"}

            </h4>

          </div>

        </div>

        {/* Payment */}

        <div className="preview-box">

          <CreditCard className="preview-icon"/>

          <div>

            <span>Payment</span>

            <h4>

              {expense.paymentMethod || "--"}

            </h4>

          </div>

        </div>

        {/* Date */}

        <div className="preview-box">

          <Calendar className="preview-icon"/>

          <div>

            <span>Date</span>

            <h4>

              {expense.date
                ? new Date(expense.date).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : "--"}

            </h4>

          </div>

        </div>

        {/* Expense Title */}

        <div className="preview-box full-width">

          <StickyNote className="preview-icon"/>

          <div>

            <span>Expense Title</span>

            <h4>

              {expense.title || "Untitled Expense"}

            </h4>

          </div>

        </div>

        {/* Status */}

        <div className="preview-box full-width">

          <CircleCheckBig
            className={`preview-icon ${
              isReady
                ? "success-icon"
                : ""
            }`}
          />

          <div>

            <span>Status</span>

            <h4
              className={
                isReady
                  ? "status-ready-text"
                  : "status-pending-text"
              }
            >

              {isReady
                ? "Ready to Save"
                : "Incomplete"}

            </h4>

          </div>

        </div>

      </div>

    </div>

  </>

);

};

export default ManualExpense;