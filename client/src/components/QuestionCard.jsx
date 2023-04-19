import React from "react"

// styles
import "./QuestionCard.css"

// components
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import format from "date-fns/format";
const _ = require("lodash")

function QuestionCard({ question }) {


	return (
		<div className="question-card col-12">
			<div>
				<div className="qs-card-header">
					<div>
						<div>{_.startCase(question.subject)}</div>
						<div>{format(new Date(question.createdAt), "dd/MM/yyyy")}</div>
					</div>
					<div>{question.points} Points</div>
				</div>

				<div className="qs-card-body">
					{(question.question).slice(0,150)}...
				</div>

				<div className="qs-card-footer">
					<button className="btn btn-outline-success">Answer</button>
				</div>
			</div>
		</div>
	)
}

export default QuestionCard;