// ReviewsComponent.js
import React, { useState } from 'react';
import { Button, TextField, Typography, Rating, Snackbar, Box } from '@mui/material';

const ReviewsComponent = ({ user }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = () => {
    if (review && rating > 0) {
      // Aquí puedes enviar la reseña y calificación a tu backend o base de datos
      console.log('Reseña:', review);
      console.log('Calificación:', rating);

      setSnackbarMessage('¡Reseña enviada con éxito!');
      setSnackbarOpen(true);
      setReview('');
      setRating(0);
    } else {
      setSnackbarMessage('Por favor, completa la reseña y asigna una calificación.');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Deja tu reseña
      </Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={(event, newValue) => setRating(newValue)}
        precision={1}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Escribe tu reseña"
        variant="outlined"
        multiline
        rows={4}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Enviar Reseña
      </Button>

      {/* Snackbar de notificación */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ReviewsComponent;
