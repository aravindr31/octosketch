import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { colorPool } from "../../utils/colorPool";
import { Pie, Bar, Doughnut } from "react-chartjs-2";

function Chart({ langData, starRepos }) {
  const [langValue, setLangValue] = useState(null);
  const [starValue, setStarValue] = useState(null);
  const [starLangValue, setStarLangValue] = useState(null);

  const labels = langData?.map((cData) => cData.label);
  const bgColors = langData?.map((cData) => cData.color);
  const values = langData?.map((cData) => cData.value);
  const staredRepoNames = starRepos?.flatMap((obj) =>
    obj.language != null ? [obj.name] : []
  );
  const staredRepoCount = starRepos?.flatMap((obj) =>
    obj.language != null ? [obj.stargazers_count] : []
  );

  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
  );

  const colorReducer = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    return "rgba(" + r + "," + g + "," + b + "," + ".6)";
  };
  const reducedBgColor = (bgColor) => {
    return bgColors.map((bgColor) => colorReducer(bgColor));
  };

  const getStarRepoLang = () => {
    const fRepos = new Set(starRepos.map((repo) => repo.language));
    const repolabels = Array.from(fRepos.values()).filter((lan) => lan);
    const values = repolabels.map((lang) => {
      const eachRepo = starRepos.filter((repo) => repo.language == lang);
      const starAccValue = eachRepo.map((r) => r.stargazers_count);
      const accVal = starAccValue.reduce((x, y) => x + y, 0);
      return accVal;
    });
    return [repolabels, values];
  };

  useEffect(() => {
    const Chart1 = {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: reducedBgColor(bgColors),
          borderColor: reducedBgColor,
          borderWidth: 1,
        },
      ],
    };
    setLangValue(Chart1);

    const Chart2 = {
      labels: staredRepoNames,
      datasets: [
        {
          data: staredRepoCount,
          backgroundColor: reducedBgColor(colorPool).slice(
            0,
            starRepos?.length
          ),
          borderColor: reducedBgColor(colorPool).slice(0, starRepos?.length),
          borderWidth: 1,
        },
      ],
    };
    setStarValue(Chart2);

    const Chart3 = {
      labels: getStarRepoLang()[0],
      datasets: [
        {
          data: getStarRepoLang()[1],
          backgroundColor: reducedBgColor(colorPool).slice(
            0,
            starRepos?.length
          ),
          borderColor: reducedBgColor(colorPool).slice(0, starRepos?.length),
          borderWidth: 1,
        },
      ],
    };
    setStarLangValue(Chart3);
  }, []);
  return (
    <div className="max-w-[1200px] -mt-24 mb-8 grid gap-8 justify-center mx-auto grid-cols-1 justify-items-center md:grid-cols-2 lg:flex">
      <div className="bg-white max-w-[500px] p-5 rounded-md shadow-xl">
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
      <div className="bg-white max-w-[500px] p-5 rounded-md shadow-xl">
        <div className="flex flex-col py-3">
          <h2 className="text-3xl underline-offset-8 decoration-dashed decoration-neutral-400  decoration-2 underline">
            Most Stared
          </h2>
        </div>
        {starValue && (
          <Bar
            className="text-center pt-2"
            data={starValue}
            height={300}
            width={300}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        )}
      </div>
      <div className="bg-white max-w-[500px] p-5 rounded-md shadow-xl">
        <div className="flex flex-col py-3">
          <h2 className="text-3xl underline-offset-8 decoration-dashed decoration-neutral-400  decoration-2 underline">
            Star Per Language
          </h2>
        </div>
        {starLangValue && (
          <Doughnut
            className="text-center pt-2"
            data={starLangValue}
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
    </div>
  );
}

export default Chart;
