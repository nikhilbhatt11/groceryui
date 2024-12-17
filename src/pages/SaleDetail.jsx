import React from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
function SaleDetail() {
  const location = useLocation();
  const { sale } = location.state || {};
  console.log(sale);

  return (
    <div className="min-h-screen bg-gray-400 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 mt-2">
        Sale Details
      </h1>
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
        <p className="text-lg font-medium text-gray-700">
          Customer Name:{" "}
          <span className="font-normal">{sale?.customername}</span>
        </p>
        <p className="text-lg font-medium text-gray-700">
          Contact Number: <span className="font-normal">{sale?.contactNo}</span>
        </p>
        <p className="text-lg font-medium text-gray-700">
          Payment Method: <span className="font-normal">{sale?.payment}</span>
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">
          Products
        </h2>
        {sale.products.map((product, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-50 p-4 border rounded-lg mb-4"
          >
            <div>
              <p className="text-lg font-semibold text-gray-800">
                Product Title: {product.title}
              </p>

              <p className="text-sm text-gray-600 flex">
                Quantity:{" "}
                <Input
                  type="number"
                  value={product.quantity}
                  className="w-16 h-4 ml-1 border rounded-md"
                />
              </p>

              <p className="text-sm text-gray-600">
                Price: &#8377;{product.price}
              </p>
              <p className="text-sm text-gray-600">
                Total: &#8377;{product.total}
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => handleDeleteProduct(index)}
                className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg shadow hover:bg-red-600"
              >
                Delete
              </Button>
              <Button
                onClick={() =>
                  handleUpdateProduct(index, {
                    ...product,
                    quantity: product.quantity + 1, // Example update: increment quantity
                    total: (product.quantity + 1) * product.price,
                  })
                }
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg shadow hover:bg-blue-600"
              >
                Update
              </Button>
            </div>
          </div>
        ))}

        <h3 className="text-xl font-semibold text-gray-800 mt-6">
          Total Sale Amount:{" "}
          <span className="text-green-500">&#8377;{sale.totalSaleAmount}</span>
        </h3>
        <Button className="w-full mt-6 px-4 py-2 bg-green-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-green-600">
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default SaleDetail;
