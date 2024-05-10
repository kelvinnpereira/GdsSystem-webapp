import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../../hooks/request";
import {shallowEqual, useDispatch, useSelector} from "react-redux";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { request } = useRequest('/token', 'post');
  const { auth } = useSelector(
    (state) => ({
      auth: state.auth
    }),
    shallowEqual
  );

  useEffect(() => {
    if (auth?.token) {
      navigate('/home')
    }
  })

  const handleLogin = async () => {
    if (username && password) {
      const response = await request({
        username: username,
        password: password,
      }).catch(err => {
        dispatch({type: "LOGOUT",});
        alert(err)
      })
      if (!response?.token) {
        dispatch({type: "LOGOUT",});
      } else {
        dispatch({
          type: "LOGIN",
          auth: {
            token: response.token,
            username: username,
          }
        });
        navigate("/home");
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <p href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Gds System
        </p>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Faça login na sua conta
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label form="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu nome de usúario</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label form="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sua senha</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                  </div>
                  <div className="ml-3 text-sm">
                    <label form="remember" className="text-gray-500 dark:text-gray-300">Lembrar de mim</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Esqueceu a senha?</a>
              </div>
              <button
                className="w-full border border-gray-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleLogin}
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Ainda não tem uma conta? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Cadastre-se</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
