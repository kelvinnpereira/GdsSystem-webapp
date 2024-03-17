import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPages from './pages/login/index';
import HomePage from './pages/home/index';
import { useDispatch, } from "react-redux";

export const AppRoutes = () => {
  const dispatch = useDispatch();
  dispatch({
    type: "RESTORE",
  });
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPages />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
