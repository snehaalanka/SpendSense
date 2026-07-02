import { Mic } from "lucide-react";

const VoiceExpense = () => {
  return (
    <div className="expense-card">

      <div className="voice-container">

        <div className="mic-circle">
          <Mic size={52} />
        </div>

        <h2>Voice Expense Entry</h2>

        <p className="voice-description">
          Click the microphone button and describe your expense naturally.
        </p>

        <div className="voice-actions">

          <button className="voice-btn">
            <Mic size={18} />
            Start Recording
          </button>

          <textarea
            placeholder="🎤 Your voice transcript will appear here..."
            rows="6"
          />

        </div>

      </div>

    </div>
  );
};

export default VoiceExpense;