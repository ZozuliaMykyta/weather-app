import React from "react";
import { FaRegSnowflake } from "react-icons/fa";
import { IoIosCloudOutline } from "react-icons/io";
import { CiSun } from "react-icons/ci";
import { IoRainyOutline } from "react-icons/io5";

interface HourlyWeatherIconProps {
  item: object | string;
}

const MainWeatherIcon: React.FC<HourlyWeatherIconProps> = ({ item }) => {
  switch (item) {
    case "clear":
      return <CiSun className="weather-right__forecast-icon" />;
    case "clouds":
      return <IoIosCloudOutline className="weather-right__forecast-icon" />;
    case "snow":
      return <FaRegSnowflake className="weather-right__forecast-icon" />;
    case "rain":
      return <IoRainyOutline className="weather-right__forecast-icon" />;
    default:
      return null;
  }
};

export default MainWeatherIcon;
