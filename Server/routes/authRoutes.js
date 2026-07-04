const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
  changePassword,
} = require("../controllers/authController");


router.get("/profile", protect, getUserProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);
module.exports = router;