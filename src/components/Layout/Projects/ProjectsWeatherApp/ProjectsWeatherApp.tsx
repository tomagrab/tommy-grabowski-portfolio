import '@/components/Layout/Projects/ProjectsWeatherApp/ProjectsWeatherApp.scss';
import WeatherApp from '@/components/WeatherApp/WeatherApp';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ProjectsWeatherApp() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Project</CardTitle>
        <CardDescription>
          A simple weather app that displays current conditions and forecasts
          based on your location (or defaults to Seattle). Enable location
          access for the most accurate results.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <WeatherApp />
      </CardContent>
    </Card>
  );
}
