import React from "react";
import ChatWindow from "./ChatWindow";

const ChatPage = ({ user }) => {
  // Permite acceso a la sala de chat, autenticado o no
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ChatWindow user={user || { displayName: "Invitado", uid: "guest" }} />
      {/* Si no hay usuario, pasamos un objeto de usuario invitado */}
    </div>
  );
};

export default ChatPage;
