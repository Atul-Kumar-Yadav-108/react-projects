import React from 'react'
import { BsFillSunsetFill } from "react-icons/bs";
import { BsFillSunriseFill } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TbCloudSearch } from "react-icons/tb";

const Info = ({weatherData}) => {
    function toTime(ts) {
  return new Date(ts * 1000).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
  return (
    <div>
{weatherData && weatherData.weather ? (
    <div className="card fs-3 bg-info-subtle">
        <div className="card-body">
            <div className='d-flex justify-content-between fs-3'>
                <h3><BsFillSunriseFill /> {toTime(weatherData.sys.sunrise)}</h3>
                <h3><BsFillSunsetFill /> {toTime(weatherData.sys.sunset)} </h3>
            </div>
            <p><b>City : <span className='text-warning'>{weatherData.name} , {weatherData.sys.country}</span></b></p>
            <h3 className="card-title"><TiWeatherPartlySunny/> <span className='text-warning'>{weatherData.weather[0].main}</span></h3>
            <p className="card-text">Description : <span className='text-warning'>{weatherData.weather[0].description}</span></p>
            <div className="d-flex justify-content-between text-start">
                <div className="left-side">
                    <h5>Temp : <span className='text-warning'>{weatherData.main.temp}</span></h5>
                    <h5>Min Temp : <span className='text-warning'>{weatherData.main.temp_min}</span></h5>
                    <h5>Pressure : <span className='text-warning'>{weatherData.main.pressure}</span></h5>
                    <h5>Sea level : <span className='text-warning'>{weatherData.main.sea_level}</span></h5>
                </div>
                <div className="right-side">
                     <h5>Feels Like : <span className='text-warning'>{weatherData.main.feels_like}</span></h5>
                     <h5>Max Temp : <span className='text-warning'>{weatherData.main.temp_max}</span></h5>
                     <h5>Humidity : <span className='text-warning'>{weatherData.main.humidity}</span></h5>
                     <h5>Ground Level : <span className='text-warning'>{weatherData.main.grnd_level}</span></h5>
                </div>
            </div>
            <div className="wind-details fs-5 fw-bold">
                <ul className='list-unstyled fs-5 fw-bold'>
                    <li className='text-start'>
                        Wind
                        <ul className='text-center list-unstyled fs-5 fw-bold'>
                            <li>Speed : <span className='text-warning'>{weatherData.wind.speed}</span></li>
                            <li>Degree : <span className='text-warning'>{weatherData.wind.deg}</span></li>
                            <li>Gust : <span className='text-warning'>{weatherData.wind.gust}</span></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
) : (
    <div className="card fs-3 bg-info-subtle">
        <div className="card-body">
            <div className="fs-1"><TbCloudSearch/></div>
            <h3>Please search weather by city name.</h3>
        </div>
    </div>
)}

    </div>
  )
}

export default Info