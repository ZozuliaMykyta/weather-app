import { IWeatherData } from "../interfaces/IWeatherData";

const formatDateTime = (weatherData: IWeatherData | null): string => {
  if (!weatherData) return "";
  const date = new Date();
  const localTime = date.getTime();
  const localOffset = date.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const currentCityTime = utc + 1000 * weatherData.city.timezone;
  const currentTime = new Date(currentCityTime);

  const timeString = currentTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateString = currentTime.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "2-digit",
  });

  return `${timeString} - ${dateString}`;
};

export default formatDateTime;
