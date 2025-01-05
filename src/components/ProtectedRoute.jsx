// import { useDispatch } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { setAuthStatus } from "../store/authSlice";

// const ProtectedRoute = ({ children }) => {
//   const dispatch = useDispatch();
//   const expirytime = localStorage.getItem("ate");
//   const currentTime = Date.now();
//   if (currentTime >= expirytime) {
//     dispatch(setAuthStatus({ status: false }));
//     return <Navigate to="/" replace />;
//   }
//   dispatch(setAuthStatus({ status: true }));

//   return children;
// };

// export default ProtectedRoute;
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { setAuthStatus } from "../store/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const expirytime = localStorage.getItem("ate");
  const currentTime = Date.now();

  useEffect(() => {
    if (currentTime >= expirytime) {
      // Cookies.remove("accessToken");
      dispatch(setAuthStatus({ status: false }));
    } else {
      dispatch(setAuthStatus({ status: true }));
    }
  }, [currentTime, expirytime, dispatch]);

  if (currentTime >= expirytime) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
