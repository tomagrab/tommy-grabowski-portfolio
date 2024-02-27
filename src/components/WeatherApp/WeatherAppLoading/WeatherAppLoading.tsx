import '@/components/WeatherApp/WeatherAppLoading/WeatherAppLoading.scss';

export default function WeatherAppLoading() {
  return (
    <div className="flex h-24 w-full items-center justify-center">
      <div className="loading-spinner"></div>
    </div>
  );
}
