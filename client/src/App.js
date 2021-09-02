import { useState } from "react";
import io from "socket.io-client";
import Chats from "./Chats";

const socket = io.connect("http://localhost:5050");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoomHandler = () => {
    if (!username || !room) return;

    socket.emit("joinRoom", { username, room });
  };

  return (
    <div className="App">
      <h1>Join A Chat</h1>
      <input
        type="text"
        placeholder="Name..."
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Romm Id..."
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoomHandler} type="submit">
        Join A Room
      </button>

      <Chats socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;
