import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, Select, Loading } from "./components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { GiShipWheel } from "react-icons/gi";
function SaleForm() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [quantity, setQuantity] = useState();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productList, setProductList] = useState([]);
  const [finalbill, setFinalbill] = useState(false);
  const [finalData, setFinalData] = useState({});
  const [error, setError] = useState(null);
  const [searchLoading, setSearchLoading] = useState();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const {
    register: registerAddToList,
    handleSubmit: handleAddToListSubmit,
    setValue: setValueAddToList,
    reset: resetAddToList,
  } = useForm();
  const { register: registerBilling, handleSubmit: handleBillingSubmit } =
    useForm();
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchProducts = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        setDropdownVisible(false);
        setResults([]);
        return;
      }
      setSearchLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/products/search?title=${query}`,
          { withCredentials: true }
        );

        setResults(response.data.data);
        setDropdownVisible(true);
        setError(null);
      } catch (error) {
        setError("Item not present in the database");
        setResults([]);
        setDropdownVisible(false);
      }
      setSearchLoading(false);
    })
  );

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    fetchProducts(value);
  };

  const handleSelectProduct = (product) => {
    if (product.StockQuantity > 0) {
      setSelectedProduct(product);
      setSearch(product.title);
      setValueAddToList("quantity", 1);
      setValueAddToList("discount", product.discount || 0);
      setValueAddToList(
        "discountedprice",
        product.price - (product.price * (product.discount || 0)) / 100
      );
      setValueAddToList(
        "total",
        product.price - (product.price * (product.discount || 0)) / 100
      );
      setDropdownVisible(false);
    } else {
      setError("This product quantity is 0");
    }
  };
  const handleQuantityChange = (event) => {
    const quantity = event.target.value;
    console.log(quantity);
    if (quantity > selectedProduct.StockQuantity) {
      setError(
        `Stock Quantity of ${selectedProduct.title} is ${selectedProduct.StockQuantity} `
      );
    } else {
      const discountedPrice =
        selectedProduct?.price -
        (selectedProduct?.price * (selectedProduct?.discount || 0)) / 100;

      setValueAddToList("quantity", quantity);
      setValueAddToList("total", discountedPrice * quantity);
      setError(null);
    }
  };

  useEffect(() => {
    const existingList = JSON.parse(localStorage.getItem("productList")) || [];
    setProductList(existingList);
  }, []);

  const handleAddToList = (data) => {
    setLoading(true);
    const newData = {
      ...data,
      totalwithbuyprice: selectedProduct.buyprice * parseInt(data.quantity),
      buyprice: selectedProduct.buyprice,
      quantity: parseInt(data.quantity),
      title: search,
      _id: selectedProduct._id,
    };

    const existingList = JSON.parse(localStorage.getItem("productList")) || [];
    existingList.push(newData);
    localStorage.setItem("productList", JSON.stringify(existingList));

    setProductList(existingList);
    resetAddToList({
      title: "",
      quantity: 0,
      discount: 0,
      discountedprice: 0,
      total: 0,
    });
    setLoading(false);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const handleBilling = (data) => {
    const finalDate = formatDate(data.date);
    const finalSale = {
      ...data,
      date: finalDate,
      products: productList,
    };

    setFinalData(finalSale);
    setFinalbill(true);
    localStorage.setItem("productList", JSON.stringify([]));
    setProductList([]);
  };
  const paymentMethod = ["cash", "card", "Online", "udhar"];
  useEffect(() => {
    const createSale = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/sales/sale",
          finalData,
          { withCredentials: true }
        );

        if (response.data && response.data.data) {
          navigate("/recentSale", {
            state: { saleData: response.data.data },
          });
        }
      } catch (error) {
        setError("Error in creating sale ");
      } finally {
        setLoading(false);
      }
    };

    if (finalbill == true) {
      createSale();
    }
  }, [finalbill]);

  const deleteItemLocally = (product) => {
    try {
      const localList = JSON.parse(localStorage.getItem("productList")) || [];

      const updatedList = localList.filter((item) => item._id !== product._id);

      localStorage.setItem("productList", JSON.stringify(updatedList));

      setProductList(updatedList);
      setError(null);
    } catch (error) {
      setError("error deleting item locally");
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
  if (loading) {
    return (
      <div className="text-2xl h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="mt-20 md:flex items-start justify-around gap-8 p-4">
        {/* Add to List Form */}
        <form
          onSubmit={handleAddToListSubmit(handleAddToList)}
          className="bg-gray-300 p-6 rounded-lg shadow-md w-full md:w-1/2"
        >
          <div className="space-y-4">
            {error && (
              <div
                className="fixed top-5 mt-24 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded-md shadow-lg"
                role="alert"
              >
                {error}
              </div>
            )}
            <h1 className="font-bold text-2xl text-center text-gray-800">
              Sell Item
            </h1>

            <div className="relative z-10">
              <Input
                placeholder="Search Item Name"
                label="Search Item Name"
                className="rounded-b-none w-full"
                value={search}
                {...registerAddToList("title", {
                  required: true,
                  onChange: (event) => handleSearchChange(event),
                })}
              />
              {searchLoading ? (
                <p className="absolute inset-y-0 right-0 mt-6 flex items-center pr-3 text-xl">
                  <GiShipWheel className="animate-spin text-red-400" />
                </p>
              ) : (
                <>
                  {isDropdownVisible && results.length > 0 && (
                    <ul className="absolute bg-gray-50 border border-gray-300 w-full max-h-40 overflow-y-auto">
                      {results.map((item) => (
                        <li
                          key={item._id}
                          onClick={() => handleSelectProduct(item)}
                          className="cursor-pointer px-4 py-2 hover:bg-green-200"
                        >
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>

            <Input
              placeholder="Quantity"
              label="Quantity"
              value={quantity}
              {...registerAddToList("quantity", {
                required: true,
                onChange: (event) => handleQuantityChange(event),
              })}
            />
            <Input
              placeholder="Discount"
              label="Discount"
              className="bg-gray-100"
              {...registerAddToList("discount", { required: true })}
              readOnly
            />
            <Input
              placeholder="Discounted Price"
              label="Discounted Price"
              className="bg-gray-100"
              {...registerAddToList("discountedprice", { required: true })}
              readOnly
            />
            <Input
              placeholder="Item Total"
              label="Item Total"
              className="bg-gray-100"
              {...registerAddToList("total", { required: true })}
              readOnly
            />

            <Button
              type="submit"
              className={`w-full py-2 rounded-md ${
                error
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
              disabled={!!error}
            >
              Add To List
            </Button>
          </div>
        </form>

        {/* Product List & Billing */}
        {productList.length > 0 ? (
          <div className="flex flex-col w-full md:w-1/2 space-y-6">
            {/* Product Table */}
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="border-b p-3">Title</th>
                  <th className="border-b p-3">Price</th>
                  <th className="border-b p-3">QTY</th>
                  <th className="border-b p-3">Total</th>
                  <th className="border-b p-3">Delete</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="border-b p-3">{item.title}</td>
                    <td className="border-b p-3">
                      &#8377;{item.discountedprice}
                    </td>
                    <td className="border-b p-3">{item.quantity}</td>
                    <td className="border-b p-3">&#8377;{item.total || 0}</td>
                    <td
                      className="border-b p-3 items-center text-2xl cursor-pointer"
                      onClick={() => deleteItemLocally(item)}
                    >
                      <MdOutlineDeleteOutline />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Billing Form */}
            <form
              onSubmit={handleBillingSubmit(handleBilling)}
              className="bg-gray-300 p-6 rounded-lg shadow-md space-y-4"
            >
              <Input
                placeholder="Customer Name"
                label="Customer Name"
                {...registerBilling("customername", { required: true })}
              />
              <Input
                type="tel"
                placeholder="Contact No"
                label="Contact No"
                {...registerBilling("contactNo", {
                  required: true,
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit phone number.",
                  },
                })}
              />
              <Select
                options={paymentMethod}
                label="Payment"
                {...registerBilling("paymentMethod", { required: true })}
              />
              <Input
                type="date"
                placeholder="Date"
                label="Date"
                defaultValue={new Date().toISOString().split("T")[0]}
                {...registerBilling("date", { required: true })}
              />
              <Button
                type="submit"
                className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Bill
              </Button>
            </form>
          </div>
        ) : (
          <p className="bg-red-400 mx-auto text-center text-white py-2 rounded-md text-lg px-3">
            Add Item For Sale
          </p>
        )}
      </div>
    );
  }
}

export default SaleForm;
