import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL as string;

const baseApi = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export default baseApi;
