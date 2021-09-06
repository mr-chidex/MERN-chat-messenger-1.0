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

  //Welcome a new user and notify current users in a room
  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeUser("");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [welcomeUser]);

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
        scrollToBottomHandler();
      }

      if (data.action === "Notify_Users") {
        setWelcomeUser(data.payload);
        scrollToBottomHandler();
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

    if (!message) return;

    const messageData = {
      username: user?.username,
      message,
      room: groupId,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes() +
        ":" +
        new Date(Date.now()).getSeconds(),
    };

    await socket.emit("sendMessage", messageData);
    setChats((chats) => [...chats, messageData]);
    setMessage("");
    scrollToBottomHandler();
  };

  return (
    <div className="chat-main">
      <Container component="main" maxWidth="md">
        <div className="chat-container">
          <header className="chat-header">
            <h3 className="chat-header__title">Room - {groupId}</h3>

            <MenuPopup />
          </header>

          <div className="chat-content-container">
            <div className="chat-content-messages">
              <FlipMove>
                {chats.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg.username === user?.username
                        ? "chat-message-right"
                        : "chat-message-left"
                    }
                  >
                    <p className="chat-message__user">
                      <small>
                        {msg.username === user?.username ? "You" : msg.username}
                      </small>
                    </p>
                    <p>{msg.message}</p>
                    <p className="chat-message__time">
                      <small>{msg.time}</small>
                    </p>
                  </div>
                ))}
              </FlipMove>

              {welcomeUser && (
                <div className="chat-welcome-notify">
                  <small>{welcomeUser}</small>
                </div>
              )}

              <div className="end-of-messages" ref={endOfMessages}></div>
            </div>
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
