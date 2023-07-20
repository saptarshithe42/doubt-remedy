import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// styles
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { user, setUser } = UserState();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/login`,
                {
                    email,
                    password,
                }
            );

            if (res && res.data.success) {
                toast.success(res.data.message, {
                    duration: 5000,
                });

                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });

                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const handleSubmitt = async (e) => {
        e.preventDefault();

        try {
            if (!email || !password) {
                throw new Error("Please fill all the fields.");
            }

            const res = await fetch("/api/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            // console.log(res);

            const data = await res.json();

            // console.log(data);

            if (res.status === 400 || !data) {
                throw new Error("Invalid Credentials");
            } else {
                localStorage.setItem("userInfo", JSON.stringify(data));
                setUser(data);
                // window.alert("Login successful");
                navigate("/");
            }
        } catch (err) {
            // window.alert(err);
            toast.error(err.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    return (
        <form className="login-form" method="POST">
            <h2>Login</h2>
            <ToastContainer />

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
