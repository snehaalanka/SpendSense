import { useState } from "react";
import { toast } from "react-toastify";

import { Sparkles } from "lucide-react";

import { extractExpense } from "../../api/aiApi";
import { addExpense } from "../../api/expenseApi";

import ExpenseResult from "./ExpenseResult";

const QuickExpense = () => {

  const token = localStorage.getItem("token");

  const [text, setText] = useState("");

  const [result, setResult] = useState(null);

  const [analyzing, setAnalyzing] = useState(false);

  const [saving, setSaving] = useState(false);


  const handleAnalyze = async () => {

    if (!text.trim()) {
      toast.error("Please describe your expense first.");
      return;
    }

    try {

      setAnalyzing(true);

      const data = await extractExpense(text, token);

      setResult(data);

    } catch (err) {
      console.log(err);
      toast.error("Failed to analyze expense.");
    } finally {
      setAnalyzing(false);
    }

  };


  const handleSave = async () => {

    try {

      setSaving(true);

      await addExpense(result, token);

      toast.success("Expense added successfully.");

      setText("");
      setResult(null);

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to save expense.");
    } finally {
      setSaving(false);
    }

  };


  return (

    <div className="expense-card">

      <div className="quick-header">

        <h2>Quick Text Analysis</h2>

        <p>
          Describe your expense naturally and let AI extract the details.
        </p>

      </div>

      <textarea

        className="quick-textarea"

        placeholder="Example: Bought Pizza for ₹350 using UPI yesterday evening."

        value={text}

        onChange={(e) => setText(e.target.value)}

        style={{ minHeight: "140px" }}

      />

      <button
        className="analyze-btn"
        onClick={handleAnalyze}
        disabled={analyzing}
      >

        <Sparkles size={18}/>

        {analyzing ? "Analyzing..." : "Analyze Expense"}

      </button>

      <ExpenseResult
        result={result}
        onSave={handleSave}
        saving={saving}
      />

    </div>

  );

};

export default QuickExpense;