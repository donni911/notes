import axios from "axios";

const axiosWeatherClient = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_BASE_URL,
  params:{
    units:'metric',
    appid:import.meta.env.VITE_WEATHER_API_KEY,
  }
});

export default axiosWeatherClient;
