import { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { fetchDailyData } from "../../api";

import styles from "./Chart.module.css";

interface dailyDataType {
  confirmed: number;
  deaths: number;
  date: Date;
}

interface propsType extends dataType {
  country?: string;
}

const Chart = ({
  country,
  confirmed = 0,
  recovered = 0,
  deaths = 0,
  lastUpdate = new Date(),
}: propsType) => {
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
      options={{
        legend: { display: false },
        title: { display: true, text: `Biểu đồ trên toàn thế giới` },
      }}
    />
  );
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Bị nhiễm", "Đang nhiễm", "Hồi phục", "Tử vong"],
        datasets: [
          {
            label: "Số ca",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "#ff9c00",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [
              confirmed,
              confirmed - recovered - deaths,
              recovered,
              deaths,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Biểu đồ của nước ${country}` },
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>
      {country === "Global" ? lineChart : barChart}
    </div>
  );
};

export default Chart;
