import { Container, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Send } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import MenuPopup from "../components/MenuPopup";

const useStyles = makeStyles((theme) => ({
  iconColor: { color: "#fff" },
  buttonColor: { color: "#111" },
}));

const Chat = ({ socket }) => {
  const classes = useStyles();
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
    // <Container component="main" maxWidth="xs">
    <>
      <div className="chat-main">
        <Container component="main" maxWidth="lg">
          <div className="chat-container">
            <header className="chat-header">
              <h3 className="chat-header__title">Chat Room</h3>

              {/* <IconButton className={classes.iconColor}>
                <MoreVert />
              </IconButton> */}
              <MenuPopup />
            </header>

            <div className="chat-content">
              <h2>{welcomeUser}</h2>
              <div>
                <p>Messages</p>
              </div>

              {chats.map((msg, index) => (
                <p key={index}>{msg.message}</p>
              ))}
            </div>

            <form className="chat-form" onSubmit={sendMessage}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <IconButton className={classes.buttonColor} onClick={sendMessage}>
                <Send />
              </IconButton>
            </form>
          </div>
        </Container>
      </div>
    </>
    // </Container>
  );
};

export default Chat;
