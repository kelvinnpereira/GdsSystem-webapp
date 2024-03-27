import axios from "axios";

const HOST = process.env.SERVER_HOST ?? "http://localhost:8000";

const api = axios.create({
  baseURL: HOST,
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