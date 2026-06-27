const GoalCard = () => {
  return (
    <div className="goal-card">

      <h3>Laptop</h3>

      <div className="goal-details">

        <div>
          <span>Target Amount</span>
          <h2>₹70,000</h2>
        </div>

        <div>
          <span>Saved Amount</span>
          <h2>₹28,000</h2>
        </div>

        <div>
          <span>Progress</span>
          <h2>40%</h2>
        </div>

      </div>

      <div className="goal-progress">

        <div
          className="goal-fill"
          style={{ width: "40%" }}
        ></div>

      </div>

    </div>
  );
};

export default GoalCard;