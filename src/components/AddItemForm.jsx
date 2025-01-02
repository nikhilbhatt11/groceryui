import React, { useState, useEffect } from "react";
import { Input, Button, Logo, Select, Loading } from "./components";
import { useForm } from "react-hook-form";

import axios from "axios";

function AddItemForm() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState();
  const units = ["kg", "liter", "piece"];
  const { register, handleSubmit, reset } = useForm();

  const handleAddItem = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/products/add-product`,
        data,
        { withCredentials: true }
      );
      setError(null);
      setSuccessMsg(response.data.message);

      reset({
        title: "",
        category: "",
        StockQuantity: 0,
        unit: units[0],
        buyprice: 0,
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [error]);

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg(null);
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [successMsg]);

  if (loading) {
    return (
      <div className="text-2xl h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center mt-10 pb-3">
        <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-gray-200 shadow-lg">
          <div className="mt-8 -ml-5">
            <Logo />
          </div>
          <h2 className=" mt-10 text-center text-2xl font-bold leading-tight text-gray-800">
            Add new item in the shop
          </h2>
          {successMsg && (
            <div
              className="fixed top-5 mt-24 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-2 px-4 rounded-md shadow-lg"
              role="alert"
            >
              {successMsg}
            </div>
          )}
          {error && (
            <div
              className="fixed top-5 mt-24 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded-md shadow-lg"
              role="alert"
            >
              {error}
            </div>
          )}
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
                placeholder="Buy Price"
                label="Buy Price"
                className="border-gray-300 border-2 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("buyprice", { required: true })}
              />
              <Input
                placeholder="Sell Price"
                label="Sell Price"
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
                className="w-full bg-green-600 text-white font-bold border rounded-md py-2 hover:bg-green-700 transition-all duration-300"
              >
                Add Item
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddItemForm;
