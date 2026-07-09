import { useEffect, useState } from "react";
import GoalCard from "../components/Goals/GoalCard";
import GoalSuggestion from "../components/Goals/GoalSuggestion";
import AddGoalModal from "../components/Goals/AddGoalModel";

import { getGoals } from "../api/goalApi";

import "../components/Goals/Goals.css";

const Goals = () => {

  const [goals, setGoals] = useState([]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {

    try {

      const token = localStorage.getItem("token");

      const data = await getGoals(token);

      setGoals(data);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="goals-page">

      <div className="goals-header">

        <div>

          <h1>Savings Goals</h1>

          <p>Track your goals and achieve them</p>

        </div>

        <button
          className="goal-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Goal
        </button>

      </div>

      {goals.length === 0 ? (

        <p>No goals found.</p>

      ) : (

        goals.map((goal) => (
  <GoalCard
    key={goal._id}
    goal={goal}
    fetchGoals={fetchGoals}
  />
))

      )}

      <GoalSuggestion />

      {showModal && (

        <AddGoalModal
          onClose={() => setShowModal(false)}
          onGoalAdded={fetchGoals}
        />

      )}

    </div>

  );

};

export default Goals;