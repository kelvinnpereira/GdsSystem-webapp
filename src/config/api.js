import axios from "axios";

const HOST = process.env.SERVER_HOST ?? "https://gds-system-server-48ae9d941d52.herokuapp.com";

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