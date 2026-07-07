const Expense = require("../models/Expense");
const User = require("../models/User");

// ================================
// Constants
// ================================

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

// ================================
// Add Expense
// ================================

const addExpense = async (req, res) => {
  try {
    let {
      title,
      amount,
      category,
      paymentMethod,
      date,
      notes,
    } = req.body;

    // ================================
    // Trim Inputs
    // ================================

    title = title?.trim();
    notes = notes?.trim() || "";

    // ================================
    // Title Validation
    // ================================

    if (!title) {
      return res.status(400).json({
        message: "Expense title is required.",
      });
    }

    if (title.length < 3) {
      return res.status(400).json({
        message: "Title must contain at least 3 characters.",
      });
    }

    if (title.length > 50) {
      return res.status(400).json({
        message: "Title cannot exceed 50 characters.",
      });
    }

    if (/^\d+$/.test(title)) {
      return res.status(400).json({
        message: "Title cannot contain only numbers.",
      });
    }

    if (!/[A-Za-z]/.test(title)) {
      return res.status(400).json({
        message: "Title cannot contain only symbols.",
      });
    }

    // ================================
    // Amount Validation
    // ================================

    amount = Number(amount);

    if (Number.isNaN(amount)) {
      return res.status(400).json({
        message: "Amount must be a valid number.",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than ₹0.",
      });
    }

    if (amount > 1000000) {
      return res.status(400).json({
        message: "Amount cannot exceed ₹10,00,000.",
      });
    }

    if (!/^\d+(\.\d{1,2})?$/.test(amount.toString())) {
      return res.status(400).json({
        message: "Amount can have at most 2 decimal places.",
      });
    }

    // ================================
    // Category Validation
    // ================================

    if (!validCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid category.",
      });
    }

    // ================================
    // Payment Method Validation
    // ================================

    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method.",
      });
    }

    // ================================
    // Date Validation
    // ================================

    if (!date) {
      return res.status(400).json({
        message: "Expense date is required.",
      });
    }

    const expenseDate = new Date(date);

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (expenseDate > today) {
      return res.status(400).json({
        message: "Future dates are not allowed.",
      });
    }

    // ================================
    // Notes Validation
    // ================================

    if (notes.length > 300) {
      return res.status(400).json({
        message: "Notes cannot exceed 300 characters.",
      });
    }

    // ================================
    // Duplicate Expense Check
    // ================================

    const tenSecondsAgo = new Date(Date.now() - 10000);

    const duplicateExpense = await Expense.findOne({
      user: req.user.id,
      title,
      amount,
      category,
      createdAt: {
        $gte: tenSecondsAgo,
      },
    });

    if (duplicateExpense) {
      return res.status(400).json({
        message:
          "Looks like you already added this expense.",
      });
    }

    // ================================
    // Budget Check
    // ================================

    const user = await User.findById(req.user.id);

    const currentMonth = expenseDate.getMonth();
    const currentYear = expenseDate.getFullYear();

    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 1, 1);

    const monthlyExpenses = await Expense.aggregate([
      {
        $match: {
          user: user._id,
          date: {
            $gte: monthStart,
            $lt: monthEnd,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const spent =
      monthlyExpenses.length > 0
        ? monthlyExpenses[0].total
        : 0;

    const totalAfterExpense = spent + amount;

    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      paymentMethod,
      date: expenseDate,
      notes,
    });

    let budgetWarning = false;
    let warningMessage = "";

    if (totalAfterExpense > user.monthlyBudget) {
      budgetWarning = true;

      const exceededAmount =
        totalAfterExpense - user.monthlyBudget;

      warningMessage =
        `⚠️ This expense exceeds your monthly budget by ₹${exceededAmount.toFixed(
          2
        )}.`;
    }

    return res.status(201).json({
      message: "Expense Added Successfully",
      expense,
      budgetWarning,
      warningMessage,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
// ================================
// Get All Expenses
// ================================

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    }).sort({ date: -1 });

    res.status(200).json(expenses);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
// ================================
// Delete Expense
// ================================

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    await expense.deleteOne();

    res.status(200).json({
      message: "Expense deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
// ================================
// Update Expense
// ================================

// ================================
// Update Expense
// ================================

const updateExpense = async (req, res) => {
  try {
    let {
      title,
      amount,
      category,
      paymentMethod,
      date,
      notes,
    } = req.body;

    // ================================
    // Find Expense
    // ================================

    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // ================================
    // Trim Inputs
    // ================================

    title = title?.trim();
    notes = notes?.trim() || "";

    // ================================
    // Title Validation
    // ================================

    if (!title) {
      return res.status(400).json({
        message: "Expense title is required.",
      });
    }

    if (title.length < 3) {
      return res.status(400).json({
        message: "Title must contain at least 3 characters.",
      });
    }

    if (title.length > 50) {
      return res.status(400).json({
        message: "Title cannot exceed 50 characters.",
      });
    }

    if (/^\d+$/.test(title)) {
      return res.status(400).json({
        message: "Title cannot contain only numbers.",
      });
    }

    if (!/[A-Za-z]/.test(title)) {
      return res.status(400).json({
        message: "Title cannot contain only symbols.",
      });
    }

    // ================================
    // Amount Validation
    // ================================

    amount = Number(amount);

    if (Number.isNaN(amount)) {
      return res.status(400).json({
        message: "Amount must be a valid number.",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than ₹0.",
      });
    }

    if (amount > 1000000) {
      return res.status(400).json({
        message: "Amount cannot exceed ₹10,00,000.",
      });
    }

    if (!/^\d+(\.\d{1,2})?$/.test(amount.toString())) {
      return res.status(400).json({
        message: "Amount can have at most 2 decimal places.",
      });
    }

    // ================================
    // Category Validation
    // ================================

    if (!validCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid category.",
      });
    }

    // ================================
    // Payment Validation
    // ================================

    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        message: "Invalid payment method.",
      });
    }

    // ================================
    // Date Validation
    // ================================

    if (!date) {
      return res.status(400).json({
        message: "Expense date is required.",
      });
    }

    const expenseDate = new Date(date);

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (expenseDate > today) {
      return res.status(400).json({
        message: "Future dates are not allowed.",
      });
    }

    // ================================
    // Notes Validation
    // ================================

    if (notes.length > 300) {
      return res.status(400).json({
        message: "Notes cannot exceed 300 characters.",
      });
    }

    // ================================
    // Budget Warning
    // ================================

    const user = await User.findById(req.user.id);

    const monthStart = new Date(
      expenseDate.getFullYear(),
      expenseDate.getMonth(),
      1
    );

    const monthEnd = new Date(
      expenseDate.getFullYear(),
      expenseDate.getMonth() + 1,
      1
    );

    const monthlyExpenses = await Expense.aggregate([
      {
        $match: {
          user: user._id,
          date: {
            $gte: monthStart,
            $lt: monthEnd,
          },
          _id: {
            $ne: expense._id,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const spent =
      monthlyExpenses.length > 0
        ? monthlyExpenses[0].total
        : 0;

    const totalAfterExpense = spent + amount;

    expense.title = title;
    expense.amount = amount;
    expense.category = category;
    expense.paymentMethod = paymentMethod;
    expense.date = expenseDate;
    expense.notes = notes;

    await expense.save();

    let budgetWarning = false;
    let warningMessage = "";

    if (totalAfterExpense > user.monthlyBudget) {
      budgetWarning = true;

      const exceededAmount =
        totalAfterExpense - user.monthlyBudget;

      warningMessage = `⚠️ This expense exceeds your monthly budget by ₹${exceededAmount.toFixed(
        2
      )}.`;
    }

    res.status(200).json({
      message: "Expense Updated Successfully",
      expense,
      budgetWarning,
      warningMessage,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
};