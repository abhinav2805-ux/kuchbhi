// components/WeatherApp.tsx
import { useState } from 'react';
import Chart from 'chart.js/auto';

const HistoricalData: React.FC = () => {
  const [location, setLocation] = useState('');
  const [currentWeather, setCurrentWeather] = useState<any>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [showWeather, setShowWeather] = useState(false);

  const getWeatherData = async () => {
    // Replace these with actual API calls
    const currentWeatherData = await fetchCurrentWeather(location);
    const historicalWeatherData = await fetchHistoricalWeather(location);

    setCurrentWeather(currentWeatherData);
    setHistoricalData(historicalWeatherData);
    setShowWeather(true);

    renderChart(historicalWeatherData);
  };

  const fetchCurrentWeather = async (location: string) => {
    // Mock data, replace with actual API call
    return {
      temperature: '22°C',
      description: 'Sunny',
    };
  };

  const fetchHistoricalWeather = async (location: string) => {
    // Mock data, replace with actual API call
    return [
      { date: '2024-07-01', temperature: 22 },
      { date: '2024-07-02', temperature: 23 },
      { date: '2024-07-03', temperature: 21 },
    ];
  };

  const renderChart = (data: any[]) => {
    const ctx = document.getElementById('historical-chart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((item) => item.date),
        datasets: [
          {
            label: 'Temperature',
            data: data.map((item) => item.temperature),
            borderColor: 'rgba(50, 205, 50, 1)', // Lime Green
            backgroundColor: 'rgba(50, 205, 50, 0.2)',
          },
        ],
      },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleButtonClick = () => {
    getWeatherData();
  };

  return (
    <div>
      <h1>Weather Data</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getWeatherData();
        }}
      >
        <input
          type="text"
          id="location"
          placeholder="Enter Location"
          value={location}
          onChange={handleInputChange}
        />
        <button type="button" id="get-weather" onClick={handleButtonClick}>
          Get Weather
        </button>
      </form>
      {showWeather && (
        <div id="weather">
          <h2>Current Weather</h2>
          <div id="current-weather">
            <p>Temperature: {currentWeather.temperature}</p>
            <p>Description: {currentWeather.description}</p>
          </div>
          <h2>Historical Weather</h2>
          <canvas id="historical-chart"></canvas>
        </div>
      )}
      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }

        h1,
        h2 {
          color: #006400; /* Dark Green */
        }

        form {
          margin-bottom: 20px;
        }

        input[type='text'] {
          padding: 10px;
          width: 70%;
          margin-right: 10px;
        }

        button {
          padding: 10px;
          background-color: #32cd32; /* Lime Green */
          color: white;
          border: none;
        }

        button:hover {
          background-color: #228b22; /* Forest Green */
        }

        #weather {
          margin-top: 20px;
        }

        canvas {
          width: 100%;
        }

        /* Responsive styles */
        @media (max-width: 600px) {
          input[type='text'] {
            width: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default HistoricalData;
