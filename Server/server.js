const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const goalRoutes = require("./routes/goalRoutes");
const aiRoutes = require("./routes/aiRoutes");   

const app = express();
app.disable("etag");

connectDB();

// UPDATE CORS: Allow requests from both local development and your future production frontend URL
app.use(cors({
    origin: [
        "http://localhost:5173", 
        "https://your-frontend-app.vercel.app" // <-- Replace this with your Vercel URL once deployed
    ],
    credentials: true
}));

app.use(express.json());   

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/ai", aiRoutes);

// FIX PORT: Dynamic platform port fallback to 5000 for local safety
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});