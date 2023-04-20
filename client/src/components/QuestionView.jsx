import React from "react"

// components
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./QuestionView.css"

// utilties
import format from "date-fns/format";

const modules = {
    toolbar: false,
}

function QuestionView({ question }) {
    return (
        <div>
            <div className="container editor-div w-75">

                <div className="question-container">
                    <div className="qs-header-one-div">
                        <div>
                            Asked on : {format(new Date(question.createdAt), "dd/MM/yyyy")}
                        </div>
                        <div>
                           <button className="btn btn-outline-dark" disabled> {question.points} points </button>
                        </div>
                    </div>
                    <div>Asked by : {question.askedByUser} </div>
                    <ReactQuill
                        value={question.question}
                        readOnly={true}
                        modules={modules}

                    />
                </div>
            </div>

        </div>
    )
}

export default QuestionView