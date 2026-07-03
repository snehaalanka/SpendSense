import {
  Laptop,
  Brain,
  Wallet,
  PiggyBank,
  Target,
} from "lucide-react";

const GoalCard = () => {

  const target = 70000;
  const saved = 28000;

  const remaining = target - saved;

  const progress = Math.round((saved / target) * 100);

  return (

    <div className="goal-card">

      {/* =======================
          Header
      ======================== */}

      <div className="goal-top">

        <div className="goal-title">

          <div className="goal-icon">

            <Laptop size={28} />

          </div>

          <div>

            <h3>Laptop</h3>

            <p>Target: December 2026</p>

          </div>

        </div>

        <span className="goal-status on-track">

          🟡 On Track

        </span>

      </div>

      {/* =======================
          Details
      ======================== */}

      <div className="goal-details">

        <div className="goal-item">

          <Target
            size={18}
            color="#2563EB"
          />

          <span>Target Amount</span>

          <h2>

            ₹{target.toLocaleString()}

          </h2>

        </div>

        <div className="goal-item">

          <PiggyBank
            size={18}
            color="#22C55E"
          />

          <span>Saved</span>

          <h2>

            ₹{saved.toLocaleString()}

          </h2>

        </div>

        <div className="goal-item">

          <Wallet
            size={18}
            color="#F59E0B"
          />

          <span>Remaining</span>

          <h2>

            ₹{remaining.toLocaleString()}

          </h2>

        </div>

      </div>

      {/* =======================
          Progress
      ======================== */}

      <div className="goal-progress">

        <div
          className="goal-fill"
          style={{
            width: `${progress}%`,
          }}
        ></div>

      </div>

      <p
        style={{
          marginTop: "10px",
          color: "var(--text-secondary)",
          fontWeight: "600",
        }}
      >

        {progress}% Completed

      </p>

      {/* =======================
          AI Prediction
      ======================== */}

      <div className="goal-prediction">

        <div className="prediction-left">

          <div className="prediction-icon">

            <Brain size={24} />

          </div>

          <div>

            <h4>

              AI Prediction

            </h4>

            <p>

              At your current saving pace,
              you'll achieve this goal in

              <strong>

                {" "}127 days

              </strong>

              by saving

              <strong>

                {" "}₹230/day

              </strong>.

            </p>

          </div>

        </div>

        <button className="add-money-btn">

          + Add Money

        </button>

      </div>

    </div>

  );

};

export default GoalCard;