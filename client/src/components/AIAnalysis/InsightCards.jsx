const InsightCards = () => {
  return (
    <div className="insight-cards">

      <div className="insight-card">
        <h4>Spending Summary</h4>
        <p>
          You spent <span>36%</span>
          <br />
          of your total budget
          <br />
          on Food.
        </p>
      </div>

      <div className="insight-card">
        <h4>Weekend Spending</h4>
        <p>
          You spend <span>48%</span>
          <br />
          more on weekends
          <br />
          compared to weekdays.
        </p>
      </div>

      <div className="insight-card">
        <h4>Highest Expense Category</h4>
        <p>
          <span>Food</span>
          <br />
          is your highest
          <br />
          expense category.
        </p>
      </div>

    </div>
  );
};

export default InsightCards;