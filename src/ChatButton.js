import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChatButton = ({ user }) => {
  const navigate = useNavigate();

  const openChatWindow = () => {
    if (user) {
      navigate('/chatWindow'); // Navegar a la ruta del chat
    } else {
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
