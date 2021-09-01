import ax from 'axios';
import * as request from '@/provide/request';
import { API_URL } from '@/utils/openWeatherApi';

export const axios = ax;

export default {
  install(Vue) {
    Vue.prototype.$axios = ax;

    const instance = ax.create({
      baseURL: API_URL,
    });

    request.set(instance);
  }
};
