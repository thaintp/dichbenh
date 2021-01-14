import { useEffect, useReducer, createContext } from "react";
import { fetchData } from "./api";
import styles from "./App.module.css";
import ncovImage from "./images/image.png";
import { CountryPicker, Chart } from "./components";

export const AppContext = createContext<any>(undefined);

const stateReducer = (state: fetchedDataType, action: Action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...action.payload,
        where: "Global",
      };
    case "COUNTRY_CHANGE":
      return {
        ...state,
        where: action.payload,
      };
    default:
      return state;
  }
};

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
        <CountryPicker />
        <Chart />
      </AppContext.Provider>
    </div>
  );
};

export default App;
