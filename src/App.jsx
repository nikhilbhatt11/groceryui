import React from "react";
// import { Outlet } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <div className="">
        <div className="fixed w-full">
          <Header />
        </div>
        <main className="h-screen bg-gray-500">
          <Outlet />
        </main>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
