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
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

type WeatherAppDisplayProps = {
  weatherData: WeatherType;
  temperatureUnit: 'fahrenheit' | 'celsius';
};

export default function WeatherAppDisplay({
  weatherData,
  temperatureUnit,
}: WeatherAppDisplayProps) {
  const [displayUnit, setDisplayUnit] = useState<'fahrenheit' | 'celsius'>(
    temperatureUnit,
  );
  return (
    // Display the weather data on a card
    <Card>
      <CardHeader>
        <CardTitle>
          {weatherData.name}, {weatherData.sys.country}
        </CardTitle>
        <CardDescription className="flex flex-row items-center justify-center">
          <div>
            <Image
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
              width={100}
              height={100}
            />
          </div>
          <div className="flex flex-col items-center text-lg">
            <p className="capitalize">{weatherData.weather[0].description}</p>
            <button
              className="flex items-center gap-2"
              onClick={() =>
                setDisplayUnit(
                  displayUnit === 'fahrenheit' ? 'celsius' : 'fahrenheit',
                )
              }
            >
              <p>
                {displayUnit === 'fahrenheit'
                  ? ConvertKelvinToFahrenheit(weatherData.main.temp)
                  : ConvertKelvinToCelsius(weatherData.main.temp)}
                ° {displayUnit === 'fahrenheit' ? 'F' : 'C'}
              </p>
            </button>
          </div>
        </CardDescription>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col items-center gap-2">
              <FontAwesomeIcon
                icon={faTint}
                className="h-8 w-8 text-celestial-blue md:h-12 md:w-12"
              />
              <p className="text-center">Humidity</p>
              <p>{weatherData.main.humidity}%</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FontAwesomeIcon
                icon={faWind}
                className="h-8 w-8 text-celestial-blue md:h-12 md:w-12"
              />
              <p className="text-center">Wind Speed</p>
              <p>{weatherData.wind.speed} m/s</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FontAwesomeIcon
                icon={faCloud}
                className="h-8 w-8 text-celestial-blue md:h-12 md:w-12"
              />
              <p className="text-center">Cloudiness</p>
              <p>{weatherData.clouds.all}%</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FontAwesomeIcon
                icon={faGem}
                className="h-8 w-8 text-celestial-blue md:h-12 md:w-12"
              />
              <p className="text-center">Pressure</p>
              <p>{weatherData.main.pressure} hPa</p>
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
