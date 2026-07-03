import "./Hero.css";
import Button from "../Common/Buttons";
import landingimage from "../../assets/images/image.svg";
import { Link } from "react-router-dom";
import {
  Sparkles,
  TrendingUp,
  Wallet,
  BrainCircuit,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="hero">
      {/* LEFT */}
      <div className="hero-left">
        <div className="hero-tag">
          <Sparkles size={16} />
          <span>AI Powered Expense Tracking</span>
        </div>
        
        <h1>
          Understand your money.
          <br />
          <span className="highlight">
            Build better financial habits.
          </span>
        </h1>
        
        <p className="hero-description">
          Track expenses, manage budgets,
          analyze spending patterns,
          and receive AI-powered financial
          insights — all in one place.
        </p>
        
        <div className="hero-buttons">
          <Link to="/register">
            <Button text="Get Started" />
          </Link>
          <Button
            text="Learn More"
            variant="secondary"
          />
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="stat-card">
            <TrendingUp size={22} />
            <div>
              <h3>10K+</h3>
              <p>Expenses Tracked</p>
            </div>
          </div>
          
          <div className="stat-card">
            <Wallet size={22} />
            <div>
              <h3>₹12L+</h3>
              <p>Money Managed</p>
            </div>
          </div>
          
          <div className="stat-card">
            <BrainCircuit size={22} />
            <div>
              <h3>AI</h3>
              <p>Smart Insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hero-right">
        <div className="hero-image-card">
          <img
            src={landingimage}
            alt="SpendSense"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;