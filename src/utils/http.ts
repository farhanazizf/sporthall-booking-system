import axios from "axios";
import { removeStorageValue } from "./local-storage";

const configs = {
  baseURL: "http://localhost:3003",
};

const http = axios.create(configs);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 404) {
      removeStorageValue("auth");
      window.location.href = "/login";
    }
    throw error;
  }
);

export default http;
