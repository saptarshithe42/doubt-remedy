import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../context/AuthContext";

function About() {

	// const [userData, setUserData] = useState(null);

	// const navigate = useNavigate();

	// const callAboutPage = async () => {

	// 	try {

	// 		const res = await fetch("/about", {
	// 			method: "GET",
	// 			headers: {
	// 				Accept: "application/json",
	// 				"Content-Type": "application/json"
	// 			},
	// 			credentials: "include"
	// 		});

	// 		console.log(res);

	// 		const data = await res.json();

	// 		console.log(data);
	// 		setUserData(data);

	// 		if (res.status !== 200) {
	// 			const error = new Error(res.error);
	// 			throw error;
	// 		}


	// 	} catch (err) {

	// 		console.log(err);
	// 		navigate("/login");

	// 	}

	// }

	// useEffect(() => {

	// 	callAboutPage();

	// }, [])

	const {user} = UserState();
	// const navigate = useNavigate();

	// useEffect(() => {
	// 	if(!user){
	// 		navigate("/login");
	// 	}
	// }, [user])


	return (
		<div>
			{user &&
			 <div>
				{user.username}
				{user.email}
			</div>}
		</div>
	)
}

export default About