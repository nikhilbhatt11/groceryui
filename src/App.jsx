import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
function App() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const intervel = setInterval(() => {
    const expiry = localStorage.getItem("ate");
    const currentTime = Date.now();
    const timeRemaining = expiry - currentTime;

    if (timeRemaining <= 60000 && !showPopup && currentTime < expiry) {
      setShowPopup(true);
    }

    if (currentTime >= expiry) {
      Cookies.remove("accessToken");
      navigate("/login");
      clearInterval(intervel);
    }
  }, 1000);

  useEffect(() => {
    const expiry = localStorage.getItem("ate");
    const currentTime = Date.now();
    if (currentTime >= expiry) {
      Cookies.remove("accessToken");
      navigate("/login");
    }
  }, []);

  const handlePopupClose = () => {
    setShowPopup(false);
  };
  return (
    <div>
      <div className="">
        <div className="fixed w-full z-20">
          <Header />
        </div>
        <main className="min-h-screen bg-gray-400 mt-12 pt-16">
          <Outlet />
        </main>
      </div>
      <Footer />
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h3 className="text-xl">Your session will expire 60 seconds!</h3>
            <button
              onClick={handlePopupClose}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
