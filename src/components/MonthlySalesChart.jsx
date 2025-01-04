import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import Loading from "./Loading";
defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";
function MonthlySalesChart() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${API_URL}/sales/monthly`,

        { withCredentials: true }
      );

      setData(response.data.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [error]);

  if (loading) {
    return (
      <div className="text-2xl h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="mt-1 w-3/4">
        {error && (
          <div
            className="fixed top-5 mt-24 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded-md shadow-lg"
            role="alert"
          >
            {error}
          </div>
        )}

        <Bar
          data={{
            // labels: [
            //   "Jan",
            //   "Feb",
            //   "March",
            //   "April",
            //   "May",
            //   "June",
            //   "July",
            //   "Aug",
            //   "Sept",
            //   "Oct",
            //   "Nov",
            //   "Dec",
            // ],
            labels: data.map((entry) => entry.monthName),
            datasets: [
              {
                label: "Total Amt",
                // data: [
                //   1000, 2000, 3000, 4000, 1000, 6000, 7000, 4000, 1000, 10000,
                //   15000, 20000,
                // ],
                data: data.map((entry) => entry.total),
                borderColor: "rgba(0, 255, 0, 1)",
                backgroundColor: "rgba(0, 255, 0, 1)",
                borderRadius: 5,
              },
              {
                label: "Margin Amt",
                // data: [
                //   500, 1000, 300, 200, 2000, 1700, 800, 650, 330, 420, 1270, 1772,
                // ],
                data: data.map((entry) => entry.margin),
                borderColor: "rgba(255, 0, 0, 1)",
                backgroundColor: "rgba(255, 0, 0, 1)",
                borderRadius: 2,
              },
            ],
          }}
        />
      </div>
    );
  }
}

export default MonthlySalesChart;
