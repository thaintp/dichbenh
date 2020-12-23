import {
  fetchGlobalData,
  fetchLocalData,
  fetchDailyData,
  fetchCountriesName,
} from "./api";
import { Cards, Chart } from "./components";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import ncovImage from "./images/image.png";

const App = () => {
  const [data, setData] = useState<dataType | undefined>(undefined);
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setData(await fetchGlobalData());
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <img className={styles.image} src={ncovImage} alt="COVID-19" />
      <Cards {...data} />
      <Chart />
    </div>
  );
};

export default App;
