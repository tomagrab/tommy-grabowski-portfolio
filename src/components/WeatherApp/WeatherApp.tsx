import '@/components/WeatherApp/WeatherApp.scss';
import WeatherAppForm from './WeatherAppForm/WeatherAppForm';

export default async function WeatherApp() {
  return (
    <>
      <WeatherAppHeader />
      <WeatherAppBody />
    </>
  );
}

function WeatherAppHeader() {
  return (
    <div>
      <h2 className="pb-4 text-lg font-bold">Weather App</h2>
    </div>
  );
}

function WeatherAppBody() {
  return <WeatherAppForm />;
}
