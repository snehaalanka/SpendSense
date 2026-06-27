import { Pencil, Mic, Keyboard } from "lucide-react";

const ExpenseTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="expense-tabs">

      <button
        className={activeTab === "manual" ? "active" : ""}
        onClick={() => setActiveTab("manual")}
      >
        <Pencil size={18} />
        Manual Entry
      </button>

      <button
        className={activeTab === "voice" ? "active" : ""}
        onClick={() => setActiveTab("voice")}
      >
        <Mic size={18} />
        Voice Input
      </button>

      <button
        className={activeTab === "quick" ? "active" : ""}
        onClick={() => setActiveTab("quick")}
      >
        <Keyboard size={18} />
        Quick Text
      </button>

    </div>
  );
};

export default ExpenseTabs;