const ChatWindow = () => {
  return (
    <div className="chat-card">

      <div className="chat-messages">

        <div className="user-msg">
          How much did I spend on food this month?
        </div>

        <div className="ai-msg">
          You spent ₹1728 on food this month.
        </div>

        <div className="user-msg">
          Can I save ₹5000 this month?
        </div>

        <div className="ai-msg">
          Yes. If you reduce food delivery and
          avoid weekend shopping, you can save
          around ₹5200.
        </div>

      </div>

      <div className="chat-input">

        <input
          type="text"
          placeholder="Ask anything..."
        />

        <button>
          Send
        </button>

      </div>

    </div>
  );
};

export default ChatWindow;