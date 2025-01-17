import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoutBtn } from "../components/components.js";

function Menubar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(location.pathname);
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      url: "/home",
      active: authStatus,
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus,
    },
    {
      name: "Inventry",
      url: "/shop-inventry",
      active: authStatus,
    },

    {
      name: "Add Items",
      url: "/add-item",
      active: authStatus,
    },
    {
      name: "Sell",
      url: "/sell",
      active: authStatus,
    },
    {
      name: "All Sales",
      url: "/all-sales",
      active: authStatus,
    },
    {
      name: "shop todos",
      url: "/wishlist",
      active: authStatus,
    },
  ];

  useEffect(() => {
    setActiveItem(location.pathname);
  });

  const toggleMenu = (itemName) => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <RxHamburgerMenu onClick={toggleMenu} />
      <nav
        className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg transition-transform duration-200 ${
          isOpen
            ? "transform scale-100 opacity-100"
            : "transform scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col p-4 space-y-2">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => {
                    navigate(item.url);
                    setIsOpen(false);
                    setActiveItem(item.name);
                  }}
                  className={`inline-block px-1 m-0.5 text-sm font-serif duration-200  active:border-blue-500 hover:border-b-2 sm:text-base sm:px-2 sm:m-2 lg:text-xl lg:px-3 ${
                    activeItem === item.url ? "border-b-2 border-red-500" : ""
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {/* {authStatus && ( */}
          {authStatus ? (
            <li>
              <LogoutBtn />
            </li>
          ) : (
            <></>
          )}
          {/* )} */}
        </ul>
      </nav>
    </div>
  );
}

export default Menubar;
