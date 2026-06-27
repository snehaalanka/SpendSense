import "./Hero.css";
import Button from "../Common/Buttons";
import landingimage from "../../assets/images/image.svg"
import { Link } from "react-router-dom";

const Hero = () => {
  return (

<section className="hero">

<div className="hero-left">

<p className="hero-tag">

AI Powered Expense Tracking

</p>

<h1>
  Understand your money.
  <br />
  <span className="highlight">
    Build better habits.
  </span>
</h1>

<p className="hero-description">

Track your daily expenses, manage budgets,
save smarter, and receive AI-powered financial insights.

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

</div>

<div className="hero-right">

<div className="hero-circle">
   <img src={landingimage} alt="SpendSense Hero" />
</div>

</div>

</section>

  );
};

export default Hero;