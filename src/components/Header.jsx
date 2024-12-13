import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import LogoutBtn from "./LogoutBtn";
import Logo from "./Logo";
// import { useNavigate } from "react-router-dom";
function Header() {
  //   const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("Home");
  const navItems = [
    {
      name: "Home",
      url: "/all-items",
      active: true,
    },
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
      name: "Shop Inventry",
      url: "/shop-inventry",
      active: true,
    },

    {
      name: "Add Items",
      url: "/add-item",
      active: true,
    },
    {
      name: "Create Sale",
      url: "/sell-item",
      active: true,
    },
    {
      name: "Check Sales",
      url: "/all-soldItem",
      active: true,
    },
  ];
  const handleNavClick = (itemName) => {
    setActiveItem(itemName);
  };
  return (
    <header className=" bg-white w-full py-5">
      <Container>
        <nav className="flex m-auto items-center text-black">
          <div className="mr-2 sm:mr-4 ">
            <Link to="/">
              <Logo width="120px" />
            </Link>
          </div>
          <ul className="flex ml-auto items-center">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavClick(item.name)}
                  className={`inline-block px-1 m-0.5 text-sm font-serif duration-200 hover:border-blue-500 hover:border-b-2 sm:text-base sm:px-2 sm:m-2 lg:text-xl lg:px-3 ${
                    activeItem === item.name ? "border-b-2 border-red-500" : ""
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
