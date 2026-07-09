const Expense = require("../models/Expense");
const User = require("../models/User");
const mongoose = require("mongoose");

// Helper: build a date range from ?year= & ?month= query params
// month is 1-indexed (1 = Jan, 12 = Dec) to match how you'll send it from frontend
const getMonthRange = (query) => {
  const now = new Date();
  const year = parseInt(query.year) || now.getFullYear();
  const month = parseInt(query.month) || now.getMonth() + 1;

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1); // first day of NEXT month (exclusive upper bound)

  return { start, end };
};

const getSummary = async (req, res) => {
  try {
    const { start, end } = getMonthRange(req.query);

    const expenses = await Expense.find({
      user: req.user.id,
      date: { $gte: start, $lt: end },
    });

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    const totalTransactions = expenses.length;

    const user = await User.findById(req.user.id);
    const monthlyBudget = user.monthlyBudget;
    const savings = monthlyBudget - totalExpenses;

    res.status(200).json({
      budget: monthlyBudget,
      expenses: totalExpenses,
      savings,
      transactions: totalTransactions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getCategorySummary = async (req, res) => {
  try {
    const { start, end } = getMonthRange(req.query);

    const categories = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          date: { $gte: start, $lt: end },
        },
      },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
    ]);

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getWeeklySpending = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const weekly = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          date: { $gte: sevenDaysAgo },
        },
      },
      { $group: { _id: { $dayOfWeek: "$date" }, total: { $sum: "$amount" } } },
    ]);

    res.status(200).json(weekly);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getSummary, getCategorySummary, getWeeklySpending };