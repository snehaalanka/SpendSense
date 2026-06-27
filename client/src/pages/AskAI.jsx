import ChatWindow from "../components/AskAI/ChatWindow";

import "../components/AskAI/AskAI.css";

const AskAI = () => {
  return (
    <div className="ask-page">

      <div className="ask-header">
        <h1>Ask AI</h1>
        <p>Ask anything about your finances</p>
      </div>

      <ChatWindow />

    </div>
  );
};

export default AskAI;