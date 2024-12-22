import React from "react";

import { ImSpinner9 } from "react-icons/im";
function Loading() {
  return (
    <div className="text-green-400 text-6xl w-80 h-80 flex justify-center items-center animate-spin 3s">
      <ImSpinner9 />
    </div>
  );
}

export default Loading;
