import "../../styles/InsightCard.css";

import {
  Sparkles,
  TrendingUp,
  PiggyBank,
  ArrowRight,
} from "lucide-react";

const InsightCard = () => {
  return (
    <div className="insight-card">

      <div className="insight-title">

        <Sparkles size={20} />

        <h2>Today's Insight</h2>

      </div>

      <div className="main-insight">

        <div className="vertical-line"></div>

        <div className="insight-items">

          <div className="insight-row">

            <span>💰</span>

            <p>
              You spent <strong>₹600</strong> yesterday.
            </p>

          </div>

          <div className="divider"></div>

          <div className="insight-row">

            <span>📈</span>

            <p>
              Food spending increased by <strong>18%</strong>.
            </p>

          </div>

          <div className="divider"></div>

          <div className="insight-row">

            <span>🎯</span>

            <p>
              Weekend spending is usually higher.
            </p>

          </div>

        </div>

      </div>

      <div className="insight-grid">

        <div className="mini-card">

          <TrendingUp className="mini-icon" size={22} />

          <h3>Spending Trend</h3>

          <p>Your expenses are under control.</p>

        </div>

        <div className="mini-card">

          <PiggyBank className="mini-icon" size={22} />

          <h3>Saving Tip</h3>

          <p>Reduce food delivery by ₹500 this week.</p>

        </div>

      </div>

      <button className="analysis-btn">

        View Full Analysis

        <ArrowRight size={18} />

      </button>

    </div>
  );
};

export default InsightCard;