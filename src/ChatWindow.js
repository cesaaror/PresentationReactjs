import React, { useEffect, useState } from "react";
import { db, sendMessage } from "./firebaseService";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import "./ChatWindow.css";

const ChatWindow = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Escuchar cambios en la colección 'messages' en tiempo real
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const messageData = {
      text: newMessage,
      userId: user.uid,
      userName: user.displayName || "Usuario Anónimo",
    };

    try {
      await sendMessage(messageData);
      setNewMessage(""); // Limpiar el campo de entrada
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  if (!user) {
    return (
      <div className="chat-window">
        <p>Por favor, inicia sesión para acceder al chat.</p>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Sala de Chat</h2>
        <p>Conectado como: {user.displayName || "Usuario Anónimo"}</p>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              message.userId === user.uid ? "own-message" : "other-message"
            }`}
          >
            <strong>{message.userName}:</strong>
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ChatWindow;
