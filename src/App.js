import React, { useEffect, useState } from 'react';
import { Routes, Route} from 'react-router-dom'; 
import './App.css';
import  './darkTheme.css';
import './ChatWindow.css';
import Timeline from './Timeline';
import ContactForm from './ContactForm';
import AstronomyPicture from './AstronomyPicture';
import googleChallengeImage from './assets/google-challenge.png';
import nextJsImage from './assets/nextjs-app.png';
import ChatPage from "./ChatPage";

// Importaciones de componentes y recursos
import Nav from './Nav';
import WeatherWidget from './WeatherWidget';
import AuthComponent from './AuthComponent';
import CommentsSection from './CommentsComponent';
import ReviewsComponent from './ReviewsComponent';
import ChatButton from './ChatButton'; // Asegúrate de usar el archivo correcto


import profileImage from './assets/profile.jpg';
import clima from './assets/clima.webp';
import chat from './assets/chat.webp';

// Librerías de iconos
import { FaJs, FaReact, FaNodeJs, FaHtml5, FaCss3Alt } from 'react-icons/fa';

// Firebase y otros servicios

import { fetchComments } from './firebaseService';
import { auth } from './firebaseService';
import { onAuthStateChanged, signOut } from 'firebase/auth';
// Estado para manejar el tema oscuro o claro




function App() {
  
  const [selectedTech, setSelectedTech] = useState(null); // Tecnología seleccionada
  const [user, setUser] = useState(null); // Estado del usuario
  const [isAboutPopupOpen, setIsAboutPopupOpen] = useState(false); // Popup "Más sobre mí"
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false); // Popup de inicio de sesión
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Función para manejar la activación y desactivación del "Modo Fiesta"
document.addEventListener('keydown', (e) => {
  if (e.key === 'p' && e.ctrlKey) { // Ctrl + P activa el modo Fiesta
    // Alterna la clase 'party-mode' en el body
    document.body.classList.toggle('party-mode');
    
    // Muestra un mensaje de alerta cuando el modo fiesta se activa
    if (document.body.classList.contains('party-mode')) {
      alert('¡Modo Fiesta Activado! 🎉 Presiona Ctrl+ P nuevamente para desactivarlo.');
    }
    
    // Llama a la función para gestionar el GIF y el fondo
    togglePartyGif();
    changeBackground();
  }
});

// Función para mostrar o quitar el GIF
function togglePartyGif() {
  // Verifica si el modo fiesta está activado
  if (document.body.classList.contains('party-mode')) {
    // Crear el GIF si no existe
    let gif = document.querySelector('.party-gif');
    if (!gif) {
      gif = document.createElement('img');
      gif.src = '/tenor.gif';
      gif.className = 'party-gif';  // Asigna la clase para los estilos
      gif.style.position = 'fixed';
      gif.style.bottom = '20px';
      gif.style.right = '20px';
      gif.style.zIndex = '1000';
      gif.style.width = '150px';
      document.body.appendChild(gif);  // Agregar el GIF al body
    }
  } else {
    // Si el modo fiesta se desactiva, elimina el GIF
    const gif = document.querySelector('.party-gif');
    if (gif) gif.remove();
  }
}

// Función para cambiar el fondo cuando se activa o desactiva el "Modo Fiesta"
function changeBackground() {
  if (document.body.classList.contains('party-mode')) {
    // Cambiar el fondo y otros estilos del body
    document.body.style.backgroundColor = '#ff1493';  // Fondo rosa
    document.body.style.transition = 'background-color 0.5s ease';  // Animación de transición suave
  } else {
    // Restaurar el fondo al estado normal
    document.body.style.backgroundColor = '#1e2a78';  // Fondo oscuro original
  }
}




  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  // useEffect para establecer el tema inicial basado en localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
      document.body.classList.add('dark-theme'); // Agrega la clase para tema oscuro
    } else {
      setIsDarkTheme(false);
      document.body.classList.remove('dark-theme'); // Asegura que esté en tema claro
    }
  }, []);

  // useEffect para alternar el tema cada vez que `isDarkTheme` cambie
  useEffect(() => {
    // Guardar el tema en localStorage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');

    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);



  const handleTechClick = (tech) => {
    setSelectedTech(tech);
  };
  
  const togglePopup = (popup) => {
    if (popup === "about") {
      setIsAboutPopupOpen(!isAboutPopupOpen);
    } else if (popup === "login") {
      setIsLoginPopupOpen(!isLoginPopupOpen);
    }
  };
  
  const handleUserLoggedIn = (loggedInUser) => {
    setUser(loggedInUser);
    setIsLoginPopupOpen(false); // Cierra solo el popup de inicio de sesión
  };
  

  // Descripciones de tecnologías con ejemplos de código
const technologyDescriptions = {
  JavaScript: {
    description: "JavaScript es un lenguaje de programación increíblemente versátil y esencial para el desarrollo web...",
    code: `function sumar(a, b) {
  return a + b;
}
const resultado = sumar(3, 4);
console.log("Resultado de la suma:", resultado);`
  },
  React: {
    description: "React es una biblioteca de JavaScript creada por Facebook...",
    code: `import React from 'react';

function Saludo({ nombre }) {
  return <h1>Hola, {nombre}!</h1>;
}

export default function App() {
  return (
    <div>
      <Saludo nombre="Juan" />
    </div>
  );
}`
  },
  Node: {
    description: "Node.js es un entorno de ejecución que lleva JavaScript al lado del servidor...",
    code: `const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hola, Node.js!');
});

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});`
  },
  HTML: {
    description: "HTML es el lenguaje de marcado básico para la creación de páginas web...",
    code: `<html>
<head>
  <title>Mi página web</title>
</head>
<body>
  <h1>¡Hola, mundo!</h1>
  <p>Esta es mi primera página en HTML.</p>
</body>
</html>`
  },
  CSS: {
    description: "CSS es un lenguaje de estilos que permite transformar el HTML en algo visualmente atractivo...",
    code: `body {
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  text-align: center;
}`
  },
  Databases: {
    description: "Las bases de datos son esenciales en cualquier aplicación que maneje datos de manera significativa...",
    code: `// Ejemplo de conexión con MySQL
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mi_base_datos'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Conectado a la base de datos MySQL');
});`
  },
  Java: {
    description: "Java es un lenguaje de programación robusto, maduro y con un enfoque en la orientación a objetos...",
    code: `public class HolaMundo {
  public static void main(String[] args) {
    System.out.println("Hola, mundo en Java!");
  }
}`
  },
  XML: {
    description: "XML es un lenguaje de marcado utilizado principalmente para almacenar y transportar datos...",
    code: `<note>
  <to>Juan</to>
  <from>Maria</from>
  <heading>Recordatorio</heading>
  <body>No olvides la reunión mañana a las 10 AM.</body>
</note>`
  }
};


 

  // Cargar comentarios y verificar autenticación al montar el componente
  useEffect(() => {
    const loadComments = async () => {
      try {
        const fetchedComments = await fetchComments();
        console.log("Comentarios cargados:", fetchedComments);
      } catch (error) {
        console.error("Error al cargar comentarios:", error);
      }
    };

    loadComments(); // Cargar comentarios al montar el componente

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("Usuario autenticado:", currentUser);
        setUser(currentUser);
      } else {
        console.log("Usuario no autenticado");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra la sesión del usuario
      setUser(null); // Limpia el estado del usuario
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const toggleAboutPopup = () => {
    setIsAboutPopupOpen(!isAboutPopupOpen);
  };
 
return ( 
  <div className="app-container">
  <Nav 
    user={user} 
    onUserLoggedIn={handleUserLoggedIn} 
    setIsLoginPopupOpen={setIsLoginPopupOpen}
    isDarkTheme={isDarkTheme} 
    toggleTheme={toggleTheme} 
  />
    

   
    <div className="widgets-container">
      <WeatherWidget />     
      
    </div> 
        
   

      
      {isLoginPopupOpen && !user && <AuthComponent onUserLoggedIn={handleUserLoggedIn} />}
      
      <main className="main-content">      
      
        <section className="intro-section">
          <img src={profileImage} alt="profile" className="profile-image" />
          <div className="text-content">
            <h1>César Augusto Renteria Ortiz</h1>
            <p>Desarrollador Full Stack | HTML, XML, CSS, JavaScript, React...</p>
            <p className="description">
              Especializado en tecnologías modernas y desarrollo integral de aplicaciones...
            </p>
            <button onClick={() => togglePopup("about")}>Obtener Información</button>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
           
</div>


           
          </div>
        </section>

        {/* Popup "Más sobre mí" */}
        {isAboutPopupOpen && (
          <div className="about-popup">
            <div className="popup-content">
              <button className="close-button" onClick={toggleAboutPopup}>X</button>
              <h2>Más sobre mí</h2>
              <p>
                Soy César Augusto Renteria Ortiz, un apasionado desarrollador full stack con experiencia autodidacta
                en tecnologías como Java, XML, HTML, JavaScript, CSS, PHP y WordPress. Actualmente me desempeño en una 
                cadena de supermercados, donde me encargo de la atención al cliente y ventas en el área de carne y 
                charcutería, lo cual me ha permitido desarrollar habilidades interpersonales y de servicio.
              </p>
              <p>
                Con formación en Desarrollo de aplicaciones multiplatadorma, estudiante en ingenieria informatica y una certificación profesional en desarrollo de páginas web, 
                sigo perfeccionando mis conocimientos. Estoy comprometido con el aprendizaje continuo y ansioso por 
                aplicar mis habilidades para enfrentar nuevos retos y contribuir a proyectos tecnológicos innovadores.
              </p>
              <p>
                Estoy listo para aportar con entusiasmo y soluciones a empresas que deseen integrar talento motivado 
                y en crecimiento. ¡Estoy listo para comenzar esta aventura profesional!
              </p>
            </div>
          </div>
        )}
        

        <section className="stats-section">
          <div className="stat">
            <h3>Tecnologías</h3>
            <div className="skills-list">
              <span onClick={() => handleTechClick("JavaScript")}><FaJs /> JavaScript</span>
              <span onClick={() => handleTechClick("React")}><FaReact /> React</span>
              <span onClick={() => handleTechClick("Node")}><FaNodeJs /> Node.js</span>
              <span onClick={() => handleTechClick("HTML")}><FaHtml5 /> HTML</span>
              <span onClick={() => handleTechClick("CSS")}><FaCss3Alt /> CSS</span>
              <span onClick={() => handleTechClick("Databases")}>🏗️ Bases de Datos</span>
              <span onClick={() => handleTechClick("Java")}>☕ Java</span>
              <span onClick={() => handleTechClick("XML")}>📄 XML</span>
            </div>
            {selectedTech && (
          <div className="technology-description">
            <p><strong>{selectedTech}:</strong> {technologyDescriptions[selectedTech].description}</p>
            <pre>
              <code>{technologyDescriptions[selectedTech].code}</code>
            </pre>
          </div>
        )}



          </div>
          

  <div className="stat">
            <h3>Proyectos Destacados</h3>
      <div className="project-gallery">

        <div className="project-card">
            <img src={clima} alt="clima" className="project-image" />
             <p>aplicacion del clima</p>
             <div>
            <h1>Descarga tu APK</h1>
             <a href={`${process.env.PUBLIC_URL}/apk-debug.apk`} download>
            <button>Descargar APK</button>
      </a>     

   </div>  
  </div>  
       
            
               {/* Proyecto Chat */}
        <div className="project-card">
          <img src={chat} alt="Sala de Chat" className="project-image" />
          <p>Sala de Chat</p>
          
          {/* Mostrar botón de chat solo si el usuario está autenticado */}
          <ChatButton user={user} />
          
          {/* Lógica condicional para mostrar el nombre del usuario y botón de logout */}
          {user ? (
            <div>
              <p>Hola, {user.displayName || 'Usuario Anónimo'}</p>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          ) : (
            <p>Inicia sesión para continuar.</p>
          )}
        </div>

      </div>
  </div>
  

          <section className="stat">
            <h3>Reseñas y Valoraciones</h3>
            <div className="reviews-box">
              <h4>Deja una Reseña con Calificación</h4>
              <ReviewsComponent user={user} />
            </div>
            <div className="comments-box">
              <h4>Comentarios</h4>
              <CommentsSection user={user} />
            </div>
          </section>
        </section>
        <section className="learning-timeline">
  <Timeline />
</section>
<section className="apps-section">
  <h3>Explora mis Aplicaciones</h3>
  <div className="apps-gallery">
  {/* Aplicación 1 */}
  <div className="app-card">
  <img src={googleChallengeImage} alt="Google Challenge" className="app-image" />

    <div className="app-content">
      <h4>Google Challenge</h4>
      <p>Una aplicación para retos técnicos utilizando tecnologías modernas.</p>
      <a href="https://google-challenge-chi.vercel.app/" target="_blank" rel="noopener noreferrer">
        <button className="visit-button">Visitar Aplicación</button>
      </a>
    </div>
  </div>

  {/* Aplicación 2 */}
  <div className="app-card">
  <img src={nextJsImage} alt="Aplicación Next.js" className="app-image" />
    <div className="app-content">
      <h4>Aplicación Next.js</h4>
      <p>Proyecto basado en Next.js con funcionalidades avanzadas.</p>
      <a href="https://aplicacionnextjscesar.vercel.app/" target="_blank" rel="noopener noreferrer">
        <button className="visit-button">Visitar Aplicación</button>
      </a>
    </div>
  </div>
</div>
</section>

<div className="Start">  
          
        <h1>Explora el Universo</h1>
        <AstronomyPicture />      
        
          {/* Componente de asteroides cercanos */}

     

      
    
      
</div>



 {/* Componente de formulario de contacto */}
 <section>
        <ContactForm />
      </section>
      </main>

   
    
      <div>
      <Routes>
      <Route path="/chatWindow" element={<ChatPage user={user} />} /> {/* Pasar el usuario */}
        </Routes>
      </div>
    
  
    </div>
    
 
);

}
export default App;






