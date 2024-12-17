import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/components";
import { Link } from "react-router-dom";
function DetailsPage() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState();
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProductById = async () => {
      try {
        console.log(productId);
        const response = await axios.get(
          `http://localhost:8000/api/v1/products/${productId}`,
          { withCredentials: true }
        );
        console.log(response.data.data);
        setProductDetail(response.data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
      }
    };
    fetchProductById();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div
        className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight mb-6">
          {productDetail?.title} Detail
        </h2>
        <div className="text-lg font-semibold space-y-4">
          <h3 className="text-gray-700">Title: {productDetail?.title}</h3>
          <h3 className="text-gray-700">Category: {productDetail?.category}</h3>
          <h3
            className={`rounded py-1 px-2 ${
              productDetail?.StockQuantity < 10
                ? "bg-red-500 text-white"
                : "bg-transparent text-black"
            }`}
          >
            Stock Quantity: {productDetail?.StockQuantity} {productDetail?.unit}
          </h3>
          <h3 className="text-gray-700">
            Price: &#8377;{productDetail?.price}
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
          <Button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all">
            <Link>Delete</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
