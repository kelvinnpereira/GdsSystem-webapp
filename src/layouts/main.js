import {Outlet} from 'react-router-dom';
import Navbar from "../components/navbar/navbar";

const Main = () => {
  return (
    <>
      <div
        data-layout="main-layout"
        className="font-sans antialiased text-sm w-full bg-white dark:bg-gray-800 text-white light"
      >
        <Navbar/>
        <Outlet/>
      </div>
    </>
  )
}

export default Main;