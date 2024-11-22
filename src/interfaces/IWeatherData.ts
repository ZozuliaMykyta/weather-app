export interface IWeatherData {
  city: {
    name: string;
    timezone: number;
  };
  list: {
    dt: number;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
      humidity: number;
    };
    weather: {
      description: string;
      main: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
    };
  }[];
}
