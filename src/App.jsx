import { useState, useEffect } from 'react';
import { CloudRain, Droplet, Thermometer } from 'lucide-react';
import fetchHistoricalData from './script/fetchFromFirestore';
import saveToFirestore from './script/saveToFirestore';
import getRandomMinangQuote from './script/randomMinangQuotes';
import connectMQTT from './script/mqttClient';
import WeatherGraph from './components/weatherGraph';
import BubbleChat from './components/BubbleChat';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: null,
    humidity: null,
    rainfallStatus: null,
    rainfallPercentage: null,
  });
  const [historicalData, setHistoricalData] = useState([]);
  const [quote, setQuote] = useState('');

  const brokerUrl = 'wss://xbcc49eb.ala.asia-southeast1.emqxsl.com:8084/mqtt';
  const topic = 'weather/sensors';

  useEffect(() => {
    const client = connectMQTT(brokerUrl);

    client.subscribe(topic, (err) => {
      if (!err) {
        console.log(`Subscribed to ${topic}`);
      } else {
        console.error(`Failed to subscribe to ${topic}:`, err);
      }
    });

    let lastSaveTime = 0;

    client.on('message', (receivedTopic, payload) => {
      if (receivedTopic === topic) {
        try {
          const data = JSON.parse(payload.toString());
          console.log('Received data:', data);

          setWeatherData({
            temperature: data.temperature,
            humidity: data.humidity,
            rainfallStatus: data.rainfallStatus,
            rainfallPercentage: data.rainfallPercentage,
          });

          const now = Date.now();
          if (now - lastSaveTime > 60000) {
            saveToFirestore({
              temperature: data.temperature,
              humidity: data.humidity,
              rainfallStatus: data.rainfallStatus,
              rainfallPercentage: data.rainfallPercentage,
              timestamp: new Date().toISOString(),
            });
            lastSaveTime = now;
          }
        } catch (err) {
          console.error('Error parsing MQTT message:', err);
        }
      }
    });

    return () => {
      client.end();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHistoricalData();
      setHistoricalData(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setQuote(getRandomMinangQuote());
    const interval = setInterval(() => {
      setQuote(getRandomMinangQuote());
    }, 60000);
    return () => clearInterval(interval);
  }, [])

  return (
    <div className="min-h-screen bg-green-700 p-6 flex flex-col justify-center items-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-800">
          Pawang Hujan Universitas Andalas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-100 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform cursor-default">
            <Thermometer size={48} className="text-green-700" />
            <h2 className="text-xl font-semibold text-green-900 mb-2">Suhu</h2>
            <p className="text-3xl font-bold text-green-800">
              {weatherData.temperature}°C
            </p>
          </div>
          <div className="bg-green-100 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform cursor-default">
            <Droplet size={48} className="text-green-700" />
            <h2 className="text-xl font-semibold text-green-900 mb-2">
              Kelembaban
            </h2>
            <p className="text-3xl font-bold text-green-800">
              {weatherData.humidity}%
            </p>
          </div>
          <div className="bg-green-100 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform cursor-default">
            <CloudRain size={48} className="text-green-700" />
            <h2 className="text-xl font-semibold text-green-900 mb-2">
              Curah Hujan
            </h2>
            <p className="text-3xl font-bold text-green-800">
              {weatherData.rainfallStatus}
            </p>
          </div>
        </div>

        <div className='flex justify-center mt-4 mr-10 w-full items-center'>
          <WeatherGraph data={historicalData} />
        </div>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-4 justify-end items-center mt-8">
          <div className='w-96'>
            <div className="p-4 bg-green-400 rounded-lg shadow-md text-center hover:scale-105 transition-transform cursor-default">
              <p className="text-lg italic text-green-800">&quot;{quote}&quot;</p>
              <p className="mt-2 text-sm text-gray-600">~ Pepatah Minang</p>
            </div>
          </div>
          <BubbleChat data={weatherData.rainfallStatus} />
        </div>

        <div>
          <p className="text-center text-gray-600 mt-12 text-sm">
            &copy; 2024 Empat Warga Unand. Thanks to Rayhan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
