import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddExpense from "../pages/AddExpense";
import ExpenseHistory from "../pages/ExpenseHistory";
import AIAnalysis from "../pages/AIAnalysis";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Goals from "../pages/Goals";
import AskAI from "../pages/AskAI";
import Settings from "../pages/Settings";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/expenses" element={<ExpenseHistory />} />
          <Route path="/analysis" element={<AIAnalysis />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/ask-ai" element={<AskAI />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/expense-history" element={<ExpenseHistory />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;