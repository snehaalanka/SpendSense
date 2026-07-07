const mongoose = require("mongoose");

const validCategories = [
  "Food",
  "Shopping",
  "Travel",
  "Bills",
  "Health",
  "Education",
  "Entertainment",
  "Other",
];

const validPaymentMethods = [
  "Cash",
  "UPI",
  "Credit Card",
  "Debit Card",
  "Net Banking",
];

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Expense title is required."],
      trim: true,
      minlength: [3, "Title must be at least 3 characters."],
      maxlength: [50, "Title cannot exceed 50 characters."],
    },

    amount: {
      type: Number,
      required: [true, "Amount is required."],
      min: [0.01, "Amount must be greater than ₹0."],
      max: [1000000, "Amount cannot exceed ₹10,00,000."],
    },

    category: {
      type: String,
      required: true,
      enum: {
        values: validCategories,
        message: "Invalid category.",
      },
    },

    paymentMethod: {
      type: String,
      required: true,
      enum: {
        values: validPaymentMethods,
        message: "Invalid payment method.",
      },
    },

    date: {
      type: Date,
      required: true,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [300, "Notes cannot exceed 300 characters."],
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);