import "./FeatureCard.css";

import { ArrowRight } from "lucide-react";

const FeatureCard = ({
  icon,
  title,
  description,
}) => {

  return (

    <div className="feature-card">

      <div className="feature-icon">

        {icon}

      </div>

      <h3>

        {title}

      </h3>

      <p>

        {description}

      </p>

      <button className="feature-link">

        Learn More

        <ArrowRight size={18}/>

      </button>

    </div>

  );

};

export default FeatureCard;