import React from 'react';
import ChatWindow from './ChatWindow'; // Importa tu componente de chat real

const ChatPage = ({ user }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <ChatWindow user={user} />
    </div>
  );
};

export default ChatPage;
