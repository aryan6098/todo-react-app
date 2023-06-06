import React from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthContext";

interface AuthMiddlewareProps {
    children: React.ReactNode;
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = (props) => {
    const token = localStorage.getItem("isAuth");
    const { authenticated } = React.useContext(AuthContext);
    if (token && authenticated) {
        return <React.Fragment>{props.children}</React.Fragment>;
    } else {
        return <Navigate to={{ pathname: "/" }} />;
    }
};

export default AuthMiddleware;
