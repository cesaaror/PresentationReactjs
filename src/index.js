import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot en lugar de ReactDOM.render
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ChatPage from './ChatPage';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // Crea una instancia de createRoot

if (window.location.pathname === '/chatWindow') {
  // Renderiza solo ChatPage para la ruta /chatWindow
  root.render(
    <BrowserRouter>
      <ChatPage />
    </BrowserRouter>
  );
} else {
  // Renderiza la aplicación completa para otras rutas
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
