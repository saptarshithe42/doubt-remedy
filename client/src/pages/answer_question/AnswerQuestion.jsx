import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// styles
// import 'react-quill/dist/quill.snow.css';

// components
import QuestionView from "../../components/QuestionView"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




function AnswerQuestion() {

    const { id } = useParams()

    const [question, setQuestion] = useState(null)

    const fetchQuestion = async (id) => {

        try {

            const res = await fetch(`/api/question/${id}`)

            if (res.status !== 200) {
                throw new Error("Could not fetch question");
            }

            const data = await res.json();

            console.log(data);

            setQuestion(data)


        } catch (err) {

            toast.error(err.message, {
                position: "top-center"
            })


        }

    }

    useEffect(() => {

        fetchQuestion(id)

    }, [])


    return (
        <div>
            <ToastContainer />
            <h2 style={{margin : "1rem"}}>Question :-</h2>
            {question && <QuestionView question={question} />}

            
        </div>
    )
}

export default AnswerQuestion