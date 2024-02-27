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
        <CardDescription>Simple weather app</CardDescription>
      </CardHeader>
      <CardContent>
        <WeatherApp />
      </CardContent>
    </Card>
  );
}
