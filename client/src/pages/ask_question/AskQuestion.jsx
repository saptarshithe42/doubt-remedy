import React, { useEffect, useState } from "react"
import { UserState } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// styles
import "./AskQuestion.css"

// components
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropdown from "../../components/Dropdown";
import pointsList from "../../data/Points";
import subjectList from "../../data/SubjectList";

// utitlities
import striptags from "striptags";
import LoadingAnimation from "../../components/LoadingAnimation";

// import { EditorState } from 'draft-js';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3,4,5,6] }],
        [{size: []}],
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

function AskQuestion() {

    const [userData, setUserData] = useState(null);
    const [question, setQuestion] = useState("")
    const [subject, setSubject] = useState("Select Subject")
    const [subjects, setSubjects] = useState([])
    const [points, setPoints] = useState("Select Points")
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();


    const getUserData = async () => {

        try {

            const res = await fetch("/api/get_user_data", {
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
            setUserData(data);

            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }

            setIsLoading(false);

        } catch (err) {
            console.log(err);
            navigate("/login");
        }

    }

    useEffect(() => {
        getUserData();

        subjectList.shift();

        setSubjects(subjectList);
    }, [])

    useEffect(() => {
        console.log(question);
    }, [question])

    const submitQuestion = async () => {

        try {

            const questionContent = striptags(question).trim();

            if (questionContent.length === 0) {
                throw new Error("Empty question.")
            }

            if (userData.points < points) {
                throw new Error("Insufficient points. Select lesser points for this question \
                or earn more points by answering others' questions.");
            }

            const questionObj = {
                question: question.trim(),
                askedByID: userData.userID,
                askedByUser : userData.username,
                points: points,
                subject: subject
            }

            const res = await fetch("/api/submitQuestion", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(questionObj)

            })

            if (res.status !== 200) {
                throw new Error("Could not submit question");
            } else {

                toast.success("submitted question successfully", {
                    position: "top-center"
                });

                navigate("/");
            }


        } catch (err) {
            toast.error(err.message, {
                position: "top-center"
            })
        }

    }


    return (
        <div>
            {isLoading ? <LoadingAnimation /> : 
                
                <div>
                <ToastContainer />
                {userData && <h2 className="points-heading-ask-qs-page">You have : {userData.points} Points</h2>}

                <div className="container editor-div w-75">
                    <ReactQuill
                        theme="snow"
                        value={question}
                        onChange={setQuestion}
                        modules={modules}
                        formats={formats}

                    />
                </div>

                <div className="ask-question-options-div">

                    <Dropdown
                        name={subject}
                        itemList={subjects}
                        setItem={setSubject}
                    />

                    <Dropdown
                        name={points}
                        itemList={pointsList}
                        setItem={setPoints}
                    />

                </div>

                {question && (subject !== "Select Subject") && (points !== "Select Points") &&
                    <button className="btn btn-primary" onClick={submitQuestion}>Ask Question</button>}
            </div>}
        </div>
    )
}

export default AskQuestion