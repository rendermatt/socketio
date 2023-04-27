import React from "react";

const ConnectionState = ({ isConnected }) => {
  return <p>State: {isConnected ? "connected" : "disconnected"}</p>;
};

export default ConnectionState;
