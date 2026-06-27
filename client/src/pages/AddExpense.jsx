import { useState } from "react";

import ExpenseTabs from "../components/AddExpense/ExpenseTabs";
import ManualExpense from "../components/AddExpense/ManualExpense";
import VoiceExpense from "../components/AddExpense/VoiceExpense";
import QuickExpense from "../components/AddExpense/QuickExpense";
import ExpensePreview from "../components/AddExpense/ExpensePreview";

import "../components/AddExpense/AddExpense.css";

const AddExpense = () => {
  const [activeTab, setActiveTab] = useState("manual");

  return (
    <div className="expense-page">

      <div className="expense-header">
        <h1>Add Expense</h1>
        <p>Choose how you'd like to add your expense.</p>
      </div>

      <ExpenseTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="expense-layout">

        <div className="expense-left">

          {activeTab === "manual" && <ManualExpense />}

          {activeTab === "voice" && <VoiceExpense />}

          {activeTab === "quick" && <QuickExpense />}

        </div>

        <div className="expense-right">
          <ExpensePreview />
        </div>

      </div>

    </div>
  );
};

export default AddExpense;