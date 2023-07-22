import React, { useEffect, useState } from "react";

// styles
import "./QuestionCard.css";

// components

// utilities
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import format from "date-fns/format";
import striptags from "striptags";
import { Link } from "react-router-dom";

function QuestionCard({ question }) {
    return (
        <div className="question-card col-12">
            <div>
                <div className="qs-card-header">
                    <div>
                        <div>{question.subject}</div>
                        <div>
                            {format(new Date(question.createdAt), "dd/MM/yyyy")}
                        </div>
                    </div>
                    <div>{question.points} Points</div>
                </div>

                <div className="qs-card-body">
                    {striptags(question.question).slice(0, 150)}...
                </div>

                <div className="qs-card-footer">
                    <Link
                        className="btn btn-outline-success"
                        to={`/question/${question._id}`}
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default QuestionCard;
