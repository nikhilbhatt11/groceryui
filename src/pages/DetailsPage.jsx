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
        <h2 className="text-center text-2xl font-bold leading-tight">
          {productDetail?.title} Detail
        </h2>
        <div className="text-lg font-semibold">
          <h3>Title: {productDetail?.title}</h3>
          <h3>Category: {productDetail?.category}</h3>
          <h3>
            Stock Quantity: {productDetail?.StockQuantity} {productDetail?.unit}
          </h3>
          <h3>Price: {productDetail?.price}</h3>
          <h3>Discount: {productDetail?.discount}</h3>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button className="bg-green-500 text-white px-2 py-1 rounded md:px-4">
            <Link>Update</Link>
          </Button>
          <Button className="bg-red-500 text-white px-2 py-1 rounded md:px-4">
            <Link>Delete</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
