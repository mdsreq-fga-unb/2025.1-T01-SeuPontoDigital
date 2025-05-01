import { Navigate } from "react-router-dom";

export default function PrivateRoute({children}) {
    const token = localStorage.getItem("token");

    return (
        token ? children : <Navigate to="/"/>
    )
}