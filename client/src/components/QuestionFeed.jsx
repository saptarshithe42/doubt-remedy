import React from "react"

// styles
import "./QuestionFeed.css"
import QuestionCard from "./QuestionCard"

function QuestionFeed({ questions }) {

    // const {questions} = props;

    return (
        <div className="container question-feed">

            <div className="row w-75">
                {questions.map((question, index) => {

                    return (
                        <QuestionCard question={question} key={index} />
                    )

                })}
            </div>
        </div>
    )
}

export default QuestionFeed