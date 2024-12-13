import React from "react";
import { Button } from "../components/components";
function Inventry() {
  return (
    <div className="mt-16 text-center">
      <h1 className="bg-green-600 text-white text-lg font-semibold mx-16 rounded-md mb-2 py-2 md:text-3xl">
        Shop Inventry
      </h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300">Title</th>
            <th className="border border-gray-300">Cat</th>
            <th className="border border-gray-300">Stock QTY</th>

            <th className="border border-gray-300">Units</th>
            <th className="border border-gray-300">Buy Pr.</th>
            <th className="border border-gray-300">Disc</th>

            <th className="border border-gray-300 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          <td className="border border-gray-300">Avocado</td>
          <td className="border border-gray-300">Fruit</td>

          <td className="border border-gray-300">500</td>
          <td className="border border-gray-300">Kg</td>
          <td className="border border-gray-300">&#8377; 100</td>
          <td className="border border-gray-300">50&#37;</td>

          <td className="border border-gray-300 py-1 flex flex-col md:flex-row md:items-center md:justify-center gap-2">
            <Button className="bg-blue-500 text-white px-2 py-1 rounded md:px-4">
              Details
            </Button>
            <Button className="bg-green-500 text-white px-2 py-1 rounded md:px-4">
              Update
            </Button>

            <Button className="bg-red-500 text-white px-2 py-1 rounded">
              Delete
            </Button>
          </td>
        </tbody>
      </table>
    </div>
  );
}

export default Inventry;
