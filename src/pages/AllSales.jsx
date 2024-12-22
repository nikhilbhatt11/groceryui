import React, { useEffect, useState } from "react";
import { Input, Button, Loading } from "../components/components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AllSales() {
  const [salesDate, setSalesDate] = useState("Today");
  const [allSales, setAllSales] = useState([]);
  const [totalSalesCount, setTotalSalesCount] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);
  const [dayprofit, setDayProfit] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTodaySale = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/sales/todaysales",
          { withCredentials: true }
        );

        const {
          todayAllSale,
          totalSales,
          totalEarningToday,
          totalprofitToday,
        } = response.data.data;

        setAllSales(todayAllSale || []);
        setTotalSalesCount(totalSales || 0);

        if (totalEarningToday && totalEarningToday.length > 0) {
          setTotalEarning(totalEarningToday[0].totalAmount);
        } else {
          setTotalEarning(0);
        }
        if (totalprofitToday && totalprofitToday.length > 0) {
          setDayProfit(
            totalEarningToday[0].totalAmount - totalprofitToday[0].totalAmount
          );
        } else {
          setDayProfit(0);
        }
        setError(null);
      } catch (error) {
        setError("Error in fetching All sales");
      }
      setLoading(false);
    };
    fetchTodaySale();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    setLoading(true);

    const fetchSalesOfPreDate = async () => {
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/sales/salesofdate?date=${salesDate}`,

          { withCredentials: true }
        );

        const { allsalesofDate, totalSales, totalEarning } = response.data.data;

        setAllSales(allsalesofDate || []);
        setTotalSalesCount(totalSales || 0);

        if (totalEarning && totalEarning.length > 0) {
          setTotalEarning(totalEarning[0].totalAmount);
        } else {
          setTotalEarning(0);
        }
        console.log(response);
      } catch (error) {
        setError("Error in fetching allsales or please check the date again");
      }
      setLoading(false);
    };

    if (salesDate != "Today") {
      fetchSalesOfPreDate();
    }
  }, [salesDate]);

  const handleInputChange = (event) => {
    const datestring = event.target.value;
    const finaldate = formatDate(datestring);

    setSalesDate(finaldate);
  };

  const navigateToDetailsPage = (sale) => {
    navigate(`/saleDetails/${sale._id}`, { state: { sale } });
  };

  if (loading) {
    return (
      <div className="text-2xl h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="mt-16 text-center px-4">
        <div className="flex items-center mx-2 mb-4">
          <Input
            type="date"
            label=""
            className=" border-gray-300"
            onChange={handleInputChange}
          />
        </div>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        {allSales.length > 0 ? (
          <h1 className="text-xl mt-4 mb-4 px-2 font-semibold text-white bg-green-600 mx-12 rounded-md py-2">
            Total Sales of {salesDate} is {totalSalesCount} total earning
            &#8377;
            {totalEarning} profit &#8377;{dayprofit}
          </h1>
        ) : (
          <></>
        )}

        {allSales.length > 0 ? (
          <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 p-3 text-left">
                    Customer Name
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Purchased Items
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Total Bill
                  </th>
                </tr>
              </thead>
              <tbody>
                {allSales.map((sale) => (
                  <tr
                    key={sale._id}
                    className="cursor-pointer hover:bg-gray-300 transition-all"
                    onClick={() => navigateToDetailsPage(sale)}
                  >
                    <td className="border border-gray-300 p-3">
                      {sale.customername}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {sale.products.length > 0
                        ? `${sale.products[0].title} ${
                            sale.products.length > 1 ? "..." : ""
                          }`
                        : "No products"}
                    </td>
                    <td className="border border-gray-300 p-3">
                      &#8377;{sale.totalSaleAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h2 className="bg-red-400 text-lg font-semibold mx-8 rounded-md py-1 text-white">
            Please create a sale first
          </h2>
        )}
      </div>
    );
  }
}

export default AllSales;
