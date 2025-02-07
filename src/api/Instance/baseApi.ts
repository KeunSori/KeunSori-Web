import axios from "axios";

const API_URL = "https://keunsori-api.everdu.com/";

const baseApi = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export default baseApi;
