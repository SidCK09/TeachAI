import React, { useState, useEffect } from "react";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from "@chatscope/chat-ui-kit-react";
import axios from "axios";
import "./Chat.css";

const ChatWindow = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([]); // Reset messages when switching chats
  }, [selectedChat]);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message, direction: "outgoing" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        sessionId: selectedChat.id,
        message,
        contactId: selectedChat.id,
      });

      const botMessage = { sender: "bot", text: response.data.response, direction: "incoming" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMsg = { sender: "bot", text: "Error: Unable to connect", direction: "incoming" };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <MainContainer className="chat-window">
      <ChatContainer>
        <MessageList>
          {messages.map((msg, index) => (
            <Message key={index} model={{ message: msg.text, sentTime: "now", sender: msg.sender, direction: msg.direction }} />
          ))}
        </MessageList>
        <MessageInput placeholder="Type a message..." onSend={sendMessage} />
      </ChatContainer>
    </MainContainer>
  );
};

export default ChatWindow;
