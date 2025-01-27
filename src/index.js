import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ChatPage from './ChatPage';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/chatWindow" element={<ChatPage />} /> {/* Solo renderiza ChatPage */}
      <Route path="/*" element={<App />} /> {/* Renderiza App para todas las demás rutas */}
    </Routes>
  </BrowserRouter>
);
