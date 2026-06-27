import { useState } from "react";

const QuickExpense = () => {
  const [text, setText] = useState("");

  return (
    <div className="expense-card">

      <h2>Quick Text Analysis</h2>

      <p className="quick-text-description">
        Type your expense naturally and let AI extract the details.
      </p>

      <textarea
        className="quick-textarea"
        rows="7"
        placeholder="Example: Bought pizza for ₹350 using UPI."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="analyze-btn">
        Analyze with AI
      </button>

      <div className="ai-result">

        <h3>Extracted Details</h3>

        <div className="result-item">
          <span>Expense</span>
          <strong>Pizza</strong>
        </div>

        <div className="result-item">
          <span>Amount</span>
          <strong>₹350</strong>
        </div>

        <div className="result-item">
          <span>Category</span>
          <strong>Food</strong>
        </div>

        <div className="result-item">
          <span>Payment</span>
          <strong>UPI</strong>
        </div>

      </div>

    </div>
  );
};

export default QuickExpense;