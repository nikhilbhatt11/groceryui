import React, { useState } from "react";
import { Input, Button, Logo, Select } from "./components";
import { useForm } from "react-hook-form";

import axios from "axios";

function AddItemForm() {
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const units = ["kg", "liter", "piece"];
  const { register, handleSubmit, reset } = useForm();
  const handleAddItem = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/products/add-product",
        data,
        { withCredentials: true }
      );
      setError(null);
      setSuccessMsg(response.data.message);
      console.log("New Product Added successfully:", response.data);
      reset({
        title: "",
        category: "",
        StockQuantity: 0,
        unit: units[0],
        price: 0,
        discount: 0,
      });
    } catch (err) {
      if (err.response && err.response.data) {
        const errorMessage =
          err.response.data.message || "Something went wrong";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  return (
    <div className="flex items-center justify-center mt-10 pb-3">
      <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-gray-200 shadow-lg">
        <div className="mt-8 -ml-5">
          <Logo />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-800">
          Add new item in the shop
        </h2>
        {successMsg && (
          <p className="text-green-600 mt-8 text-center">{successMsg}</p>
        )}
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(handleAddItem)}>
          <div className="space-y-5 mt-2">
            <Input
              placeholder="Title"
              label="Title"
              className="border-gray-300 border-2 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("title", { required: true })}
            />
            <Input
              placeholder="Category"
              label="Category"
              className="border-gray-300 border-2 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("category", { required: true })}
            />
            <Input
              placeholder="Stock Quantity"
              label="Stock Quantity"
              className="border-gray-300 border-2 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("StockQuantity", { required: true })}
            />
            <Select
              options={units}
              label="Choose Unit"
              className="border-gray-300 border-2 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("unit", { required: true })}
            />
            <Input
              placeholder="Your Purchase Price"
              label="Your Purchase Price"
              className="border-gray-300 border-2 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("price", { required: true })}
            />
            <Input
              placeholder="Discount in %"
              label="Discount in %"
              className="border-gray-300 border-2 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("discount", { required: true })}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold border rounded-md py-2 hover:bg-blue-700 transition-all duration-300"
            >
              Add Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemForm;
