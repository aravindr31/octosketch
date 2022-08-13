import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

function Chart({ langData }) {
  const [langValue, setLangValue] = useState(null);
  ChartJS.register(ArcElement, Tooltip, Legend);
  const labels = langData.map((cData) => cData?.label);
  const bgColors = langData.map((cData) => cData?.color);
  const values = langData.map((cData) => cData?.value);
  const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontSize: 14,
    },
  };

  const colorReducer = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    return "rgba(" + r + "," + g + "," + b + "," + ".6)";
  };
  const reducedBgColor = bgColors.map((bgColor) => colorReducer(bgColor));

  useEffect(() => {
    const dataObj = {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: bgColors.map((bgColor) => colorReducer(bgColor)),
          borderColor: reducedBgColor,
          borderWidth: 1,
        },
      ],
    };
    setLangValue(dataObj);
  }, []);
  return (
    <div className="max-w-[1200px] -mt-24 grid gap-8 justify-center mx-auto grid-cols-1 justify-items-center md:grid-cols-2 lg:flex">
      <div className="bg-white max-w-[500px] p-5 rounded-md shadow-lg">
        <div className="flex flex-col py-3">
          <h2 className="text-3xl underline-offset-8 decoration-dashed decoration-neutral-400  decoration-2 underline">
            Languages
          </h2>
        </div>
        {langValue && (
          <Pie
            className="text-center pt-2"
            data={langValue}
            height={300}
            width={300}
            options={{
              plugins: {
                legend: {
                  display: true,
                  position: "right",
                  align: "start",
                  labels: {
                    font: {
                      color: "#323130",
                      size: 10,
                    },
                  },
                },
              },
            }}
          />
        )}
      </div>
      <div className="bg-white max-w-[500px] p-5 rounded-md shadow-lg">
        <div className="flex flex-col py-3">
          <h2 className="text-3xl underline-offset-8 decoration-dashed decoration-neutral-400  decoration-2 underline">
            Most Stared
          </h2>
        </div>
        {/* {langValue && (
          <Pie
            className="text-center pt-2"
            data={langValue}
            height={300}
            width={300}
            options={{
              plugins: {
                legend: {
                  position: "top",
                  align: "right",
                  labels: {
                    fontColor: "#323130",
                    fontSize: 20,
                  },
                },
              },
            }}
          />
        )} */}
      </div>
      <div className="bg-white max-w-[500px] p-5 rounded-md shadow-lg">
        <div className="flex flex-col py-3">
          <h2 className="text-3xl underline-offset-8 decoration-dashed decoration-neutral-400  decoration-2 underline">
            Languages
          </h2>
        </div>
        {/* {langValue && (
          <Pie
            className="text-center pt-2"
            data={langValue}
            height={300}
            width={300}
          />
        )} */}
      </div>
    </div>
  );
}

export default Chart;
