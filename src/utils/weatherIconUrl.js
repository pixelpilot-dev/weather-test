export default function weatherIconUrl(type, isNight) {
  switch (type) {
    case 'Clear':
      return isNight ? 'night.svg' : 'sunny.svg';
    case 'Clouds':
      return 'cloudy.svg';
    case 'Drizzle':
    case 'Rain':
      return 'rainy.svg';
    case 'Snow':
      return 'snowy.svg';
    case 'Ash':
    case 'Dust':
    case 'Fog':
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Sand':
      return 'foggy.svg';
    case 'Thunderstorm':
      return 'thunderstorm.svg';
    case 'Tornado':
      return 'tornado.svg';
    default:
      return 'sunny.svg';
  }
}
