import { useState } from "react";
import { addMoney } from "../../api/goalApi";
import { toast } from "react-toastify";

const AddMoneyModal = ({ goal, onClose, onMoneyAdded }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await addMoney(goal._id, amount, token);

      toast.success("Money Added!");

      onMoneyAdded();
      onClose();

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to add money"
      );
    }
  };

  return (
    <div className="modal-overlay">
      <div className="goal-modal">
        <h2>Add Money</h2>

        <form className="goal-form" onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <div className="modal-buttons">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMoneyModal;