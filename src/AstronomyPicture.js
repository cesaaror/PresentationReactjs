import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaFacebook, FaDownload, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./AstronomyPicture.css";

const AstronomyPicture = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const API_KEY = "2eIeToVxQDNJ9a7v9CxVTze7UIMh1nvJd7drR5q6";

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 7); // Últimos 7 días

        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}`
        );

        if (!response.ok) throw new Error("Error al obtener datos de la API");

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Datos inesperados de la API");

        setImages(data);
      } catch (error) {
        console.error("Error al obtener imágenes de APOD:", error);
      }
    };

    fetchImages();
  }, []);

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  const downloadImage = () => {
    if (images.length === 0) return;

    const link = document.createElement("a");
    link.href = images[currentIndex].url;
    link.download = images[currentIndex].title || "image.jpg";
    link.click();
  };

  const shareOnFacebook = () => {
    if (images.length === 0) return;

    const url = images[currentIndex].url;
    const title = encodeURIComponent(images[currentIndex].title);
    const description = encodeURIComponent(images[currentIndex].explanation);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}%0A${description}`;

    window.open(shareUrl, "_blank");
  };

  const shareOnWhatsApp = () => {
    if (images.length === 0) return;

    const url = images[currentIndex].url;
    const title = encodeURIComponent(images[currentIndex].title);
    const description = encodeURIComponent(images[currentIndex].explanation);
    const whatsappUrl = `https://api.whatsapp.com/send?text=🌌 *${title}*%0A📅 ${images[currentIndex].date}%0A📝 ${description}%0A🔗 ${url}`;

    window.open(whatsappUrl, "_blank");
  };

  if (images.length === 0) {
    return <div className="loading">Cargando imágenes...</div>;
  }

  return (
    <div className="astronomy-picture">
      <div className="carousel">
        <button onClick={prevImage} className="carousel-button2" aria-label="Imagen anterior">
          <FaArrowLeft />
        </button>

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

        <button onClick={nextImage} className="carousel-button2" aria-label="Imagen siguiente">
          <FaArrowRight />
        </button>
      </div>

      <div className="image-actions">
        <button onClick={downloadImage}>
          <FaDownload /> Descargar Imagen
        </button>
        <button onClick={shareOnFacebook}>
          <FaFacebook /> Compartir en Facebook
        </button>
        <button onClick={shareOnWhatsApp}>
          <FaWhatsapp /> Compartir en WhatsApp
        </button>
      </div>
    </div>
  );
};

export default AstronomyPicture;
