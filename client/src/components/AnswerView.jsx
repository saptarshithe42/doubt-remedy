import React from "react"

// styles

// components
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./AnswerView.css"

// icons
import { BiUpvote } from "react-icons/bi"
import { BiDownvote } from "react-icons/bi"

// utitlities
import format from "date-fns/format"

const modules = {
    toolbar: false,
}

function AnswerView({ answer }) {



    return (
        <div>
            <div className="container editor-div w-75">

                <div className="answer-container">
                    <div>Answered by : {answer.answeredByUser}</div>
                    <div>Answered on : {format(new Date(answer.createdAt), "dd/MM/yyyy")}</div>
                    <div>
                        <ReactQuill
                            value={answer.content}
                            readOnly={true}
                            modules={modules}

                        />
                    </div>
                    <div className="answer-reaction-div">
                        <button className="btn btn-dark" disabled>{answer.rating}</button>
                        <button className="btn btn-success">
                            <BiUpvote />
                        </button>
                        <button className="btn btn-danger">
                            <BiDownvote />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AnswerView