import React, { useState, useEffect } from "react";
import { Input, Button, Logo, Loading } from "./components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios, { all } from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login, setAuthStatus, logout } from "../store/authSlice.js";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

function LoginForm() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { status, userData } = useSelector((state) => state.auth);

  const getTokenExpiryTime = (token) => {
    const decodedToken = jwtDecode(token);
    const expiryTime = decodedToken.exp;
    console.log(expiryTime);
    const expiryDate = new Date(expiryTime * 1000);
    console.log(expiryDate);
    const date = new Date(expiryDate).getTime();
    console.log(date);
    return date;
  };

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        data
      );
      console.log(response.data.data);
      const { accessToken, refreshToken, user } = response.data.data;
      const accessExpiry = getTokenExpiryTime(accessToken);
      // const refreshExpiry = getTokenExpiryTime(refreshToken);

      Cookies.set("accessToken", accessToken);
      // Cookies.set("refreshToken", refreshToken);

      localStorage.setItem("ate", accessExpiry);
      // localStorage.setItem("rte", refreshExpiry);

      // localStorage.setItem("refreshToken", refreshToken);
      dispatch(login(user));
      navigate("/add-item");
    } catch (err) {
      console.log(err);
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
      <div className="flex items-center justify-center w-full mt-10">
        <div className="mx-auto w-full max-w-lg bg-white rounded-xl p-10 border border-gray-200 shadow-lg">
          <div className="mt-8 -ml-5">
            <Logo />
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-tight text-gray-800">
            Log In To Your Account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Don't have an account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-green-600 transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          {error && (
            <div
              className="fixed top-5 mt-24 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded-md shadow-lg"
              role="alert"
            >
              {error}
            </div>
          )}
          <form className="mt-8" onSubmit={handleSubmit(handleLogin)}>
            <div className="space-y-5">
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
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
