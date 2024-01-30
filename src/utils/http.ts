import axios from "axios";

const configs = {
  baseURL: "http://localhost:3003",
};

const http = axios.create(configs);

export default http;
