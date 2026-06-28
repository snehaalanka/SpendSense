const Expense = require("../models/Expense");

// ================================
// Add Expense
// ================================

const addExpense = async (req, res) => {
  try {
    const {
      title,
      amount,
      category,
      paymentMethod,
      date,
      notes,
    } = req.body;
    console.log(req.body);

    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      paymentMethod,
      date,
      notes,
    });

    res.status(201).json({
      message: "Expense Added Successfully",
      expense,
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
};