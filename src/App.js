import React, { useState, useEffect } from 'react';
import './App.css';
import Globe from "./components/Globe";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [citySelected, setCitySelected] = useState(false);

  const apiKey = '49d54949ba09d88c92f7ca1dc4be89aa';

  useEffect(() => {
    fetchWeatherData();
    updateCurrentTime();

    const interval = setInterval(() => {
      fetchWeatherData();
      updateCurrentTime();
    }, 60000);
    
    return () => {
      clearInterval(interval);
    };
  }, [city]);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const updateCurrentTime = () => {
    const now = new Date();
    const formattedTime = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    setCurrentTime(formattedTime);
  };

  const handleSearch = () => {
    fetchWeatherData();
    updateCurrentTime();
    setCitySelected(true);
  };

  return (
    <div className="App">
      <h1>Weather Station Dashboard</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      {weatherData && weatherData.sys && (
        <div className="weather-details">
          <p className="current-time">{currentTime}</p>
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p className="temperature">{weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>Weather Condition: {weatherData.weather[0].description}</p>
          {weatherData.visibility && (
            <p>Visibility: {weatherData.visibility} meters</p>
          )}
        </div>
      )}
        {citySelected && (
        <>
          <Globe /> {/* Rendering the Globe component */}
        </>
)}
    </div>
  );
}

export default App;
