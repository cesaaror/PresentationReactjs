import React, { useEffect, useState, useRef } from "react";
import { db, sendMessage } from "./firebaseService";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import "./ChatWindow.css";

const ChatWindow = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  // Cargar mensajes de Firestore
  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, []);

  // Función para enviar un mensaje
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const messageData = {
      text: newMessage.trim(),
      userId: user.uid,
      userName: user.displayName || "Usuario Anónimo",
      createdAt: new Date(),
    };

    try {
      await sendMessage(messageData);
      setNewMessage(""); // Limpiar el campo de entrada
      scrollToBottom();
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
    }
  };

  // Desplazar automáticamente al final
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
        <div ref={chatEndRef} />
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
