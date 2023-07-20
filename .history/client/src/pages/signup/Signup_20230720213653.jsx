import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// styles
import "./Signup.css";

// components
import toast from "react-hot-toast";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/register`, {
                username,
                email,
                password,
            });

            if (res && res.data.success) {
                toast.success(res.data.message, {
                    duration: 5000,
                });
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // const handleSubmitt = async (e) => {
    //     e.preventDefault();

    //     try {
    //         if (!email || !password || !username) {
    //             throw new Error("Please fill all the fields.");
    //         }

    //         const res = await fetch("/api/register", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 email,
    //                 password,
    //                 username,
    //             }),
    //         });

    //         const data = await res.json();

    //         console.log(res);

    //         if (res.status === 400 || !data) {
    //             throw new Error("username / email already exists.");
    //         } else {
    //             localStorage.setItem("userInfo", JSON.stringify(data));
    //             setUser(data);
    //             console.log("Registration successful!");
    //             // window.alert("Registration successful!");
    //             navigate("/");
    //             // navigate("/login");
    //         }
    //     } catch (err) {
    //         // window.alert(err);

    //         toast.error(err.message, {
    //             position: "top-center",
    //             autoClose: 2000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: false,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //         });
    //     }
    // };

    return (
        <form className="signup-form" method="POST" onSubmit={handleSubmit}>
            <h2>Sign up</h2>
            <ToastContainer />

            <label>
                <span>Username:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </label>

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

            <button className="btn btn-outline-success">Sign up</button>

            {/* {!isPending && <button className="btn btn-outline-success">Sign up</button>}
      {isPending && <button className="btn" disabled>loading</button>}
      {error && <div className="error">{error}</div>} */}
        </form>
    );
}
