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
import Dropdown from "../../components/Dropdown";

// icons
import { FiFilter } from "react-icons/fi"
import {BsFillQuestionCircleFill} from "react-icons/bs"
// data
import subjectList from "../../data/SubjectList";
import sortOptionsList from "../../data/SortOptions";

function Home() {

	const { user } = UserState();
	const fetchLimit = 3;
	const [questions, setQuestions] = useState([])
	const [skip, setSkip] = useState(0)
	const [subject, setSubject] = useState("All")
	const [order, setOrder] = useState("Newest to Oldest")
	const [fetchCounter, setFetchCounter] = useState(1)
	const [isLoading, setIsLoading] = useState(true)
	const [modalShow, setModalShow] = useState(false);
	const [isMounted, setIsMounted] = useState(false)


	const fetchData = async () => {

		try {

			setIsLoading(true);

			const fetchUrl = `/api/questions?skip=${skip}&limit=${fetchLimit}&subject=${subject}&order=${order}`

			const res = await fetch(fetchUrl);

			if (res.status !== 200) {
				throw new Error("Error occurred");
			}

			const data = await res.json();

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

	const fetchMore = () => {

		// setSkip(skip + fetchLimit);
		setSkip(questions.length);

	}

	useEffect(() => {

		fetchData();

	}, [skip, subject, order])

	useEffect(() => {
		console.log("current subject : " + subject)
		setQuestions([]); // reset the questions state when the subject changes
		setSkip(0); // reset the skip state when the subject changes
	}, [subject, order]);



	return (
		<div className="home-div container-fluid">

			<h1>Doubt Remedy</h1>
			<ToastContainer />

			<div>
				<SearchComponent />

				<a
					className="btn btn-outline-dark" 
					style={{fontSize : "1.2rem"}}
					href="/ask"
					>
					<BsFillQuestionCircleFill size="1.5rem" /> &nbsp;
					Ask Question
				</a>

					<div className="homepage-feed-div">

						<div className="homepage-feed-options-div w-75">
							<Dropdown
								name={order}
								itemList={sortOptionsList}
								setItem={setOrder}
							/>
							<Dropdown
								name={subject}
								itemList={subjectList}
								setItem={setSubject}
							/>
						</div>
						{isLoading ? <LoadingAnimation /> :

							<div>
								{(questions.length == 0) && <h2>No questions to load</h2>}
								{!(questions.length == 0) && <QuestionFeed questions={questions} />}
								{/* {questions && <QuestionFeed questions={questions} />} */}
							</div>
						}
						<button className="btn btn-primary" onClick={fetchMore}
							style={{ margin: "1rem" }}
						>More</button>
					</div>
			</div>

		</div >
	)
}

export default Home