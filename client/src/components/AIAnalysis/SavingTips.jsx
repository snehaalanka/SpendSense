import {
  Lightbulb,
  CircleCheck,
  ShieldCheck,
} from "lucide-react";

const SavingTips = () => {
  return (
    <div className="tips-card">

      <h3>

        <Lightbulb size={24} />

        AI Saving Tips

      </h3>

      <ul>

        <li>

          <CircleCheck
            size={18}
            color="#22C55E"
          />

          <span>
            Cook at home two more times a week to
            reduce food expenses.
          </span>

        </li>

        <li>

          <CircleCheck
            size={18}
            color="#22C55E"
          />

          <span>
            Reducing food delivery orders could save
            approximately <strong>₹900/month</strong>.
          </span>

        </li>

        <li>

          <CircleCheck
            size={18}
            color="#22C55E"
          />

          <span>
            Spending after 9 PM is higher than usual.
            Consider setting a nightly spending limit.
          </span>

        </li>

      </ul>

      {/* ==========================
          AI HEALTH SCORE
      ========================== */}

      <div className="ai-score">

        <div className="ai-score-header">

          <h4>

            <ShieldCheck
              size={18}
              color="#2563EB"
            />

            Financial Health Score

          </h4>

          <span>

            86 / 100

          </span>

        </div>

        <div className="score-bar">

          <div className="score-fill"></div>

        </div>

      </div>

    </div>
  );
};

export default SavingTips;