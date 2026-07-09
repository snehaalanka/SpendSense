import {
  TrendingUp,
  CalendarDays,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";

const InsightCards = ({ analysis, loading }) => {

  if (loading || !analysis) {

    return (
      <div className="insight-cards">
        <div className="insight-card">Loading...</div>
        <div className="insight-card">Loading...</div>
        <div className="insight-card">Loading...</div>
      </div>
    );

  }

  const { spendingSummary, weekendSpending, highestCategory } = analysis;

  return (
    <div className="insight-cards">

      {/* Spending Summary */}

      <div className="insight-card">

        <div className="insight-icon">
          <TrendingUp size={28} />
        </div>

        <h4>Spending Summary</h4>

        <div className="insight-value">
          {spendingSummary.percent}%
        </div>

        <p className="insight-description">
          of your monthly budget was spent on
          <strong> {spendingSummary.category || "N/A"}</strong>.
        </p>

        <div className="trend">
          <ArrowUpRight size={16} />
          Based on this month's data
        </div>

      </div>

      {/* Weekend Spending */}

      <div className="insight-card">

        <div className="insight-icon">
          <CalendarDays size={28} />
        </div>

        <h4>Weekend Spending</h4>

        <div className="insight-value">
          {weekendSpending.percent}%
        </div>

        <p className="insight-description">
          of your total spending happened on weekends.
        </p>

        <div className="trend">
          <ArrowUpRight size={16} />
          {weekendSpending.percent > 50
            ? "Weekend spending is high"
            : "Weekend spending is under control"}
        </div>

      </div>

      {/* Highest Category */}

      <div className="insight-card">

        <div className="insight-icon">
          <ShoppingBag size={28} />
        </div>

        <h4>Highest Expense Category</h4>

        <div className="insight-value">
          {highestCategory.name || "N/A"}
        </div>

        <p className="insight-description">
          {highestCategory.name} remains your largest spending category
          this month.
        </p>

        <div className="trend">
          <ArrowUpRight size={16} />
          ₹{highestCategory.amount} spent this month
        </div>

      </div>

    </div>
  );
};

export default InsightCards;