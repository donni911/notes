import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  timeout: 4000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  http.defaults.headers.common.Authorization = `Bearer ${token}`;
};
export const unsetAuthToken = () => {
  http.defaults.headers.common.Authorization = null;
};

export default http;
