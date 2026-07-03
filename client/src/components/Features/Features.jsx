import "./Features.css";
import FeatureCard from "../FeatureCard/FeatureCard";
import { Mic, BrainCircuit, ChartPie, PiggyBank } from "lucide-react";

const Features = () => {
  return (
    <section className="features" id="features">
      
      {/* Header Area */}
      <div className="section-header">
        <span className="section-tag">
          Why SpendSense?
        </span>
        <h2>
          Powerful Features for
          <span> Smarter Finance</span>
        </h2>
        <p className="features-subtitle">
          Everything you need to manage expenses,
          analyze spending, and build healthier
          financial habits with AI.
        </p>
      </div>

      {/* Grid Area */}
      <div className="feature-grid">
        <FeatureCard
          icon={<Mic size={36} />}
          title="Voice Expense Entry"
          description="Simply speak naturally and let AI automatically record and categorize your expenses."
        />

        <FeatureCard
          icon={<BrainCircuit size={36} />}
          title="AI Insights"
          description="Receive intelligent spending analysis and personalized financial recommendations."
        />

        <FeatureCard
          icon={<ChartPie size={36} />}
          title="Interactive Analytics"
          description="Visualize your financial habits using beautiful charts and detailed reports."
        />

        <FeatureCard
          icon={<PiggyBank size={36} />}
          title="Savings Goals"
          description="Set savings targets, monitor progress and receive AI suggestions to achieve them faster."
        />
      </div>
      
    </section>
  );
};

export default Features;