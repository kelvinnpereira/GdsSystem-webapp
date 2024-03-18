import { Provider } from "react-redux";
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
