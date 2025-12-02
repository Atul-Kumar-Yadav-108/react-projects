import React,{useState} from 'react'
import { TbCloudSearch } from "react-icons/tb";
const CityInput = ({setData}) => {
  const [cityName, setCityName]=useState("");
  const apiKey = import.meta.env.VITE_API_KEY; // make and .env file and put you secrect api key there and then import that here to use.
  async function  getWeatherData() {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
    const result =await res.json();
    console.log(result)
    setData(result)
  }
  
  return (
    <div>
        <div className="input-group my-3 fs-1">
            <input type="text" className="form-control fs-3" placeholder="Enter city name" aria-label="Recipient’s username" aria-describedby="button-addon2" onChange={(e)=> setCityName(e.target.value)} value={cityName} />
            <button className="btn btn-outline-info fs-3" type="button" id="button-addon2" onClick={getWeatherData}>Search <TbCloudSearch /></button>
        </div>

    </div>
  )
}

export default CityInput