<template>
  <div class="weather-card" :class="classType">
    <div class="weather-card__icon">
      <img :src="weatherIcon" :alt="item.weatherType" />
    </div>

    <div class="weather-card__temperature">{{ temperatureByCelcium }}&deg;C</div>
    <div class="weather-card__type">{{ item.weatherType }}</div>
    
    <div class="weather-card__date" v-if="type === 'simple'">{{ dateFormat }} <br> <b>{{ weekDay }}</b></div>
  </div>
</template>

<script>
import WEEK_DAYS from '@/utils/weekDays';
import weatherIconUrl from '@/utils/weatherIconUrl';
const isNight = (dt) => dt.getHours() < 6 && dt.getHours() > 20;

export default {
  name: 'WeatherCard',
  props: {
    type: {
      validator: value => ['promo', 'simple'].indexOf(value) !== -1
    },
    item: {
      type: Object,
    },
  },
  computed: {
    classType() {
      return `weather-card--${this.type}`
    },
    weatherIcon() {
      const { item } = this;
      const icon = weatherIconUrl(item.weatherType, isNight(item.datetime));
      return require(`@/assets/images/${icon}`);
    },
    temperatureByCelcium() {
      return Math.round(this.item.temp - 273.15)
    },
    dateFormat() {
      return this.item.datetime.toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'})
    },
    weekDay() {
      return WEEK_DAYS[this.item.datetime.getDay()];
    },
  },
}
</script>

<style lang="scss" scoped>
.weather-card {
  $b: &;
  display: block;
  text-align: center;

  &--promo {
    font-size: 18px;
  }

  &--simple {
    font-size: 14px;
    padding: 15px;
  }

  &__icon {
    display: block;
    margin: auto;

    img {
      max-width: 100%;
      max-height: 100%;
      vertical-align: middle;
    }

    #{$b}--promo & {
      width: 80px;
      height: 80px;
      line-height: 80px;
      margin-bottom: 15px;
    }

    #{$b}--simple & {
      width: 50px;
      height: 50px;
      line-height: 50px;
      margin-bottom: 10px;

      @media #{$mobileBreakpoint} {
        width: 30px;
        height: 30px;
        line-height: 30px;
      }
    }
  }

  &__temperature,
  &__type {
    #{$b}--promo & {
      margin-bottom: 15px;
    }

    #{$b}--simple & {
      margin-bottom: 20px;
    }
  }
}
</style>
