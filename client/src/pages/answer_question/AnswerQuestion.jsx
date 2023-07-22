import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserState } from "../../context/AuthContext";
import axios from "axios";

// styles
// import 'react-quill/dist/quill.snow.css';

// components
import QuestionView from "../../components/QuestionView";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// utitlities
import striptags from "striptags";
import AnswerView from "../../components/AnswerView";

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        [
            { align: "" },
            { align: "center" },
            { align: "right" },
            { align: "justify" },
        ],
        ["image"],
    ],
};

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
];

function AnswerQuestion() {
    const { id } = useParams();

    const { auth } = UserState();
    const navigate = useNavigate();

    const [question, setQuestion] = useState(null);
    const [canAnswer, setCanAnswer] = useState(true);
    const [answer, setAnswer] = useState("");
    const [answersArr, setAnswersArr] = useState(null);

    const fetchQuestion = async (id) => {
        try {
            const { data } = await axios.get(
                `/api/v1/questions/get-question/${id}`
            );

            if (data?.success === false) {
                toast.error("Could not fetch question");
                return;
            }

            const qs = data.question;

            setQuestion(qs);

            // only two answers permitted for a question
            if (qs.answers.length === 2) {
                setCanAnswer(false);
            }

            if (qs.answers.length > 0) {
                let arr = [];

                for (const answerID of qs.answers) {
                    let answerObj = await fetchAnswerByID(answerID);

                    arr.push(answerObj);
                }

                // console.log(arr);

                setAnswersArr(arr);
            }
        } catch (err) {
            toast.error(err.message, {
                position: "top-center",
            });
        }
    };

    // check if the question has been asked / answered by the user
    const askedOrAnsweredByUser = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/questions/check-asked-or-answered/${id}`
            );

            if (data?.success === false) {
                toast.error(data?.message);
                return;
            }

            // user has asked / answered the question
            if (data?.status) {
                setCanAnswer(false);
            } else {
                setCanAnswer(true);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    // fetch answered by ID
    const fetchAnswerByID = async (id) => {
        try {
            const { data } = await axios.get(
                `/api/v1/answers/get-answer/${id}`
            );

            if (data?.success === false) {
                toast.error(data?.message);
                return null;
            }
            return data?.answer;
        } catch (err) {
            toast.error(err.message, {
                position: "top-center",
            });
        }
    };

    useEffect(() => {
        fetchQuestion(id);
    }, []);

    useEffect(() => {
        if (auth?.user) {
            askedOrAnsweredByUser();
        }
    }, [auth?.user]);

    const submitAnswer = async () => {
        try {
            const answerContent = striptags(answer).trim();

            if (answerContent.length === 0) {
                throw new Error("Empty answer.");
            }

            const answerObj = {
                content: answer,
                answeredByID: auth?.user?._id,
                answeredByUser: auth?.user?.username,
                questionID: id,
                points: question.points / 2,
                rating: 0,
            };

            const { data } = await axios.post(
                `/api/v1/answers/submit-answer`,
                answerObj
            );

            if (data?.success === false) {
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
                }, 4000);
            }
        } catch (err) {
            toast.error(err.message, {
                position: "top-center",
            });
        }
    };

    return (
        <div>
            <ToastContainer />
            {/* <h2 style={{ margin: "1rem" }}>Question :-</h2> */}
            {question && <QuestionView question={question} />}

            {answersArr &&
                answersArr.map((answer, index) => {
                    return <AnswerView answer={answer} key={index} />;
                })}

            {!answersArr && <h3>No answers yet!</h3>}

            {!auth?.user && (
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        navigate("/login", { state: `/question/${id}` });
                    }}
                >
                    Login to Answer
                </button>
            )}

            {auth?.user && canAnswer && (
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

                        {answer && (
                            <button
                                className="btn btn-primary"
                                onClick={submitAnswer}
                                style={{ margin: "1rem" }}
                            >
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AnswerQuestion;
