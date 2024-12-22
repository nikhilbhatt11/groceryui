import React, { useState } from "react";
import { useLocation } from "react-router-dom";
function RecentSale() {
  const location = useLocation();
  const { saleData } = location.state || {};

  const { products, customername, contactNo, totalSaleAmount, payment } =
    saleData;
  return (
    <div className="mt-20 flex flex-col items-center md:justify-center md:flex md:flex-col md:items-center">
      <h1 className="bg-green-600 text-center text-white text-lg font-semibold mx-16 px-2 rounded-md mb-2 py-2 md:text-3xl md:w-2/3">
        Your Recent Sale
      </h1>
      <div className="flex flex-col items-start justify-center w-full bg-white shadow-md rounded-lg p-4">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2 text-left">Title</th>
              <th className="border border-gray-300 p-2 text-left">Price</th>
              <th className="border border-gray-300 p-2 text-left">Quantity</th>
              <th className="border border-gray-300 p-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{item.title}</td>
                <td className="border border-gray-300 p-2">
                  &#8377;{item.discountedprice}
                </td>
                <td className="border border-gray-300 p-2">{item.quantity}</td>
                <td className="border border-gray-300 p-2">
                  &#8377; {item.total || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-gray-400 mt-4 py-3 px-4 rounded-lg">
          <div className="text-lg font-semibold text-gray-800 mb-2">
            <span className="mr-4">Customer Name: </span>
            <span className="text-gray-600">{customername}</span>
          </div>
          <div className="text-lg font-semibold text-gray-800 mb-2">
            <span className="mr-4">Contact No.: </span>
            <span className="text-gray-600">{contactNo}</span>
          </div>
          <div className="text-lg font-semibold text-gray-800 mb-2">
            <span className="mr-4">Payment Method: </span>
            <span className="text-gray-600">{payment}</span>
          </div>
          <div className="text-lg font-semibold text-gray-800">
            <span className="mr-4">Total Bill: </span>
            <span className="text-gray-600">&#8377;{totalSaleAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentSale;
