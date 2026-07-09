const Expense = require("../models/Expense");
const User = require("../models/User");


// builds accurate, non-AI stats from the user's real expense data

const buildMonthlyStats = async (userId) => {
  

  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const expenses = await Expense.find({
    user: userId,
    date: { $gte: startOfMonth },
  });

  const user = await User.findById(userId);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  const budget = user.monthlyBudget || 0;


  // category totals

  const categoryTotals = {};

  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
  });

  let topCategory = null;
  let topCategoryAmount = 0;

  for (const category in categoryTotals) {
    if (categoryTotals[category] > topCategoryAmount) {
      topCategory = category;
      topCategoryAmount = categoryTotals[category];
    }
  }

  const topCategoryPercent =
    totalSpent > 0 ? Math.round((topCategoryAmount / budget) * 100) : 0;


  // weekend vs weekday spending

  let weekendTotal = 0;
  let weekdayTotal = 0;

  expenses.forEach((e) => {
    const day = new Date(e.date).getDay();
    const isWeekend = day === 0 || day === 6;

    if (isWeekend) {
      weekendTotal += e.amount;
    } else {
      weekdayTotal += e.amount;
    }
  });

  const weekendPercent =
    totalSpent > 0 ? Math.round((weekendTotal / totalSpent) * 100) : 0;


  return {
    budget,
    totalSpent,
    topCategory,
    topCategoryAmount,
    topCategoryPercent,
    weekendPercent,
    categoryTotals,
    transactionCount: expenses.length,
  };

};


const getAnalysis = async (req, res) => {

  try {
      res.set("Cache-Control", "no-store");

    const stats = await buildMonthlyStats(req.user.id);

    const aiResponse = await fetch(`${process.env.AI_SERVICE_URL}/tips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stats }),
    });

    if (!aiResponse.ok) {
      throw new Error("ai-service request failed.");
    }

    const aiData = await aiResponse.json();

    res.json({
      spendingSummary: {
        percent: stats.topCategoryPercent,
        category: stats.topCategory,
      },
      weekendSpending: {
        percent: stats.weekendPercent,
      },
      highestCategory: {
        name: stats.topCategory,
        amount: stats.topCategoryAmount,
      },
      savingTips: aiData.savingTips,
      healthScore: aiData.healthScore,
    });

  } catch (error) {
    console.error("getAnalysis error:", error.message);
    res.status(500).json({ message: "Failed to generate analysis." });
  }

};


const getReport = async (req, res) => {

  try {

    const stats = await buildMonthlyStats(req.user.id);

    const aiResponse = await fetch(`${process.env.AI_SERVICE_URL}/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stats }),
    });

    if (!aiResponse.ok) {
      throw new Error("ai-service request failed.");
    }

    const aiData = await aiResponse.json();

    res.json({ report: aiData.report });

  } catch (error) {
    console.error("getReport error:", error.message);
    res.status(500).json({ message: "Failed to generate report." });
  }

};


module.exports = { getAnalysis, getReport };