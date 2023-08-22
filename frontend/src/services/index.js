import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  timeout: 4000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default http;
