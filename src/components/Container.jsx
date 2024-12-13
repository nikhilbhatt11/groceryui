import React from "react";

function Container({ children }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 h-16 pt-5">{children}</div>
  );
}

export default Container;
