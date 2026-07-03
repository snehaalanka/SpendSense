import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";

import "./Landing.css";

const Landing = () => {

  return (

    <div className="landing-page">

      <Navbar />

      <main>

        <Hero />

        <Features />

      </main>

    </div>

  );

};

export default Landing;