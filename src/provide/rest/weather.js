import { api } from '../request';

/**
 * Get current weather data
 *
 * @see https://openweathermap.org/current
 */
function getCurrentWeather(cityName, apiKey) {
  return api.get('/weather', {
    params: {
      q: cityName,
      appid: apiKey,
    },
  });
}

/**
 * Get forecast weather data
 *
 * @see https://openweathermap.org/api/one-call-api
 */
 function getForecastWeather(lat, lon, apiKey) {
  return api.get('/onecall', {
    params: {
      lat,
      lon,
      appid: apiKey,
    },
  });
}

export {
  getCurrentWeather,
  getForecastWeather,
}

