import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, LogoutBtn, Menubar } from "../components/components.js";
import Cookies from "js-cookie";
import { Logo } from "./components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthStatus } from "../store/authSlice.js";
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const authStatus = useSelector((state) => state.auth.status);
  // console.log(authStatus);
  const token = Cookies.get("accessToken");
  useEffect(() => {
    if (token) {
      // dispatch(setAuthStatus({ status: true }));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setActiveItem(location.pathname);
  }, [location]);
  3;
  const navItems = [
    ...(isLoggedIn
      ? [
          { name: "Home", url: "/" },
          { name: "Inventory", url: "/shop-inventry" },
          { name: "Add Items", url: "/add-item" },
          { name: "Sell", url: "/sell" },
          { name: "All Sales", url: "/all-sales" },
          { name: "Shop Todos", url: "/wishlist" },
        ]
      : [
          { name: "Login", url: "/login" },
          { name: "Signup", url: "/signup" },
        ]),
  ];

  const handleNavClick = (itemName) => {
    setActiveItem(itemName);
  };
  return (
    <header className="bg-white w-full py-9 fixed top-0 left-0 z-50 shadow-md">
      <nav className="flex mx-2 md:mx-10 items-center justify-between text-black">
        {/* Logo */}
        <div className="mr-2 sm:mr-4 flex-shrink-0">
          <Link to="/">
            <Logo width="50" /> {/* Set a max width if necessary */}
          </Link>
        </div>

        {/* Navigation Items */}
        <ul className="flex ml-auto items-center">
          {navItems.map((item) => (
            <li key={item.name} className="hidden sm:block">
              <button
                onClick={() => {
                  handleNavClick(item.name);
                  navigate(item.url);
                }}
                className={`inline-block px-1 m-0.5 text-xs sm:text-sm duration-200 ${
                  activeItem === item.url
                    ? "border-b-2 border-red-500"
                    : "hover:border-green-500 hover:border-b-2"
                } sm:px-2 lg:text-base lg:px-3`}
              >
                {item.name}
              </button>
            </li>
          ))}
          {isLoggedIn && (
            <li className="hidden sm:block">
              <LogoutBtn />
            </li>
          )}
          {/* Hamburger Menu */}
          <li className="text-2xl sm:hidden ml-2">
            <Menubar />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
