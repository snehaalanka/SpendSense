const express = require("express");
const multer = require("multer");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getAnalysis,
  getReport,
  extractExpense,
  transcribeAudio,
  getGoalPrediction,
  getGoalsAdvisor,
  chatWithAI,
} = require("../controllers/aiController");

// audio uploads are kept in memory only, forwarded straight to ai-service, never saved to disk

const upload = multer({ storage: multer.memoryStorage() });

router.get("/analysis", protect, getAnalysis);
router.post("/report", protect, getReport);
router.post("/extract-expense", protect, extractExpense);
router.post("/transcribe", protect, upload.single("audio"), transcribeAudio);
router.get("/goal-prediction/:id", protect, getGoalPrediction);
router.get("/goals-advisor", protect, getGoalsAdvisor);
router.post("/chat", protect, chatWithAI);

module.exports = router;