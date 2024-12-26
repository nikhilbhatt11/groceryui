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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const units = ["kg", "liter", "piece"];
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: item?.title || "",
      category: item?.category || "",
      StockQuantity: item?.StockQuantity || "",
      unit: item?.unit || units[0],
      buyprice: item?.buyprice || "",
      price: item?.price || "",
      discount: item?.discount ?? "",
    },
  });

  const handleUpdateItem = async (data) => {
    const processedData = {
      ...data,
      StockQuantity: Number(data.StockQuantity),
      buyprice: Number(data.buyprice),
      price: Number(data.price),
      discount: Number(data.discount),
    };
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/products/${productId}`,
        processedData,
        { withCredentials: true }
      );

      setSuccessMsg(response.data.message);
      navigate("/");
    } catch (error) {
      setError(err.message || "Failed to Update products");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-2xl h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center mt-12 pb-3">
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
                placeholder="Buy Price"
                label="Buy Price"
                className="border-gray-200 border-2"
                {...register("buyprice", { required: true })}
              />
              <Input
                placeholder="Sell Price"
                label="Sell Price"
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
                className="w-full bg-green-600 text-white font-bold border rounded-md py-2 hover:bg-green-700 transition-all duration-300"
              >
                Update Item
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EditItemForm;