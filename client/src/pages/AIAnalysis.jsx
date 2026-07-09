import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import InsightCards from "../components/AIAnalysis/InsightCards";
import SavingTips from "../components/AIAnalysis/SavingTips";
import GenerateReport from "../components/AIAnalysis/GenerateReport";

import { getAnalysis } from "../api/aiApi";

import "../components/AIAnalysis/AIAnalysis.css";

const AIAnalysis = () => {

  const token = localStorage.getItem("token");

  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchAnalysis();
  }, []);


  const fetchAnalysis = async () => {

    try {

      setLoading(true);

      const data = await getAnalysis(token);

      setAnalysis(data);

    } catch (err) {
      console.log(err);
      toast.error("Failed to load AI analysis.");
    } finally {
      setLoading(false);
    }

  };


  return (
    <div className="analysis-page">

      <div className="analysis-header">
        <h1>AI Analysis</h1>
        <p>Insights about your spending</p>
      </div>

      <InsightCards analysis={analysis} loading={loading} />

      <SavingTips analysis={analysis} loading={loading} />

      <GenerateReport />

    </div>
  );
};

export default AIAnalysis;