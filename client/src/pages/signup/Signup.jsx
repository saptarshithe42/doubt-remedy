import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserState } from "../../context/AuthContext"

// styles
import "./Signup.css"

// components
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState("")
	// const {signup, isPending, error} = useSignup()

	const {user, setUser} = UserState();

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {

			if(!email || !password || !name){
				throw new Error("Please fill all the fields.");
			}

			const res = await fetch("/register", {

				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email, password, name
				})

			})

			const data = await res.json();


			if (res.status === 422 || !data) {
				throw new Error("Error occurred.");
			}
			else {
				localStorage.setItem("userInfo", JSON.stringify(data));
				setUser(data);
				console.log("Registration successful!");
				// window.alert("Registration successful!");
				navigate("/");
				// navigate("/login");
			}
		} catch (err) {
			// window.alert(err);
			toast.error(err.message , {
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

	}


	return (
		<form className="signup-form" method="POST">
			<h2>Sign up</h2>
			<ToastContainer />

			<label>
				<span>Name:</span>
				<input
					required
					type="text"
					onChange={(e) => setName(e.target.value)}
					value={name}
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

			<button className="btn btn-outline-success" onClick={handleSubmit}>Sign up</button>

			{/* {!isPending && <button className="btn btn-outline-success">Sign up</button>}
      {isPending && <button className="btn" disabled>loading</button>}
      {error && <div className="error">{error}</div>} */}
		</form>
	)
}
