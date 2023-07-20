import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserState } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

// styles
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const { user, setUser } = UserState();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/login`, {
                email,
                password,
            });

            if (res && res.data.success) {
                toast.success(res.data.message, {
                    duration: 5000,
                });

                setUser({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });

                localStorage.setItem("userInfo", JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <form className="login-form" method="POST" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <Toaster />

            <label>
                <span>Email:</span>
                <input
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>

            <label>
                <span>Password:</span>
                <input
                    required
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>

            <button className="btn btn-outline-success" onClick={handleSubmit}>
                Login
            </button>

            <div>
                {/* {!isPending && <button className="btn btn-outline-success">Login</button>}
        {isPending && <button className="btn btn-outline-success" disabled>loading</button>}
        {error && <div className="error">{error}</div>} */}
            </div>
        </form>
    );
}
