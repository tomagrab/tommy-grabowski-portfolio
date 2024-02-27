export type CoordType = {
  lon: number;
  lat: number;
};

export type WeatherDescriptionType = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type MainType = {
  temp: number; // Temperature (Kelvin)
  feels_like: number; // Feels like temperature (Kelvin)
  temp_min: number; // Minimum temperature (Kelvin)
  temp_max: number; // Maximum temperature (Kelvin)
  pressure: number; // Atmospheric pressure
  humidity: number; // Humidity (percentage)
  sea_level?: number; // Atmospheric pressure at sea level
  grnd_level?: number; // Atmospheric pressure on the ground
};

export type RainType = {
  '1h': number; // Rain volume for the last hour
};

export type WindType = {
  speed: number; // Wind speed
  deg: number; // Wind direction (degrees)
  gust?: number; // Wind gust
};

export type CloudsType = {
  all: number; // Cloudiness (percentage)
};

export type SysType = {
  type?: number;
  id?: number;
  country: string;
  sunrise: number; // Sunrise time (Unix timestamp)
  sunset: number; // Sunset time (Unix timestamp)
};

export type WeatherType = {
  coord: CoordType;
  weather: WeatherDescriptionType[];
  base: string;
  main: MainType;
  visibility: number;
  wind: WindType;
  rain?: RainType;
  clouds: CloudsType;
  dt: number; // Time of data calculation (Unix timestamp)
  sys: SysType;
  timezone: number; // Shift in seconds from UTC
  id: number; // City ID
  name: string; // City name
  cod: number; // Internal parameter
};
