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

// data
import subjectList from "../../data/SubjectList";
import sortOptionsList from "../../data/SortOptions";

function Home() {

	const { user } = UserState();
	const fetchLimit = 3;
	const [questions, setQuestions] = useState([])
	const [skip, setSkip] = useState(0)
	const [subject, setSubject] = useState("all")
	const [order, setOrder] = useState(1)
	const [fetchCounter, setFetchCounter] = useState(1)
	const [isLoading, setIsLoading] = useState(true)


	const fetchData = async () => {

		try {

			const fetchUrl = `/api/questions?skip=${skip}&limit=${fetchLimit}&subject=${subject}&order=${order}`

			const res = await fetch(fetchUrl);

			if (res.status !== 200) {
				throw new Error(res.error);
			}

			const data = await res.json();


			if (data) {
				setSkip((prev) => {
					return (prev + data.length);
				})
			}

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

		setFetchCounter((prev) => {
			return (prev + 1);
		})

	}

	useEffect(() => {

		fetchData();

	}, [fetchCounter])


	return (
		<div className="home-div container-fluid">

			<h1>Doubt Remedy</h1>
			<ToastContainer />
			<div>
				<SearchComponent />

				<div className="homepage-feed-div">

					<div className="homepage-feed-options-div w-75">
						{/* <button className="btn btn-primary feed-options">Sort</button>
						<button className="btn btn-primary feed-options">Subject</button> */}
						<Dropdown
							name="Sort"
							itemList={sortOptionsList}
							setItem={setOrder}
						/>
						<Dropdown
							name="Subject"
							itemList={subjectList}
							setItem={setSubject}
						/>
					</div>
					{isLoading ? <LoadingAnimation /> :
						<div>
							{(questions.length == 0) && <h2>No questions to load</h2>}
							{!(questions.length == 0) && <QuestionFeed questions={questions} />}
						</div>
					}
					<button className="btn btn-primary" onClick={fetchMore}
						style={{ margin: "1rem" }}
					>More</button>
				</div>
			</div>

		</div>
	)
}

export default Home