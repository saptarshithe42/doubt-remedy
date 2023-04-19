import React, { useEffect, useState } from "react"
import { UserState } from "../../context/AuthContext";

// styles 
import "./Home.css"

// components
import SearchComponent from "../../components/SearchComponent";
import QuestionFeed from "../../components/QuestionFeed";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingAnimation from "../../components/LoadingAnimation"

function Home() {

	const { user } = UserState();
	const [questions, setQuestions] = useState([])
	const [skip, setSkip] = useState(0)
	const [subject, setSubject] = useState("all")
	const [fetchLimit, setFetchLimit] = useState(3)
	const [isLoading, setIsLoading] = useState(true)

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

	const fetchData = async () => {

		try {

			const fetchUrl = `/api/questions?skip=${skip}&limit=${fetchLimit}&subject=${subject}`

			const res = await fetch(fetchUrl);

			const data = await res.json();

			console.log(data);

			setSkip((prev) => {
				return (prev + data.length);
			})

			setQuestions((prev) => {
				return [...prev, ...data]
			});
			setIsLoading(false);

		} catch (err) {

			toast.error(err.message, {
				position: "top-center"
			})

		}
	}

	useEffect(() => {

		fetchData();

	}, [])




	return (
		<div className="home-div container-fluid">

			<h1>Doubt Remedy</h1>
			<ToastContainer />
			<div>
				<SearchComponent />

				<div className="homepage-feed-div">

					{isLoading ? <LoadingAnimation /> : 
						<div>
							{(questions.length == 0) && <h2>No questions to load</h2>}
							{!(questions.length == 0) && <QuestionFeed questions={questions} />}
						</div>
					}
					<button className="btn btn-primary">More</button>
				</div>
			</div>

		</div>
	)
}

export default Home