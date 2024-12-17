import React, { useEffect, useState } from "react";
import { Button } from "../components/components";
import { Link } from "react-router-dom";
import axios from "axios";
function Inventry() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchInventry = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/products/inventry?page=${currentPage}&limit=${limit}`,
          { withCredentials: true }
        );

        setTotalProducts(response.data.data.totalProducts);
        setProducts(response.data.data.products);
      } catch (err) {
        setError(err.message || "Failed to fetch Inventry products");
        console.error(err);
      }
    };
    fetchInventry();
  }, []);
  return (
    <div className="mt-16 text-center px-4">
      <h1 className="bg-green-600 text-white text-lg font-semibold rounded-md mb-4 py-2 md:text-3xl md:mx-16">
        Shop Inventory Products ({totalProducts})
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-3 text-left">Title</th>
              <th className="border border-gray-300 p-3 text-left">Cat</th>
              <th className="border border-gray-300 p-3 text-left">
                Stock QTY
              </th>
              <th className="border border-gray-300 p-3 text-left">Buy Pr.</th>
              <th className="border border-gray-300 p-3 text-left">Disc</th>
              <th className="border border-gray-300 p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-3">{product.title}</td>
                <td className="border border-gray-300 p-3">
                  {product.category}
                </td>
                <td className="border border-gray-300 p-3">
                  {product.StockQuantity} {product.unit}
                </td>
                <td className="border border-gray-300 p-3">
                  &#8377;{product.price}
                </td>
                <td className="border border-gray-300 p-3">
                  {product.discount}%
                </td>
                <td className="border border-gray-300 p-3">
                  <Link
                    to={`/details/${product._id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventry;
