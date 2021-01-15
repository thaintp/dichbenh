import { useContext } from "react";
import { Line } from "react-chartjs-2";
import { AppContext } from "../../App";
import { isMobile } from "react-device-detect";

import styles from "./Chart.module.css";

const Chart = () => {
  const [state] = useContext(AppContext);

  return (
    <div className={styles.container}>
      <Line
        data={{
          labels: state.dateDaily,
          datasets: [
            {
              label: "Confirmed",
              data: state.confirmedDaily,
              borderColor: "#4285f4",
              fill: false,
              pointRadius: isMobile ? 1 : 3,
            },
            {
              label: "Recovered",
              data: state.recoveredDaily,
              borderColor: "#0c9d58",
              fill: false,
              pointRadius: isMobile ? 1 : 3,
            },
            {
              label: "Deaths",
              data: state.deathDaily,
              borderColor: "#db4337",
              fill: false,
              pointRadius: isMobile ? 1 : 3,
            },
            {
              label: "Active",
              data: state.activeDaily,
              borderColor: "#f4b400",
              fill: false,
              pointRadius: isMobile ? 1 : 3,
            },
          ],
        }}
        options={{
          animation: {
            duration: 1000,
            easing: "easeInOutQuint",
          },
          layout: {
            padding: {
              left: isMobile ? 5 : 50,
              right: isMobile ? 5 : 50,
              top: isMobile ? 5 : 50,
              bottom: 10,
            },
          },
          legend: {
            labels: {
              boxWidth: isMobile ? 10 : 40,
              padding: 10,
            },
          },
          title: {
            display: true,
            text: `Biểu đồ của ${
              state?.where !== "Global" ? state?.where : "thế giới"
            }`,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  maxTicksLimit: isMobile ? 4 : 10,
                  maxRotation: 0,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default Chart;
