import React, { useState, useRef, useEffect } from "react";
import { 
  Box, 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  TextField, 
  IconButton, 
  Typography 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import EmojiPicker from "emoji-picker-react"; // Make sure you've installed this
import "./Chat.css";
import { users } from "../data";
import axios from "axios";
import API_BASE_URL from "../config"; // Import backend URL

const ChatApp = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !activeChat) return;
    setMessages((prev) => ({
      ...prev,
      [activeChat.name]: [
        ...(prev[activeChat.name] || []),
        { text: message, sender: "user" },
      ],
    }));
    const currentMsg = message;
    setMessage("");
    try {
      const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        sessionId: activeChat.name,
        message: currentMsg,
        contactId: activeChat.id,
      });
      setMessages((prev) => ({
        ...prev,
        [activeChat.name]: [
          ...(prev[activeChat.name] || []),
          { text: response.data.response, sender: "bot" },
        ],
      }));
    } catch (error) {
      setMessages((prev) => ({
        ...prev,
        [activeChat.name]: [
          ...(prev[activeChat.name] || []),
          { text: "Error: Unable to connect.", sender: "bot" },
        ],
      }));
    }
  };

  // Called when an emoji is clicked
  const onEmojiClick = (emojiData, event) => {
    setMessage(message + emojiData.emoji);
  };

  // Close emoji picker when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <Box className="chat-container">
      {/* Sidebar */}
      <Box className="sidebar" style={{ width: isSidebarOpen ? "280px" : "0" }}>
        <Box className="sidebar-content">
          <Box className="sidebar-header">
            <IconButton onClick={toggleSidebar} className="sidebar-toggle">
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="h6" className="sidebar-title">
              Chats
            </Typography>
          </Box>
          <List>
            {users.map((user) => (
              <ListItem
                button
                key={user.id}
                onClick={() => setActiveChat(user)}
                className={`contact-item ${activeChat?.id === user.id ? "active" : ""}`}
              >
                <ListItemAvatar>
                  <Avatar src={user.avatar} />
                </ListItemAvatar>
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Floating Toggle Button when Sidebar is collapsed */}
      {!isSidebarOpen && (
        <Box className="sidebar-collapsed-toggle">
          <IconButton onClick={toggleSidebar}>
            <MenuIcon />
          </IconButton>
        </Box>
      )}

      {/* Chat Window */}
      <Box
        className="chat-window"
        style={{ width: isSidebarOpen ? "calc(100% - 280px)" : "100%" }}
      >
        <Typography variant="h6" className="chat-header">
          {activeChat ? activeChat.name : "Select a Chat"}
        </Typography>
        <Box className="chat-messages">
          {(activeChat && messages[activeChat.name]
            ? messages[activeChat.name]
            : []
          ).map((msg, index) => (
            <Box
              key={index}
              className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
            >
              {msg.text}
            </Box>
          ))}
        </Box>
        <Box className="input-container" style={{ position: "relative" }}>
          <IconButton onClick={() => setShowEmojiPicker((prev) => !prev)}>
            <EmojiEmotionsIcon />
          </IconButton>
          {showEmojiPicker && (
            <Box ref={emojiPickerRef} className="emoji-picker">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </Box>
          )}
          <TextField
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="message-input"
          />
          <IconButton className="send-button" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatApp;
