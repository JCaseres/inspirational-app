import React, {useState} from 'react';
import axios from 'axios';


const Weather = () => {
    const [data,setData] = useState({})
    const [location, setLocation] = useState('')

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=f1dbc442cfa88b9f58af3bb5365eee2d`

    const searchLocation = (event) => {
        if (event.key === "Enter") {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            setLocation('')
        }
    }

    return (
       <div className='weather-app'>
            <div className='weather-search'>
                <input 
                type='text'
                value={location}
                onChange={event => setLocation(event.target.value)}
                placeholder="Enter City for Weather"
                onKeyDown={searchLocation}
                className='weather-placeholder'
                />
            </div>
            
            
            <div className='weather-container'>
                <div className='weather-top'>
                    <div className='location'>
                        <h1 className='bold'>{data.name}</h1>
                    </div>
                    <div className='temp'>
                        {data.main ? <h2>{data.main.temp.toFixed()} ℉</h2> : null}
                    </div>
                    <div className='weather-description'>
                        {data.weather ? <h2>{data.weather[0].main}</h2> : null}
                    </div>
                </div>
                
                {data.name !== undefined &&
                <div className='weather-bottom'>
                    <div className='feels'>
                        {data.main ? <h2 className='bold'>{data.main.feels_like.toFixed()} ℉</h2> : null}
                        <h3>Feels Like</h3>
                    </div>
                    <div className='humidity'>
                        {data.main ? <h2 className='bold'>{data.main.humidity} %</h2> : null}
                        <h3>Humidity</h3>
                    </div>
                    <div className='wind'>
                        {data.wind ? <h2 className='bold'>{data.wind.speed} MPH</h2> : null}
                        <h3>Wind Speed</h3>
                    </div>
                </div>
                }
            </div>
       </div> 
    )
}

export default Weather;