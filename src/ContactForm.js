import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./ContactForm.css"; // Asegúrate de importar los estilos

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    inquiryType: "general",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.name.trim()) {
      setStatusMessage("⚠️ El nombre es obligatorio.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setStatusMessage("⚠️ Ingresa un correo electrónico válido.");
      return;
    }
    if (!formData.message.trim()) {
      setStatusMessage("⚠️ El mensaje no puede estar vacío.");
      return;
    }

    setIsLoading(true); // Muestra el loader

    const serviceID = "service_5qwbsem"; // Tu Service ID de EmailJS
    const templateID = "template_dkcz3vm"; // Tu Template ID
    const userID = "jKdPGSqMpbZMG6coQ"; // Tu Public Key de EmailJS

    const templateParams = {
      to_name: "César", // El destinatario del correo
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      inquiry_type: formData.inquiryType, // Tipo de consulta
    };

    emailjs.send(serviceID, templateID, templateParams, userID).then(
      (result) => {
        console.log("Correo enviado con éxito:", result.text);
        setStatusMessage("✅ ¡Mensaje enviado con éxito!");
        setShowModal(true); // Muestra el modal de confirmación
      },
      (error) => {
        console.error("Error al enviar el correo:", error.text);
        setStatusMessage("❌ Error al enviar el mensaje. Inténtalo nuevamente.");
      }
    ).finally(() => {
      setIsLoading(false); // Oculta el loader
      setFormData({
        name: "",
        email: "",
        message: "",
        inquiryType: "general",
      });
    });
  };

  return (
    <div className="contact-form-container">
      <h2>Formulario de Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="inquiryType">Tipo de Consulta:</label>
          <select
            id="inquiryType"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            required
          >
            <option value="general">Consulta General</option>
            <option value="business">Consulta de Negocios</option>
            <option value="support">Soporte Técnico</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {statusMessage && <p className="status-message">{statusMessage}</p>}

      {/* Modal de confirmación */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>✅ ¡Mensaje enviado con éxito!</h3>
            <p>Nos pondremos en contacto contigo pronto.</p>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;

