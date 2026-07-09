import { useEffect, useState } from "react";
import {
  Brain,
  CircleCheck,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

import { getGoalsAdvisor } from "../../api/aiApi";

const GoalSuggestion = () => {

  const [advisor, setAdvisor] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchAdvisor();
  }, []);


  const fetchAdvisor = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const data = await getGoalsAdvisor(token);

      setAdvisor(data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }

  };


  if (loading || !advisor) {

    return (
      <div className="goal-suggestion">
        <h3>
          <Brain size={24} />
          AI Savings Advisor
        </h3>
        <p>Loading your savings plan...</p>
      </div>
    );

  }

  return (
    <div className="goal-suggestion">

      <h3>

        <Brain size={24} />

        AI Savings Advisor

      </h3>

      <p>
        Based on your current goals, here's the combined
        savings plan to reach all of them comfortably
        before their target dates.
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

            Save <strong>₹{advisor.perDay}/day</strong>

          </span>

        </div>

        <div className="plan-item">

          <CalendarDays
            size={18}
            color="#2563EB"
          />

          <span>

            Save <strong>₹{advisor.perWeek}/week</strong>

          </span>

        </div>

        <div className="plan-item">

          <TrendingUp
            size={18}
            color="#F59E0B"
          />

          <span>

            Save <strong>₹{advisor.perMonth}/month</strong>

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

            {advisor.successProbability}%

          </span>

        </div>

        <div className="success-bar">

          <div
            className="success-fill"
            style={{ width: `${advisor.successProbability}%` }}
          ></div>

        </div>

      </div>

    </div>
  );
};

export default GoalSuggestion;