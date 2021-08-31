<template>
  <div class="weather-card" :class="classType">
    <div class="weather-card__icon">
      <img :src="icon" :alt="item.weatherType" />
    </div>

    <div class="weather-card__temperature">{{ temperatureByCelcium }}&deg;C</div>
    <div class="weather-card__type">{{ item.weatherType }}</div>
    
    <div class="weather-card__date" v-if="type === 'simple'">{{ date }} <br> <b>{{ item.weekDay }}</b></div>
  </div>
</template>

<script>
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
    icon() {
      return require(`@/assets/images/${this.item.weatherIcon}`)
    },
    classType() {
      return `weather-card--${this.type}`
    },
    temperatureByCelcium() {
      return Math.round(this.item.temp - 273.15)
    },
    date() {
      return this.item.datetime.toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'})
    }
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
