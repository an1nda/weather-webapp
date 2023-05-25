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
const headwear = ['a baseball cap', 'sunglasses',
                  'a bucket hat', 'a beanie', 'earmuffs',
                  'a hood', 'toque']
const outerwear = ['a vest,', 'a hoodie,', 'a windbreaker,',
                  'a bubble jacket,', 'a winter jacket,']
const top = ['a tank top,' ,'a t-shirt,', 'a polo shirt,',
             'a sweater,', 'a long sleeve shirt,']
const bot = ['shorts,', 'cargo pants,', 'sweatpants,',
              'khakis,', 'thick sweatpants,', 'jeans,']
const feet = ['and flip flops.', 'and sandals.', 'and runners.', 
              'and sneakers.','and rain boots.', 'and snow boots.']

const starter = ["You should wear ",
                "A perfect outfit for today would be ",
                "A lovely combination for today would be ",
                "Today is the perfect day to wear ",
                "The outfit of the day is ",
                "Now is the time to wear ",
                "Outfit of the day starts with "]

function App() {
  
  const [weatherData, setWeatherData] = useState(null)

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

  const getTemperatureResponse = () => {
    if (weatherData && weatherData.main && weatherData.main.temp) {
      const temp = Math.round(weatherData.main.temp-273.15);
      const condition = weatherData.weather[0].id / 100;
      const severity = 
        weatherData.weather[0].description.includes("heavy") ||
        weatherData.weather[0].description.includes("extreme") ||
        weatherData.weather[0].description.includes("heavy");

      if(severity){
        return(
          <h2>Stay inside!!!</h2>
        )
      } else {
        if(condition === 3 || condition === 5){ //Rainy
          checkTemp(temp)
        } else if (condition === 6) { //Snowy
          checkTemp(temp)
        } else { // Any other condition
          checkTemp(temp)
        }
      }
    }

    return '';
  };

  const checkTemp = (temp) => {
    if(temp > 15){
      return (
        <span>{`${starter[Math.floor(Math.random(0, starter.length))] +
              top[[Math.floor(Math.random(0,2))]] + 
              bot[[Math.floor(Math.random(0,3))]] +
              feet[[Math.floor(Math.random(0,4))]]}
              Add in ${headwear[Math.floor(Math.random(0,3))]} 
              and you are set!`}</span>
      )
    } else if(temp > 7) {
      
    } else if (temp > -7) {
      
    } else if (temp > -10){
      
    } else {
      
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='container'>
          <h1 className='title'>How's it looking outside?</h1>
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