import React, { useEffect, useState } from "react";
import { Button, Loading } from "../components/components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { allProductsfn, changeCurrPage } from "../store/homeSlice.js";
function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, totalproducts, totalpages, currentpage, lastgetpage } =
    useSelector((state) => state.home);

  const fetchProducts = async (currentPage) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/products/?page=${currentPage}&limit=${limit}`,
        { withCredentials: true }
      );
      console.log(response.data.data);
      const allproducts = response.data.data.allProducts;
      const totalProducts = response.data.data.totalProducts || 0;
      const currentpage = response.data.data.currentPage || 1;
      const totalPages = response.data.data.totalPages || 1;

      dispatch(
        allProductsfn({
          products: allproducts,
          totalproducts: totalProducts,
          totalpages: totalPages,
          currentpage: currentpage,
          lastgetpage: currentpage,
        })
      );
      setAllProducts(allproducts);
      setTotalProducts(totalProducts);
      setTotalPages(totalPages);
      setCurrentPage(currentPage);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    }
    setLoading(false);
  };
  useEffect(() => {
    if (Object.keys(products).length === 0) {
      fetchProducts(currentPage);
    } else {
      setAllProducts(products[currentpage]);
      setTotalProducts(totalproducts);
      setTotalPages(totalpages);
      setCurrentPage(currentpage);

      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [error]);

  const navigateToDetailsPage = (product) => {
    navigate(`/details/${product._id}`);
  };

  const handlePageChange = (direction) => {
    const newPage = currentPage + direction;

    if (direction === -1) {
      setAllProducts(products[newPage]);
      setCurrentPage(newPage);
      dispatch(changeCurrPage({ currentpage: newPage }));
    } else if (direction === 1 && newPage <= lastgetpage) {
      setAllProducts(products[newPage]);
      setCurrentPage(newPage);
      dispatch(changeCurrPage({ currentpage: newPage }));
    } else {
      fetchProducts(newPage);
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
      <div className="mt-16 text-center md:px-4">
        {error && (
          <div
            className="fixed top-5 mt-24 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded-md shadow-lg"
            role="alert"
          >
            {error}
          </div>
        )}
        <h1 className="bg-green-600 text-white text-sm font-semibold rounded-md mb-4 py-2 md:text-3xl md:mx-16">
          Your All Added Items {totalProducts}
        </h1>
        {allProducts?.length === 0 ? (
          <div className="text-red-600 mt-8 text-center">
            Add Item to the store
          </div>
        ) : (
          <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-0.5 py-1 text-left">
                    Title
                  </th>
                  <th className="border border-gray-300 px-0.5 py-1 text-left">
                    Type
                  </th>
                  <th className="border border-gray-300 py-1 text-left">QTY</th>
                  <th className="border border-gray-300 py-1 text-left">
                    BuyPrice
                  </th>
                  <th className="border border-gray-300 py-1 text-left">
                    sellPrice
                  </th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(allProducts) ? allProducts : []).map(
                  (product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-200"
                      onClick={() => navigateToDetailsPage(product)}
                    >
                      <td className="border border-gray-300 px-2 py-3">
                        {product.title}
                      </td>
                      <td className="border border-gray-300 px-2 py-3">
                        {product.category}
                      </td>
                      <td
                        className={`border border-gray-300 py-1 ${
                          product.StockQuantity < 10
                            ? "bg-red-400 text-white"
                            : ""
                        }`}
                      >
                        {product.StockQuantity} {product.unit}
                      </td>
                      <td className="border border-gray-300  py-1">
                        &#8377;{product.buyprice}
                      </td>
                      <td className="border border-gray-300  py-1">
                        &#8377;{product.price}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
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

export default Home;
