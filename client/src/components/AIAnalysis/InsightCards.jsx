import {
  TrendingUp,
  CalendarDays,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";

const InsightCards = () => {
  return (
    <div className="insight-cards">

      {/* Spending Summary */}

      <div className="insight-card">

        <div className="insight-icon">
          <TrendingUp size={28} />
        </div>

        <h4>Spending Summary</h4>

        <div className="insight-value">
          36%
        </div>

        <p className="insight-description">
          of your monthly budget was spent on
          <strong> Food</strong>.
        </p>

        <div className="trend">
          <ArrowUpRight size={16} />
          +8% from last month
        </div>

      </div>

      {/* Weekend Spending */}

      <div className="insight-card">

        <div className="insight-icon">
          <CalendarDays size={28} />
        </div>

        <h4>Weekend Spending</h4>

        <div className="insight-value">
          48%
        </div>

        <p className="insight-description">
          You spend significantly more on weekends
          than on weekdays.
        </p>

        <div className="trend">
          <ArrowUpRight size={16} />
          Weekend spending increased
        </div>

      </div>

      {/* Highest Category */}

      <div className="insight-card">

        <div className="insight-icon">
          <ShoppingBag size={28} />
        </div>

        <h4>Highest Expense Category</h4>

        <div className="insight-value">
          Food
        </div>

        <p className="insight-description">
          Food remains your largest spending category
          this month.
        </p>

        <div className="trend">
          <ArrowUpRight size={16} />
          ₹8,420 spent this month
        </div>

      </div>

    </div>
  );
};

export default InsightCards;