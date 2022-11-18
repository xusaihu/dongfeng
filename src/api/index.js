import axios from "axios";
const baseURL = localStorage.getItem("baseUrl") || "https://zkg.mynatapp.cc";
const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;
