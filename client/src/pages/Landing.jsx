import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <Hero />

      <Features />

    </div>
  );
};

export default Landing;