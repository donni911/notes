import { defineStore } from "pinia";
import { getWeather, getCities } from "../services/weatherApi.js";
import debounce from "../modules/helpers/debounce.js";

const weatherStore = defineStore("weatherStore", {
  state: () => ({
    weather: null,
    processing: true,
    cities: [],
  }),

  actions: {
    async successWeatherCoords(response) {
      const { latitude: lat, longitude: lon } = response.coords;
      this.weather = await getWeather("/weather", { lat, lon });
      this.processing = false;
    },

    async unSuccessWeatherCoords() {
      const query = "Kyiv";
      this.weather = await getWeather("/weather", { q: query });
      this.processing = false;
    },

    // GET CITIES
    getCitiesByQuery: debounce(async function (query) {
      this.cities = await getCities(query);
    }, 300),

    async getWeatherInfo(query) {
      if (query) {
        this.weather = await getWeather("/weather", { q: query });
      } else {
        navigator.geolocation.getCurrentPosition(
          this.successWeatherCoords,
          this.unSuccessWeatherCoords
        );
      }
    },
  },
});

export { weatherStore };
