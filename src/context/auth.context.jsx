import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const token = localStorage.getItem("authToken");

        setIsLoggedIn(!!token);
        setIsLoading(false);
    }, []);

    const logInUser = (token) => {
        localStorage.setItem("authToken", token);
        setIsLoggedIn(true);
    };

    const logOutUser = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, logInUser, logOutUser }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };