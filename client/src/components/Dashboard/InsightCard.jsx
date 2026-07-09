import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/InsightCard.css";

import {
  Sparkles,
  TrendingUp,
  PiggyBank,
  ArrowRight,
} from "lucide-react";

import { getDashboardInsight } from "../../api/aiApi";

const InsightCard = () => {

  const navigate = useNavigate();

  const [insight, setInsight] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsight();
  }, []);

  const fetchInsight = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const data = await getDashboardInsight(token);

      setInsight(data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }

  };

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
              {loading || !insight ? (
                "Loading..."
              ) : (
                <>
                  You spent <strong>₹{insight.yesterdaySpent}</strong> yesterday.
                </>
              )}
            </p>

          </div>

          <div className="divider"></div>

          <div className="insight-row">

            <span>📈</span>

            <p>
              {loading || !insight ? "Loading..." : insight.categoryTrendText}
            </p>

          </div>

          <div className="divider"></div>

          <div className="insight-row">

            <span>🎯</span>

            <p>
              {loading || !insight ? "Loading..." : insight.weekendInsightText}
            </p>

          </div>

        </div>

      </div>

      <div className="insight-grid">

        <div className="mini-card">

          <TrendingUp className="mini-icon" size={22} />

          <h3>Spending Trend</h3>

          <p>
            {loading || !insight ? "Loading..." : insight.spendingTrendLabel}
          </p>

        </div>

        <div className="mini-card">

          <PiggyBank className="mini-icon" size={22} />

          <h3>Saving Tip</h3>

          <p>
            {loading || !insight ? "Loading..." : insight.savingTip}
          </p>

        </div>

      </div>

      <button
        className="analysis-btn"
        onClick={() => navigate("/analysis")}
      >

        View Full Analysis

        <ArrowRight size={18} />

      </button>

    </div>
  );
};

export default InsightCard;