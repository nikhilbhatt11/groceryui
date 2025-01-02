import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";
function LogoutBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    console.log("handle logout called");
    await axios.post(
      "http://localhost:8000/api/v1/users/logout",
      {},
      {
        withCredentials: true,
      }
    );
    dispatch(logout());
    navigate("/login");
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
