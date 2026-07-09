import {
  Sparkles,
  Tag,
  IndianRupee,
  ShoppingBag,
  CreditCard,
  Save,
} from "lucide-react";

const ExpenseResult = ({ result, onSave, saving }) => {

  if (!result) {
    return null;
  }

  return (
    <div className="ai-result">

      <div className="ai-title">

        <Sparkles size={18}/>

        <span>AI Extracted Details</span>

      </div>

      <div className="result-grid">

        <div className="result-card">

          <Tag size={18}/>

          <div>

            <small>Expense</small>

            <h4>{result.title}</h4>

          </div>

        </div>

        <div className="result-card">

          <IndianRupee size={18}/>

          <div>

            <small>Amount</small>

            <h4>₹{result.amount}</h4>

          </div>

        </div>

        <div className="result-card">

          <ShoppingBag size={18}/>

          <div>

            <small>Category</small>

            <h4>{result.category}</h4>

          </div>

        </div>

        <div className="result-card">

          <CreditCard size={18}/>

          <div>

            <small>Payment</small>

            <h4>{result.paymentMethod}</h4>

          </div>

        </div>

      </div>

      <button
        className="analyze-btn"
        onClick={onSave}
        disabled={saving}
        style={{ marginTop: "24px" }}
      >

        <Save size={18}/>

        {saving ? "Saving..." : "Save Expense"}

      </button>

    </div>
  );

};

export default ExpenseResult;