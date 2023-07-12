const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
// const Authenticate = require("../middleware/authenticate");
// const cookieParser = require("cookie-parser");

require("../db/conn")
const User = require("../models/userSchema");
const Question = require("../models/questionSchema");
const Answer = require("../models/answerSchema");

router.post("/api/submitAnswer/", async (req, res) => {

    try {

        // save answer in database
        const answer = new Answer(req.body);
        await answer.save();

        const questionID = answer.questionID;

        // add currently answered question's ID in user's answeredQuestions array
        let filter = { _id: answer.answeredByID };
        let updateObject = {
            $push: { answeredQuestions: questionID },
            $inc: { points: answer.points }
        }

        await User.updateOne(filter, updateObject);

        // add the answer ID in question's answer array
        filter = { _id: questionID };
        updateObject = {
            $push: { answers: answer._id }
        }
        await Question.updateOne(filter, updateObject);

        res.status(200).json({ message: "Submitted answer successfully" });

    } catch (err) {

        res.status(400).json({ error: "Could not submit answer" });

    }
});