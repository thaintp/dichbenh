import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

interface dailyDataType {
  confirmed: number;
  deaths: number;
  recovered: number;
  date: string;
}

interface propsType {
  country: string;
  countryTimeSeries: timeSeriesType[];
}

const Chart = ({ country, countryTimeSeries }: propsType) => {
  const [dailyData, setDailyData] = useState<dailyDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (country === "Global") {
        setDailyData((await fetchDailyData()).reverse());
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {country === "Global" ? (
        <Line
          data={{
            labels: dailyData.map(({ date }: dailyDataType) =>
              new Date(date).toLocaleDateString()
            ),
            datasets: [
              {
                data: dailyData.map(
                  ({ confirmed }: dailyDataType) => confirmed
                ),
                label: "CA NHIỄM",
                borderColor: "rgba(0, 0, 255, 0.5)",
                fill: true,
              },
              {
                data: dailyData.map(({ deaths }: dailyDataType) => deaths),
                label: "TỬ VONG",
                borderColor: "rgba(255, 0, 0, 0.5)",
                fill: true,
              },
            ],
          }}
          options={{
            legend: { display: false },
            title: { display: true, text: `Biểu đồ trên toàn thế giới` },
          }}
        />
      ) : (
        <Line
          data={{
            labels: countryTimeSeries.map(({ date }: timeSeriesType) =>
              new Date(date).toLocaleDateString()
            ),
            datasets: [
              {
                data: countryTimeSeries.map(
                  ({ confirmed }: timeSeriesType) => confirmed
                ),
                label: "CA NHIỄM",
                borderColor: "rgba(0, 0, 255, 0.5)",
                fill: true,
              },
              {
                data: countryTimeSeries.map(
                  ({ deaths }: timeSeriesType) => deaths
                ),
                label: "TỬ VONG",
                borderColor: "rgba(255, 0, 0, 0.5)",
                fill: true,
              },
            ],
          }}
          options={{
            legend: { display: false },
            title: { display: true, text: `Biểu đồ của nước ${country}` },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
