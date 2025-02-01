import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../contexts/AuthContext";

const ProtectedRoute = () => {
    const { user } = useContext(AuthContext);

    if (!user?.isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;