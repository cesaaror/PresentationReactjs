import React from 'react';

const MarsTimeline = ({ onSelectDate }) => {
  const importantDates = [
    { date: '2012-08-05', label: 'Curiosity Landing' },
    { date: '2013-05-30', label: 'First Sample Collection' },
    { date: '2015-06-03', label: 'First Drilling Attempt' },
    // Agregar más fechas importantes
  ];

  return (
    <div className="timeline">
      <h3>Fechas Importantes</h3>
      <ul>
        {importantDates.map((item) => (
          <li key={item.date} onClick={() => onSelectDate(item.date)}>
            <span>{item.date}</span> - {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarsTimeline;
