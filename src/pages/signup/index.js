import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../../hooks/request";
import { shallowEqual, useSelector } from "react-redux";

const SignUpPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const { request } = useRequest('/create_user', 'post');
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

  const handleSignUp = async () => {
    if (username && password) {
      const response = await request({
        first_name: firstname,
        last_name: lastname,
        username: username,
        password: password,
      })
      if (Array.isArray(response?.username) && response?.username.length > 0) {
        alert(response.username[0]);
      } else if (!response?.username) {
        alert(response);
      } else {
        alert(`usuario ${response?.username} foi criado com sucesso`);
        navigate("/login");
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
              Crie sua nova conta
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label form="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Primeiro nome</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div>
                <label form="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sobrenome</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div>
                <label form="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome de usúario</label>
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
                <label form="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
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
              <button
                className="w-full border border-gray-500 text-gray-800 dark:text-gray-200 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSignUp}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
