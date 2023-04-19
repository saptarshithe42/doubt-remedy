import React, { useEffect, useState } from "react"
import { UserState } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

// styles 
import "./SearchResults.css"

// components
import SearchComponent from "../../components/SearchComponent";
import QuestionFeed from "../../components/QuestionFeed";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingAnimation from "../../components/LoadingAnimation"
import Dropdown from "../../components/Dropdown";

// icons

// data
import subjectList from "../../data/SubjectList";
import sortOptionsList from "../../data/SortOptions";

function SearchResults() {

    const {query} = useParams()

	const { user } = UserState();
	const fetchLimit = 3;
	const [questions, setQuestions] = useState([])
	const [skip, setSkip] = useState(0)
	const [subject, setSubject] = useState("All")
	const [order, setOrder] = useState("Newest to Oldest")
	const [fetchCounter, setFetchCounter] = useState(1)
	const [isLoading, setIsLoading] = useState(true)


	const fetchData = async () => {

		try {

			setIsLoading(true);

			const fetchUrl = `/api/search/${query}?skip=${skip}&limit=${fetchLimit}&subject=${subject}&order=${order}`

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
		<div className="SearchResults-div container-fluid">

			<h1>Doubt Remedy</h1>
			<ToastContainer />

			<div>
				<SearchComponent />

				<h2>Results for "{query}"</h2>

				<div className="search-results-page-feed-div">

					<div className="search-results-page-feed-options-div w-75">


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

		</div >
	)
}

export default SearchResults