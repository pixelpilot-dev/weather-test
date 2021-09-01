import { api } from '../request';
import { API_KEY } from '@/utils/openWeatherApi';

/**
 * Get current weather data
 *
 * @see https://openweathermap.org/current
 */
function getCurrentWeather(cityName) {
  return api.get('/weather', {
    params: {
      q: cityName,
      appid: API_KEY,
    },
  });
}

/**
 * Get forecast weather data
 *
 * @see https://openweathermap.org/api/one-call-api
 */
 function getForecastWeather(lat, lon) {
  return api.get('/onecall', {
    params: {
      lat,
      lon,
      appid: API_KEY,
    },
  });
}

export {
  getCurrentWeather,
  getForecastWeather,
}

