import React, { useState, useEffect } from 'react';
import Modal from 'react-modal'; // Asegúrate de instalar react-modal
import './MarsExplorer.css';
import MarsTimeline from './MarsTimeline';

const MarsExplorer = () => {
  const [photos, setPhotos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [dateFilter, setDateFilter] = useState('');
  const [cameraFilter, setCameraFilter] = useState('');

  const API_KEY = '2eIeToVxQDNJ9a7v9CxVTze7UIMh1nvJd7drR5q6';
  const SOL = 1000; // Día marciano

  useEffect(() => {
    const fetchMarsPhotos = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${SOL}&api_key=${API_KEY}`
        );
        const data = await response.json();
        setPhotos(data.photos);
      } catch (error) {
        console.error("Error fetching Mars photos:", error);
      }
    };

    fetchMarsPhotos();
  }, []);

  // Filtrar fotos por fecha y cámara
  const filteredPhotos = photos.filter((photo) => {
    return (
      (dateFilter ? photo.earth_date === dateFilter : true) &&
      (cameraFilter ? photo.camera.name === cameraFilter : true)
    );
  });

  // Abrir modal
  const openModal = (photo) => {
    setSelectedPhoto(photo);
    setModalIsOpen(true);
  };

  // Cerrar modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <div className="mars-explorer">
      <h2>Exploración de Marte</h2>

      {/* Filtros de búsqueda */}
      <div className="filters">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          placeholder="Filtrar por fecha"
        />
        <select
          value={cameraFilter}
          onChange={(e) => setCameraFilter(e.target.value)}
        >
          <option value="">Filtrar por cámara</option>
          <option value="FHAZ">FHAZ</option>
          <option value="RHAZ">RHAZ</option>
          <option value="MAST">MAST</option>
          <option value="CHEMCAM">CHEMCAM</option>
          {/* Agregar más opciones según las cámaras disponibles */}
        </select>
      </div>

      {/* Galería de fotos */}
      <div className="gallery">
      
     <MarsTimeline onSelectDate={setDateFilter} />

        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="photo-card" onClick={() => openModal(photo)}>
            <img src={photo.img_src} alt="Mars Rover" />
            <p>{photo.camera.name}</p>
            <p>{photo.earth_date}</p>
          </div>
        ))}
      </div>

      {/* Modal de foto */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalles de la foto"
        className="modal"
      >
        {selectedPhoto && (
          <>
            <h3>Detalles de la Foto</h3>
            <img src={selectedPhoto.img_src} alt="Foto de Marte" />
            <p><strong>Fecha de captura:</strong> {selectedPhoto.earth_date}</p>
            <p><strong>Cámara:</strong> {selectedPhoto.camera.name}</p>
            <p><strong>Rover:</strong> {selectedPhoto.rover.name}</p>
            <button onClick={closeModal}>Cerrar</button>
          </>
        )}
      </Modal>
      
      
    </div>
    
  );
  
};

export default MarsExplorer;
