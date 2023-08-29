<template>
  <div class="w-full h-full relative pb-2">
    <div class="flex items-center mb-4 relative">
      <Input
        v-model="searchLocation"
        @input="handleSearch"
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

      <ul
        v-if="isDropdown"
        class="absolute top-[110%] z-20 bg-body rounded-xl max-h-[255px] w-full overflow-y-auto shadow-xl"
      >
        <li
          v-for="city in cities"
          :key="city"
          class="text-white p-2 cursor-pointer hover:bg-white hover:text-black transition-colors first:pt-2 last:pb-2"
          @click="handleSearchCity(city.name)"
        >
          {{ city.name }}
        </li>
      </ul>
    </div>

    <transition mode="out-in" name="fade">
      <!-- <div v-if="error" class="w-full text-center uppercase">
        {{ error }}
      </div> -->

      <div v-if="processing" class="">
        <div
          class="flex items-center justify-center h-full flex-col gap-4 text-xl"
        >
          <h3>Checking forecast</h3>
          <div>
            <Spinner class="w-10 h-10" />
          </div>
        </div>
      </div>

      <div v-else-if="weather">
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
      isDropdown: "",
    };
  },

  methods: {
    ...mapActions(weatherStore, ["getWeatherInfo", "getCitiesByQuery"]),

    handleSearch() {
      if (this.cities && this.searchLocation.length > 3) {
        this.getCitiesByQuery(this.searchLocation);
        this.isDropdown = true;
      } else {
        this.isDropdown = false;
      }
    },

    handleSearchCity(city) {
      this.getWeatherInfo(city);
      this.isDropdown = false;
    },
  },

  computed: {
    ...mapState(weatherStore, ["weather", "cities", "processing"]),
  },

  mounted() {
    this.getWeatherInfo();
    this.getCitiesByQuery("луцьк");
  },
};
</script>
