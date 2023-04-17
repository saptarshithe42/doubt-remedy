import React, { useEffect, useState } from "react"
import { UserState } from "../../context/AuthContext";

function Home() {

	const {user} = UserState();

	// const userHomePage = async () => {
	// 	try {

	// 		const res = await fetch("/getdata", {
	// 			method: "GET",
	// 			headers: {
	// 				"Content-Type": "application/json"
	// 			}
	// 		});

	// 		const data = await res.json();
	// 		setUserName(data.name);

	// 		if (!res.status === 200) {
	// 			const error = new Error(res.error);
	// 			throw error;
	// 		}

	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

	// useEffect(() => {
	// 	userHomePage();
	// }, [])

	return (
		<div>
			<h1>Welcome</h1>
			{user && 
			<h3>{user.name}</h3>}
		</div>
	)
}

export default Home