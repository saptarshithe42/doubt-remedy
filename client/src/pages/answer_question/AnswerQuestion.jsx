import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserState } from "../../context/AuthContext";

// styles
// import 'react-quill/dist/quill.snow.css';

// components
import QuestionView from "../../components/QuestionView"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// utitlities
import striptags from "striptags";
import AnswerView from "../../components/AnswerView";


const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
        ['image']
    ],
}

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'align'
]



function AnswerQuestion() {

    const { id } = useParams()

    const { user } = UserState();
    const navigate = useNavigate()

    const [question, setQuestion] = useState(null)
    const [canAnswer, setCanAnswer] = useState(true)
    const [answer, setAnswer] = useState("")
    const [answersArr, setAnswersArr] = useState(null)

    const fetchQuestion = async (id) => {

        try {

            const res = await fetch(`/api/question/${id}`)

            if (res.status !== 200) {
                throw new Error("Could not fetch question");
            }

            const data = await res.json();

            console.log(data);

            setQuestion(data)

            // only two answers permitted for a question
            if (data.answers.length == 2) {
                setCanAnswer(false);
            }
            
            if(data.answers.length > 0){

                let arr = []

                for(const answerID of data.answers){

                    let answerObj = await fetchAnswerByID(answerID);

                    arr.push(answerObj);
                }

                console.log(arr);

                setAnswersArr(arr);

            }

            


        } catch (err) {

            toast.error(err.message, {
                position: "top-center"
            })


        }

    }

    const fetchAskedQuestions = async () => {

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

            // user who asked the question cannot answer it
            if (data.includes(id)) {
                setCanAnswer(false);
            }


            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }

            // setIsLoading(false);

        } catch (err) {
            console.log(err);
            navigate("/login");
        }

    }

    const fetchAnsweredQuestions = async () => {

        try {

            const res = await fetch("/api/answered_questions", {
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

            // if user already answered the question then cannot answer it again
            if (data.includes(id)) {
                setCanAnswer(false);
            }


            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }

            // setIsLoading(false);

        } catch (err) {
            console.log(err);
            navigate("/login");
        }
    }


    const fetchAnswerByID = async (id) => {

        try{

            const res = await fetch(`/api/answer/${id}`)

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


    useEffect(() => {

        fetchQuestion(id)
        fetchAskedQuestions()
        fetchAnsweredQuestions()

    }, [])



    const submitAnswer = async () => {

        try {

            const answerContent = striptags(answer).trim();

            if (answerContent.length === 0) {
                throw new Error("Empty answer.")
            }

            const answerObj = {
                content: answer,
                answeredByID: user._id,
                answeredByUser: user.username,
                questionID: id,
                points: (question.points) / 2,
                rating : 0
            }

            const res = await fetch("/api/submitAnswer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(answerObj)
            })

            if (res.status !== 200) {
                throw new Error("Could not submit answer");
            } else {


                toast.success("submitted answer successfully", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });

                setTimeout(() => {
                    window.location.reload(true);
                }, 4000)
            }


        } catch (err) {
            toast.error(err.message, {
                position: "top-center"
            })
        }
    }


    return (
        <div>
            <ToastContainer />
            {/* <h2 style={{ margin: "1rem" }}>Question :-</h2> */}
            {question && <QuestionView question={question} />}

            {answersArr && 
                answersArr.map((answer, index) => {
                    return (<AnswerView answer={answer} key={index} />)
                })
            }

            {!answersArr && <h3>No answers yet!</h3>}


            {canAnswer &&
                <div className="answer-div">
                    <h2>Add your answer :-</h2>
                    <div className="container editor-div w-75">
                        <ReactQuill
                            theme="snow"
                            value={answer}
                            onChange={setAnswer}
                            modules={modules}
                            formats={formats}
                        />

                        {answer &&
                            <button
                                className="btn btn-primary"
                                onClick={submitAnswer}
                                style={{ margin: "1rem" }}>
                                Submit
                            </button>
                        }
                    </div>

                </div>
            }

            
        </div>
    )
}

export default AnswerQuestion