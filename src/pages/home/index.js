import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector(
    (state) => ({
      auth: state.auth
    }),
    shallowEqual
  );
  useEffect(() => {
    if (!auth.token) {
      dispatch({type: "LOGOUT",});
      navigate('/login')
    }
  }, []);

  return (
    <>
      projects
    </>
  );
};

export default HomePage;