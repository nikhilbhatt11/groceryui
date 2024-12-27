import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Loading from "../components/Loading";
function SaleDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sale } = location.state || {};
  const [disabled, setDisabled] = useState(false);
  const [saleDetails, setSalesDetail] = useState();
  const [newQuantity, setNewQuantity] = useState();
  const [saleDifference, setSaleDifference] = useState(0);
  const [error, setError] = useState(null);
  const [prodDeletionMsg, setProdDeletionMsg] = useState();
  const [loading, setLoading] = useState(true);
  const fetchSaleDetails = async (saleId) => {
    if (!saleId) {
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/sales/${saleId}`,
        {
          withCredentials: true,
        }
      );

      setSalesDetail(response.data.data);
      setError(null);
      setProdDeletionMsg(null);
    } catch (error) {
      setError("Error fetching sales detail");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (sale?._id) {
      fetchSaleDetails(sale._id);
    }
  }, [sale?._id, prodDeletionMsg]);

  const updateSoldProduct = async (product) => {
    const productId = product.productId || product._id;
    const saleId = sale._id;
    const quantity = newQuantity;
    setLoading(true);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/sales/${saleId}/${productId}?quantity=${quantity}`,
        {},

        { withCredentials: true }
      );

      setSalesDetail(response.data.data.sale);
      setSaleDifference(response.data.data.newSaledifference);
      setError(null);
    } catch (err) {
      if (err.response && err.response.data) {
        const backendError = err.response.data.message || "An error occurred";
        setError(backendError);
      } else {
        setError("An unexpected error occurred");
      }
    }
    setLoading(false);
  };
  const handleDeleteProduct = async (product) => {
    const productId = product.productId || product._id;
    const saleId = sale._id;
    setLoading(true);
    if (saleDetails.products.length == 1) {
      setError("sale have only one product delete whole sale");
      setDisabled(true);
    } else {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/v1/sales/deletesaledProduct/${saleId}/${productId}`,
          { withCredentials: true }
        );
        console.log(response.data.message);
        setProdDeletionMsg(response.data.message);
        setDisabled(false);
      } catch (error) {
        setError("Error in deleting the product from sale");
      }
      setLoading(false);
    }
  };

  const handleSaleDelete = async () => {
    console.log(sale._id);
    const saleId = sale._id;
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/sales/delete/${saleId}`,
        { withCredentials: true }
      );
      setProdDeletionMsg(response.data.message);
      navigate("/all-sales");
    } catch (error) {
      setError("Error in deleting the Sale");
    }
  };

  const handleChange = (event) => {
    const qty = event.target.value;
    setNewQuantity(qty);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [error]);

  useEffect(() => {
    if (prodDeletionMsg) {
      const timer = setTimeout(() => {
        setProdDeletionMsg(null);
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [prodDeletionMsg]);

  if (loading) {
    return (
      <div className="text-2xl h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-400 p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 mt-2">
          Sale Details
        </h1>
        {prodDeletionMsg && (
          <div
            className="fixed top-5 mt-24 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-2 px-4 rounded-md shadow-lg"
            role="alert"
          >
            {prodDeletionMsg}
          </div>
        )}
        {error && (
          <div
            className="fixed top-5 mt-24 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded-md shadow-lg"
            role="alert"
          >
            {error}
          </div>
        )}
        {saleDetails.products.length == 0 ? (
          <h2 text-red-600 mt-8 text-center text-lg>
            The whole sale is deleted
          </h2>
        ) : (
          <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
            <p className="text-lg font-medium text-gray-700">
              Customer Name:{" "}
              <span className="font-normal">{saleDetails?.customername}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Contact Number:{" "}
              <span className="font-normal">{saleDetails?.contactNo}</span>
            </p>
            <p className="text-lg font-medium text-gray-700">
              Payment Method:{" "}
              <span className="font-normal">{saleDetails?.payment}</span>
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
              Products
            </h2>
            {saleDetails.products.map((product, index) => (
              <div
                key={index}
                className="flex flex-col md:flex md:flex-row justify-between items-center bg-gray-50 p-4 border rounded-lg mb-4"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Product Title: {product.title}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity:{product.quantity}
                  </p>

                  <p className="text-sm text-gray-600">
                    Price: &#8377;{product.discountedprice}
                  </p>
                  <p className="text-sm text-gray-600">
                    Total: &#8377;{product.total}
                  </p>
                  <Input
                    placeholder="Enter new Quantity"
                    className="border-2"
                    onChange={() => {
                      handleChange(event);
                    }}
                  />
                </div>
                <div className="flex gap-4 mt-2 md:mt-0">
                  <Button
                    onClick={() => handleDeleteProduct(product)}
                    disabled={disabled}
                    className={`px-4 py-2 text-sm rounded-lg shadow 
                      ${
                        disabled
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }
  `}
                  >
                    Delete
                  </Button>
                  <Button
                    className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg shadow hover:bg-green-600"
                    onClick={() => {
                      updateSoldProduct(product);
                    }}
                  >
                    Update
                  </Button>
                </div>
              </div>
            ))}

            <div className="flex justify-between">
              <div className="mx-5">
                <h3 className="text-xl font-semibold text-gray-800 mt-6">
                  Amount in - you give + you get:{" "}
                  <span className="text-green-500">
                    &#8377;{saleDifference}
                  </span>
                </h3>

                <h3 className="text-xl font-semibold text-gray-800 mt-6">
                  Total Sale Amount:{" "}
                  <span className="text-green-500">
                    &#8377;{saleDetails.totalSaleAmount}
                  </span>
                </h3>
                <h3 className="text-xl font-semibold text-gray-800 mt-6">
                  Total Margin On Sale:{" "}
                  <span className="text-green-500">
                    &#8377;
                    {saleDetails.totalSaleAmount -
                      saleDetails.totalwithbuyprice}
                  </span>
                </h3>
              </div>
              <div className="text-5xl flex items-center justify-center mx-8 px-5 rounded-md">
                <MdOutlineDeleteOutline
                  className="cursor-pointer text-red-500"
                  onClick={handleSaleDelete}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SaleDetail;
