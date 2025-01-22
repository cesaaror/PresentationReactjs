// NasaPage.js
import React from 'react';
import Nasa from './Nasa';
 // Asegúrate de tener el componente Nasa importado

const NasaPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', overflow: 'auto' }}>
      <Nasa />
    </div>
  );
};

export default NasaPage;
