import { useState, useEffect } from "react";
import { fetchGlobalData, fetchLocalData, fetchTimeSeries } from "./api";
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import ncovImage from "./images/image.png";

const App = () => {
  const [data, setData] = useState<dataType | undefined>(undefined);
  const [country, setCountry] = useState<string>("Global");
  const [timeSeries, setTimeSeries] = useState<
    Record<string, timeSeriesType[]>
  >({});
  const [countryTimeSeries, setCountryTimeSeries] = useState<timeSeriesType[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setData(await fetchGlobalData());
      setTimeSeries(await fetchTimeSeries());
    };
    fetchData();
  }, []);
  useEffect(() => {
    country !== "Global" && setCountryTimeSeries(timeSeries[country]);
  }, [country]);

  const handleCountryChange = async (country: string) => {
    const fetchedData = await (country
      ? fetchLocalData(country)
      : fetchGlobalData());
    setCountry(country ? country : "Global");
    setData(fetchedData);
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src={ncovImage} alt="COVID-19" />
      <Cards {...data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart country={country} countryTimeSeries={countryTimeSeries} />
    </div>
  );
};

export default App;
