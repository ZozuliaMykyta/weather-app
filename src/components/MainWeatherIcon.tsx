import React from "react";
import { FaRegSnowflake } from "react-icons/fa";
import { IoIosCloudOutline } from "react-icons/io";
import { CiSun } from "react-icons/ci";
import { IoRainyOutline } from "react-icons/io5";

interface MainWeatherIconProps {
  weatherData: string | undefined;
}

const MainWeatherIcon: React.FC<MainWeatherIconProps> = ({ weatherData }) => {
  switch (weatherData) {
    case "clear":
      return <CiSun className="weather-left__icon" />;
    case "clouds":
      return <IoIosCloudOutline className="weather-left__icon" />;
    case "snow":
      return <FaRegSnowflake className="weather-left__icon" />;
    case "rain":
      return <IoRainyOutline className="weather-left__icon" />;
    default:
      return null;
  }
};

export default MainWeatherIcon;
