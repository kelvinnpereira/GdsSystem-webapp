import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPages from './pages/login/index';
import HomePage from './pages/home/index';
import SignUpPage from "./pages/signup";
import ProjectNew from "./pages/project/new";
import ProjectEdit from "./pages/project/edit";
import Empty from "./layouts/empty"
import Main from "./layouts/main";
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
          <Route element={<Empty/>}>
            <Route path="/login" element={<LoginPages />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>
          <Route element={<Main/>}>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/project/new" element={<ProjectNew />} />
            <Route path="/project/edit" element={<ProjectEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
