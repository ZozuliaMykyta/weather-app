const updateBackground = (weatherCondition: string): string => {
  switch (weatherCondition) {
    case "clear":
      return "sunny";
    case "clouds":
      return "cloudy";
    case "rain":
      return "rainy";
    case "thunderstorm":
      return "stromy";
    case "snow":
      return "snowy";
    default:
      return "default";
  }
};

export default updateBackground;
