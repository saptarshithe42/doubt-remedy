import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../App";
import { UserState } from "../context/AuthContext";

function Logout() {

	const navigate = useNavigate();
	const {user, setUser} = UserState();

	// can do using async / await as previous

	// doing by promises this time
	useEffect(() => {
		fetch("/api/logout", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			credentials: "include"
		}).then((res) => {

			setUser(null);
			// localStorage.setItem("userInfo", null);
			localStorage.clear();
			navigate("/");

			if (res.status !== 200) {
				const error = new Error(res.error);
				throw error;
			}

		}).catch((err) => {
			console.log(err);
		})
	})

	return (
		<div>Logout</div>
	)
}

export default Logout