import useSWR from "swr";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { get } from "config/api";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = (url, options = {}) => {
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { auth } = useSelector(
    state => ({
      auth: state.auth
    }),
    shallowEqual
  );

  const fetcher = async (url) => {
    if (url.includes("undefined")) {
      return;
    }
    let response = null
    await get(url, {headers: {Authorization: `Token ${auth.token}`}})
    .then((res) => {
      response = res
    }, (error) => {
      response = error?.response
    })
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
    return response.data;
  };

  const { data, error, mutate, isValidating } = useSWR(url, fetcher, {...options, revalidateOnFocus: false});

  const isLoading = !data;

  const reValidate = async (dataToRevalidate = null) => {
    await mutate(dataToRevalidate, !dataToRevalidate);
  };

  return { data, error, isLoading, reValidate, isValidating };
};

export default useFetch