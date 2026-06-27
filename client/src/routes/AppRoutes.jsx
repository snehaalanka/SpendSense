import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddExpense from "../pages/AddExpense.jsx";
import ExpenseHistory from "../pages/ExpenseHistory.jsx";
import AIAnalysis from "../pages/AIAnalysis.jsx";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Goals from "../pages/Goals";
import AskAI from "../pages/AskAI";
import Settings from "../pages/Settings";

import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public */}

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Private Layout */}

        <Route element={<MainLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/add-expense" element={<AddExpense />} />

          <Route path="/expenses" element={<ExpenseHistory />} />

          <Route path="/analysis" element={<AIAnalysis />} />

          <Route path="/goals" element={<Goals />} />

          <Route path="/ask-ai" element={<AskAI />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/settings" element={<Settings />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;