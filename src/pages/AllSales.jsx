import React, { useState } from "react";
import { Input, Button } from "../components/components";
function AllSales() {
  const [salesDate, setSalesDate] = useState("Today");
  return (
    <div className="mt-16 text-center">
      <div className="flex items-center mx-40">
        <Input
          type="date"
          label=""
          className="rounded-tr-none rounded-br-none"
        />
        <Button classname="text-white rounded-tl-none rounded-bl-none bg-green-600 py-2.5">
          Search
        </Button>
      </div>
      <h1 className="text-3xl mt-4 font-semibold text-white bg-green-600 mx-16 rounded-md py-1">
        Sales of {salesDate}
      </h1>
    </div>
  );
}

export default AllSales;
