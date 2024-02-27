import '@/components/WeatherApp/WeatherAppDisplay/WeatherAppDisplay.scss';
import { WeatherType } from '@/lib/Types/WeatherType/WeatherType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faTint,
  faThermometerHalf,
  faWind,
  faGem,
} from '@fortawesome/free-solid-svg-icons';
import { ConvertKelvinToFahrenheit } from '@/lib/Utilities/ConvertKelvinToFahrenheit/ConvertKelvinToFahrenheit';
import { ConvertKelvinToCelsius } from '@/lib/Utilities/ConvertKelvinToCelsius/ConvertKelvinToCelsius';

type WeatherAppDisplayProps = {
  weatherData: WeatherType;
};

type WeatherAppHeaderProps = {
  weatherData: WeatherType;
};

export default function WeatherAppDisplay({
  weatherData,
}: WeatherAppDisplayProps) {
  return (
    <>
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
    </>
  );
}

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
