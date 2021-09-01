import { weather as weatherProvide } from '@/provide';
import { API_KEY } from '@/utils/openWeatherApi';
import COUNTRY_BY_CODE from '@/utils/countryByCode';

const datetimeNow = (dt) => new Date(dt * 1000);

export default {
  state: {
    city: null,
    country: null,
    currentDay: null,
    forecastDay: null,
  },
  mutations: {
    setCity(state, data) {
      state.city = data;
    },
    setCountry(state, data) {
      state.country = data;
    },
    setCurrentDay(state, data) {
      state.currentDay = data;
    },
    setForecastDay(state, data) {
      state.forecastDay = data;
    },
  },
  getters: {
    city: (state) => state.city,
    country: (state) => COUNTRY_BY_CODE[state.country] || '',
    currentDay: (state) => state.currentDay,
    forecastDay: (state) => state.forecastDay,
  },
  actions: {
    async getCurrentDay({ commit }, { city }) {
      try {
        const { data } = await weatherProvide.getCurrentWeather(city, API_KEY);

        const day = {
          weatherType: data.weather[0].main,
          temp: Math.ceil(data.main.temp),
          coords: data.coord,
          datetime: datetimeNow(data.dt),
        };

        commit('setCountry', data.sys.country);
        commit('setCurrentDay', day);
      } catch (err) {
        commit('setCurrentDay', { error: 'City not found' });
      }
    },
    async getForecastDay({ commit }, { coords }) {
      try {
        const { lat, lon } = coords;
        const { data } = await weatherProvide.getForecastWeather(lat, lon, API_KEY);
        const forecastDays = [];

        data.daily.splice(1, 7).forEach((item) => {
          forecastDays.push({
            weatherType: item.weather[0].main,
            temp: Math.ceil(item.temp.day),
            coords: null,
            datetime: datetimeNow(item.dt),
          });
        });

        commit('setForecastDay', forecastDays);
      } catch (err) {
        commit('setForecastDay', { error: 'Weather not found' });
      }
    },
  },
};
