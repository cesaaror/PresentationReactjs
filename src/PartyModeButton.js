import React, { useState, useEffect, useCallback } from "react";

const PartyModeButton = () => {
  const [isPartyMode, setIsPartyMode] = useState(false);

  // Función para mostrar o quitar el GIF
  const togglePartyGif = useCallback(() => {
    let gif = document.querySelector(".party-gif");
    if (document.body.classList.contains("party-mode")) {
      if (!gif) {
        gif = document.createElement("img");
        gif.src = "/tenor.gif"; // Ruta del GIF
        gif.className = "party-gif";
        gif.style.position = "fixed";
        gif.style.bottom = "20px";
        gif.style.right = "20px";
        gif.style.zIndex = "1000";
        gif.style.width = "150px";
        document.body.appendChild(gif);
      }
    } else {
      if (gif) gif.remove();
    }
  }, []);

  // Función para cambiar el fondo cuando se activa o desactiva el Modo Fiesta
  const changeBackground = useCallback(() => {
    if (document.body.classList.contains("party-mode")) {
      document.body.style.animation = "partyBackground 3s infinite";
    } else {
      document.body.style.animation = "none";
      document.body.style.backgroundColor = "#1e2a78";
    }
  }, []);

  // Función para mostrar una notificación visual con animación
  const showNotification = useCallback(() => {
    const notification = document.createElement("div");
    notification.className = "party-notification";
    notification.innerText = isPartyMode
      ? "🎉 ¡Modo Fiesta Desactivado!"
      : "🎊 ¡Modo Fiesta Activado!";
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2500);
  }, [isPartyMode]);

  // Alternar modo fiesta
  const togglePartyMode = useCallback(() => {
    document.body.classList.toggle("party-mode");
    setIsPartyMode((prevMode) => !prevMode);
    togglePartyGif();
    changeBackground();
    showNotification();
  }, [togglePartyGif, changeBackground, showNotification]);

  // Escuchar tecla de acceso rápido (Ctrl + P)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "p" && e.ctrlKey) {
        togglePartyMode();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [togglePartyMode]);

  return (
    <button onClick={togglePartyMode} className="party-mode-button">
      {isPartyMode ? "Desactivar Modo Fiesta" : "🎉 Activar Modo Fiesta"}
    </button>
  );
};

export default PartyModeButton;
