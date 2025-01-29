import React from "react";
import ChatWindow from "./ChatWindow";

const ChatPage = ({ user }) => {
  if (!user) {
    return (
      <div>
        <p>No has iniciado sesión. Por favor, inicia sesión para acceder a la sala de chat.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
     
      <ChatWindow user={user}/>
    </div>
  );
};

export default ChatPage;
