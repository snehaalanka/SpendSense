import { useState } from "react";
import {
  Laptop,
  Brain,
  Wallet,
  PiggyBank,
  Target,
} from "lucide-react";

import { deleteGoal } from "../../api/goalApi";
import AddMoneyModal from "./AddMoneyModel";

const GoalCard = ({ goal, fetchGoals }) => {
  const [showMoneyModal, setShowMoneyModal] = useState(false);

  const target = goal.targetAmount;
  const saved = goal.savedAmount;
  const remaining = target - saved;
  const progress = Math.round((saved / target) * 100);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Delete this goal?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await deleteGoal(goal._id, token);

      fetchGoals();

    } catch (err) {
      console.log(err);
      alert("Unable to delete goal");
    }
  };

  return (
    <>
      <div className="goal-card">

        <div className="goal-top">

          <div className="goal-title">

            <div>
              <h3>{goal.goalName}</h3>

              <p>
                Target{" "}
                {new Date(goal.targetDate).toLocaleDateString(
                  "en-IN",
                  {
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>
            </div>

          </div>

          <span className="goal-status on-track">
            🟡 {goal.status}
          </span>

        </div>

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
            marginTop: 10,
            color: "var(--text-secondary)",
            fontWeight: 600,
          }}
        >
          {progress}% Completed
        </p>

        <div className="goal-prediction">

          <div className="prediction-left">

            <div className="prediction-icon">
              <Brain size={24} />
            </div>

            <div>
              <h4>AI Prediction</h4>

              <p>
                AI features coming soon...
              </p>
            </div>

          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <button
              className="add-money-btn"
              onClick={() => setShowMoneyModal(true)}
            >
              + Add Money
            </button>

            <button
              className="delete-goal-btn"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>

        </div>

      </div>

      {showMoneyModal && (
        <AddMoneyModal
          goal={goal}
          onClose={() => setShowMoneyModal(false)}
          onMoneyAdded={fetchGoals}
        />
      )}
    </>
  );
};

export default GoalCard;