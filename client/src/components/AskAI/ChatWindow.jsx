import { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
} from "lucide-react";

const suggestedQuestions = [
  "Where did I spend the most this month?",
  "How can I save ₹5000 this month?",
  "Show my food expenses",
  "Analyze my monthly budget",
];

const ChatWindow = () => {

  const [message, setMessage] = useState("");

  return (

    <div className="chat-card">

      {/* ==========================
          AI INTRO
      ========================== */}

      <div className="ai-intro">

        <div className="ai-avatar">

          <Bot size={34} />

        </div>

        <div className="ai-info">

          <h2>

            SpendSense AI

          </h2>

          <p>

            I'm your personal financial assistant.
            Ask me anything about your expenses,
            savings goals, monthly budgets or
            spending habits.

          </p>

        </div>

      </div>

      {/* ==========================
          Suggested Questions
      ========================== */}

      <div className="suggested-section">

        <h3>

          <Sparkles
            size={18}
            style={{ marginRight: 8 }}
          />

          Suggested Questions

        </h3>

        <div className="question-pills">

          {suggestedQuestions.map((question, index) => (

            <button

              key={index}

              className="question-pill"

              onClick={() => setMessage(question)}

            >

              {question}

            </button>

          ))}

        </div>

      </div>

      {/* ==========================
          CHAT
      ========================== */}

      <div className="chat-messages">

        <div className="user-msg">

          💬 How much did I spend on food this month?

        </div>

        <div className="ai-msg">

          🤖 You spent
          <strong> ₹1,728 </strong>
          on food this month. That's about
          <strong> 32% </strong>
          of your total monthly expenses.

        </div>

        <div className="user-msg">

          💬 Can I save ₹5000 this month?

        </div>

        <div className="ai-msg">

          🤖 Yes! Based on your spending
          pattern, reducing food delivery
          and weekend shopping could help
          you save approximately
          <strong> ₹5,200 </strong>
          this month.

        </div>

      </div>

      {/* ==========================
          INPUT
      ========================== */}

      <div className="chat-input">

        <input

          type="text"

          placeholder="Ask your financial assistant..."

          value={message}

          onChange={(e) =>
            setMessage(e.target.value)
          }

        />

        <button className="send-btn">

          <Send size={20} />

        </button>

      </div>

    </div>

  );

};

export default ChatWindow;