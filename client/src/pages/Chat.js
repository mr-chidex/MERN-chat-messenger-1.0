import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Chat = ({ socket }) => {
  const [welcomeUser, setWelcomeUser] = useState("");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const { user } = useSelector((state) => state.loginUser);
  const { groupId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    socket.on("USER_JOINED_ROOM", (data) => {
      if (data.action === "Notify_User") {
        setWelcomeUser(data.payload);
      }

      if (data.action === "Notify_Users") {
        setWelcomeUser(data.payload);
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on("RECIEVED_MESSAGE", (data) => {
      if (data.action === "Notify_Users") {
        setChats((chats) => [...chats, data.payload]);
      }
    });
  }, [socket]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const messageData = {
      username: user?.username,
      message,
      room: groupId,
    };

    await socket.emit("sendMessage", messageData);
    setChats((chats) => [...chats, messageData]);
    setMessage("");
  };

  return (
    <div>
      <h2>{welcomeUser}</h2>
      <div>
        <p>Messages</p>
      </div>

      {chats.map((msg, index) => (
        <p key={index}>{msg.message}</p>
      ))}

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
