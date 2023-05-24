import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

const api = {
  key: `1422ec8bf755c0a280635dbafe8e1d81`,
  base: `https://api.openweathermap.org/data/2.5/weather?`
}

function App() {
  
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const[weather, setWeather] = useState({})

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords)
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    })

    let apiCall = `${api.base}lat=${lat}&lon=${lon}&appid=${api.key}`;

    fetch(apiCall)
    .then((response) => response.json())
    .then((res) => {
      console.log(res)
      setWeather(res)
    })
  }, [lat, lon])
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <div>
          <h3>{weather.name}</h3>
        </div>

        <p>{weather.weather[0].main}</p>

        <p>{} °C</p>

        <p>Sunny</p>
      </header>
    </div>
  );
}

export default App;
