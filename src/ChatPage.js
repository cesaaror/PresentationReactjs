import React from 'react';
import ChatWindow from './ChatWindow';

const ChatPage = ({ user }) => {
  if (!user) {
    return <div>Por favor, inicia sesión para acceder al chat.</div>;
  }

  return (
    <div>
      <h1>Sala de Chat</h1>
      <ChatWindow user={user} />
    </div>
  );
};

export default ChatPage;
