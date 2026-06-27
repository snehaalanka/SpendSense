import InsightCards from "../components/AIAnalysis/InsightCards";
import SavingTips from "../components/AIAnalysis/SavingTips";
import GenerateReport from "../components/AIAnalysis/GenerateReport";

import "../components/AIAnalysis/AIAnalysis.css";

const AIAnalysis = () => {
  return (
    <div className="analysis-page">

      <div className="analysis-header">
        <h1>AI Analysis</h1>
        <p>Insights about your spending</p>
      </div>

      <InsightCards />

      <SavingTips />

      <GenerateReport />

    </div>
  );
};

export default AIAnalysis;