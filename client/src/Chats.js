import React, { useState, useEffect } from "react";

const Chats = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState([]);

  const sendMessageHandler = async () => {
    if (!message) return;

    const messageData = {
      room,
      author: username,
      message,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    await socket.emit("sendMessage", messageData);
    setChatList((list) => [...list, messageData]);
  };

  useEffect(() => {
    socket.on("recieveMessage", (data) => {
      setChatList((list) => [...list, data.payload.data]);
    });
  }, [socket]);

  return (
    <div>
      <h3>Live Chat</h3>

      <div className="body">
        {chatList?.map((message) => (
          <p key={message.message}>{message.message}</p>
        ))}
      </div>

      <div className="footer">
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Hey..."
        />
        <button type="submit" onClick={sendMessageHandler}>
          &#9658;
        </button>
      </div>
    </div>
  );
};

export default Chats;
