import { useState } from "react";
import {
  Sparkles,
  Pizza,
  IndianRupee,
  UtensilsCrossed,
  CreditCard,
} from "lucide-react";

const QuickExpense = () => {

  const [text,setText] = useState("");

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

        onChange={(e)=>setText(e.target.value)}

      />

      <button className="analyze-btn">

        <Sparkles size={18}/>

        Analyze Expense

      </button>

      <div className="ai-result">

        <div className="ai-title">

          <Sparkles size={18}/>

          <span>AI Extracted Details</span>

        </div>

        <div className="result-grid">

          <div className="result-card">

            <Pizza size={18}/>

            <div>

              <small>Expense</small>

              <h4>Pizza</h4>

            </div>

          </div>

          <div className="result-card">

            <IndianRupee size={18}/>

            <div>

              <small>Amount</small>

              <h4>₹350</h4>

            </div>

          </div>

          <div className="result-card">

            <UtensilsCrossed size={18}/>

            <div>

              <small>Category</small>

              <h4>Food</h4>

            </div>

          </div>

          <div className="result-card">

            <CreditCard size={18}/>

            <div>

              <small>Payment</small>

              <h4>UPI</h4>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default QuickExpense;