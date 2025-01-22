import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const NasaButton = () => {
  const navigate = useNavigate();

  const openNasaWindow = () => {
    navigate('/Nasa'); // Usa la navegación de React
  };

  return (
    <Button variant="contained" onClick={openNasaWindow}>
      Ir a NASA
    </Button>
  );
};

export default NasaButton;
