import React from "react";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router-dom";

function App() {
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
    </div>
  );
}

export default App;
