import React, { useEffect, useState } from "react"
import { UserState } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

// styles 
import "./AskedQuestions.css"

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

function AskedQuestions() {

	const { query } = useParams()

	const { user } = UserState();
	const fetchLimit = 2;
	const [questions, setQuestions] = useState([])
	const [questionIDs, setQuestionIDs] = useState([])
	const [fetchCounter, setFetchCounter] = useState(1)
	const [isLoading, setIsLoading] = useState(true)
	const [fetched, setFetched] = useState(0)


	const fetchAskedQuestionsID = async () => {

        try {

            const res = await fetch("/api/asked_questions", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            // console.log(res);

            const data = await res.json();

            console.log(data);

			setQuestionIDs(data);


            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }

            // setIsLoading(false);

        } catch (err) {
            console.log(err);
            // navigate("/login");
        }

    }


	const fetchQuestionByID = async (id) => {

        try{

            const res = await fetch(`/api/question/${id}`)

            const data = await res.json();

            if(res.status !== 200){
                throw new Error("Could not fetch answer");
            }

            return data;


        } catch(err){

            toast.error(err.message, {
                position : "top-center"
            })
        }
    }

	const fetchQuestions = async () => {

		try{

			let arr = []
			let count = 0;

			for(let i = 0; (i < fetchLimit && (i + fetched) < questionIDs.length); i++){

				const res = await fetch(`/api/question/${questionIDs[i+fetched]}`);
				const data = await res.json();
				arr.push(data);
				count++;
			}

			// setFetched((prev) => {
			// 	return (prev + count)
			// })

			setQuestions((prev) => {
				return [...prev, ...arr]
			})

			setIsLoading(false)

		} catch(err){
			toast.error(err.message, {
                position : "top-center"
            })
		}
	}
	
	

	useEffect(() => {
		fetchAskedQuestionsID()
	}, [])

	useEffect(() => {

		fetchQuestions()

	}, [questionIDs.length, fetched])


	const fetchMore = () => {
		
		setFetched((prev) => {

			return (prev + fetchLimit);
		})

	}




	return (
		<div className="AskedQuestions-div container-fluid">

			<h1 style={{margin : "1rem"}}>Asked Questions</h1>
			<ToastContainer />

			<div>

				<div className="asked-questions-page-feed-div">

					<div className="asked-questions-page-feed-options-div w-75">

					</div>
					{isLoading ? <LoadingAnimation /> :

						<div>
							{(questions.length == 0) && <h2>No questions to load</h2>}
							{!(questions.length == 0) && <QuestionFeed questions={questions} />}
						</div>
					}
					{ (fetched < questionIDs.length-1) &&
						<button className="btn btn-primary" onClick={fetchMore}
						style={{ margin: "1rem" }}
					>More</button>
					}
				</div>
			</div>

		</div >
	)
}

export default AskedQuestions