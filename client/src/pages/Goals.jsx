import GoalCard from "../components/Goals/GoalCard";
import GoalSuggestion from "../components/Goals/GoalSuggestion";

import "../components/Goals/Goals.css";

const Goals = () => {
  return (
    <div className="goals-page">

      <div className="goals-header">
        <div>
          <h1>Savings Goals</h1>
          <p>Track your goals and achieve them</p>
        </div>

        <button className="goal-btn">
          + Add Goal
        </button>
      </div>

      <GoalCard />

      <GoalSuggestion />

    </div>
  );
};

export default Goals;