import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { BarLoader } from 'react-spinners';
import './index.css';
import axios from "axios";
import { usePromiseTracker } from "react-promise-tracker";
import { trackPromise } from 'react-promise-tracker';

const api = {
  key: `1422ec8bf755c0a280635dbafe8e1d81`,
  base: `https://api.openweathermap.org/data/2.5/weather?`
}

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress &&
    <h1>async call in progress</h1>
  )
}


function App() {
  
  const [weatherData, setWeatherData] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchWeatherData = async () => {  
      try {  
        const pos = await getCurrentLocation();

        const weather = await fetchWeather(pos.coords.latitude, pos.coords.longitude)
        
        setWeatherData(weather)
      } catch (error) {
        console.error("Error fetching weather data:", error)
      }
    }

    fetchWeatherData();
    setIsLoaded(true);
  }, [])

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  const fetchWeather = async (latitude, longitude) => {
    const res = await fetch(`${api.base}lat=${latitude}&lon=${longitude}&appid=${api.key}`);
    const data = await res.json();
    console.log(data)
    return data;
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='container'>
          <h1>How's it looking outside?</h1>
          <div>
            {weatherData ? (
              <div>
                <h5>Currently in {weatherData.name}, the temperature is</h5>
                <h3>{Math.round(weatherData.main.temp - 273.15)} °C.</h3>
                <h5>It's looking like {weatherData.weather[0].description}!</h5>

              </div>
            ) : (
              <BarLoader className='loader' color="#010101" loading={true} />
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;