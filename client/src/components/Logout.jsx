import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { UserState } from "../context/AuthContext";

function Logout() {
    const navigate = useNavigate();
    const { auth, setAuth } = UserState();

    // can do using async / await as previous

    // doing by promises this time
    useEffect(() => {
        setAuth({
            user: null,
            token: "",
        });
        localStorage.setItem("userInfo", null);
        // localStorage.clear();
        navigate("/");
    });

    return <div>Logout</div>;
}

export default Logout;
