import React, { useEffect, useState } from "react";
import { Input, Button } from "../components/components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AllSales() {
  const [salesDate, setSalesDate] = useState("Today");
  const [allSales, setAllSales] = useState([]);
  const [totalSalesCount, setTotalSalesCount] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchTodaySale = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/sales/todaysales",
          { withCredentials: true }
        );
        const { todayAllSale, totalSales, totalEarningToday } =
          response.data.data;

        setAllSales(todayAllSale);
        setTotalSalesCount(totalSales);

        setTotalEarning(totalEarningToday[0].totalAmount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodaySale();
  }, []);

  const navigateToDetailsPage = (sale) => {
    navigate(`/saleDetails/${sale._id}`, { state: { sale } });
  };
  return (
    <div className="mt-16 text-center px-4">
      <div className="flex items-center mx-2 mb-4">
        <Input
          type="date"
          label=""
          className="rounded-tr-none rounded-br-none border-gray-300"
        />
        <Button className="text-white rounded-tl-none rounded-bl-none bg-green-600 py-2.5 px-4 ml-2 hover:bg-green-700 transition-all">
          Search
        </Button>
      </div>

      {allSales.length > 0 ? (
        <h1 className="text-xl mt-4 mb-4 px-2 font-semibold text-white bg-green-600 mx-12 rounded-md py-2">
          Total Sales of {salesDate} is {totalSalesCount} total earning &#8377;
          {totalEarning}
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

export default AllSales;
