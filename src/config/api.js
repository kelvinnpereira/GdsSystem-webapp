import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

const post = (url, data, config) => {
  return api.post(url, data, config)
}

const get = (url, config) => {
  return api.get(url, config)
}

export {
  post,
  get
};