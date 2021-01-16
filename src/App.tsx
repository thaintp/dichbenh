import { useEffect, useReducer, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchData, extractDaily } from "./api";
import styles from "./App.module.css";
import ncovImage from "./images/image.png";
import { CountryPicker, Chart, Cards } from "./components";

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
        ...extractDaily(
          action.payload === "Global"
            ? state.worldChart
            : state.data[action.payload]
        ),
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
    <div className="App">
      <img className={styles.image} src={ncovImage} alt="COVID-19" />
      <AppContext.Provider value={[state, dispatch]}>
        <Cards />
        <CountryPicker />
        <Chart />
      </AppContext.Provider>
    </div>
  );
};

export default App;
