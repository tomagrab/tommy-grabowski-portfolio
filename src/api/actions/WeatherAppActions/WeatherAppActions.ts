'use server';

import { WeatherType } from '@/lib/Types/WeatherType/WeatherType';

/**
 * Retrieves weather data based on latitude and longitude.
 * @param formData - The form data containing latitude and longitude.
 * @returns A promise that resolves to the weather data.
 * @throws Error if API key is not found, latitude and longitude are not found, or there is an error fetching weather data.
 */
export async function GetWeather(formData: FormData): Promise<WeatherType> {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('API key not found');
  }

  let lat = formData.get('lat');
  let lon = formData.get('lon');

  if (!lat || !lon) {
    lat = '47.6062';
    lon = '-122.3321';
  }

  try {
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    );
    const weatherData: WeatherType = await weather.json();

    return weatherData;
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
}
