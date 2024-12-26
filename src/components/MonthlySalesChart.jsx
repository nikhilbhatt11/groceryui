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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v1/sales/monthly",

        { withCredentials: true }
      );
      console.log(response.data.data);
      setData(response.data.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-2xl h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="mt-1 w-3/4">
        {/* <Bar
        data={{
          // labels: data.map((entry) => entry.monthName),
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          // labels:["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]
          datasets: [
            {
              label: "Total Amt",
              // data: data.map((entry) => entry.total),
              data: [200, 3000, 10000, 50000, 100000, 500000],
              borderColor: "rgba(0, 255, 0, 1)",
              backgroundColor: "rgba(0, 255, 0, 1)",
            },
            {
              label: "Margin Amt",
              // data: data.map((entry) => entry.margin),
              data: [20, 300, 1000, 5000, 1000, 500],
              borderColor: "rgba(255, 0, 0, 1)",
              backgroundColor: "rgba(255, 0, 0, 1)",
            },
          ],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              min: 0, // Starting value of the Y-axis
              max: 500000, // Maximum value of the Y-axis (set to fit your data)
              ticks: {
                stepSize: 1000, // The interval between tick marks
                callback: function (value) {
                  return value.toLocaleString(); // Format numbers with commas
                },
              },
            },
          },
        }}
      /> */}
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
