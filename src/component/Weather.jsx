import React, { useCallback, useContext, useEffect, useState } from 'react'

import WeatherConditions from './WeatherConditions';


// { city, country, temp,humidity,windSpeed,sunrise,sunset,desc}
function Weather() {
    const [weatherData, setWeatherData] = useState({});
    const mykeys = window.location.search;
        const urlParam = new URLSearchParams(mykeys);
        const lon = urlParam.get('lon');
        const lat = urlParam.get('lat');
    const weatherCondition = weatherData && weatherData.weather
        ? weatherData.weather.map((item, idx) => (idx === 0 ? item.main : ''))
        : [];

    useEffect(() => {
        // const mykeys = window.location.search;
        // const urlParam = new URLSearchParams(mykeys);
        // const lon = urlParam.get('lon');
        // const lat = urlParam.get('lat');

        const fetchData = async () => {
            // setLoading(true);
            // setError(null);

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9bc77de74616ea3d6779fa0151cea80d&units=metric`);
                if (!response.ok) {
                    throw new Error("Network Error");
                }
                const data = await response.json();
                console.log(data);
                setWeatherData({ name: data.name, main: data.main, weather: data.weather, visibility: data.visibility, wind: data.wind, sys: data.sys });
                console.log(weatherData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const timeFormating = (timeStamp) => {
        const date = new Date((timeStamp * 1000));
        const minutes = date.getUTCMinutes();
        let hours = date.getUTCHours();
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} `
    }

    return (
        <div className='bg-slate-300 h-screen pt-10 px-4'>
            <div className='max-w-md  p-4 bg-white rounded-lg mx-auto shadow-xl'>
                <div className='flex items-center justify-normal'>
                    <h3 className='text-3xl'>Weather</h3>
                    <p className='px-2 text-slate-500'>{weatherData.name},{weatherData?.sys?.country}</p>
                </div>
                <div className='my-4'>

                    <div className='flex justify-between items-center '>
                        <div className='flex justify-center items-center'>
                            <span className='text-2xl pr-2'>{Math.floor(weatherData?.main?.temp)}&#176;C</span>

                            <span>{<WeatherConditions weatherCondition={weatherCondition} />}</span>

                        </div>

                        <div className=''>
                            <p className='flex'>
                                <svg fill='#2F5DE6' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M460-160q-50 0-85-35t-35-85h80q0 17 11.5 28.5T460-240q17 0 28.5-11.5T500-280q0-17-11.5-28.5T460-320H80v-80h380q50 0 85 35t35 85q0 50-35 85t-85 35ZM80-560v-80h540q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43h-80q0-59 40.5-99.5T620-840q59 0 99.5 40.5T760-700q0 59-40.5 99.5T620-560H80Zm660 320v-80q26 0 43-17t17-43q0-26-17-43t-43-17H80v-80h660q59 0 99.5 40.5T880-380q0 59-40.5 99.5T740-240Z" /></svg>
                                {Math.ceil(weatherData?.wind?.speed)} Km/h</p>
                        </div>
                    </div>
                    <div className='font-normal'>
                        {weatherData?.weather?.map((item, idx) => (
                            <p key={idx}>{item.description}, Min:{Math.floor(weatherData.main?.temp_min)}&#176;C, Max:{Math.floor(weatherData.main?.temp_max)}&#176;C, Feels like:{Math.floor(weatherData.main?.feels_like)}&#176;C</p>
                        ))}
                    </div>
                    
                </div>
                <div className='border-2 rounded-md px-4 py-2 '>
                    <div className='flex justify-between items-center mb-5 '>
                        <div className='text-center'>
                            <p>Humidity</p>
                            <p className='flex '>
                                <svg fill='#2F5DE6' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-100q-133 0-226.5-92T160-416q0-63 24.5-120.5T254-638l226-222 226 222q45 44 69.5 101.5T800-416q0 132-93.5 224T480-100ZM240-416h480q0-47-18-89.5T650-580L480-748 310-580q-34 32-52 74.5T240-416Z" /></svg>
                                {weatherData?.main?.humidity}</p></div>
                        <div className='text-center'>
                            <p>Preesure</p>
                            <p className='flex'>
                                <svg fill='#2F5DE6' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-400v-80h640v80H160Zm0-120v-80h640v80H160ZM440-80v-128l-64 64-56-56 160-160 160 160-56 56-64-62v126h-80Zm40-560L320-800l56-56 64 64v-128h80v128l64-64 56 56-160 160Z" /></svg>
                                {weatherData?.main?.pressure}</p>
                        </div>
                    </div>
                    <hr />
                    <div className='flex justify-between items-center mt-5'>
                        <div>
                            <p>Sunrise</p>
                            <p className='flex'>
                                <svg fill='#2F5DE6' width='18px' theme="action" set="current-conditions" name="sunrise-sun" data-testid="Icon" viewBox="0 0 24 24"><title>Sun Rise</title><path d="M12.003 16.125v-2.21m-5.602 2.129l1.69 1.441m9.237-1.489l-1.4 1.63" stroke="#2F5DE6" stroke-width="2" ></path><path d="M4.05 20.938h2.48m11.27 0h2.481" stroke="#2F5DE6" stroke-width="2" ></path><path d="M12 9.938V4.426M8.563 6.5L12 3.062M15.438 6.5L12 3.062" stroke="#2F5DE6" stroke-width="2"></path><path d="M12.02 21.605h3.059c.421 0 .543-.229.543-.455 0-1.735-1.613-3.142-3.602-3.142-1.99 0-3.603 1.407-3.603 3.142 0 .266.1.455.529.455h3.074z"></path></svg>
                                {timeFormating(weatherData?.sys?.sunrise)}</p>
                        </div>
                        <div>
                            <p>Sunset</p>
                            <p className='flex'>
                                <svg fill='#2F5DE6' width="18px" theme="action" set="current-conditions" name="sunset-sun" data-testid="Icon" viewBox="0 0 24 24"><title>Sunset</title><path d="M12.003 15.781v-2.21M6.401 15.7l1.69 1.442m9.237-1.49l-1.4 1.63" stroke="#2F5DE6" stroke-width="2"></path><path d="M4.05 20.594h2.48m11.27 0h2.481" stroke="#2F5DE6" stroke-width="2"  ></path><path d="M12 3.063v5.51M8.563 6.5L12 9.938M15.438 6.5L12 9.938" stroke="#2F5DE6" stroke-width="2"></path><path d="M12.02 21.261h3.059c.421 0 .543-.229.543-.455 0-1.735-1.613-3.142-3.602-3.142-1.99 0-3.603 1.407-3.603 3.142 0 .266.1.455.529.455h3.074z"></path></svg>
                                {timeFormating(weatherData?.sys?.sunset)}</p>
                        </div>

                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default Weather