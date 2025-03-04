import React from "react";
import "./Chat.css";

const ChatBubble = ({ sender, message, timestamp }) => {
  return (
    <div className={`chat-bubble ${sender}`}>
      {sender === "bot" && <img className="avatar" src="/bot-avatar.png" alt="Bot" />}
      <div className="message-content">
        <p className="message-text">{message}</p>
        <span className="timestamp">{timestamp}</span>
      </div>
      {sender === "user" && <img className="avatar" src="/user-avatar.png" alt="User" />}
    </div>
  );
};

export default ChatBubble;
