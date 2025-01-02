import React, { useEffect, useState } from "react";
import { Button, Loading } from "../components/components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { allProductsfn, changeCurrPage } from "../store/inventrySlice.js";
function Inventry() {
  const API_URL = import.meta.env.VITE_API_URL;
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
    useSelector((state) => state.inventry);

  const fetchInventry = async (currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/products/inventry?page=${currentPage}&limit=${limit}`,
        { withCredentials: true }
      );
      console.log(response);

      const allproducts = response.data.data.products;

      const totalproducts = response.data.data.totalProducts || 0;
      const totalpages = response.data.data.totalPages || 1;
      const currentpage = response.data.data.currentPage || 1;
      dispatch(
        allProductsfn({
          products: allproducts,
          totalproducts,
          totalpages,
          currentpage,
          lastgetpage: currentpage,
        })
      );
      setAllProducts(allproducts);
      setTotalProducts(totalproducts);
      setTotalPages(totalpages);
      setCurrentPage(currentpage);
    } catch (err) {
      setError(err.message || "Failed to fetch Inventry products");
    }
    setLoading(false);
  };
  useEffect(() => {
    if (Object.keys(products).length === 0) {
      fetchInventry(currentPage);
    } else {
      setAllProducts(products[currentpage]);
      setTotalProducts(totalproducts);
      setTotalPages(totalpages);
      setCurrentPage(currentpage);
      setLoading(false);
    }
  }, []);

  const navigateToDetailsPage = (product) => {
    navigate(`/details/${product._id}`);
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
      setAllProducts(products[newPage]);
      setCurrentPage(newPage);
      dispatch(changeCurrPage({ currentpage: newPage }));
    } else if (direction === 1 && newPage <= lastgetpage) {
      setAllProducts(products[newPage]);
      setCurrentPage(newPage);
      dispatch(changeCurrPage({ currentpage: newPage }));
    } else {
      fetchInventry(newPage);
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
        <h1 className="bg-green-600 text-white text-lg font-semibold rounded-md mb-4 py-2 md:text-3xl md:mx-16">
          Shop Inventory Products {totalProducts}
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
                  <th className="border border-gray-300 px-0.5 py-3 text-left">
                    Title
                  </th>
                  <th className="border border-gray-300 px-0.5 py-3 text-left">
                    Cat
                  </th>
                  <th className="border border-gray-300 px-0.5 py-3 text-left">
                    QTY
                  </th>
                  <th className="border border-gray-300 px-0.5 py-3 text-left">
                    Buy Pr.
                  </th>
                  <th className="border border-gray-300 px-0.5 py-3 text-left">
                    Sell Pr.
                  </th>
                  <th className="border border-gray-300 px-0.5 py-3 text-left">
                    Disc
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
                      <td className="border border-gray-300 px-0.5 py-3">
                        {product.title}
                      </td>
                      <td className="border border-gray-300 px-0.5 py-3">
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
                      <td className="border border-gray-300 px-0.5 py-3">
                        &#8377;{product.buyprice}
                      </td>
                      <td className="border border-gray-300 px-0.5 py-3">
                        &#8377;{product.price}
                      </td>
                      <td className="border border-gray-300 px-0.5 py-3">
                        {product.discount}%
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

export default Inventry;
