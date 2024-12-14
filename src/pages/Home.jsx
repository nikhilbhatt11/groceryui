import React, { useEffect, useState } from "react";
import { Button } from "../components/components";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  // const accessToken = Cookies.get("accessToken");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/products/?page=${currentPage}&limit=${limit}`,
          { withCredentials: true }
        );
        console.log(response.data.data.allProducts);
        setTotalProducts(response.data.data.totalProducts);
        setProducts(response.data.data.allProducts);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="mt-16 text-center">
      <h1 className="bg-green-600 text-white text-lg font-semibold mx-16 rounded-md mb-2 py-2 md:text-3xl">
        Your All Added Items {totalProducts};
      </h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-1">Category</th>
            <th className="border border-gray-300 p-2">Stock QTY</th>

            <th className="border border-gray-300 p-1">Units</th>

            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <td className="border border-gray-300 p-2"></td>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border border-gray-300 p-2">{product.title}</td>
              <td className="border border-gray-300 p-2">{product.category}</td>
              <td className="border border-gray-300 p-2">
                {product.StockQuantity}
              </td>
              <td className="border border-gray-300 p-2">
                &#8377; {product.price}
              </td>
              <td className="border border-gray-300 py-1 flex flex-col md:flex-row md:items-center md:justify-center gap-2">
                <Button className="bg-blue-500 text-white px-2 py-1 rounded md:px-4">
                  <Link to={`/details/${product._id}`}>Details</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
