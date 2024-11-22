import { IWeatherData } from "../interfaces/IWeatherData";

interface MinMaxTemp {
  temp_max: number;
  temp_min: number;
}

const getMinMaxTemp = (weatherData: IWeatherData): MinMaxTemp => {
  const tempMax = Math.max(
    ...weatherData.list.map((item) => item.main.temp_max)
  );
  const tempMin = Math.min(
    ...weatherData.list.map((item) => item.main.temp_min)
  );

  return {
    temp_max: tempMax,
    temp_min: tempMin,
  };
};

export default getMinMaxTemp;
