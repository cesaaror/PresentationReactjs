import React, { useState } from 'react';
import emailjs from 'emailjs-com'; // Import emailjs

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    inquiryType: 'general',
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Use your actual EmailJS service ID and user ID here
    const serviceID = 'service_5qwbsem';  // Your Service ID
    const templateID = 'template_dkcz3vm'; // Your Template ID
    const userID = 'user_abcxyz'; // Your EmailJS User ID (replace with your actual User ID)

    const templateParams = {
      to_name: 'César', // Name of the recipient (you can change it)
      from_name: formData.name, // Sender's name from the form
      from_email: formData.email, // Sender's email from the form
      message: formData.message, // Message content
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then(
        (result) => {
          console.log(result.text);
          setStatusMessage('¡Mensaje enviado con éxito! 🎉'); // Success message
        },
        (error) => {
          console.log(error.text);
          setStatusMessage('Hubo un problema al enviar el mensaje. Por favor, intenta nuevamente.');
        }
      );

    // Clear the form data after submission
    setFormData({
      name: '',
      email: '',
      message: '',
      inquiryType: 'general',
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

        <button type="submit" className="submit-button">Enviar</button>
      </form>

      {/* Display the status message after form submission */}
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default ContactForm;
