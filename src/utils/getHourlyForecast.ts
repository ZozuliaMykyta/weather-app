import { IWeatherData } from "../interfaces/IWeatherData";

const getHourlyForecast = (
  weatherData: IWeatherData | null
): IWeatherData["list"] => {
  if (!weatherData) return [];
  const currentTime = new Date().getTime();

  return weatherData.list
    .filter((item) => {
      const forecastTime = item.dt * 1000;
      return (
        forecastTime > currentTime &&
        forecastTime < currentTime + 24 * 60 * 60 * 1000
      );
    })
    .slice(0, 8);
};

export default getHourlyForecast;
