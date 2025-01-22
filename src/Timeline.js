import React from 'react';
import './Timeline.css'; // Asegúrate de crear estilos para darle formato a la cronología

const Timeline = () => {
  const milestones = [
    {
      year: '2018',
      title: 'Primer contacto con la informática',
      description: `Comencé mi aprendizaje en informática con un grado superior en Desarrollo de Aplicaciones 
      Multiplataforma. Aunque enfrenté desafíos económicos y tuve que pausarlo, desarrollé habilidades interpersonales 
      al trabajar en supermercados Eroski.`,
    },
    {
      year: '2022',
      title: 'Retorno al aprendizaje formal',
      description: `Retomé mis estudios en un ciclo formativo en Desarrollo de Páginas Web, aprendiendo tecnologías 
      como HTML, CSS y JavaScript. Este programa despertó mi pasión por el desarrollo web y el aprendizaje continuo.`,
    },
    {
      year: '2022-2023',
      title: 'Aprendizaje autodidacta y proyectos prácticos',
      description: `Me enfoqué en el desarrollo full stack con cursos en plataformas como Platzi, explorando tecnologías 
      como PHP para desarrollo backend y creando proyectos prácticos que aplican conocimientos en contextos reales.`,
    },
    {
      year: '2023',
      title: 'Desarrollo en React y React Native',
      description: `Me introduje en el ecosistema de React y React Native, desarrollando aplicaciones interactivas y 
      móviles nativas con funcionalidades avanzadas.`,
    },
    {
      year: '2023',
      title: 'Certificación en Desarrollo Android Avanzado',
      description: `Completé un curso subvencionado por FUNDAE en desarrollo Android, aprendiendo Java, XML y API REST 
      para el desarrollo avanzado de aplicaciones en Android Studio.`,
    },
    {
      year: '2024',
      title: 'Estudios en Ingeniería Informática',
      description: `Actualmente curso Ingeniería Informática en la plataforma Ilerna, combinando formación, trabajo 
      y proyectos personales para seguir perfeccionando mis habilidades.`,
    },
  ];

  return (
    <div className="timeline">
      <h2 className="timeline-title">Cronología de Aprendizaje</h2>
      <ul className="timeline-list">
        {milestones.map((milestone, index) => (
          <li key={index} className="timeline-item">
            <div className="timeline-year">{milestone.year}</div>
            <div className="timeline-content">
              <h3 className="timeline-item-title">{milestone.title}</h3>
              <p className="timeline-item-description">{milestone.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
