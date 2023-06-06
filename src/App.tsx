import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes, authProtectedRoutes } from "./routes";
import Authmiddleware from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Authentication/AuthContext";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <AuthProvider>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route
            path={route.path}
            element={route.component}
            key={index}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                {route.component}
              </Authmiddleware>
            }
            key={idx}
            caseSensitive
          />
        ))}
      </Routes>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
