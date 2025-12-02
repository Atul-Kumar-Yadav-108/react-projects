import React, { useState } from 'react'
import CityInput from './CityInput'
import Info from './Info'

const WeatherApp = () => {
  const [weatherData, setWeatherData]=useState({});
  let setdata = (data) =>{
    setWeatherData(data);
  }
  console.log(weatherData);
  
  return (
    <>
        <div className="weather-container bg-warning-subtle text-dark p-4 rounded">
          <h1>Weather App</h1>
        <CityInput setData={setdata} />
        {/* {weatherData.city}
        {weatherData.name} */}
        <Info weatherData={weatherData}/>
        </div>
    </>
  )
}

export default WeatherApp