import "./FeatureCard.css";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 1. Import the hook

const FeatureCard = ({ icon, title, description }) => {
  const navigate = useNavigate(); // 2. Initialize the hook

  return (
    <div className="feature-card">
      <div className="feature-icon">
        {icon}
      </div>
      
      <h3>{title}</h3>
      
      <p>{description}</p>
      
      {/* 3. Add the onClick event to trigger navigation */}
      <button 
        className="feature-link" 
        onClick={() => navigate("/register")}
      >
        Learn More
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default FeatureCard;