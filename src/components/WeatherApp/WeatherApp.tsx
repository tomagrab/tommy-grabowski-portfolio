import '@/components/WeatherApp/WeatherApp.scss';
import { WeatherType } from '@/lib/Types/WeatherType/WeatherType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faCompass,
  faTint,
  faThermometerHalf,
  faWind,
  faGem,
} from '@fortawesome/free-solid-svg-icons';

export default async function WeatherApp() {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  const weather = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apiKey}`,
  );
  const weatherData: WeatherType = await weather.json();
  const ConvertKelvinToFahrenheit = (kelvin: number) => {
    return ((kelvin - 273.15) * (9 / 5) + 32).toFixed(2);
  };

  const ConvertKelvinToCelsius = (kelvin: number) => {
    return (kelvin - 273.15).toFixed(2);
  };

  return (
    <div className="weather-app">
      <WeatherAppHeader weatherData={weatherData} />
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
        <div className="weather-app-field">
          <FontAwesomeIcon
            icon={faThermometerHalf}
            className="h-8 w-8 text-celestial-blue"
          />
          <p>
            Temperature: {ConvertKelvinToFahrenheit(weatherData.main.temp)} °F /{' '}
            {ConvertKelvinToCelsius(weatherData.main.temp)} °C
          </p>
        </div>
        <div className="weather-app-field">
          <FontAwesomeIcon
            icon={faThermometerHalf}
            className="h-8 w-8 text-celestial-blue"
          />
          <p>
            Feels like: {ConvertKelvinToFahrenheit(weatherData.main.feels_like)}{' '}
            °F / {ConvertKelvinToCelsius(weatherData.main.feels_like)} °C
          </p>
        </div>
        <div className="weather-app-field ">
          <FontAwesomeIcon
            icon={faThermometerHalf}
            className="h-8 w-8 text-celestial-blue"
          />
          <p>
            Min: {ConvertKelvinToFahrenheit(weatherData.main.temp_min)} °F /{' '}
            {ConvertKelvinToCelsius(weatherData.main.temp_min)} °C
          </p>
        </div>

        <div className="weather-app-field">
          <FontAwesomeIcon
            icon={faThermometerHalf}
            className="h-8 w-8 text-celestial-blue"
          />
          <p>
            Max: {ConvertKelvinToFahrenheit(weatherData.main.temp_max)} °F /{' '}
            {ConvertKelvinToCelsius(weatherData.main.temp_max)} °C
          </p>
        </div>
        <div className="weather-app-field">
          <FontAwesomeIcon
            icon={faGem}
            className="h-8 w-8 text-celestial-blue"
          />
          <p>Pressure: {weatherData.main.pressure}hPa</p>
        </div>
        <div className="weather-app-field">
          <FontAwesomeIcon
            icon={faTint}
            className="h-8 w-8 text-celestial-blue"
          />
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
        <div className="weather-app-field">
          <FontAwesomeIcon
            icon={faWind}
            className="h-8 w-8 text-celestial-blue"
          />
          <p>Wind speed: {weatherData.wind.speed}m/s</p>
        </div>
        <div className="weather-app-field">
          <FontAwesomeIcon
            icon={faCloud}
            className="h-8 w-8 text-celestial-blue"
          />
          <p>Cloudiness: {weatherData.clouds.all}%</p>
        </div>
      </div>
    </div>
  );
}

type WeatherAppHeaderProps = {
  weatherData: WeatherType;
};

function WeatherAppHeader({ weatherData }: WeatherAppHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2>Weather App</h2>
      <div className="flex items-center gap-2">
        <p className="whitespace-nowrap">City: {weatherData.name}</p>
      </div>
    </div>
  );
}
