const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUserProfile,
} = require("../controllers/authController");

router.get("/profile", protect, getUserProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;