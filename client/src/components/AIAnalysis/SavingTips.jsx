import {
  Lightbulb,
  CircleCheck,
  ShieldCheck,
} from "lucide-react";

const SavingTips = ({ analysis, loading }) => {

  if (loading || !analysis) {

    return (
      <div className="tips-card">
        <h3>
          <Lightbulb size={24} />
          AI Saving Tips
        </h3>
        <p>Loading tips...</p>
      </div>
    );

  }

  const { savingTips, healthScore } = analysis;

  return (
    <div className="tips-card">

      <h3>

        <Lightbulb size={24} />

        AI Saving Tips

      </h3>

      <ul>

        {savingTips.map((tip, index) => (

          <li key={index}>

            <CircleCheck
              size={18}
              color="#22C55E"
            />

            <span>{tip}</span>

          </li>

        ))}

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

            {healthScore} / 100

          </span>

        </div>

        <div className="score-bar">

          <div
            className="score-fill"
            style={{ width: `${healthScore}%` }}
          ></div>

        </div>

      </div>

    </div>
  );
};

export default SavingTips;