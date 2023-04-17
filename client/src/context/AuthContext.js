import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    // const navigate = useNavigate();

    useEffect(() => {

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        // if(!userInfo){
        //     navigate("/");
        // }

    }, [])


    return (
        <AuthContext.Provider 
        value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserState = () => {

    return useContext(AuthContext);

}

export default AuthProvider;