import React from 'react';
import { Button } from '@mui/material';


const ChatButton = ({ user }) => {
 

  // Función que se ejecuta al hacer clic en el botón
  const openChatWindow = () => {
    if (user) {

      window.open('/chatWindow', '_blank');
    } else {
      // Si el usuario no está logeado, muestra un mensaje de error o un modal
      alert('Por favor, inicia sesión para acceder al chat.');
    }
  };

  return (
    <Button variant="contained" onClick={openChatWindow}>
      Ir a la Sala de Chat
    </Button>
  );
};

export default ChatButton;
