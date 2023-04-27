import { useState } from "react";
import socket from "./socket";
import ConnectionState from "./components/ConnectionState";
import Messages from "./components/Messages";
import MyForm from "./components/MyForm";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);

  const onConnect = () => {
    setIsConnected(true);
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const onFooEvent = (value) => {
    setMessages((previous) => [...previous, value]);
  };

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);
  socket.on("backendToFrontend", onFooEvent);

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <MyForm />
      <Messages events={messages} />
    </div>
  );
}

export default App;
