import {
  Brain,
  CircleCheck,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

const GoalSuggestion = () => {
  return (
    <div className="goal-suggestion">

      <h3>

        <Brain size={24} />

        AI Savings Advisor

      </h3>

      <p>
        Based on your current savings pattern, here's the
        recommended plan to reach your goal comfortably
        before the target date.
      </p>

      {/* ======================
          Saving Plan
      ======================= */}

      <div className="saving-plan">

        <div className="plan-item">

          <CircleCheck
            size={18}
            color="#22C55E"
          />

          <span>

            Save <strong>₹230/day</strong>

          </span>

        </div>

        <div className="plan-item">

          <CalendarDays
            size={18}
            color="#2563EB"
          />

          <span>

            Save <strong>₹1,600/week</strong>

          </span>

        </div>

        <div className="plan-item">

          <TrendingUp
            size={18}
            color="#F59E0B"
          />

          <span>

            Save <strong>₹6,900/month</strong>

          </span>

        </div>

      </div>

      {/* ======================
          Success Score
      ======================= */}

      <div className="success-score">

        <div className="success-header">

          <h4>

            Goal Success Probability

          </h4>

          <span>

            88%

          </span>

        </div>

        <div className="success-bar">

          <div className="success-fill"></div>

        </div>

      </div>

    </div>
  );
};

export default GoalSuggestion;