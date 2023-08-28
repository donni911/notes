import { defineStore } from "pinia";
import axiosWeatherClient from "../modules/axiosWeatherClient.js";

const weatherStore = defineStore("weatherStore", {
  state: () => ({
    weather: null,
  }),

  actions: {
    async getWeatherInfo(params) {
      await axiosWeatherClient
        .get("/weather", {
          params: params,
        })

        .then((response) => {
          this.error = false;

          if (response.data.cod == "200") {
            this.weather = response.data;
          }
        })

        .catch((error) => {
          if (error.response.data.cod == "404") {
            this.error = error.response.data.message;
          }
        });
    },
  },
});

export { weatherStore };
