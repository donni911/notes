<template>
  <div class="w-full h-full relative pb-2">
    <div class="flex items-center mb-4 relative">
      <Input
        v-model="searchLocation"
        @enterClick="weatherInfo"
        :placeholder="'Look for a weather'"
        :classes="'shadow-md rounded-full px-4 py-3 pr-10 w-full'"
      />
      <SvgButton
        @clickEvent="weatherInfo"
        :tippyCaption="'Find'"
        :icon="'fa-solid fa-magnifying-glass'"
        class="absolute right-4"
        :classes="'dark:[&>svg>path]:fill-body-dark-inner'"
      />
    </div>

    <transition mode="out-in" name="fade">
      <div v-if="error" class="w-full text-center uppercase">
        {{ error }}
      </div>

      <button
        v-else-if="processing == true"
        type="button"
        class="w-full text-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md dark:text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
        disabled=""
      >
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Processing...
      </button>

      <div v-else-if="weather" class="grid md:grid-cols-[70%_30%]">
        <Weather-Card :weather="weather" />
      </div>
      <div v-else class="w-full text-center uppercase dark:text-white">
        Start typing!
      </div>
    </transition>
  </div>
</template>

<script>
import Input from "../components/UI/Input.vue";
import WeatherCard from "../components/Weather/WeatherCard.vue";
import SvgButton from "../components/UI/SvgButton.vue";
import axiosWeatherClient from "../modules/axiosWeatherClient.js";

export default {
  components: {
    Input,
    WeatherCard,
    SvgButton,
  },

  data() {
    return {
      searchLocation: "London",
      weather: null,
      processing: false,
      error: false,
    };
  },

  methods: {
    async weatherInfo() {
      await axiosWeatherClient
        .get(
          `weather?q=${this.searchLocation}` +
            `&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
        )
        .then((response) => {
          this.error = false;
          this.processing = true;

          if (response.data.cod == "200") {
            this.processing = false;
            this.weather = response.data;
          }

          console.log(response.data);
        })

        .catch((error) => {
          if (error.response.data.cod == "404") {
            this.error = error.response.data.message;
            this.processing = false;
          }
        });
    },
  },
};
</script>
