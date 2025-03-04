import React from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import "./Chat.css";

const subjects = [
  { id: 1, name: "English", avatar: "/user-avatar.png", lastMessage: "Grammar basics" },
  { id: 2, name: "Maths", avatar: "/user-avatar.png", lastMessage: "Algebra equations" },
  { id: 3, name: "Science", avatar: "/bot-avatar.png", lastMessage: "Newton's laws" },
  { id: 4, name: "Social", avatar: "/user-avatar.png", lastMessage: "History of WW2" },
];

const ChatList = ({ onSelectChat }) => {
  return (
    <div className="sidebar">
      <h2 className="subject-heading">Subjects</h2>
      <List>
        {subjects.map((subject) => (
          <ListItem key={subject.id} button onClick={() => onSelectChat(subject)} className="contact-item">
            <ListItemAvatar>
              <Avatar src={subject.avatar} />
            </ListItemAvatar>
            <ListItemText primary={subject.name} secondary={subject.lastMessage} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ChatList;