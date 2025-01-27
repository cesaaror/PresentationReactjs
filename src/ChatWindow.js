import React, { useEffect, useState, useRef } from "react";
import { db, sendMessage, auth } from "./firebaseService";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import './ChatWindow.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null); // Usuario autenticado
  const [error, setError] = useState(null); // Estado para manejar errores
  const chatEndRef = useRef(null); // Referencia para scroll automático

  // Verificar el estado del usuario autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setError(null); // Limpia el error si el usuario está autenticado
      } else {
        setUser(null);
        setError("No has iniciado sesión. Por favor, inicia sesión."); // Establece el error si no hay usuario
      }
    });

    return () => unsubscribe();
  }, []);

  // Suscribirse a los mensajes en Firestore
  useEffect(() => {
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
        setError(null); // Limpia el error si la suscripción es exitosa
        scrollToBottom();
      },
      (err) => {
        console.error("Error al obtener mensajes:", err);
        setError("Error al cargar los mensajes. Inténtalo más tarde.");
      }
    );

    return () => unsubscribe();
  }, []);

  // Función para enviar un mensaje
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) {
      setError("El mensaje no puede estar vacío.");
      return;
    }

    if (!user) {
      setError("Debes iniciar sesión para enviar mensajes.");
      return;
    }

    const messageData = {
      text: newMessage.trim(),
      userId: user.uid,
      userName: user.displayName || "Usuario Anónimo",
      createdAt: new Date(),
    };

    try {
      await sendMessage(messageData);
      setNewMessage(""); // Limpia el campo de entrada
      setError(null); // Limpia el error si el envío fue exitoso
      scrollToBottom();
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
      setError("No se pudo enviar el mensaje. Inténtalo de nuevo.");
    }
  };

  // Desplazar automáticamente al final
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Mostrar mensajes condicionalmente si hay un error
  if (!user) {
    return (
      <div className="chat-window">
        <p>{error || "Por favor, inicia sesión para acceder al chat."}</p>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Sala de Chat</h2>
        <p>Conectado como: {user.displayName || "Usuario Anónimo"}</p>
      </div>

      {error && <div className="error-message">{error}</div>}

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
        <div ref={chatEndRef}></div>
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

