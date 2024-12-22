import React, { useState } from "react";
import { Logo, Input, Button, Loading } from "./components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignupForm() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const handleSignUp = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        data
      );
      console.log("User registered successfully:", response.data);
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        const errorMessage =
          err.response.data.message || "Something went wrong";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred");
      }
    }
    setLoading(false);
  };
  if (loading) {
    return (
      <div className="text-2xl h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center mt-10">
        <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-gray-200 shadow-lg">
          <div className="mt-8 -ml-5">
            <Logo />
          </div>
          <h2 className=" mt-10 text-center text-2xl font-bold leading-tight text-gray-800">
            Sign Up To Create Account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-green-600 transition-all duration-200 hover:underline"
            >
              Log In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-5">
              <Input
                label="Shop Name: "
                placeholder="Enter your shop name"
                className="border-gray-300 border-2 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("shopname", {
                  required: true,
                })}
              />
              <Input
                label="Owner Name: "
                placeholder="Enter Shop Owner name"
                className="border-gray-300 border-2 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("ownername", {
                  required: true,
                })}
              />
              <Input
                label="Email: "
                placeholder="Enter your email"
                className="border-gray-300 border-2 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password: "
                type="password"
                className="border-gray-300 border-2 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button
                type="submit"
                className="w-full bg-green-600 text-white font-bold border rounded-md py-2 hover:bg-green-700 transition-all duration-300"
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignupForm;
