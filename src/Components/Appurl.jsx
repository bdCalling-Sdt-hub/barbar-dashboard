import axios from "axios";

const baseURL = axios.create({
    baseURL: "http://192.168.10.121:8000/api",
    timeout: 10000,
    headers: { "X-Custom-Header": "foobar" }
})

export default baseURL