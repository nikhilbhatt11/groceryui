import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children
  return children;
};

export default ProtectedRoute;

// import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { useState, useEffect } from "react";

// const ProtectedRoute = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const token = Cookies.get("accessToken");
//     console.log("AccessToken:", token);
//     setIsAuthenticated(!!token);
//   }, []);

//   // Show a loading state while checking authentication
//   if (isAuthenticated === null) {
//     return <div>Loading...</div>; // Replace this with a loading spinner if needed
//   }

//   // If the user is not authenticated, redirect to the login page
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // If authenticated, render the children
//   return children;
// };

// export default ProtectedRoute;
