import { useState } from "react";
import { createGoal } from "../../api/goalApi";
import { toast } from "react-toastify";

const AddGoalModal = ({ onClose, onGoalAdded }) => {

  const [goal, setGoal] = useState({
    goalName: "",
    targetAmount: "",
    savedAmount: "",
    targetDate: "",
  });

  const handleChange = (e) => {
    setGoal({
      ...goal,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await createGoal(
        {
          ...goal,
          savedAmount:
            goal.savedAmount || 0,
        },
        token
      );

      toast.success("Goal Added!");

      onGoalAdded();

      onClose();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Unable to save goal"
      );

    }
  };

  return (
    <div className="modal-overlay">

      <div className="goal-modal">

        <h2>Add Goal</h2>

        <form
  className="goal-form"
  onSubmit={handleSubmit}
>

          <input
            type="text"
            name="goalName"
            placeholder="Goal Name"
            value={goal.goalName}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="targetAmount"
            placeholder="Target Amount"
            value={goal.targetAmount}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="savedAmount"
            placeholder="Saved Amount"
            value={goal.savedAmount}
            onChange={handleChange}
          />

          <input
            type="date"
            name="targetDate"
            value={goal.targetDate}
            onChange={handleChange}
            required
          />

          <div className="modal-buttons">

            <button
  type="button"
  className="cancel-modal-btn"
  onClick={onClose}
>
  Cancel
</button>
            <button
  type="submit"
  className="save-modal-btn"
>
  Save Goal
</button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddGoalModal;