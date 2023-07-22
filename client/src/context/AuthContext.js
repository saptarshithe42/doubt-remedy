import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    // default axios
    axios.defaults.headers.common["Authorization"] = auth?.token;

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setAuth(userInfo);
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserState = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
