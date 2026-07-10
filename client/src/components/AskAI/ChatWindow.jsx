import { useEffect, useRef, useState } from "react";
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

  const bottomRef = useRef(null);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);


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


  const hasMessages = messages.length > 0;


  // ==========================
  // EMPTY STATE - ChatGPT-style hero
  // ==========================

  if (!hasMessages) {

    return (

      <div className="chat-card chat-empty">

        <div className="chat-empty-icon">
          <Bot size={30} />
        </div>

        <h1 className="chat-empty-title">Ask AI</h1>

        <p className="chat-empty-subtitle">Ask anything about your finances</p>

        <div className="chat-empty-input">

          <input

            type="text"

            placeholder="Ask your financial assistant..."

            value={message}

            onChange={(e) => setMessage(e.target.value)}

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

        <div className="chat-empty-pills">

          {suggestedQuestions.map((question, index) => (

            <button

              key={index}

              className="question-pill"

              onClick={() => handleSend(question)}

              disabled={sending}

            >

              <Sparkles size={14} style={{ marginRight: 6 }} />

              {question}

            </button>

          ))}

        </div>

      </div>

    );

  }


  // ==========================
  // CHAT THREAD - once conversation has started
  // ==========================

  return (

    <div className="chat-card">

      <div className="ai-intro">

        <div className="ai-avatar">
          <Bot size={26} />
        </div>

        <div className="ai-info">
          <h2>SpendSense AI</h2>
        </div>

      </div>

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

        <div ref={bottomRef} />

      </div>

      <div className="chat-input">

        <input

          type="text"

          placeholder="Ask your financial assistant..."

          value={message}

          onChange={(e) => setMessage(e.target.value)}

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