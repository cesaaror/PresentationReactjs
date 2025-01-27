import React from "react";
import { Navigate } from "react-router-dom";
import ChatWindow from "./ChatWindow";

const ChatPage = ({ user }) => {
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <ChatWindow />
    </div>
  );
};

export default ChatPage;
