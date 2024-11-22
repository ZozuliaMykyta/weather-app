import React, { useEffect, useState } from "react";
import { IWeatherData } from "../interfaces/IWeatherData";
import { IWeatherRightData } from "../interfaces/IWeatherRightData";
import MainWeatherIcon from "./MainWeatherIcon";
import HourlyWeatherIcon from "./HourlyWeatherIcon";
import formatDateTime from "../utils/formatDateTime";
import getHourlyForecast from "../utils/getHourlyForecast";
import getMinMaxTemp from "../utils/getMinMaxTemp";
import updateBackground from "../utils/updateBackground";
import Location from "./Location";

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [FormattedDateTime, setFormattedDateTime] = useState<string>("");
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<IWeatherData["list"]>(
    []
  );
  const [tempMax, setTempMax] = useState<number | null>(null);
  const [tempMin, setTempMin] = useState<number | null>(null);
  const [background, setBackground] = useState<string>("default");
  const [submit, setSubmit] = useState<boolean>(false);
  const [isWide, setIsWide] = useState<boolean>(window.innerWidth > 768);

  const currentList = weatherData?.list[0];

  const apiKey = "42b86ca92d37f31a5d9110fe24a0d38d";
  const defaultCity = "London";

  // receiving data
  const fetchWeatherData = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        setError(true);
        return;
      }
      const data: IWeatherData = await response.json();

      setWeatherData(data);
      setError(false);
      setSubmit(false);
    } catch (error) {
      console.error("Error while receiving data", error);
      setWeatherData(null);
    }
  };
  useEffect(() => {
    fetchWeatherData(defaultCity);
  }, []);

  useEffect(() => {
    if (city.trim() && submit && !error) {
      fetchWeatherData(city);
    }
  }, [city, submit, error]);
  useEffect(() => {
    if (weatherData) {
      const weatherCondition =
        weatherData.list[0].weather[0].main.toLowerCase();
      const backgroundClass = updateBackground(weatherCondition);
      setBackground(backgroundClass);
    }
  }, [weatherData]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && city.trim() !== "") {
      fetchWeatherData(city.trim());
      setCity("");
      setSubmit(true);
    }
  };

  // getting temp_max, temp_min
  useEffect(() => {
    if (weatherData) {
      const { temp_max, temp_min } = getMinMaxTemp(weatherData);
      setTempMax(temp_max);
      setTempMin(temp_min);
    } else {
      setTempMax(null);
      setTempMin(null);
    }
  }, [weatherData]);

  const weatherRightDataDetail: IWeatherRightData[] = [
    {
      desc: "Temp max",
      src: "max-temp",
      data: tempMax ? `${Math.round(tempMax)}°` : "-",
    },
    {
      desc: "Temp min",
      src: "min-temp",
      data: tempMin ? `${Math.round(tempMin)}°` : "-",
    },
    {
      desc: "Humadity",
      src: "humadity",
      data: currentList ? `${currentList?.main.humidity}%` : "-",
    },
    {
      desc: "Cloudy",
      src: "cloudy",
      data: currentList ? `${currentList?.clouds.all}%` : "-",
    },
    {
      desc: "Wind",
      src: "wind",
      data: currentList ? `${Math.round(currentList?.wind.speed)}km/h` : "-",
    },
  ];

  // date formatting
  useEffect(() => {
    if (weatherData) {
      const formattedTime = formatDateTime(weatherData);
      setFormattedDateTime(formattedTime || "");
    }
  }, [weatherData]);

  // getting hourly forecast
  useEffect(() => {
    if (weatherData) {
      const forecast = getHourlyForecast(weatherData);
      setHourlyForecast(forecast);
    }
  }, [weatherData]);

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="wrapper">
      <div className={`background ${background}`}>
        <div className="weather__container">
          {!isWide && (
            <Location
              city={city}
              handleKeyDown={handleKeyDown}
              error={error}
              setCity={setCity}
            />
          )}
          <div className="weather-left">
            <div className="weather-left__data">
              <div className="weather-left__data-detail">
                <span className="weather-left__temp">
                  {currentList && `${Math.round(currentList.main.temp)}°`}
                </span>
                <div className="weather-left__dest">
                  <div className="weather-left__city">
                    {weatherData?.city.name}
                  </div>
                  <div className="weather-left__time">{FormattedDateTime}</div>
                </div>
                {weatherData && (
                  <MainWeatherIcon
                    weatherData={weatherData?.list[0].weather[0].main.toLowerCase()}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="weather-right">
            <div className="weather-right__container">
              {isWide && (
                <Location
                  city={city}
                  handleKeyDown={handleKeyDown}
                  error={error}
                  setCity={setCity}
                />
              )}
              <div className="weather-right__data">
                <p className="weather-right__name">
                  {currentList?.weather[0].description}
                </p>
                <div className="weather-right__detail">
                  {weatherRightDataDetail.map((item, index) => (
                    <div className="weather-right__detail-item" key={index}>
                      <span className="weather-right__desc">{item.desc}</span>
                      <div className="weather-right__detail-desc">
                        <span>{item.data}</span>
                        <img
                          src={`${process.env.PUBLIC_URL}/img/icons/${item.src}.svg`}
                          alt={item.desc}
                          className="weather-right__data-icon"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="weather-right__forecast">
                <p className="weather-right__forecast-desc">
                  Today’s Weather Forecast...
                </p>
                <div className="weather-right__forecast-block">
                  {hourlyForecast.map((item, index) => (
                    <div className="weather-right__forecast-item" key={index}>
                      <div className="weather-right__forecast-data">
                        <div className="weather-right__forecast-img">
                          <HourlyWeatherIcon
                            item={item.weather[0].main.toLowerCase()}
                          />
                        </div>
                        <div className="weather-right__forecast-info">
                          <p className="weather-right__forecast-time">
                            {new Date(item.dt * 1000).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <p className="weather-right__forecast-weather">
                            {item.weather[0].main}
                          </p>
                        </div>
                      </div>
                      <div className="weather-right__forecast-temp">
                        <p>{Math.round(item.main.temp)}°</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
