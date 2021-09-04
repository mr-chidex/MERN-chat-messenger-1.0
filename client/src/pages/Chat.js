import { Container, IconButton } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Send } from "@material-ui/icons";
import FlipMove from "react-flip-move";

import MenuPopup from "../components/MenuPopup";

const Chat = ({ socket }) => {
  const [welcomeUser, setWelcomeUser] = useState("");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const { user } = useSelector((state) => state.loginUser);
  const { groupId } = useParams();
  const endOfMessages = useRef("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToBottomHandler = () => {
    endOfMessages?.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };

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
        scrollToBottomHandler();
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
    scrollToBottomHandler();
  };

  return (
    <div className="chat-main">
      <Container component="main" maxWidth="lg">
        <div className="chat-container">
          <header className="chat-header">
            <h3 className="chat-header__title">{groupId}</h3>

            <MenuPopup />
          </header>

          <div className="chat-content">
            <h2>{welcomeUser}</h2>
            <div>
              <p>Messages</p>
            </div>

            <FlipMove>
              {chats.map((msg, index) => (
                <p key={index}>{msg.message}</p>
              ))}
            </FlipMove>

            <div className="end-of-messages" ref={endOfMessages}></div>
          </div>

          <form className="chat-form" onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <IconButton color="primary" onClick={sendMessage}>
              <Send />
            </IconButton>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Chat;
