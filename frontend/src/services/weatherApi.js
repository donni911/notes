import axios from "axios";
import axiosWeatherClient from "../modules/axiosWeatherClient.js";

const getWeather = async (url, params) => {
  const response = await axiosWeatherClient
    .get(url, {
      params: params,
    })

    .then((response) => {
      if (response.data.cod == "200") {
        return response.data;
      }
    })

    .catch((error) => {
      throw new Error(error.response.data.message);
    });

  return response;
};

const getCities = async (query) => {
  const response = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`
  );
  const cities = response.data;
  return cities;
};

export { getWeather, getCities };
