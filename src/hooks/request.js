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
    config = {headers: {...config, 'Authorization': 'Token ' + auth.token ?? 'no-token'}}
    let response = null;
    if (method === 'get') {
      response = await get(url, config)
    } else {
      response = await post(url, data, config)
    }
    setIsLoading(false)
    if (response.status === 401) {
      alert(`not authenticated ${url}`)
      dispatch({ type: "LOGOUT" });
      redirect("/auth/login");
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