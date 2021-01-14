import { useContext, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { AppContext } from "../../App";

import styles from "./Chart.module.css";

const Chart = () => {
  const [state] = useContext(AppContext);
  const [chart, setChart] = useState<dailyDataType[]>([]);

  useEffect(() => {
    if (state.data) {
      setChart(
        state.where !== "Global" ? state.data[state.where] : state.worldChart
      );
    }
  }, [state]);

  return (
    <div className={styles.container}>
      <Line
        data={{
          labels: chart.map(({ date }: dailyDataType) =>
            new Date(date).toLocaleDateString()
          ),
          datasets: [
            {
              data: chart.map(({ confirmed }: dailyDataType) => confirmed),
              label: "CA NHIỄM",
              borderColor: "rgba(0, 0, 255, 0.5)",
              fill: true,
            },
            {
              data: chart.map(({ deaths }: dailyDataType) => deaths),
              label: "TỬ VONG",
              borderColor: "rgba(255, 0, 0, 0.5)",
              fill: true,
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: {
            display: true,
            text: `Biểu đồ ${
              state?.where !== "Global"
                ? "của nước " + state?.where
                : "trên thế giới"
            }`,
          },
        }}
      />
    </div>
  );
};

export default Chart;
