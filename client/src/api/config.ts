import axios from "axios";
import { getProfileFromLS } from "../utils";

const instance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 10 * 1000,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = getProfileFromLS()?.accessToken || "";
    if (accessToken && config.headers) {
      config.headers.authorization = `Bearer ${accessToken}`;
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
