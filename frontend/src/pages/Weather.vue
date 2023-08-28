<template>
  <div class="w-full h-full relative pb-2">
    <div class="flex items-center mb-4 relative">
      <Input
        v-model="searchLocation"
        @enterClick="handleWeatherSearch"
        :placeholder="'Look for a weather in...'"
        :classes="'shadow-md rounded-full px-4 py-3 pr-10 w-full'"
      />
      <SvgButton
        @clickEvent="getWeatherInfo"
        :tippyCaption="'Find'"
        :icon="'fa-solid fa-magnifying-glass'"
        class="absolute right-4"
        :classes="'dark:[&>svg>path]:fill-body-dark-inner'"
      />
    </div>

    <transition mode="out-in" name="fade">
      <!-- <div v-if="error" class="w-full text-center uppercase">
        {{ error }}
      </div> -->

      <div v-if="processing">
        <Spinner />
      </div>

      <div v-else class="grid md:grid-cols-[70%_30%]">
        <WeatherCard :weather="weather" />
      </div>
    </transition>
  </div>
</template>

<script>
import Input from "../components/UI/Input.vue";
import WeatherCard from "../components/Weather/WeatherCard.vue";
import SvgButton from "../components/UI/SvgButton.vue";

import Spinner from "../components/UI/Spinner.vue";
import { mapActions, mapState } from "pinia";

import { weatherStore } from "../store/weather.js";

export default {
  components: {
    Input,
    WeatherCard,
    SvgButton,
    Spinner,
  },

  data() {
    return {
      searchLocation: "",
      processing: false,
      coordinates: null,
    };
  },

  methods: {
    ...mapActions(weatherStore, ["getWeatherInfo"]),

    successWeatherCoords(response) {
      this.coordinates = response.coords;
      this.processing = true;
      this.getWeatherInfo({
        lat: this.coordinates.latitude,
        lon: this.coordinates.longitude,
      });
      this.processing = false;
    },

    async handleWeatherSearch() {
      this.processing = true;
      await this.getWeatherInfo({ q: this.searchLocation });
      this.processing = false;
    },
  },

  computed: {
    ...mapState(weatherStore, ["weather", "error"]),
  },

  mounted() {
    navigator.geolocation.getCurrentPosition(this.successWeatherCoords);
    // this.getWeatherInfo({ q: "london" });
  },
};
</script>
