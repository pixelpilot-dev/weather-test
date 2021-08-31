<template>
  <main class="page-layout">
    <section class="weather-app">
      <SearchField
        name="city"
        placeholder="City"
        @onChange="searchCity"
        class="weather-app__city-field"
      />

      <Tabs>
        <template v-slot:headerTabs>
          <div v-if="!error" class="weather-app__header">
            <div v-if="city" class="weather-app__city">{{ city }}</div>
            <div v-if="country" class="weather-app__country">{{ country }}</div>
          </div>
        </template>

        <Tab name="Current" :selected="true">
          <div v-if="currentDay">
            <div v-if="currentDay.error" class="notification">
              {{ currentDay.error }}
            </div>
            <WeatherCard v-else :item="currentDay" type="promo" />
          </div>
        </Tab>

        <Tab name="7 day forecast">
          <div v-if="forecastDay">
            <div v-if="forecastDay.error" class="notification">
              {{ forecastDay.error }}
            </div>

            <div v-else class="weather-app__forecasts">
              <WeatherCard
                v-for="(item, index) in forecastDay"
                :key="index"
                :item="item"
                type="simple"
              />
            </div>
          </div>
        </Tab>
      </Tabs>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import SearchField from '@/components/SearchField.vue';
import Tabs from '@/components/Tabs/Tabs.vue';
import Tab from '@/components/Tabs/Tab.vue';
import WeatherCard from '@/components/WeatherCard.vue';

export default {
  name: 'Home',
  components: {
    SearchField,
    Tabs,
    Tab,
    WeatherCard,
  },
  data: () => ({
    apiKey: '5941840a31d2f820bff5c473ea263075',
  }),
  computed: {
    ...mapGetters(['city', 'country', 'currentDay', 'forecastDay']),
    error() {
      return (this.currentDay && this.currentDay.error) || (this.forecastDay && this.forecastDay.error)
    },
  },
  methods: {
    ...mapActions(['getCurrentDay', 'getForecastDay']),
    ...mapMutations(['setCity']),
    async searchCity(value) {
      this.setCity(value);

      await this.getCurrentDay({
        city: this.city,
        apiKey: this.apiKey,
      });

      await this.getForecastDay({
        coords: this.currentDay.coords,
        apiKey: this.apiKey,
      });
    },
  },
};
</script>

<style lang="scss">
.page-layout {
  width: 100%;
  max-width: 1280px;
  margin: auto;
  padding: 30px 40px;

  @media #{$mobileBreakpoint} {
    padding: 20px;
  }
}

.weather-app {
  &__city-field {
    margin-bottom: 20px;
  }

  &__header {
    font-size: 20px;
    text-align: center;
    margin-bottom: 40px;
  }

  &__city {
    margin-bottom: 20px;
  }

  &__forecasts {
    display: flex;
    justify-content: center;

    @media #{$mobileBreakpoint} {
      flex-wrap: wrap;
    }
  }
}

.notification {
  display: block;
  padding: 10px 15px;
  background-color: $error;
  color: $white;
  text-align: center;
  font-size: 14px;
  margin: 20px auto;
  border-radius: 5px;
  max-width: 500px;
}
</style>
