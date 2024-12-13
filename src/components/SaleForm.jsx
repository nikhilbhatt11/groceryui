import React from "react";
import { useForm } from "react-hook-form";
import { Input, Button } from "./components";
function SaleForm() {
  const { register } = useForm();
  return (
    <div className="mt-20 md:flex items-center justify-around">
      <form>
        <div className="w-80 flex flex-col gap-2">
          <h1 className="font-bold text-xl text-center">Sell Item</h1>
          <Input
            placeholder="Item Name"
            label="Item Name"
            className=""
            {...register("title", {
              required: true,
            })}
          />
          <Input
            placeholder="Quantity"
            label="Quantity"
            className=""
            {...register("quantity", {
              required: true,
            })}
          />
          <Input
            placeholder="Discount"
            label="discount"
            className=""
            {...register("discount", {
              required: true,
            })}
          />
          <Input
            placeholder="Disconted price"
            label="Discounted price"
            className=""
            {...register("discountedprice", {
              required: true,
            })}
          />
          <Input
            placeholder="Item Total"
            label="Item Total"
            className=""
            {...register("total", {
              required: true,
            })}
          />
          <Button
            type="submit"
            className="px-4 md:w-full bg-blue-500 text-white py-2 border rounded-md"
          >
            Add To List
          </Button>
        </div>
      </form>
      <div className="flex flex-col">
        <table>
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Item Title</th>
              <th className="border border-gray-300 p-2">Sell Price</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Total</th>
            </tr>
          </thead>
        </table>
        <form>
          <div className="w-80 flex flex-col gap-2">
            <Input
              placeholder="Customer Name"
              label="Customer Name"
              className=""
              {...register("customername", {
                required: true,
              })}
            />
            <Input
              placeholder="Contact No"
              label="Contact No"
              className=""
              {...register("contactno", {
                required: true,
              })}
            />
            <Input
              type="date"
              placeholder="Date"
              label="Date"
              {...register("date", { required: true })}
            />
          </div>
        </form>
        <Button className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
          Bill
        </Button>
        <div className="mt-4 font-bold">Total Bill: &#8377;</div>
      </div>
    </div>
  );
}

export default SaleForm;
