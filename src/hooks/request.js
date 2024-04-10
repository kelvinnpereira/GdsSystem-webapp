import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { get, post } from "../config/api";
import { redirect } from "react-router-dom";

const useRequest = (url, method = 'get') => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector(
    (state) => ({
      auth: state.auth
    }),
    shallowEqual
  );

  const request = async (data, config) => {
    setIsLoading(true)
    config = {headers: {...config}}
    if (auth?.token) {
      config.headers['Authorization'] = `Token ${auth.token}`
    }
    let response = null
    if (method === 'get') {
      await get(url, config)
      .then((res) => {
        response = res
      }, (error) => {
        response = error?.response
      })
    } else {
      await post(url, data, config)
      .then((res) => {
        response = res
      }, (error) => {
        response = error?.response
      })
    }
    setIsLoading(false)
    if (response.status === 401) {
      dispatch({ type: "LOGOUT" });
      redirect("/login");
      return;
    }
    if (response.status === 500) {
      alert(`Some error happened in ${url}`)
    }
    setResponse(response.data);
    return response.data
  }

  return {
    request,
    response,
    isLoading,
  };
}

export default useRequest;