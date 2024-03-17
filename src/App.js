import React, { useState } from 'react';
import {Provider, useDispatch} from "react-redux";
import { useStore } from "./store";
import { AppRoutes } from './routes';

function App() {
  return (
    <>
      <Provider store={useStore({})}>
        <AppRoutes />
      </Provider>
    </>
  );
}

export default App;
