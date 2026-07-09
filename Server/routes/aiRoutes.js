const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { getAnalysis, getReport } = require("../controllers/aiController");

router.get("/analysis", protect, getAnalysis);
router.post("/report", protect, getReport);

module.exports = router;