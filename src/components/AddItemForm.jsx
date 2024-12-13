import React from "react";
import { Input, Button, Logo, Select } from "./components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
function AddItemForm() {
  const units = ["kg", "liter", "piece"];
  const { register, handleSubmit } = useForm();
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

        <form>
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
            <Select options={units} label="Choose Unit" />
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
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemForm;
