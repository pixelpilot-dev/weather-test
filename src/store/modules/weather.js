import axios from 'axios';
import COUNTRY_BY_CODE from '@/utils/countryByCode';
import WEEK_DAYS from '@/utils/weekDays';
import weatherIconUrl from '@/utils/weatherIconUrl';

const dateTimeNow = (dt) => new Date(dt * 1000);
const isNight = (dt) => dt.getHours() < 6 && dt.getHours() > 20;

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
    async getCurrentDay({ commit }, { city, apiKey }) {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

        const { data } = response;
        const datetime = dateTimeNow(data.dt);

        const currentDay = {
          weatherIcon: weatherIconUrl(data.weather[0].main, isNight(datetime)),
          weatherType: data.weather[0].main,
          temp: Math.ceil(data.main.temp),
          weekDay: WEEK_DAYS[datetime.getDay()],
          coords: data.coord,
          datetime,
        };

        commit('setCountry', data.sys.country);
        commit('setCurrentDay', currentDay);
      } catch (err) {
        commit('setCurrentDay', { error: 'City not found' });
      }
    },
    async getForecastDay({ commit }, { coords, apiKey }) {
      try {
        const { lat, lon } = coords;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`);

        const { data } = response;
        const { daily } = data;
        const forecastDays = [];

        daily.splice(1, 7).forEach((item) => {
          const datetime = dateTimeNow(item.dt);

          forecastDays.push({
            weatherIcon: weatherIconUrl(item.weather[0].main, isNight(datetime)),
            weatherType: item.weather[0].main,
            temp: Math.ceil(item.temp.day),
            weekDay: WEEK_DAYS[datetime.getDay()],
            coords: null,
            datetime,
          });
        });

        commit('setForecastDay', forecastDays);
      } catch (err) {
        commit('setForecastDay', { error: 'Weather not found' });
      }
    },
  },
};
