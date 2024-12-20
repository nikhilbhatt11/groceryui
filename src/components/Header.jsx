import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "./components";
// import Logo from "./Logo";
import { Logo } from "./components";
import { useNavigate } from "react-router-dom";
function Header() {
  const [activeItem, setActiveItem] = useState("Home");
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      url: "/",
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
      url: "/sell",
      active: true,
    },
    {
      name: "All Sales",
      url: "/all-sales",
      active: true,
    },
  ];
  const handleNavClick = (itemName) => {
    setActiveItem(itemName);
  };
  return (
    <header className="bg-white w-full py-6">
      <Container>
        <nav className="flex m-auto items-center text-black">
          <div className="mr-2 sm:mr-4">
            <Link to="/">
              <Logo width="" />
            </Link>
          </div>
          <ul className="flex ml-auto items-center">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => {
                    handleNavClick(item.name);
                    navigate(item.url);
                  }}
                  className={`inline-block px-1 m-0.5 text-sm font-serif duration-200 ${
                    activeItem === item.name
                      ? "border-b-2 border-red-500"
                      : "hover:border-blue-500 hover:border-b-2"
                  } sm:text-base sm:px-2 sm:m-2 lg:text-xl lg:px-3`}
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
