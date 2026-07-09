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


const extractExpense = async (req, res) => {

  try {

    const text = req.body.text;

    if (!text) {
      return res.status(400).json({ message: "text is required." });
    }

    const aiResponse = await fetch(`${process.env.AI_SERVICE_URL}/extract-expense`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!aiResponse.ok) {
      throw new Error("ai-service request failed.");
    }

    const aiData = await aiResponse.json();

    res.json(aiData);

  } catch (error) {
    console.error("extractExpense error:", error.message);
    res.status(500).json({ message: "Failed to extract expense details." });
  }

};


const transcribeAudio = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({ message: "audio file is required." });
    }

    const formData = new FormData();

    const blob = new Blob([req.file.buffer], { type: req.file.mimetype });

    formData.append("audio", blob, "recording.webm");

    const aiResponse = await fetch(`${process.env.AI_SERVICE_URL}/transcribe`, {
      method: "POST",
      body: formData,
    });

    if (!aiResponse.ok) {
      throw new Error("ai-service request failed.");
    }

    const aiData = await aiResponse.json();

    res.json(aiData);

  } catch (error) {
    console.error("transcribeAudio error:", error.message);
    res.status(500).json({ message: "Failed to transcribe audio." });
  }

};


const Goal = require("../models/Goal");


// shared helper — computes real, deterministic numbers for one goal

const buildGoalStats = (goal) => {

  const target = goal.targetAmount;
  const saved = goal.savedAmount;
  const remaining = target - saved;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(goal.targetDate);
  const createdDate = new Date(goal.createdAt);

  const daysRemaining = Math.max(
    Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24)),
    1
  );

  const totalDurationDays = Math.max(
    Math.ceil((targetDate - createdDate) / (1000 * 60 * 60 * 24)),
    1
  );

  const elapsedDays = Math.max(
    Math.ceil((today - createdDate) / (1000 * 60 * 60 * 24)),
    0
  );

  const progress = Math.min(Math.round((saved / target) * 100), 100);

  const requiredPerDay = remaining / daysRemaining;

  // compare how much of the goal's TIMELINE has passed vs how much of the MONEY has been saved
  // this stays stable even right after a goal is created, instead of dividing by near-zero days

  const timeProgress = Math.min(elapsedDays / totalDurationDays, 1);
  const moneyProgress = Math.min(saved / target, 1);

  // a small buffer keeps early-goal math from swinging to a hard 0 or 100

  const paceScore = 0.5 + (moneyProgress - timeProgress);

  const successProbability = Math.max(0, Math.min(100, Math.round(paceScore * 100)));

  return {
    goalName: goal.goalName,
    target,
    saved,
    remaining,
    progress,
    daysRemaining,
    requiredPerDay: Math.round(requiredPerDay),
    successProbability,
  };

};


const getGoalPrediction = async (req, res) => {

  try {

    const goal = await Goal.findOne({ _id: req.params.id, user: req.user.id });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found." });
    }

    const stats = buildGoalStats(goal);

    const aiResponse = await fetch(`${process.env.AI_SERVICE_URL}/goal-prediction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stats }),
    });

    if (!aiResponse.ok) {
      throw new Error("ai-service request failed.");
    }

    const aiData = await aiResponse.json();

    res.json({ prediction: aiData.prediction });

  } catch (error) {
    console.error("getGoalPrediction error:", error.message);
    res.status(500).json({ message: "Failed to generate goal prediction." });
  }

};


const getGoalsAdvisor = async (req, res) => {

  try {

    const goals = await Goal.find({ user: req.user.id });

    const activeGoals = goals.filter((g) => g.savedAmount < g.targetAmount);

    if (activeGoals.length === 0) {
      return res.json({
        perDay: 0,
        perWeek: 0,
        perMonth: 0,
        successProbability: 100,
      });
    }

    const statsList = activeGoals.map(buildGoalStats);

    const perDay = statsList.reduce((sum, s) => sum + s.requiredPerDay, 0);

    const avgSuccessProbability = Math.round(
      statsList.reduce((sum, s) => sum + s.successProbability, 0) / statsList.length
    );

    res.json({
      perDay: Math.round(perDay),
      perWeek: Math.round(perDay * 7),
      perMonth: Math.round(perDay * 30),
      successProbability: avgSuccessProbability,
    });

  } catch (error) {
    console.error("getGoalsAdvisor error:", error.message);
    res.status(500).json({ message: "Failed to generate savings advice." });
  }

};


const buildChatContext = async (userId) => {

  const stats = await buildMonthlyStats(userId);

  const goals = await Goal.find({ user: userId });

  const goalsSummary = goals.map((g) => ({
    goalName: g.goalName,
    target: g.targetAmount,
    saved: g.savedAmount,
    progress: Math.round((g.savedAmount / g.targetAmount) * 100),
  }));

  const recentExpenses = await Expense.find({ user: userId })
    .sort({ date: -1 })
    .limit(15)
    .select("title amount category date -_id");

  return {
    monthlyBudget: stats.budget,
    totalSpentThisMonth: stats.totalSpent,
    categoryTotalsThisMonth: stats.categoryTotals,
    topCategoryThisMonth: stats.topCategory,
    weekendSpendingPercent: stats.weekendPercent,
    goals: goalsSummary,
    recentExpenses,
  };

};


const chatWithAI = async (req, res) => {

  try {

    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ message: "message is required." });
    }

    const context = await buildChatContext(req.user.id);

    const aiResponse = await fetch(`${process.env.AI_SERVICE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: history || [], context }),
    });

    if (!aiResponse.ok) {
      throw new Error("ai-service request failed.");
    }

    const aiData = await aiResponse.json();

    res.json({ reply: aiData.reply });

  } catch (error) {
    console.error("chatWithAI error:", error.message);
    res.status(500).json({ message: "Failed to get a reply." });
  }

};


const sumExpensesByCategory = (expenses) => {

  const totals = {};

  expenses.forEach((e) => {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  });

  return totals;

};


const getDashboardInsight = async (req, res) => {

  try {

    const userId = req.user.id;

    const stats = await buildMonthlyStats(userId);

    const now = new Date();

    // yesterday's spend

    const yesterdayStart = new Date(now);
    yesterdayStart.setDate(now.getDate() - 1);
    yesterdayStart.setHours(0, 0, 0, 0);

    const yesterdayEnd = new Date(now);
    yesterdayEnd.setHours(0, 0, 0, 0);

    const yesterdayExpenses = await Expense.find({
      user: userId,
      date: { $gte: yesterdayStart, $lt: yesterdayEnd },
    });

    const yesterdaySpent = yesterdayExpenses.reduce((sum, e) => sum + e.amount, 0);

    // last 7 days vs previous 7 days, per category, to catch a genuine trend

    const last7Start = new Date(now);
    last7Start.setDate(now.getDate() - 7);

    const prev7Start = new Date(now);
    prev7Start.setDate(now.getDate() - 14);

    const last7Expenses = await Expense.find({
      user: userId,
      date: { $gte: last7Start, $lte: now },
    });

    const prev7Expenses = await Expense.find({
      user: userId,
      date: { $gte: prev7Start, $lt: last7Start },
    });

    const last7ByCategory = sumExpensesByCategory(last7Expenses);
    const prev7ByCategory = sumExpensesByCategory(prev7Expenses);

    let topMoverCategory = null;
    let topMoverPercent = 0;

    for (const category in last7ByCategory) {

      const prevAmount = prev7ByCategory[category] || 0;

      if (prevAmount === 0) continue;

      const percentChange = Math.round(
        ((last7ByCategory[category] - prevAmount) / prevAmount) * 100
      );

      if (percentChange > topMoverPercent) {
        topMoverPercent = percentChange;
        topMoverCategory = category;
      }

    }

    const categoryTrendText = topMoverCategory
      ? `${topMoverCategory} spending increased by ${topMoverPercent}% this week.`
      : "Your spending pattern looks steady this week.";

    // weekend pattern, reusing the same weekendPercent already computed for this month

    const weekendInsightText =
      stats.weekendPercent > 40
        ? "Weekend spending is usually higher."
        : "Your weekend spending is fairly balanced.";

    // predicted savings based on current daily pace

    const daysElapsed = now.getDate();

    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    const dailyPace = stats.totalSpent / daysElapsed;

    const projectedTotal = Math.round(dailyPace * daysInMonth);

    const predictedSavings = stats.budget - projectedTotal;

    const isOverBudgetPace = predictedSavings < 0;

    // spending trend label, based on whether you're ahead or behind budget pace

    const expectedSpendSoFar = (stats.budget / daysInMonth) * daysElapsed;

    const spendingTrendLabel =
      stats.totalSpent <= expectedSpendSoFar
        ? "Your expenses are under control."
        : "You're spending faster than planned this month.";

    // reuse the existing /tips call in ai-service, just take the first tip

    let savingTip = "Keep tracking your expenses to unlock personalized tips.";

    try {

      const aiResponse = await fetch(`${process.env.AI_SERVICE_URL}/tips`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stats }),
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        savingTip = aiData.savingTips?.[0] || savingTip;
      }

    } catch (tipError) {
      console.error("dashboard saving tip fetch failed:", tipError.message);
    }

    res.json({
      predictedSavings: Math.abs(predictedSavings),
      isOverBudgetPace,
      yesterdaySpent,
      categoryTrendText,
      weekendInsightText,
      spendingTrendLabel,
      savingTip,
    });

  } catch (error) {
    console.error("getDashboardInsight error:", error.message);
    res.status(500).json({ message: "Failed to generate dashboard insight." });
  }

};


module.exports = {
  getAnalysis,
  getReport,
  extractExpense,
  transcribeAudio,
  getGoalPrediction,
  getGoalsAdvisor,
  chatWithAI,
  getDashboardInsight,
};