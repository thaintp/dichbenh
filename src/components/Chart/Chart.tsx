import { useContext } from "react";
import { Line } from "react-chartjs-2";
import { AppContext } from "../../App";
import { isMobile } from "react-device-detect";

const Chart = () => {
  const [
    {
      dateDaily,
      confirmedDaily,
      recoveredDaily,
      deathDaily,
      activeDaily,
      where,
    },
  ] = useContext(AppContext);

  return (
    <div>
      <Line
        data={{
          labels: dateDaily,
          datasets: [
            {
              label: "Tổng ca nhiễm",
              data: confirmedDaily,
              borderColor: "#4285f4",
              fill: false,
              pointRadius: isMobile ? 1 : 3,
            },
            {
              label: "Khỏi",
              data: recoveredDaily,
              borderColor: "#0c9d58",
              fill: false,
              pointRadius: isMobile ? 1 : 3,
            },
            {
              label: "Tử vong",
              data: deathDaily,
              borderColor: "#db4337",
              fill: false,
              pointRadius: isMobile ? 1 : 3,
            },
            {
              label: "Đang nhiễm",
              data: activeDaily,
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
            text: `Biểu đồ của ${where !== "Global" ? where : "thế giới"}`,
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
