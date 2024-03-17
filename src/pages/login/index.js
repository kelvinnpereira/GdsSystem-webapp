import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../../hooks/request";
import {shallowEqual, useDispatch, useSelector} from "react-redux";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {request, isLoading} = useRequest('/token/', 'post');
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
  }, [])

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

  const handleRegister = () => {
    navigate("/register"); // Redirecionar para a página de registro
  };

  return (
    <section className="min-vh-100 d-flex align-items-center lilac-background">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card bg-light text-dark rounded-3">
              <div className="card-body p-md-5 mx-md-4">
                <div className="text-center">
                  <h1 className="mt-1 mb-5 pb-1">GDS System</h1>
                  <p className="mb-5">
                    O GDS System ajuda você a gamificar suas aulas e compartilhar ideias
                  </p>
                </div>

                <div className="login-form">
                  <div className="mb-4">
                    <input
                      type="text"
                      className="form-control login-input"
                      placeholder="Nome de usuário"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      type="password"
                      className="form-control login-input"
                      placeholder="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="text-center mb-5">
                    <button
                      className="btn btn-primary login-button"
                      onClick={handleLogin}
                    >
                      Entrar
                    </button>
                    <br />
                    <p className="mb-0 me-2">Não tem uma conta?</p>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={handleRegister}
                    >
                      Registrar
                    </button>
                  </div>

                  {error && <div className="text-danger">{error}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
