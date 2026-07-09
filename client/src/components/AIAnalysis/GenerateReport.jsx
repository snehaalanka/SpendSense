import { useState } from "react";
import { toast } from "react-toastify";

import {
  FileText,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { generateReport } from "../../api/aiApi";

const GenerateReport = () => {

  const token = localStorage.getItem("token");

  const [report, setReport] = useState("");

  const [generating, setGenerating] = useState(false);


  const handleGenerate = async () => {

    try {

      setGenerating(true);

      const data = await generateReport(token);

      setReport(data.report);

    } catch (err) {
      console.log(err);
      toast.error("Failed to generate report.");
    } finally {
      setGenerating(false);
    }

  };


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

          {report && (

            <p style={{ marginTop: "18px", whiteSpace: "pre-line" }}>
              {report}
            </p>

          )}

        </div>

      </div>

      <button
        className="report-btn"
        onClick={handleGenerate}
        disabled={generating}
      >

        <Sparkles size={18} />

        {generating ? "Generating..." : "Generate AI Report"}

      </button>

    </div>
  );
};

export default GenerateReport;