import React from "react"

// components
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [],
}

function QuestionView({ question }) {
    return (
        <div>
            <div className="container editor-div w-75">
                <ReactQuill
                    value={question.question}
                    readOnly={true}
                    modules={modules}

                />
            </div>

        </div>
    )
}

export default QuestionView