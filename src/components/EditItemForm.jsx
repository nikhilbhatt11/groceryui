import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Logo, Select } from "./components";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function EditItemForm() {
  const location = useLocation();
  const item = location.state?.productDetail;
  const navigate = useNavigate();
  const productId = item?._id;

  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const units = ["kg", "liter", "piece"];
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: item?.title || "",
      category: item?.category || "",
      StockQuantity: item?.StockQuantity || "",
      unit: item?.unit || units[0],
      price: item?.price || "",
      discount: item?.discount ?? "",
    },
  });

  const handleUpdateItem = async (data) => {
    const processedData = {
      ...data,
      StockQuantity: Number(data.StockQuantity),
      price: Number(data.price),
      discount: Number(data.discount),
    };
    console.log(processedData);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/products/${productId}`,
        processedData,
        { withCredentials: true }
      );
      console.log(response.data.message);
      setSuccessMsg(response.data.message);
      navigate("/");
    } catch (error) {
      setError(err.message || "Failed to Update products");
    }
  };

  return (
    <div className="flex items-center justify-center mt-10 pb-3">
      <div
        className={`mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-black/10`}
      >
        <div className="mt-8 -ml-5">
          <Logo />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Update Item Details
        </h2>
        {successMsg && (
          <p className="text-green-600 mt-8 text-center">{successMsg}</p>
        )}
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(handleUpdateItem)}>
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
              Update Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItemForm;
