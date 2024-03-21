import axios from "axios";
const url = "http://103.145.138.53:5000";
const baseURL = axios.create({
  baseURL: "http://103.145.138.53:5000/api",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});

export { baseURL, url };
