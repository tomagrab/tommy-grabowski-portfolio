'use client';
import { GetWeather } from '@/api/actions/WeatherAppActions/WeatherAppActions';
import '@/components/WeatherApp/WeatherAppForm/WeatherAppForm.scss';
import { WeatherType } from '@/lib/Types/WeatherType/WeatherType';
import { useEffect, useState } from 'react';
import WeatherAppDisplay from '@/components/WeatherApp/WeatherAppDisplay/WeatherAppDisplay';
import { Button } from '@/components/ui/button';
import WeatherAppLoading from '@/components/WeatherApp/WeatherAppLoading/WeatherAppLoading';

export default function WeatherAppForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherType | null>(null);

  // Prompt the user for permission to retrieve their location
  useEffect(() => {
    // If the browser supports geolocation
    if (navigator.geolocation) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude.toString());
        setLon(position.coords.longitude.toString());
      });

      // If the user denies permission to retrieve their location
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(permissionStatus => {
          permissionStatus.onchange = () => {
            if (permissionStatus.state === 'denied') {
              setLat('47.6062');
              setLon('-122.3321');
            }
          };
        });
    }

    // If the browser does not support geolocation
    if (!navigator.geolocation) {
      setLat('47.6062');
      setLon('-122.3321');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const weather = await GetWeather(formData);
    setWeatherData(weather);
    setLoading(false);
  };

  return (
    <div>
      {/* Only show WeatherAppDisplay if there is Weather Data */}
      {weatherData && !loading ? (
        <WeatherAppDisplay weatherData={weatherData} />
      ) : loading ? (
        <WeatherAppLoading />
      ) : !weatherData && error ? (
        <p>{error}</p>
      ) : null}
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="hidden">
          <label htmlFor="lat">Latitude:</label>
          <input
            type="text"
            id="lat"
            name="lat"
            value={lat}
            onChange={e => setLat(e.target.value)}
          />
          <label htmlFor="lon">Longitude:</label>
          <input
            type="text"
            id="lon"
            name="lon"
            value={lon}
            onChange={e => setLon(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Getting weather...' : 'Get Weather'}
        </Button>
      </form>
    </div>
  );
}
