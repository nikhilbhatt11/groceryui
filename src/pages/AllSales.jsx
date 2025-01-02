import React, { useEffect, useState } from "react";
import { Input, Button, Loading } from "../components/components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allSalesfn, changeCurrPage } from "../store/allSalesSlice.js";
function AllSales() {
  const [salesDate, setSalesDate] = useState("Today");
  const [allSales, setAllSales] = useState([]);
  const [totalSalesCount, setTotalSalesCount] = useState(0);
  const [totalEarning, setTotalEarning] = useState(0);
  const [dayprofit, setDayProfit] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    sales,
    totalsales,
    currentpage,
    totalpages,
    totalearning,
    totalprofit,
    lastgetpage,
    date,
  } = useSelector((state) => state.allsales);

  const fetchTodaySale = async (currentPage) => {
    console.log("fetch called");
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/sales/todaysales?page=${currentPage}&limit=${limit}`,
        { withCredentials: true }
      );

      const allsales = response.data.data.todayAllSale;

      const totalsales = response.data.data.totalSales;

      const currentpage = response.data.data.currentPage;

      const totalpages = response.data.data.totalPages || 1;

      const totalprofit =
        response.data.data.totalprofitToday[0]?.totalAmount || 0;

      const totalearning =
        response.data.data.totalEarningToday[0]?.totalAmount || 0;

      const date = "Today";

      dispatch(
        allSalesfn({
          sales: allsales,
          totalsales,
          currentpage,
          totalpages,
          totalprofit,
          totalearning,
          lastgetpage: currentpage,
          date,
        })
      );

      setAllSales(allsales);
      setTotalSalesCount(totalsales);
      setTotalEarning(totalearning);
      setDayProfit(totalearning - totalprofit);
      setTotalPages(totalpages);

      if (allsales.length === 0) {
        setError("No sale is present");
      }
    } catch (error) {
      setError("Error in fetching sales");
    }
    setLoading(false);
  };

  const fetchSalesOfPreDate = async (currentPage) => {
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/sales/salesofdate?date=${salesDate}&page=${currentPage}&limit=${limit}`,

        { withCredentials: true }
      );

      const allsales = response.data.data.allsalesofDate;

      const totalsales = response.data.data.totalSales;
      const currentpage = response.data.data.currentPage;
      const totalpages = response.data.data.totalPages || 1;

      const totalprofit =
        response.data.data.totalprofitOfDay[0]?.totalAmount || 0;
      const totalearning = response.data.data.totalEarning[0]?.totalAmount || 0;
      const date = response.data.data.date;

      dispatch(
        allSalesfn({
          sales: allsales,
          totalsales,
          currentpage,
          totalpages,
          totalprofit,
          totalearning,
          lastgetpage: currentpage,
          date,
        })
      );

      setAllSales(allsales);
      setTotalSalesCount(totalsales);
      setTotalEarning(totalearning);
      setDayProfit(totalearning - totalprofit);
      setTotalPages(totalpages);
      setCurrentPage(currentPage);
      setSalesDate(date);
      if (allsales.length === 0) {
        setError("No sale is present");
      }
    } catch (error) {
      setError("Error in fetching allsales or please check the date again");
    }
    setLoading(false);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    if (Object.keys(sales).length === 0) {
      if (salesDate === "Today") {
        console.log("today");
        fetchTodaySale(currentPage);
      } else {
        console.log("previous day");
        fetchSalesOfPreDate(currentPage);
      }
    } else if (salesDate !== "Today" && salesDate !== "") {
      console.log(salesDate);
      console.log("if sale date is  not today previous day");
      fetchSalesOfPreDate(currentPage);
    } else {
      setAllSales(sales[currentpage]);
      setTotalSalesCount(totalsales);

      setCurrentPage(currentpage);
      setDayProfit(totalprofit);
      setTotalEarning(totalearning);

      setLoading(false);
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

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handlePageChange = (direction) => {
    const newPage = currentPage + direction;

    if (direction === -1) {
      setAllSales(sales[newPage]);
      setCurrentPage(newPage);
      dispatch(changeCurrPage({ currentpage: newPage }));
    } else if (direction === 1 && newPage <= lastgetpage) {
      setAllSales(sales[newPage]);
      setCurrentPage(newPage);
      dispatch(changeCurrPage({ currentpage: newPage }));
    } else {
      if (salesDate === "Today") {
        console.log("today");
        fetchTodaySale(newPage);
      } else {
        console.log("previous day");
        fetchSalesOfPreDate(newPage);
      }
    }
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
        <div className="flex items-center mx-2 mb-4 gap-2">
          <Input
            type="date"
            label=""
            className=" border-gray-300"
            onChange={handleInputChange}
          />
          <Link
            to={"/monthAnalytics"}
            className="bg-green-400 px-5 py-1 rounded-md text-white font-semibold"
          >
            Growth Graph
          </Link>
        </div>
        {error && (
          <div
            className="fixed top-5 mt-24 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded-md shadow-lg"
            role="alert"
          >
            {error}
          </div>
        )}

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
        <div className="flex justify-between items-center mt-4">
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(-1)}
            className="px-4 py-2 bg-green-500 text-white rounded-md disabled:bg-gray-300"
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => handlePageChange(1)}
            className="px-4 py-2 bg-green-500 text-white rounded-md disabled:bg-gray-300"
          >
            Next
          </Button>
        </div>
      </div>
    );
  }
}

export default AllSales;
