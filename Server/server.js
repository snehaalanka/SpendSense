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

const allowedOrigins = [
    "http://localhost:5173",
    "https://spend-sense-sigma-five.vercel.app",
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. Postman, server-to-server)
        if (!origin) return callback(null, true);

        // Allow explicit whitelisted origins
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Allow ANY Vercel preview URL for this project
        // (matches spend-sense-<hash>-snehaalankas-projects.vercel.app pattern)
        if (/^https:\/\/spend-sense-.*\.vercel\.app$/.test(origin)) {
            return callback(null, true);
        }

        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));

app.use(express.json());   

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});