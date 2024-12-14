import React, { useState } from "react";
import { Input, Button, Logo, Select } from "./components";
import { useForm } from "react-hook-form";

import axios from "axios";
import Cookies from "js-cookie";
function AddItemForm() {
  const [error, setError] = useState(null);
  const units = ["kg", "liter", "piece"];
  const { register, handleSubmit } = useForm();
  const handleAddItem = async (data) => {
    try {
      const accessToken = Cookies.get("accessToken");
      const response = await axios.post(
        "http://localhost:8000/api/v1/products/add-product",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setError(null);
      console.log("New Product Added successfully:", response.data);
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
      <div
        className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10`}
      >
        <div className=" mt-8 -ml-5">
          <Logo />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Add new item in the shop
        </h2>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(handleAddItem)}>
          <div className="space-y-5 mt-2">
            <Input
              placeholder="Title"
              label="Title"
              className="border-gray-200 border-2"
              {...register("title", { required: true })}
            />
            <Input
              placeholder="Category"
              label="Category"
              className="border-gray-200 border-2"
              {...register("category", { required: true })}
            />
            <Input
              placeholder="Stock Quantity"
              label="Stock Quantity"
              className="border-gray-200 border-2"
              {...register("StockQuantity", { required: true })}
            />
            <Select
              options={units}
              label="Choose Unit"
              {...register("unit", { required: true })}
            />
            <Input
              placeholder="Your Purchase Price"
              label="Your Purchase Price"
              className="border-gray-200 border-2"
              {...register("price", { required: true })}
            />
            <Input
              placeholder="Discount in %"
              label="Discount in %"
              className="border-gray-200 border-2"
              {...register("discount", { required: true })}
            />

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold border rounded-md py-2"
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
