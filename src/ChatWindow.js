import React, { useEffect, useState, useRef } from "react";
import { db, sendMessage } from "./firebaseService";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import './ChatWindow.css';



const ChatWindow = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [error, setError] = useState(null); // Manejador de errores
  const chatEndRef = useRef(null); // Referencia para hacer scroll automático

  useEffect(() => {
    if (!user) return;

    setLoading(true); // Inicia el estado de carga

    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
        setLoading(false); // Detén la carga cuando se obtienen los mensajes
        scrollToBottom(); // Desplázate automáticamente al final
      },
      (err) => {
        setError("Error al cargar los mensajes. Inténtalo más tarde.");
        console.error("Error al obtener mensajes:", err);
        setLoading(false); // Detén la carga en caso de error
      }
    );

    return () => unsubscribe();
  }, [user]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const messageData = {
      text: newMessage.trim(),
      userId: user.uid,
      userName: user.displayName || "Usuario Anónimo",
    };

    try {
      await sendMessage(messageData);
      setNewMessage(""); // Limpiar el campo de entrada
      scrollToBottom(); // Desplázate automáticamente al final después de enviar
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
      setError("Error al enviar el mensaje. Inténtalo de nuevo.");
    }
  };

  // Función para desplazar automáticamente al final
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

      {loading ? (
        <div className="loading">Cargando mensajes...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
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
          <div ref={chatEndRef} /> {/* Marcador para scroll automático */}
        </div>
      )}

      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          aria-label="Escribir mensaje"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" aria-label="Enviar mensaje">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
