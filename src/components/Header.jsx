import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, LogoutBtn, Menubar } from "../components/components.js";
// import Logo from "./Logo";
import { Logo } from "./components";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const navItems = [
    {
      name: "Login",
      url: "/login",
      active: true,
    },
    {
      name: "Signup",
      url: "/signup",
      active: true,
    },
    {
      name: "Home",
      url: "/",
      active: true,
    },

    {
      name: "Inventry",
      url: "/shop-inventry",
      active: true,
    },

    {
      name: "Add Items",
      url: "/add-item",
      active: true,
    },
    {
      name: "Sell",
      url: "/sell",
      active: true,
    },
    {
      name: "All Sales",
      url: "/all-sales",
      active: true,
    },
    {
      name: "shop todos",
      url: "/wishlist",
      active: true,
    },
  ];
  useEffect(() => {
    setActiveItem(location.pathname);
  });
  const handleNavClick = (itemName) => {
    setActiveItem(itemName);
  };
  return (
    <header className="bg-white w-full py-7 fixed top-0 left-0 z-50 shadow-md">
      <Container>
        <nav className="flex m-auto items-center text-black">
          <div className="mr-2 sm:mr-4">
            <Link to="/">
              <Logo width="" />
            </Link>
          </div>
          <ul className="flex ml-auto items-center">
            {navItems.map((item) => (
              <li key={item.name} className="invisible sm:visible">
                <button
                  onClick={() => {
                    handleNavClick(item.name);
                    navigate(item.url);
                  }}
                  className={`inline-block px-1 m-0.5 text-sm font-serif duration-200 ${
                    activeItem === item.url
                      ? "border-b-2 border-red-500"
                      : "hover:border-green-500 hover:border-b-2"
                  } sm:text-base sm:px-2 sm:m-2 lg:text-xl lg:px-3`}
                >
                  {item.name}
                </button>
              </li>
            ))}
            {/* {authStatus && ( */}
            <li className="invisible sm:visible">
              <LogoutBtn />
            </li>
            {/* )} */}
            <li className="text-3xl -ml-96  sm:invisible sm:text-xs sm:-ml-10">
              <Menubar />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
