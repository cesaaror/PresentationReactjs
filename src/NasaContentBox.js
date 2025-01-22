import React from 'react';
import './NasaContentBox.css'; // Estilos del contenedor

const NasaContentBox = ({ children }) => {
  return (
    <div className="nasa-content-box">
      {children}
    </div>
  );
};

export default NasaContentBox;
