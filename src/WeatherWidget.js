// WeatherWidget.js
import React, { useEffect, useState, useCallback } from 'react';

function WeatherWidget() {
  const [location, setLocation] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState('');
  const [windSpeed, setWindSpeed] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = '1bba1e9306568ffaf6b63f9c450498ce';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setTemperature(data.main.temp);
      setLocation(data.name);
      setDescription(getFriendlyDescription(data.weather[0].description));
      setWindSpeed(data.wind.speed);
      setHumidity(data.main.humidity);
      setSunrise(new Date(data.sys.sunrise * 1000).toLocaleTimeString());
      setSunset(new Date(data.sys.sunset * 1000).toLocaleTimeString());
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos climáticos:', error);
      setError('No se pudo obtener el clima. Verifica tu conexión a Internet.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        () => {
          setError('No se pudo obtener la ubicación. Habilita los permisos de geolocalización.');
          setLoading(false);
        }
      );
    } else {
      setError('La geolocalización no está soportada por este navegador.');
      setLoading(false);
    }
  }, [fetchWeather]);

  const getFriendlyDescription = (description) => {
    const descriptionsMap = {
      'clear sky': 'Cielo despejado',
      'few clouds': 'Pocas nubes',
      'scattered clouds': 'Nubes dispersas',
      'broken clouds': 'Nubes rotas',
      'shower rain': 'Lluvias ligeras',
      'rain': 'Lluvia',
      'thunderstorm': 'Tormenta',
      'snow': 'Nieve',
      'mist': 'Neblina',
    };
    return descriptionsMap[description] || 'Condiciones climáticas';
  };

  return (
    <div className="weather-widget">
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="weather-info">
          <div className="location-temp">
            <h2>{location}</h2>
            <p className="temperature">{temperature !== null ? `${temperature}°C` : 'N/A'}</p>
            <p className="description">{description}</p>
          </div>
          <div className="divider"></div>
          <div className="additional-info">
            <p>Viento: {windSpeed !== null ? `${windSpeed} m/s` : 'N/A'}</p>
            <p>Humedad: {humidity !== null ? `${humidity}%` : 'N/A'}</p>
            <p>Amanecer: {sunrise || 'N/A'}</p>
            <p>Anochecer: {sunset || 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;
