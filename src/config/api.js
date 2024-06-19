import axios from "axios";

const HOST = process.env.REACT_APP_SERVER_HOST ?? "https://gds-system-server2-056dd24e05d4.herokuapp.com";

const api = axios.create({
  baseURL: HOST,
});

const get = (url, config) => {
  return api.get(url, config)
}

const post = (url, data, config) => {
  return api.post(url, data, config)
}

const put = (url, data, config) => {
  return api.put(url, data, config)
}

const del = (url, config) => {
  return api.delete(url, config)
}

export {
  get,
  post,
  put,
  del,
};