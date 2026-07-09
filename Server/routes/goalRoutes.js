const express = require("express");

const router = express.Router();

const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  addMoney,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");
console.log({
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  addMoney,
  protect,
});

router.post("/", protect, createGoal);

router.get("/", protect, getGoals);

router.put("/:id", protect, updateGoal);

router.delete("/:id", protect, deleteGoal);

router.patch("/:id/add-money", protect, addMoney);

module.exports = router;