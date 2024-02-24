import axios from "axios";
const url = "http://192.168.10.121:8000";
const baseURL = axios.create({
  baseURL: "http://192.168.10.121:8000/api/",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});

export { baseURL, url };
