import {
  FileText,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const GenerateReport = () => {
  return (
    <div className="report-card">

      <div className="report-content">

        <div className="report-icon">

          <FileText size={34} />

        </div>

        <div className="report-info">

          <h3>

            AI Financial Report

          </h3>

          <p>

            Generate a personalized report containing
            insights about your monthly spending habits,
            financial trends, and AI recommendations.

          </p>

          <div className="report-features">

            <div className="feature-item">

              <CheckCircle2 size={18} />

              <span>Monthly Spending Summary</span>

            </div>

            <div className="feature-item">

              <CheckCircle2 size={18} />

              <span>Category-wise Analysis</span>

            </div>

            <div className="feature-item">

              <CheckCircle2 size={18} />

              <span>AI Saving Suggestions</span>

            </div>

            <div className="feature-item">

              <CheckCircle2 size={18} />

              <span>Budget Performance Report</span>

            </div>

          </div>

        </div>

      </div>

      <button className="report-btn">

        <Sparkles size={18} />

        Generate AI Report

      </button>

    </div>
  );
};

export default GenerateReport;