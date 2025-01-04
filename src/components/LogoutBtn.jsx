import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
function LogoutBtn() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    console.log("handle logout called");
    await axios.post(
      `${API_URL}/users/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(logout());
    navigate("/");
    localStorage.setItem("ate", 0);
  };
  return (
    <button
      className="inline-block px-1 m-0.5 text-sm duration-200 font-serif  hover:border-red-500 hover:border-b-2 sm:text-base sm:px-2 sm:m-2   lg:text-xl"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
