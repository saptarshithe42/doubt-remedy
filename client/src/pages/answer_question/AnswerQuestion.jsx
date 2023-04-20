import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// styles
// import 'react-quill/dist/quill.snow.css';

// components
import QuestionView from "../../components/QuestionView"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


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

    const [question, setQuestion] = useState(null)
    const [canAnswer, setCanAnswer] = useState(true)

    const fetchQuestion = async (id) => {

        try {

            const res = await fetch(`/api/question/${id}`)

            if (res.status !== 200) {
                throw new Error("Could not fetch question");
            }

            const data = await res.json();

            console.log(data);

            if (data.answers.length == 2) {
                setCanAnswer(false);
            }

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
            <h2 style={{ margin: "1rem" }}>Question :-</h2>
            {question && <QuestionView question={question} />}

            {canAnswer &&
                <div className="answer-div">
                    <div className="container editor-div w-75">
                        <ReactQuill
                            theme="snow"
                            value={question}
                            onChange={setQuestion}
                            modules={modules}
                            formats={formats}

                        />

                        <button className="btn btn-primary">Submit</button>
                    </div>

                </div>
            }

        </div>
    )
}

export default AnswerQuestion