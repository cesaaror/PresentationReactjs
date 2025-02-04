import React from "react";
import { Button } from "@mui/material";

const ChatButton = ({ user }) => {
  const openChatWindow = () => {
    if (user) {
      window.location.href = "https://chatnextjs-eight.vercel.app/"; // 🔥 Redirige a la app en Vercel
    } else {
      alert("Por favor, inicia sesión para acceder al chat.");
    }
  };

  return (
    <Button 
      variant="contained" 
      onClick={openChatWindow}
      disabled={!user} // 🔥 Deshabilita el botón si el usuario no está autenticado
    >
      Ir a la Sala de Chat
    </Button>
  );
};

export default ChatButton;
