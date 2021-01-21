import { useEffect, useReducer, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { stateReducer } from "./reducers";
import { CountryPicker, Chart, Cards } from "./components";
import ncovImage from "./images/image.png";
import { fetchData } from "./api";

import styles from "./App.module.css";

export const AppContext = createContext<any>(undefined);

const App = () => {
  const [state, dispatch] = useReducer(stateReducer, {});

  useEffect(() => {
    fetchData().then((res) => {
      dispatch({ type: "INIT", payload: res });
    });
  }, []);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={ncovImage} alt="COVID-19" />
      <AppContext.Provider value={[state, dispatch]}>
        <div>Cập nhật: {state.dateDaily?.slice(-1)[0]}</div>
        <CountryPicker />
        <Cards />
        <Chart />
      </AppContext.Provider>
    </div>
  );
};

export default App;
