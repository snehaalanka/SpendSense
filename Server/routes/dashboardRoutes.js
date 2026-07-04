const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    getSummary,
    getCategorySummary,
    getWeeklySpending
} = require("../controllers/dashboardController");

router.get("/summary", protect, getSummary);
router.get("/category", protect, getCategorySummary);
router.get("/weekly", protect, getWeeklySpending);
module.exports = router;