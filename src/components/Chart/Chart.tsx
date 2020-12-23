import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

interface dailyDataType {
  confirmed: number;
  deaths: number;
  date: Date;
}

const Chart = () => {
  const [dailyData, setDailyData] = useState<dailyDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setDailyData((await fetchDailyData()).reverse());
    };
    fetchData();
  }, []);

  const lineChart = (
    <Line
      data={{
        labels: dailyData.map(({ date }: dailyDataType) =>
          new Date(date).toLocaleDateString()
        ),
        datasets: [
          {
            data: dailyData.map(({ confirmed }: dailyDataType) => confirmed),
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
    />
  );
  return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;
