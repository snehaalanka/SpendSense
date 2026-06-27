import "./Features.css";

import FeatureCard from "../FeatureCard/FeatureCard";

import {
Mic,
BrainCircuit,
ChartPie,
PiggyBank
} from "lucide-react";

const Features = () => {

return(

<section className="features">

<h2>

Powerful Features

</h2>

<p className="features-subtitle">

Everything you need to manage your money smarter.

</p>

<div className="feature-grid">

<FeatureCard

icon={<Mic size={38}/>}

title="Voice Entry"

description="Speak naturally and let AI record your expenses."

/>

<FeatureCard

icon={<BrainCircuit size={38}/>}

title="AI Insights"

description="Receive personalized financial suggestions."

/>

<FeatureCard

icon={<ChartPie size={38}/>}

title="Analytics"

description="Visualize your spending with interactive charts."

/>

<FeatureCard

icon={<PiggyBank size={38}/>}

title="Savings Goals"

description="Set savings goals and monitor your progress."

/>

</div>

</section>

)

}

export default Features;