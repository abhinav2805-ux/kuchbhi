import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import { Button } from '../ui/button';

const WeatherApp: React.FC = () => {
  const [location, setLocation] = useState('');
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [showWeather, setShowWeather] = useState(false);

  const getWeather = async () => {
    if (!location) {
      alert('Please enter a location.');
      return;
    }

    try {
      const currentWeatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6557810176c36fac5f0db536711a6c52&units=metric`
      );
      const currentWeatherData = await currentWeatherResponse.json();

      if (currentWeatherData.cod !== 200) {
        alert('Error fetching current weather data. Please check the location.');
        return;
      }

      setCurrentWeather(currentWeatherData);
      setShowWeather(true);
    } catch (error) {
      alert('An error occurred while fetching weather data.');
      console.error(error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-full space-y-4 rounded-xl w-full flex items-center flex-col">
      <h1 className='text-5xl font-semibold'>Historical Data </h1>
      <iframe width="830" height="660"  src="https://www.globalforestwatch.org/embed/widget/treeLossPct/country/IND"></iframe>
      <iframe width="830" height="660"  src="https://www.globalforestwatch.org/embed/widget/treeLoss/country/IND"></iframe>
      <iframe width="830" height="660"  src="https://www.globalforestwatch.org/embed/widget/firesAlertsHistorical/country/IND" ></iframe>
      <iframe width="830" height="660"  src="https://www.globalforestwatch.org/embed/widget/netChange/country/IND"></iframe>
      <h1 className="text-4xl font-bold text-center text-green-800">Weather Data</h1>
      <form
        className="my-2 flex flex-col items-center space-y-6 justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          getWeather();
        }}
      >
        <input
          type="text"
          id="location"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 border-2 border-black text-lg font-semibold bg-white py-1 rounded-lg "
        />
        <Button
          type="button"
          id="get-weather"
          onClick={getWeather}
          className="px-3 py-1 shadow-md rounded-xl font-semibold"
          variant={'outline'}
        >
          Get Weather
        </Button>
      </form>
      {showWeather && currentWeather && (
        <div id="weather" className="mt-6 justify-center items-center">
          <div className='flex flex-col justify-center border-2 px-4 py-2  items-center'>
          <h2 className="text-2xl font-semibold text-green-800">Current Weather</h2>
          <div id="current-weather" className="my-4 text-xl font-semibold ">
            <p>Temperature: {currentWeather.main.temp}°C</p>
            <p>Humidity: {currentWeather.main.humidity}%</p>
            <p>Weather: {currentWeather.weather[0].description}</p>
          </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
