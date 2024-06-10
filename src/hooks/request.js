import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { get, post, put, del } from "config/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useRequest = (url, method = 'get') => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { auth } = useSelector(
    (state) => ({
      auth: state.auth
    }),
    shallowEqual
  );

  const request = async (data, config, pk = null) => {
    setIsLoading(true)
    config = {headers: {...config}}
    if (auth?.token) {
      config.headers['Authorization'] = `Token ${auth.token}`
    }
    if (pk) {
      url = `${url}/${pk}`
    }
    let response = null
    if (method === 'get') {
      await get(url, config)
      .then((res) => {
        response = res
      }, (error) => {
        response = error?.response
      })
    } else if (method === 'post') {
      await post(url, data, config)
      .then((res) => {
        response = res
      }, (error) => {
        response = error?.response
      })
    } else if (method === 'put') {
      await put(url, data, config)
      .then((res) => {
        response = res
      }, (error) => {
        response = error?.response
      })
    } else if (method === 'delete') {
      await del(url, config)
      .then((res) => {
        response = res
      }, (error) => {
        response = error?.response
      })
    }
    setIsLoading(false)
    if (response.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Usuário não credenciado",
        text: "Redirecionando para a tela de login",
        timer: 5000,
      }).then(() => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      });
    }
    if (response.status === 500) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Algum erro aconteceu em ${url}`,
      }).then(() => {
        console.log(response.data)
      })
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