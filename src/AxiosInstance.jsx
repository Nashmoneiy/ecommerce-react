import axios from "axios";

const token = localStorage.getItem("auth_token");

const AxiosInstance = axios.create({
  baseURL: "https://laravel-api-production-1878.up.railway.app/",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default AxiosInstance;
