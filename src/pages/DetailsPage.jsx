import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Loading } from "../components/components";
import { Link } from "react-router-dom";
function DetailsPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const [error, setError] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${productId}`, {
          withCredentials: true,
        });

        setProductDetail(response.data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      }
      setLoading(false);
    };
    fetchProductById();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [error]);

  const deleteProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`${API_URL}/products/${productId}`, {
        withCredentials: true,
      });
      setIsDeleted(true);
    } catch (err) {
      setError(err.message || "Failed to delete products");
    }
    setLoading(false);
  };
  if (isDeleted) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="bg-green-100 text-green-800 p-4 rounded-md">
          Product deleted successfully.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-2xl h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        {error && (
          <div
            className="fixed top-5 mt-24 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded-md shadow-lg"
            role="alert"
          >
            {error}
          </div>
        )}
        {!error && productDetail && (
          <div
            className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10`}
          >
            <h2 className="text-center text-2xl font-bold leading-tight mb-6">
              {productDetail?.title} Detail
            </h2>
            <div className="text-lg font-semibold space-y-4">
              <h3 className="text-gray-700">Title: {productDetail?.title}</h3>
              <h3 className="text-gray-700">
                Category: {productDetail?.category}
              </h3>
              <h3
                className={`rounded py-1 px-2 ${
                  productDetail?.StockQuantity < 10
                    ? "bg-red-500 text-white"
                    : "bg-transparent text-black"
                }`}
              >
                Stock Quantity: {productDetail?.StockQuantity}{" "}
                {productDetail?.unit}
              </h3>
              <h3 className="text-gray-700">
                Buy Price: &#8377;{productDetail?.buyprice}
              </h3>
              <h3 className="text-gray-700">
                sell Price: &#8377;{productDetail?.price}
              </h3>
              <h3 className="text-gray-700">
                Discount: {productDetail?.discount}%
              </h3>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Link
                to={`/update-item/${productDetail?._id}`}
                state={{ productDetail }}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all"
              >
                Update
              </Link>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
                onClick={deleteProduct}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DetailsPage;
