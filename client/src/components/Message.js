import React from "react";

const Message = ({ username, user, message, time }) => {
  return (
    <div
      className={username === user ? "chat-message-right" : "chat-message-left"}
    >
      <p className="chat-message__user">
        <small>{username === user ? "You" : username}</small>
      </p>
      <p>{message}</p>
      <p className="chat-message__time">
        <small>{time}</small>
      </p>
    </div>
  );
};

export default Message;
