import React, { useState, useEffect } from 'react';
import './AstronomyPicture.css'; // Importar los estilos

const AstronomyPicture = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const API_KEY = "2eIeToVxQDNJ9a7v9CxVTze7UIMh1nvJd7drR5q6";

  // Función para traer las imágenes de los últimos días
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 7); // Últimos 7 días
        
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}`
        );
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching APOD images:", error);
      }
    };

    fetchImages();
  }, []);

  // Funciones para el carrusel
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Descargar imagen
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = images[currentIndex].url;
    link.download = images[currentIndex].title || 'image.jpg';
    link.click();
  };

  // Compartir en redes sociales
  const shareImage = () => {
    const url = images[currentIndex].url;
    const title = images[currentIndex].title;
    const description = images[currentIndex].explanation;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}%0A${description}`;
    window.open(shareUrl, '_blank');
  };

  if (images.length === 0) {
    return <div>Cargando imágenes...</div>;
  }

  return (
    <div className="astronomy-picture">
      <div className="carousel">
        <button onClick={prevImage} className="carousel-button2">{"<"}</button>
        
        <div className="image-container">
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].title}
            className="apod-image"
          />
          <div className="image-info">
            <h3>{images[currentIndex].title}</h3>
            <p><strong>Fecha:</strong> {images[currentIndex].date}</p>
          </div>
          <div className="image-description">
            <p>{images[currentIndex].explanation}</p>
          </div>
        </div>

        <button onClick={nextImage} className="carousel-button2">{">"}</button>
      </div>
      
      <div className="image-actions">
        <button onClick={downloadImage}>Descargar Imagen</button>
        <button onClick={shareImage}>Compartir en Facebook</button>
      </div>
    </div>
  );
};

export default AstronomyPicture;
