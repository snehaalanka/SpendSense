import { useState } from "react";
import { toast } from "react-toastify";

import {
  Bot,
  Send,
  Sparkles,
} from "lucide-react";

import { sendChatMessage } from "../../api/aiApi";

const suggestedQuestions = [
  "Where did I spend the most this month?",
  "How can I save ₹5000 this month?",
  "Show my food expenses",
  "Analyze my monthly budget",
];

const ChatWindow = () => {

  const token = localStorage.getItem("token");

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [sending, setSending] = useState(false);


  const handleSend = async (textOverride) => {

    const textToSend = (textOverride ?? message).trim();

    if (!textToSend) {
      return;
    }

    const updatedMessages = [
      ...messages,
      { role: "user", content: textToSend },
    ];

    setMessages(updatedMessages);

    setMessage("");

    try {

      setSending(true);

      // history sent to backend excludes the message just added, backend appends it itself

      const data = await sendChatMessage(textToSend, messages, token);

      setMessages([
        ...updatedMessages,
        { role: "assistant", content: data.reply },
      ]);

    } catch (err) {
      console.log(err);
      toast.error("Failed to get a reply.");
    } finally {
      setSending(false);
    }

  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };


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

              onClick={() => handleSend(question)}

              disabled={sending}

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

        {messages.map((msg, index) => (

          <div
            key={index}
            className={msg.role === "user" ? "user-msg" : "ai-msg"}
          >

            {msg.role === "user" ? "💬 " : "🤖 "}
            {msg.content}

          </div>

        ))}

        {sending && (

          <div className="ai-msg">
            🤖 Thinking...
          </div>

        )}

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

          onKeyDown={handleKeyDown}

          disabled={sending}

        />

        <button
          className="send-btn"
          onClick={() => handleSend()}
          disabled={sending}
        >

          <Send size={20} />

        </button>

      </div>

    </div>

  );

};

export default ChatWindow;