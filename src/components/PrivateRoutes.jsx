import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function PrivateRoute(props) {
    const { isLoggedIn, isLoading } = useContext(AuthContext);

    if (isLoading) return <p>Loading...</p>;

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return props.children;
}

export default PrivateRoute;