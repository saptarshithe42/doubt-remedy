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
