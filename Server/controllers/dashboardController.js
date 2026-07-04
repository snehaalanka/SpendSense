const Expense = require("../models/Expense");
const User = require("../models/User");

const getSummary = async (req, res) => {
  try {

    const expenses = await Expense.find({
      user: req.user.id,
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

    res.status(500).json({
      message: "Server Error",
    });

  }
};

const mongoose = require("mongoose");

const getCategorySummary = async (req, res) => {
  try {

    const categories = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $group: {
          _id: "$category",
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);

    console.log(categories);

    res.status(200).json(categories);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

    
  }
};
const getWeeklySpending = async (req, res) => {

  try {

    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(
      sevenDaysAgo.getDate() - 6
    );

    const weekly = await Expense.aggregate([

      {
        $match: {

          user: new mongoose.Types.ObjectId(req.user.id),

          date: {
            $gte: sevenDaysAgo,
          },

        },

      },

      {

        $group: {

          _id: {
            $dayOfWeek: "$date",
          },

          total: {
            $sum: "$amount",
          },

        },

      },

    ]);

    res.status(200).json(weekly);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

module.exports = {
  getSummary,
  getCategorySummary,
  getWeeklySpending,
};