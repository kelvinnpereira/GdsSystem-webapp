import {Outlet, useNavigate} from 'react-router-dom';
import Navbar from "../components/navbar/navbar";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
const Main = () => {
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
      <div
        data-layout="main-layout"
        className="font-sans antialiased text-sm dark w-full bg-gray-800 text-white"
      >
        <Navbar/>
        <Outlet/>
      </div>
    </>
  )
}

export default Main;