const Goal = require("../models/Goal");
const createGoal = async (req, res) => {
  try {

    let {
      goalName,
      targetAmount,
      savedAmount,
      targetDate,
    } = req.body;

    goalName = goalName.trim();

    if (!goalName) {
      return res.status(400).json({
        message: "Goal name is required.",
      });
    }

    if (goalName.length < 3 || goalName.length > 50) {
      return res.status(400).json({
        message:
          "Goal name must be between 3 and 50 characters.",
      });
    }

    if (/^\d+$/.test(goalName)) {
      return res.status(400).json({
        message:
          "Goal name cannot contain only numbers.",
      });
    }

    if (!/[A-Za-z]/.test(goalName)) {
      return res.status(400).json({
        message:
          "Goal name cannot contain only symbols.",
      });
    }

    targetAmount = Number(targetAmount);
    savedAmount = Number(savedAmount);

    if (
      Number.isNaN(targetAmount) ||
      targetAmount < 100 ||
      targetAmount > 10000000
    ) {
      return res.status(400).json({
        message: "Invalid target amount.",
      });
    }

    if (!/^\d+(\.\d{1,2})?$/.test(targetAmount.toString())) {
      return res.status(400).json({
        message:
          "Target amount can have at most 2 decimal places.",
      });
    }

    if (
      Number.isNaN(savedAmount) ||
      savedAmount < 0
    ) {
      return res.status(400).json({
        message: "Invalid saved amount.",
      });
    }

    if (savedAmount > targetAmount) {
      return res.status(400).json({
        message:
          "Saved amount cannot exceed target amount.",
      });
    }

    const date = new Date(targetDate);

    const today = new Date();

    today.setHours(0,0,0,0);

    if (date <= today) {
      return res.status(400).json({
        message:
          "Target date must be in the future.",
      });
    }

    const duplicate = await Goal.findOne({
      user: req.user.id,
      goalName,
    });

    if (duplicate) {
      return res.status(400).json({
        message:
          "A goal with this name already exists.",
      });
    }

    const goal = await Goal.create({
      user: req.user.id,
      goalName,
      targetAmount,
      savedAmount,
      targetDate,
    });

    res.status(201).json({
      message: "Goal created successfully.",
      goal,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
};
const getGoals = async (req, res) => {

  try {

    const goals = await Goal.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    const formattedGoals = goals.map((goal) => {

      const progress = Math.min(
        Math.round(
          (goal.savedAmount /
            goal.targetAmount) *
            100
        ),
        100
      );

      const remaining =
        goal.targetAmount -
        goal.savedAmount;

      let status = "On Track";

      if (progress >= 100) {
        status = "Completed";
      }

      return {
        ...goal.toObject(),
        progress,
        remaining,
        status,
      };

    });

    res.status(200).json(formattedGoals);

  } catch (err) {

    res.status(500).json({
      message: "Server Error",
    });

  }

};
const updateGoal = async (req, res) => {

  try {

    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found.",
      });
    }

    let {
      goalName,
      targetAmount,
      savedAmount,
      targetDate,
    } = req.body;

    goalName = goalName.trim();

    if (!goalName) {
      return res.status(400).json({
        message: "Goal name is required.",
      });
    }

    if (goalName.length < 3 || goalName.length > 50) {
      return res.status(400).json({
        message: "Goal name must be between 3 and 50 characters.",
      });
    }

    if (/^\d+$/.test(goalName)) {
      return res.status(400).json({
        message: "Goal name cannot contain only numbers.",
      });
    }

    if (!/[A-Za-z]/.test(goalName)) {
      return res.status(400).json({
        message: "Goal name cannot contain only symbols.",
      });
    }

    targetAmount = Number(targetAmount);
    savedAmount = Number(savedAmount);

    if (
      Number.isNaN(targetAmount) ||
      targetAmount < 100 ||
      targetAmount > 10000000
    ) {
      return res.status(400).json({
        message: "Invalid target amount.",
      });
    }

    if (
      Number.isNaN(savedAmount) ||
      savedAmount < 0
    ) {
      return res.status(400).json({
        message: "Invalid saved amount.",
      });
    }

    if (savedAmount > targetAmount) {
      return res.status(400).json({
        message: "Saved amount cannot exceed target amount.",
      });
    }

    const date = new Date(targetDate);

    const today = new Date();

    today.setHours(0,0,0,0);

    if (date <= today) {
      return res.status(400).json({
        message: "Target date must be in the future.",
      });
    }

    const duplicate = await Goal.findOne({
      user: req.user.id,
      goalName,
      _id: { $ne: req.params.id },
    });

    if (duplicate) {
      return res.status(400).json({
        message: "A goal with this name already exists.",
      });
    }

    goal.goalName = goalName;
    goal.targetAmount = targetAmount;
    goal.savedAmount = savedAmount;
    goal.targetDate = targetDate;

    await goal.save();

    res.status(200).json({
      message: "Goal updated successfully.",
      goal,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};
const deleteGoal = async (req, res) => {

  try {

    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found.",
      });
    }

    await goal.deleteOne();

    res.status(200).json({
      message: "Goal deleted successfully.",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};
const addMoney = async (req, res) => {

  try {

    const { amount } = req.body;

    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found.",
      });
    }

    const money = Number(amount);

    if (
      Number.isNaN(money) ||
      money <= 0
    ) {
      return res.status(400).json({
        message: "Invalid amount.",
      });
    }

    if (!/^\d+(\.\d{1,2})?$/.test(money.toString())) {
      return res.status(400).json({
        message: "Maximum 2 decimal places allowed.",
      });
    }

    const remaining =
      goal.targetAmount -
      goal.savedAmount;

    if (money > remaining) {
      return res.status(400).json({
        message:
          "Amount exceeds remaining goal amount.",
      });
    }

    goal.savedAmount += money;

    await goal.save();

    res.status(200).json({
      message: "Money added successfully.",
      goal,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }

};
module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  addMoney,
};